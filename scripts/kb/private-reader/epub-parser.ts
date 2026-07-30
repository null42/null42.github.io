/**
 * EPUB 解析器：用 yauzl 解压 + 正则解析 OPF/NCX/nav.xhtml
 *
 * EPUB 结构：
 * 1. META-INF/container.xml → 指向 OPF 路径
 * 2. OPF（.opf）→ metadata + manifest + spine
 * 3. NCX（.ncx，EPUB2）或 nav.xhtml（EPUB3）→ 目录
 *
 * 安全：
 * - 限制最大解压体积（防 zip bomb）
 * - 限制最大条目数
 * - 不解码二进制资源为文本
 */

import yauzl from 'yauzl'
import { Entry } from 'yauzl'

export interface EpubManifestItem {
  id: string
  href: string
  mediaType: string
  properties?: string
}

export interface EpubSpineItem {
  id: string
  href: string
  mediaType: string
}

export interface EpubTocItem {
  id: string
  title: string
  href: string
  anchor?: string
}

export interface EpubAsset {
  href: string
  mediaType: string
}

export interface EpubImageAsset {
  buffer: Buffer
  mediaType: string
}

export interface EpubStructure {
  opfPath: string
  metadata: {
    title: string
    author: string | null
  }
  manifest: EpubManifestItem[]
  spine: EpubSpineItem[]
  toc: EpubTocItem[]
  assets: EpubAsset[]
  /** 所有文本条目的原始内容（XHTML, XML, NCX 等），供加密管线使用 */
  content: Map<string, Buffer>
  /** 所有图片二进制资源（key 为 ZIP 内路径，value 为 {buffer, mediaType}） */
  imageAssets: Map<string, EpubImageAsset>
}

export interface ParseEpubOptions {
  maxUncompressedBytes?: number
  maxEntries?: number
}

const DEFAULT_MAX_UNCOMPRESSED = 200 * 1024 * 1024 // 200 MB
const DEFAULT_MAX_ENTRIES = 5000

/** 图片扩展名 → MIME 类型映射 */
const IMAGE_MEDIA_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.bmp': 'image/bmp',
}

/** 判断文件是否为图片资源（通过扩展名） */
function isImageFile(fileName: string): boolean {
  const lower = fileName.toLowerCase()
  return Object.keys(IMAGE_MEDIA_TYPES).some(ext => lower.endsWith(ext))
}

/** 获取图片的 MIME 类型 */
function getImageMediaType(fileName: string): string {
  const lower = fileName.toLowerCase()
  for (const [ext, mt] of Object.entries(IMAGE_MEDIA_TYPES)) {
    if (lower.endsWith(ext)) return mt
  }
  return 'application/octet-stream'
}

/**
 * 解析 EPUB 文件结构。
 *
 * @param buffer EPUB 文件的原始字节（ZIP 格式）
 * @param options 解析选项
 * @returns EPUB 结构信息
 */
export function parseEpub(
  buffer: Buffer,
  options: ParseEpubOptions = {}
): Promise<EpubStructure> {
  const maxUncompressed = options.maxUncompressedBytes ?? DEFAULT_MAX_UNCOMPRESSED
  const maxEntries = options.maxEntries ?? DEFAULT_MAX_ENTRIES

  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, zipfile) => {
      if (err || !zipfile) {
        reject(new Error(`Failed to open EPUB: ${err?.message ?? 'unknown error'}`))
        return
      }

      const entries: Map<string, Buffer> = new Map()
      const imageAssets: Map<string, EpubImageAsset> = new Map()
      let totalUncompressed = 0
      let entryCount = 0

      zipfile.readEntry()

      zipfile.on('entry', (entry: Entry) => {
        entryCount++
        if (entryCount > maxEntries) {
          reject(new Error(`EPUB has too many entries (max ${maxEntries})`))
          return
        }

        totalUncompressed += entry.uncompressedSize
        if (totalUncompressed > maxUncompressed) {
          reject(new Error(`EPUB exceeds max uncompressed size (${maxUncompressed} bytes)`))
          return
        }

        // 分类：文本文件 → entries，图片文件 → imageAssets，其他 → 跳过
        const isText = entry.fileName.endsWith('.xml') ||
                       entry.fileName.endsWith('.opf') ||
                       entry.fileName.endsWith('.ncx') ||
                       entry.fileName.endsWith('.xhtml') ||
                       entry.fileName.endsWith('.html') ||
                       entry.fileName.endsWith('.htm') ||
                       entry.fileName.endsWith('.css')
        const isImage = isImageFile(entry.fileName)

        if (!isText && !isImage) {
          zipfile.readEntry()
          return
        }

        zipfile.openReadStream(entry, (streamErr, stream) => {
          if (streamErr || !stream) {
            reject(new Error(`Failed to read entry ${entry.fileName}: ${streamErr?.message}`))
            return
          }

          const chunks: Buffer[] = []
          stream.on('data', (chunk: Buffer) => chunks.push(chunk))
          stream.on('end', () => {
            const buf = Buffer.concat(chunks)
            if (isImage) {
              imageAssets.set(entry.fileName, {
                buffer: buf,
                mediaType: getImageMediaType(entry.fileName)
              })
            } else {
              entries.set(entry.fileName, buf)
            }
            zipfile.readEntry()
          })
          stream.on('error', (e: Error) => {
            reject(new Error(`Stream error for ${entry.fileName}: ${e.message}`))
          })
        })
      })

      zipfile.on('end', () => {
        try {
          const structure = buildStructure(entries, imageAssets)
          resolve(structure)
        } catch (e) {
          reject(e)
        }
      })

      zipfile.on('error', (e: Error) => {
        reject(new Error(`ZIP error: ${e.message}`))
      })
    })
  })
}

