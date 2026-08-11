import { describe, expect, it } from 'vitest'
import {
  classifyPrivateBookGroup,
  makePrivateBookSlug,
  scanPrivateBookSafety,
  selectImportCandidates,
  type ImportCandidate,
} from '../../../scripts/kb/private-reader/import-library'

function candidate(kind: 'txt' | 'epub', group: string, sizeBytes: number, hash: string): ImportCandidate {
  return {
    absolutePath: hash,
    relativePath: hash,
    kind,
    title: hash,
    group,
    sha256: hash.padEnd(64, '0'),
    sizeBytes,
  }
}

describe('private reader library import', () => {
  it('rejects explicit and minor indicators conservatively', () => {
    expect(scanPrivateBookSafety('R18 archive')).toBe('unsafe-explicit')
    expect(scanPrivateBookSafety('\u9ad8\u4e2d\u751f\u6545\u4e8b')).toBe('unsafe-minor')
    expect(scanPrivateBookSafety('\u7535\u673a\u63a7\u5236\u6559\u7a0b')).toBe('safe')
  })

  it('groups similar technical and science-fiction titles', () => {
    expect(classifyPrivateBookGroup('MATLAB \u7535\u673a\u63a7\u5236')).toBe('\u6280\u672f\u4e0e\u79d1\u666e')
    expect(classifyPrivateBookGroup('\u661f\u9645\u673a\u7532\u5192\u9669')).toBe('\u79d1\u5e7b\u4e0e\u672b\u4e16')
  })

  it('uses a stable hash-only slug', () => {
    expect(makePrivateBookSlug('txt', 'abcdef1234567890ffff')).toBe('txt-abcdef1234567890')
  })

  it('round-robins groups while enforcing limits and budget', () => {
    const items = [
      candidate('txt', 'A', 10, 'a'),
      candidate('txt', 'A', 20, 'b'),
      candidate('txt', 'B', 10, 'c'),
      candidate('epub', 'C', 10, 'd'),
    ]
    const result = selectImportCandidates(items, 2, 35)
    expect(result.selected.map(item => item.sha256[0])).toEqual(['a', 'c', 'd'])
    expect(result.selected.reduce((sum, item) => sum + item.sizeBytes, 0)).toBe(30)
  })
})
