/**
 * TXT 文本切片器：按字节边界 + 段落对齐
 *
 * 策略：
 * 1. 用 TextEncoder 将文本转为 UTF-8 字节
 * 2. 在目标位置（256 KiB）附近回溯到最近段落边界（\n\n 或 \n）
 * 3. 确保段大小在 [minBytes, maxBytes] 范围内（末段除外）
 */

export interface SliceOptions {
  /** 目标段大小（UTF-8 字节），默认 256 KiB */
  targetBytes?: number
  /** 段大小下限（字节），默认 64 KiB */
  minBytes?: number
  /** 段大小上限（字节），默认 1 MiB */
  maxBytes?: number
}

export interface TxtSegment {
  /** 段文本 */
  text: string
  /** UTF-8 字节大小 */
  byteLength: number
  /** 段起始字符偏移 */
  charOffset: number
}

const DEFAULT_TARGET = 256 * 1024 // 256 KiB
const DEFAULT_MIN = 64 * 1024 // 64 KiB
const DEFAULT_MAX = 1024 * 1024 // 1 MiB

/**
 * 将文本按段落边界切片。
 *
 * @param text 完整文本
 * @param options 切片选项
 * @returns 段数组
 */
export function sliceTxt(text: string, options: SliceOptions = {}): TxtSegment[] {
  const targetBytes = options.targetBytes ?? DEFAULT_TARGET
  const minBytes = options.minBytes ?? DEFAULT_MIN
  const maxBytes = options.maxBytes ?? DEFAULT_MAX

  if (text.length === 0) return []

  const encoder = new TextEncoder()
  const fullBytes = encoder.encode(text)

  // 如果总大小不超过 minBytes，返回单段
  if (fullBytes.length <= minBytes) {
    return [{ text, byteLength: fullBytes.length, charOffset: 0 }]
  }

  const segments: TxtSegment[] = []
  let charCursor = 0

  while (charCursor < text.length) {
    const remaining = text.length - charCursor
    const segmentStart = charCursor

    // 估算目标位置对应的字符偏移
    // UTF-8 平均每字符 1~3 字节，用当前段的字节/字符比估算
    const estimatedChars = Math.ceil(targetBytes / Math.max(1, fullBytes.length / text.length))
    let targetCharEnd = Math.min(text.length, segmentStart + estimatedChars)

    // 确保不超过 maxBytes
    const maxCharEnd = findCharBoundary(text, segmentStart, maxBytes, encoder)
    if (maxCharEnd <= segmentStart) {
      // 单段就超过 maxBytes，强制在 maxBytes 处切断
      targetCharEnd = segmentStart + 1
    } else if (targetCharEnd > maxCharEnd) {
      targetCharEnd = maxCharEnd
    }

    // 在目标位置附近回溯到段落边界
    const segmentEnd = findParagraphBoundary(text, segmentStart, targetCharEnd, minBytes)

    const segmentText = text.slice(segmentStart, segmentEnd)
    const segmentBytes = encoder.encode(segmentText)

    segments.push({
      text: segmentText,
      byteLength: segmentBytes.length,
      charOffset: segmentStart
    })

    charCursor = segmentEnd
  }

  return segments
}

/**
 * 找到不超过 maxBytes 的字符边界。
 */
function findCharBoundary(
  text: string,
  start: number,
  maxBytes: number,
  encoder: TextEncoder
): number {
  let lo = start
  let hi = text.length
  // 二分搜索最大的字符偏移，使段字节不超过 maxBytes
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2)
    const slice = text.slice(start, mid)
    const bytes = encoder.encode(slice).length
    if (bytes <= maxBytes) {
      lo = mid
    } else {
      hi = mid - 1
    }
  }
  return lo
}

/**
 * 在 targetEnd 附近回溯到最近的段落边界。
 *
 * 优先找 \n\n（空行），其次 \n（换行）。
 * 如果回溯后段大小小于 minBytes，则前进到下一个段落边界。
 */
function findParagraphBoundary(
  text: string,
  start: number,
  targetEnd: number,
  minBytes: number
): number {
  // 如果到文本末尾了，直接返回
  if (targetEnd >= text.length) return text.length

  // 从 targetEnd 向前找 \n\n
  let boundary = findLastIndexOf(text, '\n\n', start, targetEnd)
  if (boundary > start) {
    // 检查段大小是否 >= minBytes
    const segmentText = text.slice(start, boundary)
    if (new TextEncoder().encode(segmentText).length >= minBytes) {
      return boundary + 2 // 跳过 \n\n
    }
  }

  // 回溯到 \n
  boundary = findLastIndexOf(text, '\n', start, targetEnd)
  if (boundary > start) {
    const segmentText = text.slice(start, boundary)
    if (new TextEncoder().encode(segmentText).length >= minBytes) {
      return boundary + 1 // 跳过 \n
    }
  }

  // 无法在段落边界切分且满足 minBytes，用 targetEnd
  return targetEnd
}

/**
 * 在 [start, end) 范围内查找 needle 最后出现的位置。
 */
function findLastIndexOf(
  text: string,
  needle: string,
  start: number,
  end: number
): number {
  const searchEnd = Math.min(end, text.length)
  const slice = text.slice(start, searchEnd)
  const idx = slice.lastIndexOf(needle)
  return idx === -1 ? -1 : start + idx
}
