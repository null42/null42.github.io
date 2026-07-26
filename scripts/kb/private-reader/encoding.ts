/**
 * 编码识别：BOM 启发式 + TextDecoder 试解码序列
 *
 * 支持 UTF-8（含/不含 BOM）、GB18030、UTF-16LE/BE、Big5。
 * 返回最佳匹配编码与置信度（0~1）。
 */

interface EncodingResult {
  encoding: string
  confidence: number
}

// BOM 签名
const BOM_UTF8 = Buffer.from([0xef, 0xbb, 0xbf])
const BOM_UTF16LE = Buffer.from([0xff, 0xfe])
const BOM_UTF16BE = Buffer.from([0xfe, 0xff])

// 候选编码（按优先级排序）
const CANDIDATES = ['utf-8', 'gb18030', 'utf-16le', 'utf-16be', 'big5'] as const

/**
 * 检测 Buffer 的文本编码。
 *
 * 策略：
 * 1. 先检查 BOM（最可靠）
 * 2. 无 BOM 时，用每个候选编码尝试解码，评分基于：
 *    - 解码是否抛错
 *    - 替换字符（U+FFFD）的数量
 *    - 可打印字符比例
 *
 * @param buffer 原始字节
 * @returns 最佳匹配编码与置信度
 */
export function detectEncoding(buffer: Buffer): EncodingResult {
  // 1. BOM 检查
  if (buffer.length >= 3 && buffer.subarray(0, 3).equals(BOM_UTF8)) {
    return { encoding: 'utf-8', confidence: 1.0 }
  }
  if (buffer.length >= 2 && buffer.subarray(0, 2).equals(BOM_UTF16LE)) {
    return { encoding: 'utf-16le', confidence: 1.0 }
  }
  if (buffer.length >= 2 && buffer.subarray(0, 2).equals(BOM_UTF16BE)) {
    return { encoding: 'utf-16be', confidence: 1.0 }
  }

  // 2. 试解码评分
  let best: EncodingResult = { encoding: 'utf-8', confidence: 0 }

  for (const enc of CANDIDATES) {
    const score = scoreEncoding(buffer, enc)
    if (score > best.confidence) {
      best = { encoding: enc, confidence: score }
    }
  }

  return best
}

/**
 * 对单个编码进行评分。
 * 返回 0~1 的置信度。
 */
function scoreEncoding(buffer: Buffer, encoding: string): number {
  let decoder: TextDecoder
  try {
    decoder = new TextDecoder(encoding, { fatal: false })
  } catch {
    return 0 // TextDecoder 不支持该编码
  }

  let decoded: string
  try {
    decoded = decoder.decode(buffer)
  } catch {
    return 0
  }

  if (decoded.length === 0) return 0

  // 统计替换字符和可打印字符
  let replacementCount = 0
  let printableCount = 0
  const sampleSize = Math.min(decoded.length, 10000) // 采样前 10000 字符

  for (let i = 0; i < sampleSize; i++) {
    const code = decoded.charCodeAt(i)
    if (code === 0xfffd) {
      replacementCount++
    }
    // 可打印字符：ASCII 可打印 + 常见 CJK 范围
    if (
      (code >= 0x20 && code <= 0x7e) || // ASCII 可打印
      (code >= 0x4e00 && code <= 0x9fff) || // CJK 统一汉字
      (code >= 0x3000 && code <= 0x30ff) || // CJK 标点和假名
      (code === 0x0a || code === 0x0d) // 换行
    ) {
      printableCount++
    }
  }

  const replacementRatio = replacementCount / sampleSize
  const printableRatio = printableCount / sampleSize

  // 置信度 = 可打印比例 - 替换字符惩罚
  const confidence = Math.max(0, printableRatio - replacementRatio * 10)

  // UTF-8 对替换字符更严格（fatal: true 时会抛错），给少量替换更重惩罚
  if (encoding === 'utf-8' && replacementCount > 0) {
    return confidence * 0.3
  }

  return confidence
}

/**
 * 从 Buffer 解码文本，自动检测编码或使用指定编码。
 *
 * @param buffer 原始字节
 * @param encodingOverride 强制使用指定编码（跳过自动检测）
 * @returns 解码后的文本
 */
export function decodeBuffer(buffer: Buffer, encodingOverride?: string): string {
  // 如果有 BOM，去除 BOM 后解码
  if (buffer.length >= 3 && buffer.subarray(0, 3).equals(BOM_UTF8)) {
    return new TextDecoder('utf-8').decode(buffer.subarray(3))
  }
  if (buffer.length >= 2 && buffer.subarray(0, 2).equals(BOM_UTF16LE)) {
    return new TextDecoder('utf-16le').decode(buffer.subarray(2))
  }
  if (buffer.length >= 2 && buffer.subarray(0, 2).equals(BOM_UTF16BE)) {
    return new TextDecoder('utf-16be').decode(buffer.subarray(2))
  }

  const encoding = encodingOverride ?? detectEncoding(buffer).encoding
  return new TextDecoder(encoding).decode(buffer)
}
