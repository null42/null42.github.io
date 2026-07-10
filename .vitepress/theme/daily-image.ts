import { kbThemeConfig } from './kb-theme'

/** 将 YYYY-MM-DD 日期字符串转换为稳定数字哈希 */
export function hashDate(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0
  }
  return hash
}

/** 获取当前本地日期，格式 YYYY-MM-DD */
export function getLocalDateKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 计算今日图片索引。
 * 同一天稳定，第二天自动变化。
 */
export function getDailyImageIndex(galleryLength: number, dateStr: string = getLocalDateKey()): number {
  if (galleryLength <= 0) return -1
  return hashDate(dateStr) % galleryLength
}

/**
 * 计算实际展示索引（今日索引 + 手动偏移，取模循环）。
 */
export function resolveImageIndex(
  galleryLength: number,
  manualOffset: number,
  dateStr: string = getLocalDateKey()
): number {
  if (galleryLength <= 0) return -1
  const base = getDailyImageIndex(galleryLength, dateStr)
  return ((base + manualOffset) % galleryLength + galleryLength) % galleryLength
}

/** 读取手动偏移量 */
export function readManualOffset(): number {
  const key = kbThemeConfig.visualMode.dailySeedKey
  if (typeof window === 'undefined') return 0
  try {
    const v = window.localStorage.getItem(key)
    return v ? Number(v) || 0 : 0
  } catch {
    return 0
  }
}

/** 写入手动偏移量 */
export function writeManualOffset(offset: number) {
  const key = kbThemeConfig.visualMode.dailySeedKey
  try {
    window.localStorage.setItem(key, String(offset))
  } catch {
    // 静默回退
  }
}