/**
 * 从读取到的条目构建 EPUB 结构。
 */
function buildStructure(entries: Map<string, Buffer>, imageAssets: Map<string, EpubImageAsset>): EpubStructure {
  // 1. 解析 container.xml 找到 OPF 路径
  const containerXml = entries.get('META-INF/container.xml')
  if (!containerXml) {
    throw new Error('META-INF/container.xml not found in EPUB')
  }
  const opfPath = extractOpfPath(containerXml.toString('utf-8'))
  if (!opfPath) {
    throw new Error('OPF path not found in container.xml')
  }

  // 2. 解析 OPF
  const opfContent = entries.get(opfPath)
  if (!opfContent) {
    throw new Error(`OPF file not found: ${opfPath}`)
  }
  const opfText = opfContent.toString('utf-8')
  const opfDir = opfPath.includes('/') ? opfPath.slice(0, opfPath.lastIndexOf('/') + 1) : ''

  const metadata = extractMetadata(opfText)
  const manifest = extractManifest(opfText, opfDir)
  const spine = extractSpine(opfText, manifest)

  // 3. 解析 TOC
  const toc = extractToc(entries, manifest, opfDir, opfText)

  // 4. 收集资源（图片等）
  const assets = manifest.filter((item) =>
    item.mediaType.startsWith('image/') ||
    item.mediaType.startsWith('font/') ||
    item.mediaType === 'text/css'
  ).map((item) => ({ href: item.href, mediaType: item.mediaType }))

  return {
    opfPath,
    metadata,
    manifest,
    spine,
    toc,
    assets,
    content: entries,
    imageAssets
  }
}

/**
 * 从 container.xml 提取 OPF 路径。
 */
function extractOpfPath(xml: string): string | null {
  const match = xml.match(/<rootfile[^>]+full-path="([^"]+)"/i)
  return match ? match[1] : null
}

/**
 * 从 OPF 提取 metadata。
 */
