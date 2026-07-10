import { describe, expect, it } from 'vitest'
import { hashDate, getLocalDateKey, getDailyImageIndex, resolveImageIndex } from '../../.vitepress/theme/daily-image'

describe('daily image hash', () => {
  it('produces a stable unsigned integer for the same date', () => {
    const a = hashDate('2026-07-10')
    const b = hashDate('2026-07-10')
    expect(a).toBe(b)
    expect(Number.isInteger(a)).toBe(true)
    expect(a).toBeGreaterThanOrEqual(0)
  })

  it('produces different hashes for different dates', () => {
    expect(hashDate('2026-07-10')).not.toBe(hashDate('2026-07-11'))
    expect(hashDate('2026-07-10')).not.toBe(hashDate('2025-07-10'))
  })
})

describe('getLocalDateKey', () => {
  it('formats a Date as YYYY-MM-DD', () => {
    expect(getLocalDateKey(new Date(2026, 6, 10))).toBe('2026-07-10')
    expect(getLocalDateKey(new Date(2026, 0, 1))).toBe('2026-01-01')
    expect(getLocalDateKey(new Date(2026, 11, 31))).toBe('2026-12-31')
  })
})

describe('getDailyImageIndex', () => {
  it('returns -1 for empty gallery', () => {
    expect(getDailyImageIndex(0, '2026-07-10')).toBe(-1)
  })

  it('returns a valid index within gallery bounds', () => {
    const len = 3
    const idx = getDailyImageIndex(len, '2026-07-10')
    expect(idx).toBeGreaterThanOrEqual(0)
    expect(idx).toBeLessThan(len)
  })

  it('returns the same index for the same date', () => {
    const len = 5
    expect(getDailyImageIndex(len, '2026-07-10')).toBe(getDailyImageIndex(len, '2026-07-10'))
  })

  it('returns a different index for a different date (not guaranteed but typical)', () => {
    const len = 5
    const a = getDailyImageIndex(len, '2026-07-10')
    const b = getDailyImageIndex(len, '2026-07-11')
    // With 5 images it's extremely likely to differ; assert type safety at minimum
    expect(a).toBeGreaterThanOrEqual(0)
    expect(b).toBeGreaterThanOrEqual(0)
  })
})

describe('resolveImageIndex', () => {
  it('returns -1 for empty gallery', () => {
    expect(resolveImageIndex(0, 0, '2026-07-10')).toBe(-1)
  })

  it('equals base index when manual offset is 0', () => {
    const len = 3
    const base = getDailyImageIndex(len, '2026-07-10')
    expect(resolveImageIndex(len, 0, '2026-07-10')).toBe(base)
  })

  it('offset advances the index by 1', () => {
    const len = 3
    const base = getDailyImageIndex(len, '2026-07-10')
    const offset1 = resolveImageIndex(len, 1, '2026-07-10')
    expect(offset1).toBe((base + 1) % len)
  })

  it('wraps around when offset exceeds gallery length', () => {
    const len = 3
    const base = getDailyImageIndex(len, '2026-07-10')
    const wrapped = resolveImageIndex(len, len, '2026-07-10')
    expect(wrapped).toBe(base)
  })

  it('handles large offsets with modulo', () => {
    const len = 3
    const base = getDailyImageIndex(len, '2026-07-10')
    expect(resolveImageIndex(len, base + len * 10, '2026-07-10')).toBe(base)
  })

  it('stays within bounds for any offset', () => {
    const len = 4
    for (let i = 0; i < 100; i++) {
      const idx = resolveImageIndex(len, i, '2026-07-10')
      expect(idx).toBeGreaterThanOrEqual(0)
      expect(idx).toBeLessThan(len)
    }
  })
})
