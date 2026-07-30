/**
 * EPUB 加密管线：yauzl 解压 → OPF/NCX 解析 → 按 spine 章节独立 AES-GCM 加密
 *
 * 三层解密架构（v2）：
 * - gateKey：进入书架的密码（共享 gateSalt，验证 token）
 * - shelfKey：解密书名/作者（共享 shelfSalt）
 * - bookKey：解密章节/图片（每本书独立 bookSalt）
 *
 * 输出：
 * - manifest.json：加密的元数据、目录、段索引
 * - seg-NNNN.bin：每章一个密文分片（base64 编码的 ciphertext || authTag）
 * - asset-NNNN.bin：图片资源密文
 *
 * 安全：
 * - 标题、作者用 shelfKey 加密
 * - 章节内容、图片用 bookKey 加密
 * - gateToken 用 gateKey 加密固定字符串，用于验证 gate 密码
 * - 每章/每资源独立 IV
 * - 日志只输出 slug、kind、章节数、段数、耗时
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { parseEpub, type EpubStructure } from './epub-parser'
import {
  deriveKey,
  encryptSegment,
  decryptSegment,
  encryptBuffer,
  encryptField,
  generateSalt,
  ITERATIONS
} from './crypto'

/** Gate 验证 token 明文（固定字符串，用于验证 gate 密码） */
export const GATE_VERIFY_TOKEN = 'PRIVATE_READER_GATE_V2'

export interface EpubManifest {
  schema: 'private-reader/v2'
  kind: 'epub'
  slug: string
  crypto: {
    algorithm: 'AES-GCM'
    kdf: 'PBKDF2-SHA256'
    iterations: number
    gateSalt: string   // base64，所有书共享
    shelfSalt: string  // base64，所有书共享
    bookSalt: string   // base64，每本书独立
  }
  /** Gate 验证：gateKey 加密的固定 token */
  gate: {
    token: string // base64
  }
  /** Shelf 层：shelfKey 加密的标题和作者 */
  shelf: {
    title: string      // base64
    author: string | null // base64 或 null
  }
  toc: Array<{
    id: string
    title: string // bookKey 加密 base64
    segmentIndex: number
    anchor?: string
  }>
  segments: Array<{
    index: number
    file: string
    iv: string // base64
    bytes: number
    chapterId: string
    href: string // spine item 的文件路径（ZIP 内完整路径，用于解析图片相对路径）
  }>
  /** 图片资源映射：key 为 ZIP 内完整路径，value 为加密信息 */
  assets: Record<string, {
    file: string       // asset-NNNN.bin
    iv: string         // base64
    mediaType: string  // image/jpeg 等
    bytes: number      // 密文字节数
  }>
  reading: {
    estimatedTimeMin: number
  }
}

export interface EncryptEpubOptions {
  title?: string
  author?: string
  /** 共享的 gatealt（Buffer）。若不提供则随机生成（不推荐，会导致前端无法共享验证） */
  gateSalt?: Buffer
  /** 共享的 shelfSalt（Buffer）。若不提供则随机生成 */
  shelfSalt?: Buffer
}

/**
 * 加密一个 EPUB 文件（三层密码架构）。
 *
 * @param inputPath 原始 EPUB 文件路径
 * @param slug 书的 URL slug
 * @param passwords 三层密码 { gate, shelf, book }
 * @param outputDir 输出目录
 * @param options 可选参数
 * @returns manifest 对象
 */
