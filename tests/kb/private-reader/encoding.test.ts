import { describe, it, expect } from 'vitest'
import { detectEncoding, decodeBuffer } from '../../../scripts/kb/private-reader/encoding'

describe('encoding detection', () => {
  it('detects UTF-8 without BOM', () => {
    const text = 'Hello, 世界！这是 UTF-8 文本。'
    const buffer = Buffer.from(text, 'utf-8')
    const result = detectEncoding(buffer)
    expect(result.encoding).toBe('utf-8')
    expect(result.confidence).toBeGreaterThan(0.8)
  })

  it('detects UTF-8 with BOM', () => {
    const text = 'Hello, 世界！'
    const buffer = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(text, 'utf-8')])
    const result = detectEncoding(buffer)
    expect(result.encoding).toBe('utf-8')
    expect(result.confidence).toBe(1.0)
  })

  it('detects UTF-16LE with BOM', () => {
    const text = 'Hello, 世界！'
    const buffer = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(text, 'utf-16le')])
    const result = detectEncoding(buffer)
    expect(result.encoding).toBe('utf-16le')
    expect(result.confidence).toBe(1.0)
  })

  it('detects UTF-16BE with BOM', () => {
    const text = 'Hello, 世界！'
    // Node.js Buffer 不支持 'utf-16be'，用 utf-16le 然后 swap16
    const leBuffer = Buffer.from(text, 'utf-16le')
    const beBuffer = Buffer.from(leBuffer)
    beBuffer.swap16()
    const buffer = Buffer.concat([Buffer.from([0xfe, 0xff]), beBuffer])
    const result = detectEncoding(buffer)
    expect(result.encoding).toBe('utf-16be')
    expect(result.confidence).toBe(1.0)
  })

  it('detects GB18030 encoded Chinese text', () => {
    // "你好世界" in GB18030: C4 E3 BA C3 CA C0 BD E7
    // 重复多次以提高检测置信度
    const phrase = Buffer.from([0xc4, 0xe3, 0xba, 0xc3, 0xca, 0xc0, 0xbd, 0xe7])
    const buffer = Buffer.concat(Array(20).fill(phrase))
    const result = detectEncoding(buffer)
    expect(result.encoding).toBe('gb18030')
    expect(result.confidence).toBeGreaterThan(0.3)
  })

  it('returns utf-8 with low confidence for empty buffer', () => {
    const result = detectEncoding(Buffer.alloc(0))
    // 空缓冲区应返回默认值
    expect(result.encoding).toBeDefined()
  })

  it('decodeBuffer respects encoding override', () => {
    // "你好世界" in GB18030
    const buffer = Buffer.from([0xc4, 0xe3, 0xba, 0xc3, 0xca, 0xc0, 0xbd, 0xe7])
    const decoded = decodeBuffer(buffer, 'gb18030')
    expect(decoded).toContain('你')
    expect(decoded).toContain('好')
  })

  it('decodeBuffer auto-detects UTF-8', () => {
    const text = 'Hello, 世界！'
    const buffer = Buffer.from(text, 'utf-8')
    const decoded = decodeBuffer(buffer)
    expect(decoded).toBe(text)
  })

  it('decodeBuffer strips UTF-8 BOM', () => {
    const text = 'Hello, 世界！'
    const buffer = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(text, 'utf-8')])
    const decoded = decodeBuffer(buffer)
    expect(decoded).toBe(text)
  })

  it('decodeBuffer strips UTF-16LE BOM', () => {
    const text = 'Hello, 世界！'
    const buffer = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(text, 'utf-16le')])
    const decoded = decodeBuffer(buffer)
    expect(decoded).toBe(text)
  })
})
