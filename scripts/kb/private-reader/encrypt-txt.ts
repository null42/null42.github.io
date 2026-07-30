/**
 * TXT 加密管线：编码识别 → 段落切片 → 分段 AES-GCM 加密
 *
 * 三层解密架构（v2）：
 * - gateKey：进入书架的密码（共享 gateSalt，验证 token）
 * - shelfKey：解密书名/作者（共享 shelfSalt）
 * - bookKey：解密章节内容（每本书独立 bookSalt）
 *
 * 输出：
 * - manifest.json：加密的元数据、段索引
 * - seg-NNNN.bin：base64 编码的密文（ciphertext || authTag）
 *
 * 安全要点：
 * - 标题、作者用 shelfKey 加密存储
 * - 章节内容用 bookKey 加密
 * - gateToken 用 gateKey 加密固定字符串，用于验证 gate 密码
 * - 每段独立 IV
 * - 日志只输出 slug、kind、段数、耗时
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { deriveKey, encryptSegment, decryptSegment, encryptField, generateSalt, ITERATIONS } from './crypto'
import { decodeBuffer } from './encoding'
import { sliceTxt, type TxtSegment } from './txt-slicer'

/** Gate 验证 token 明文（固定字符串，用于验证 gate 密码） */
export const GATE_VERIFY_TOKEN = 'PRIVATE_READER_GATE_V2'

export interface TxtManifest {
  schema: 'private-reader/v2'
  kind: 'txt'
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
  segments: Array<{
    index: number
    file: string // seg-NNNN.bin
    iv: string // base64
    bytes: number // 密文字节数（含 authTag）
    charHint: number // 段起始字符偏移
  }>
  reading: {
    estimatedTimeMin: number
  }
}

export interface EncryptTxtOptions {
  title?: string
  author?: string
  encoding?: string // 强制编码
  /** 共享的 gateSalt（Buffer）。若不提供则随机生成 */
  gateSalt?: Buffer
  /** 共享的 shelfSalt（Buffer）。若不提供则随机生成 */
  shelfSalt?: Buffer
}

/**
 * 加密一个 TXT 文件（三层密码架构）。
 *
 * @param inputPath 原始 TXT 文件路径
 * @param slug 书的 URL slug
 * @param passwords 三层密码 { gate, shelf, book }
 * @param outputDir 输出目录（content/private-reader/[slug]/）
 * @param options 可选参数
 * @returns manifest 对象
 */
export async function encryptTxtFile(
  inputPath: string,
  slug: string,
  passwords: { gate: string; shelf: string; book: string },
  outputDir: string,
  options: EncryptTxtOptions = {}
): Promise<TxtManifest> {
  const startTime = Date.now()

  // 1. 读取文件并解码
  const buffer = await fs.readFile(inputPath)
  const text = decodeBuffer(buffer, options.encoding)

  // 2. 推断标题和作者
  const title = options.title ?? inferTitle(text) ?? slug
  const author = options.author ?? null

  // 3. 生成 / 复用 salt
  const gateSalt = options.gateSalt ?? generateSalt()
  const shelfSalt = options.shelfSalt ?? generateSalt()
  const bookSalt = generateSalt()

  // 4. 派生三层密钥
  const gateKey = deriveKey(passwords.gate, gateSalt)
  const shelfKey = deriveKey(passwords.shelf, shelfSalt)
  const bookKey = deriveKey(passwords.book, bookSalt)

  // 5. Gate 验证 token
  const gateToken = encryptField(GATE_VERIFY_TOKEN, gateKey)

  // 6. Shelf 层：加密标题和作者
  const encryptedTitle = encryptField(title, shelfKey)
  const encryptedAuthor = author ? encryptField(author, shelfKey) : null

  // 7. Book 层：切片并加密
  const segments = sliceTxt(text)

  // 8. 估算阅读时间（平均 400 字/分钟）
  const charCount = text.length
  const estimatedTimeMin = Math.max(1, Math.ceil(charCount / 400))

  // 9. 加密每段（用 bookKey）
  await fs.mkdir(outputDir, { recursive: true })
  const manifestSegments: TxtManifest['segments'] = []

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    const { iv, ciphertext } = encryptSegment(seg.text, bookKey)
    const fileName = `seg-${String(i).padStart(4, '0')}.bin`
    const filePath = path.join(outputDir, fileName)

    // 写入 base64 编码的密文
    await fs.writeFile(filePath, ciphertext.toString('base64'))

    manifestSegments.push({
      index: i,
      file: fileName,
      iv: iv.toString('base64'),
      bytes: ciphertext.length,
      charHint: seg.charOffset
    })
  }

  // 10. 构建 manifest
  const manifest: TxtManifest = {
    schema: 'private-reader/v2',
    kind: 'txt',
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
    segments: manifestSegments,
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
  // 安全日志：只输出 slug、kind、段数、耗时
  console.log(JSON.stringify({
    slug,
    kind: 'txt',
    segments: segments.length,
    ms: elapsed
  }))

  return manifest
}

/**
 * 从文本内容推断标题（第一个非空行）。
 */
function inferTitle(text: string): string | undefined {
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.length > 0 && trimmed.length <= 100) {
      return trimmed
    }
  }
  return undefined
}

/**
 * 解密 TXT 段（用于测试验证）。
 */
export function decryptTxtSegment(
  ciphertextBase64: string,
  key: Buffer,
  ivBase64: string
): string {
  const ciphertext = Buffer.from(ciphertextBase64, 'base64')
  const iv = Buffer.from(ivBase64, 'base64')
  return decryptSegment(ciphertext, key, iv)
}