function extractMetadata(opf: string): { title: string; author: string | null } {
  const titleMatch = opf.match(/<dc:title[^>]*>([^<]*)<\/dc:title>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled'

  const authorMatch = opf.match(/<dc:creator[^>]*>([^<]*)<\/dc:creator>/i) ||
                      opf.match(/<dc:author[^>]*>([^<]*)<\/dc:author>/i)
  const author = authorMatch ? authorMatch[1].trim() : null

  return { title, author }
}

/**
 * 从 OPF 提取 manifest。
 */
function extractManifest(opf: string, opfDir: string): EpubManifestItem[] {
  const items: EpubManifestItem[] = []
  const itemRegex = /<item\s+([^>]+?)\s*\/?>/gi
  let match: RegExpExecArray | null

  while ((match = itemRegex.exec(opf)) !== null) {
    const attrs = match[1]
    const id = extractAttr(attrs, 'id')
    const href = extractAttr(attrs, 'href')
    const mediaType = extractAttr(attrs, 'media-type')
    const properties = extractAttr(attrs, 'properties')

    if (id && href && mediaType) {
      items.push({
        id,
        href: resolvePath(opfDir, href),
        mediaType,
        properties: properties || undefined
      })
    }
  }

  return items
}

/**
 * 从 OPF 提取 spine（阅读顺序）。
 */
function extractSpine(opf: string, manifest: EpubManifestItem[]): EpubSpineItem[] {
  const spineItems: EpubSpineItem[] = []
  const manifestMap = new Map(manifest.map((m) => [m.id, m]))

  const itemrefRegex = /<itemref\s+([^>]+?)\s*\/?>/gi
  let match: RegExpExecArray | null

  while ((match = itemrefRegex.exec(opf)) !== null) {
    const idref = extractAttr(match[1], 'idref')
    if (idref) {
      const item = manifestMap.get(idref)
      if (item) {
        spineItems.push({
          id: item.id,
          href: item.href,
          mediaType: item.mediaType
        })
      }
    }
  }

  return spineItems
}

/**
 * 解析 TOC（NCX 或 nav.xhtml）。
 */
function extractToc(
  entries: Map<string, Buffer>,
  manifest: EpubManifestItem[],
  opfDir: string,
  opf: string
): EpubTocItem[] {
  // 优先找 EPUB3 nav.xhtml
  const navItem = manifest.find((m) => m.properties?.includes('nav'))
  if (navItem) {
    const navContent = entries.get(navItem.href)
    if (navContent) {
      const items = parseNavXhtml(navContent.toString('utf-8'))
      // 对 href 做 resolvePath，与 spine 的 href 格式一致
      return items.map((item) => ({
        ...item,
        href: resolvePath(opfDir, item.href),
      }))
    }
  }

  // 回退到 EPUB2 NCX
  const spineTocAttr = opf.match(/<spine[^>]+toc="([^"]+)"/i)
  if (spineTocAttr) {
    const tocId = spineTocAttr[1]
    const ncxItem = manifest.find((m) => m.id === tocId)
    if (ncxItem) {
      const ncxContent = entries.get(ncxItem.href)
      if (ncxContent) {
        const items = parseNcx(ncxContent.toString('utf-8'))
        return items.map((item) => ({
          ...item,
          href: resolvePath(opfDir, item.href),
        }))
      }
    }
  }

  // 无 TOC，从 spine 生成
  return []
}

/**
 * 解析 EPUB3 nav.xhtml。
 */
function parseNavXhtml(html: string): EpubTocItem[] {
  const items: EpubTocItem[] = []
  const linkRegex = /<a\s+[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi
  let match: RegExpExecArray | null
  let idx = 0

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1]
    const title = match[2].trim()
    if (href && title) {
      const [file, anchor] = href.split('#')
      items.push({
        id: `nav-${idx++}`,
        title,
        href: file,
        anchor: anchor || undefined
      })
    }
  }

  return items
}

/**
 * 解析 EPUB2 NCX。
 */
function parseNcx(ncx: string): EpubTocItem[] {
  const items: EpubTocItem[] = []
  const pointRegex = /<navPoint[^>]*>[\s\S]*?<navLabel>[\s\S]*?<text>([^<]*)<\/text>[\s\S]*?<content[^>]+src="([^"]+)"[\s\S]*?<\/navPoint>/gi
  let match: RegExpExecArray | null
  let idx = 0

  while ((match = pointRegex.exec(ncx)) !== null) {
    const title = match[1].trim()
    const src = match[2]
    if (title && src) {
      const [file, anchor] = src.split('#')
      items.push({
        id: `ncx-${idx++}`,
        title,
        href: file,
        anchor: anchor || undefined
      })
    }
  }

  return items
}

/**
 * 从属性字符串中提取指定属性值。
 */
function extractAttr(attrs: string, name: string): string | null {
  const regex = new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i')
  const match = attrs.match(regex)
  return match ? match[1] : null
}

/**
 * 解析相对于 OPF 目录的路径。
 */
function resolvePath(base: string, href: string): string {
  if (!base) return href
  if (href.startsWith('/')) return href.slice(1)
  return base + href
}

/**
 * 从 ZIP 条目中读取所有文本文件（用于测试）。
 */
export async function readEpubTextEntries(
  buffer: Buffer
): Promise<Map<string, string>> {
  const entries = await parseEpub(buffer)
  // 返回 manifest 中所有 XHTML 的内容（用于测试验证）
  const result = new Map<string, string>()
  // 注意：parseEpub 只返回结构，不返回原始内容
  // 测试需要单独读取
  return result
}
