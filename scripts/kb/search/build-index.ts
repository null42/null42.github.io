import type { ArticleRecord } from '../types'
import { makeSnippet } from './snippets'
import { tokenize } from './tokenize'

export interface SearchRecord {
  title: string
  url: string
  date: string
  month: string
  section?: string
  navGroup?: string
  navGroupOrder?: number
  chapter?: string
  chapterTitle?: string
  category: string
  tags: string[]
  source: string
  status: string
  type?: string
  quality?: string
  summary: string
  body: string
  headings: SearchHeading[]
  tokens: string[]
}

export interface SearchHeading {
  text: string
  anchor: string
  offset: number
}

export interface SearchFilters {
  section?: string
  navGroup?: string
  chapter?: string
  tag?: string
  month?: string
  status?: string
  type?: string
}

export interface SearchResult {
  record: SearchRecord
  score: number
  snippet: string
  url: string
  anchor?: string
  matchReason: string
}

export function buildSearchIndex(articles: ArticleRecord[]): SearchRecord[] {
  return articles
    .filter((article) => article.visibility === 'public')
    .map((article) => {
      const fullBody = compactText(article.body)
      const body = excerptText(fullBody)
      const summary = normalizePublicSummary(article)
      const quality = inferArticleQuality(article)
      const headings = extractHeadings(article.body)
      const text = [
        article.title,
        article.section,
        article.chapter,
        article.chapterTitle,
        article.category,
        ...article.tags,
        summary,
        ...headings.map((heading) => heading.text),
        fullBody
      ].join(' ')
      return {
        title: article.title,
        url: article.url,
        date: article.date,
        month: article.date.slice(0, 7),
        section: article.section,
        navGroup: article.navGroup,
        navGroupOrder: article.navGroupOrder,
        chapter: article.chapter,
        chapterTitle: article.chapterTitle,
        category: article.category,
        tags: article.tags,
        source: article.source,
        status: article.status,
        type: article.type,
        quality,
        summary,
        body,
        headings,
        tokens: tokenize(text)
      }
    })
}

export function searchRecords(records: SearchRecord[], query: string, filters: SearchFilters = {}): SearchResult[] {
  const needle = query.trim()
  return records
    .filter((record) => matchesFilters(record, filters))
    .map((record) => {
      const anchor = findBestAnchor(record, needle)
      return {
        record,
        score: scoreRecord(record, needle),
        snippet: makeSnippet(record, needle),
        url: anchor ? `${record.url}#${anchor.anchor}` : record.url,
        anchor: anchor?.anchor,
        matchReason: describeMatch(record, needle, anchor)
      }
    })
    .filter((result) => !needle || result.score > 0)
    .sort((a, b) => b.score - a.score || b.record.date.localeCompare(a.record.date) || a.record.title.localeCompare(b.record.title))
}

export function assertSearchIndexWithinBudget(records: SearchRecord[], maxBytes = 7_500_000): void {
  const bytes = Buffer.byteLength(JSON.stringify(records), 'utf8')
  if (bytes > maxBytes) {
    throw new Error(`search index is too large: ${bytes} bytes exceeds ${maxBytes} bytes`)
  }
}

function scoreRecord(record: SearchRecord, query: string): number {
  if (!query) return 1 + qualityScore(record.quality)
  const lower = query.toLowerCase()
  let score = 0
  if (record.title.toLowerCase().includes(lower)) score += 120
  if (record.tags.some((tag) => tag.toLowerCase().includes(lower))) score += 80
  if ((record.section || '').toLowerCase().includes(lower) || (record.chapterTitle || record.chapter || '').toLowerCase().includes(lower)) score += 50
  if (record.headings.some((heading) => heading.text.toLowerCase().includes(lower))) score += 45
  if (record.summary.toLowerCase().includes(lower)) score += 35
  if (record.body.toLowerCase().includes(lower)) score += 10
  if (record.tokens.includes(lower)) score += 8
  return score + qualityScore(record.quality)
}

function matchesFilters(record: SearchRecord, filters: SearchFilters): boolean {
  if (filters.section && record.section !== filters.section) return false
  if (filters.navGroup && record.navGroup !== filters.navGroup) return false
  if (filters.chapter && record.chapter !== filters.chapter && record.chapterTitle !== filters.chapter) return false
  if (filters.tag && !record.tags.includes(filters.tag)) return false
  if (filters.month && record.month !== filters.month) return false
  if (filters.status && record.status !== filters.status) return false
  if (filters.type && record.type !== filters.type) return false
  return true
}

function compactText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function excerptText(value: string, maxChars = 2400): string {
  if (value.length <= maxChars) return value
  const head = value.slice(0, Math.floor(maxChars * 0.7)).trim()
  const tail = value.slice(-Math.floor(maxChars * 0.25)).trim()
  return `${head} ... ${tail}`
}

function normalizePublicSummary(article: ArticleRecord): string {
  const summary = compactText(article.summary || '')
  if (/^Imported from\b/i.test(summary)) {
    return `整理自「${article.title}」的知识库文章，待整理为个人总结。`
  }
  return summary || article.title
}

function inferArticleQuality(article: ArticleRecord): string {
  if (article.quality) return article.quality
  if (/^Imported from\b/i.test(article.summary || '')) return 'needsRewrite'
  if (article.status.toLowerCase() === 'draft') return 'draft'
  if (article.tags.map((tag) => tag.toLowerCase()).includes('imported') || article.sourcePath || article.source !== 'manual') {
    return 'imported'
  }
  return 'curated'
}

function extractHeadings(markdown: string): SearchHeading[] {
  const headings: SearchHeading[] = []
  const headingPattern = /^(#{1,6})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = headingPattern.exec(markdown))) {
    const text = cleanHeadingText(match[2])
    if (!text) continue
    headings.push({
      text,
      anchor: slugifyHeading(text),
      offset: match.index
    })
  }
  return headings
}

function cleanHeadingText(value: string): string {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#+$/, '')
    .trim()
}

function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\\`*_{}\[\]()#+.!?。！？、，,;:：；'"“”‘’<>|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function findBestAnchor(record: SearchRecord, query: string): SearchHeading | undefined {
  const needle = query.trim().toLowerCase()
  if (!needle) return undefined

  const headingMatch = record.headings.find((heading) => heading.text.toLowerCase().includes(needle))
  if (headingMatch) return headingMatch

  const bodyIndex = record.body.toLowerCase().indexOf(needle)
  if (bodyIndex < 0) return undefined

  return record.headings
    .filter((heading) => heading.offset <= bodyIndex)
    .sort((a, b) => b.offset - a.offset)[0]
}

function describeMatch(record: SearchRecord, query: string, anchor?: SearchHeading): string {
  const needle = query.trim().toLowerCase()
  if (!needle) return record.quality === 'needsRewrite' ? '待整理文章' : '推荐结果'
  if (record.title.toLowerCase().includes(needle)) return '标题命中'
  if (record.tags.some((tag) => tag.toLowerCase().includes(needle))) return '标签命中'
  if (anchor) return `章节命中：${anchor.text}`
  if (record.summary.toLowerCase().includes(needle)) return '摘要命中'
  if (record.body.toLowerCase().includes(needle)) return '正文命中'
  return '关键词命中'
}

function qualityScore(quality?: string): number {
  if (quality === 'curated') return 12
  if (quality === 'imported') return 2
  if (quality === 'draft') return -4
  if (quality === 'needsRewrite') return -8
  return 0
}