export async function encryptEpubFile(
  inputPath: string,
  slug: string,
  passwords: { gate: string; shelf: string; book: string },
  outputDir: string,
  options: EncryptEpubOptions = {}
): Promise<EpubManifest> {
  const startTime = Date.now()

  // 1. 读取并解析 EPUB
  const buffer = await fs.readFile(inputPath)
  const epub = await parseEpub(buffer)

  // 2. 推断标题和作者
  const title = options.title ?? epub.metadata.title ?? slug
  const author = options.author ?? epub.metadata.author

  // 3. 生成 / 复用 salt
  const gateSalt = options.gateSalt ?? generateSalt()
  const shelfSalt = options.shelfSalt ?? generateSalt()
  const bookSalt = generateSalt()

  // 4. 派生三层密钥
  const gateKey = deriveKey(passwords.gate, gateSalt)
  const shelfKey = deriveKey(passwords.shelf, shelfSalt)
  const bookKey = deriveKey(passwords.book, bookSalt)

  // 5. Gate 验证 token（gateKey 加密固定字符串）
  const gateToken = encryptField(GATE_VERIFY_TOKEN, gateKey)

  // 6. Shelf 层：加密标题和作者
  const encryptedTitle = encryptField(title, shelfKey)
  const encryptedAuthor = author ? encryptField(author, shelfKey) : null

  // 7. Book 层：加密每个 spine 章节
  await fs.mkdir(outputDir, { recursive: true })
  const manifestSegments: EpubManifest['segments'] = []
  const manifestToc: EpubManifest['toc'] = []

  for (let i = 0; i < epub.spine.length; i++) {
    const spineItem = epub.spine[i]
    const content = epub.content.get(spineItem.href)

    if (!content) {
      console.warn(`Warning: content not found for spine item ${spineItem.href}, skipping`)
      continue
    }

    const plaintext = content.toString('utf-8')
    const { iv, ciphertext } = encryptSegment(plaintext, bookKey)
    const fileName = `seg-${String(i).padStart(4, '0')}.bin`
    const filePath = path.join(outputDir, fileName)

    await fs.writeFile(filePath, ciphertext.toString('base64'))

    manifestSegments.push({
      index: i,
      file: fileName,
      iv: iv.toString('base64'),
      bytes: ciphertext.length,
      chapterId: spineItem.id,
      href: spineItem.href
    })

    // 加密对应的 TOC 标题（用 bookKey）
    const tocItem = epub.toc.find((t) => t.href === spineItem.href)
    if (tocItem) {
      manifestToc.push({
        id: tocItem.id,
        title: encryptField(tocItem.title, bookKey),
        segmentIndex: i,
        anchor: tocItem.anchor
      })
    }
  }

  // 8. Book 层：加密所有图片资源
  let assetIndex = 0
  const manifestAssets: EpubManifest['assets'] = {}
  for (const [zipPath, asset] of epub.imageAssets) {
    const { iv, ciphertext } = encryptBuffer(asset.buffer, bookKey)
    const fileName = `asset-${String(assetIndex).padStart(4, '0')}.bin`
    const filePath = path.join(outputDir, fileName)

    await fs.writeFile(filePath, ciphertext.toString('base64'))

    manifestAssets[zipPath] = {
      file: fileName,
      iv: iv.toString('base64'),
      mediaType: asset.mediaType,
      bytes: ciphertext.length
    }
    assetIndex++
  }

  // 9. 估算阅读时间
  const totalChars = epub.spine.reduce((sum, item) => {
    const content = epub.content.get(item.href)
    return sum + (content?.length ?? 0)
  }, 0)
  const estimatedTimeMin = Math.max(1, Math.ceil(totalChars / 400))

  // 10. 构建 manifest
  const manifest: EpubManifest = {
    schema: 'private-reader/v2',
    kind: 'epub',
    slug,
    crypto: {
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      iterations: ITERATIONS,
      gateSalt: gateSalt.toString('base64'),
      shelfSalt: shelfSalt.toString('base64'),
      bookSalt: bookSalt.toString('base64')
    },
    gate: {
      token: gateToken
    },
    shelf: {
      title: encryptedTitle,
      author: encryptedAuthor
    },
    toc: manifestToc,
    segments: manifestSegments,
    assets: manifestAssets,
    reading: {
      estimatedTimeMin
    }
  }

  // 11. 写入 manifest.json
  await fs.writeFile(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  )

  const elapsed = Date.now() - startTime
  console.log(JSON.stringify({
    slug,
    kind: 'epub',
    chapters: epub.spine.length,
    segments: manifestSegments.length,
    images: assetIndex,
    ms: elapsed
  }))

  return manifest
}

/**
 * 解密 EPUB 章节（用于测试验证）。
 */
export function decryptEpubChapter(
  ciphertextBase64: string,
  key: Buffer,
  ivBase64: string
): string {
  const ciphertext = Buffer.from(ciphertextBase64, 'base64')
  const iv = Buffer.from(ivBase64, 'base64')
  return decryptSegment(ciphertext, key, iv)
}
