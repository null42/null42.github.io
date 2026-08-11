import { describe, it, expect } from 'vitest'
import { sliceTxt } from '../../../scripts/kb/private-reader/txt-slicer'
import { extractTxtChapters } from '../../../scripts/kb/private-reader/txt-chapters'

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

describe('txt chapter extraction', () => {
  it('keeps only a compact chapter title when body text follows on the same line', () => {
    const text = '\u7b2c1\u7ae0 \u535a\u8d8a \u535a\u8d8a\uff0c\u4f60\u600e\u4e48\u4e0d\u548c\u5176\u4ed6\u5c0f\u670b\u53cb\u4e00\u8d77\u73a9\u3002\u592a\u5e7c\u7a1a\u4e86\u3002\n\u6b63\u6587\u7ee7\u7eed\u3002'
    const segments = sliceTxt(text)
    expect(extractTxtChapters(text, segments)).toEqual([
      { title: '\u7b2c1\u7ae0 \u535a\u8d8a', charOffset: 0, segmentIndex: 0 },
    ])
  })

  it('maps chapter headings to their containing segments', () => {
    const first = `\u7b2c1\u7ae0 \u5f00\u59cb\n${'\u7532'.repeat(200)}\n\n`
    const second = `\u7b2c2\u7ae0 \u7ee7\u7eed\n${'\u4e59'.repeat(200)}`
    const text = first + second
    const segments = sliceTxt(text, { targetBytes: 220, minBytes: 100, maxBytes: 300 })
    const chapters = extractTxtChapters(text, segments)
    expect(chapters.map(chapter => chapter.title)).toEqual(['\u7b2c1\u7ae0 \u5f00\u59cb', '\u7b2c2\u7ae0 \u7ee7\u7eed'])
    expect(chapters[1].segmentIndex).toBeGreaterThanOrEqual(chapters[0].segmentIndex)
  })
})
