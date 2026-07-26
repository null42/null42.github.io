import { describe, it, expect } from 'vitest'
import { sliceTxt } from '../../../scripts/kb/private-reader/txt-slicer'

describe('txt slicer', () => {
  it('returns single segment for small text', () => {
    const text = 'Hello, world!\n这是短文本。'
    const segments = sliceTxt(text, { minBytes: 1024 })
    expect(segments.length).toBe(1)
    expect(segments[0].text).toBe(text)
    expect(segments[0].byteLength).toBe(Buffer.byteLength(text, 'utf-8'))
    expect(segments[0].charOffset).toBe(0)
  })

  it('returns empty array for empty text', () => {
    const segments = sliceTxt('')
    expect(segments).toEqual([])
  })

  it('slices large text into multiple segments', () => {
    // 创建 512 KiB 文本（超过默认 targetBytes 256 KiB）
    const paragraph = '这是一段用于测试切片的文本。重复内容用于填充。\n\n'
    const text = paragraph.repeat(5000) // ~500 KiB
    const segments = sliceTxt(text, { targetBytes: 64 * 1024, minBytes: 16 * 1024 })
    expect(segments.length).toBeGreaterThan(1)
  })

  it('preserves paragraph boundaries (does not split within a paragraph)', () => {
    // 创建在段落边界可切分的文本
    const para1 = 'A'.repeat(100) + '\n\n'
    const para2 = 'B'.repeat(100) + '\n\n'
    const text = (para1 + para2).repeat(100)
    const segments = sliceTxt(text, { targetBytes: 1024, minBytes: 256 })
    // 每段应该以段落内容开始，不以 \n\n 开头（除非是段落间的）
    for (const seg of segments) {
      // 段不应以 \n\n 开头（除非是第一段后的延续）
      expect(seg.text.startsWith('\n\n')).toBe(false)
    }
  })

  it('produces segments whose union equals the original text', () => {
    const paragraph = '段落内容，用于测试完整性。Repeating for size.\n\n'
    const text = paragraph.repeat(200)
    const segments = sliceTxt(text, { targetBytes: 1024, minBytes: 256 })
    const reassembled = segments.map((s) => s.text).join('')
    expect(reassembled).toBe(text)
  })

  it('respects maxBytes upper limit', () => {
    // 创建无法在段落边界切分的超长单段
    const text = 'X'.repeat(2 * 1024 * 1024) // 2 MiB，无段落边界
    const segments = sliceTxt(text, { targetBytes: 256 * 1024, minBytes: 64 * 1024, maxBytes: 512 * 1024 })
    for (const seg of segments) {
      // 除最后一段外，每段不超过 maxBytes
      expect(seg.byteLength).toBeLessThanOrEqual(512 * 1024 + 16) // 允许 UTF-8 编码误差
    }
  })

  it('sets correct charOffset for each segment', () => {
    const text = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.\n\n'
    const segments = sliceTxt(text, { targetBytes: 30, minBytes: 10 })
    let expectedOffset = 0
    for (const seg of segments) {
      expect(seg.charOffset).toBe(expectedOffset)
      expectedOffset += seg.text.length
    }
  })
})
