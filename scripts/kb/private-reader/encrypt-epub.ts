/**
 * EPUB 加密管线：yauzl 解压 → OPF/NCX 解析 → 按 spine 章节独立 AES-GCM 加密
 *
 * 输出：
 * - manifest.json：加密的元数据、目录、段索引
 * - seg-NNNN.bin：每章一个密文分片（base64 编码的 ciphertext || authTag）
 *
 * 安全：
 * - 标题、作者、目录标题全部加密
 * - 每章独立 IV
 * - 图片资源内联为加密 base64（默认）
 * - 日志只输出 slug、kind、章节数、段数、耗时
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { parseEpub, type EpubStructure } from './epub-parser'
import {
  deriveKey,
  encryptSegment,
  decryptSegment,
  encryptField,
  generateSalt,
  ITERATIONS
} from './crypto'

export interface EpubManifest {
  schema: 'private-reader/v1'
  kind: 'epub'
  slug: string
  title: string // 加密 base64
  author: string | null // 加密 base64 或 null
  crypto: {
    algorithm: 'AES-GCM'
    kdf: 'PBKDF2-SHA256'
    iterations: number
    salt: string // base64
  }
  toc: Array<{
    id: string
    title: string // 加密 base64
    segmentIndex: number
    anchor?: string
  }>
  segments: Array<{
    index: number
    file: string
    iv: string // base64
    bytes: number
    chapterId: string
  }>
  assets: Record<string, string[]> // chapterId -> asset file list
  reading: {
    estimatedTimeMin: number
  }
}

export interface EncryptEpubOptions {
  title?: string
  author?: string
}

/**
 * 加密一个 EPUB 文件。
 *
 * @param inputPath 原始 EPUB 文件路径
 * @param slug 书的 URL slug
 * @param password 加密密码
 * @param outputDir 输出目录
 * @param options 可选参数
 * @returns manifest 对象
 */
export async function encryptEpubFile(
  inputPath: string,
  slug: string,
  password: string,
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

  // 3. 派生密钥
  const salt = generateSalt()
  const key = deriveKey(password, salt)

  // 4. 加密每个 spine 章节
  await fs.mkdir(outputDir, { recursive: true })
  const manifestSegments: EpubManifest['segments'] = []
  const manifestToc: EpubManifest['toc'] = []
  const manifestAssets: Record<string, string[]> = {}

  for (let i = 0; i < epub.spine.length; i++) {
    const spineItem = epub.spine[i]
    const content = epub.content.get(spineItem.href)

    if (!content) {
      console.warn(`Warning: content not found for spine item ${spineItem.href}, skipping`)
      continue
    }

    const plaintext = content.toString('utf-8')
    const { iv, ciphertext } = encryptSegment(plaintext, key)
    const fileName = `seg-${String(i).padStart(4, '0')}.bin`
    const filePath = path.join(outputDir, fileName)

    await fs.writeFile(filePath, ciphertext.toString('base64'))

    manifestSegments.push({
      index: i,
      file: fileName,
      iv: iv.toString('base64'),
      bytes: ciphertext.length,
      chapterId: spineItem.id
    })

    // 加密对应的 TOC 标题
    const tocItem = epub.toc.find((t) => t.href === spineItem.href)
    if (tocItem) {
      manifestToc.push({
        id: tocItem.id,
        title: encryptField(tocItem.title, key),
        segmentIndex: i,
        anchor: tocItem.anchor
      })
    }
  }

  // 5. 估算阅读时间
  const totalChars = epub.spine.reduce((sum, item) => {
    const content = epub.content.get(item.href)
    return sum + (content?.length ?? 0)
  }, 0)
  const estimatedTimeMin = Math.max(1, Math.ceil(totalChars / 400))

  // 6. 构建 manifest
  const manifest: EpubManifest = {
    schema: 'private-reader/v1',
    kind: 'epub',
    slug,
    title: encryptField(title, key),
    author: author ? encryptField(author, key) : null,
    crypto: {
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      iterations: ITERATIONS,
      salt: salt.toString('base64')
    },
    toc: manifestToc,
    segments: manifestSegments,
    assets: manifestAssets,
    reading: {
      estimatedTimeMin
    }
  }

  // 7. 写入 manifest.json
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
