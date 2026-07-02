import type { ArticleRecord } from '../types'
import { makeSnippet } from './snippets'
import { tokenize } from './tokenize'

export interface SearchRecord {
  title: string
  url: string
  date: string
  month: string
  section?: string
  chapter?: string
  chapterTitle?: string
  category: string
  tags: string[]
  source: string
  status: string
  type?: string
  summary: string
  body: string
  tokens: string[]
}

export interface SearchFilters {
  section?: string
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
}

export function buildSearchIndex(articles: ArticleRecord[]): SearchRecord[] {
  return articles
    .filter((article) => article.visibility === 'public')
    .map((article) => {
      const body = compactText(article.body)
      const summary = compactText(article.summary)
      const text = [article.title, article.section, article.chapter, article.chapterTitle, article.category, ...article.tags, summary, body].join(' ')
      return {
        title: article.title,
        url: article.url,
        date: article.date,
        month: article.date.slice(0, 7),
        section: article.section,
        chapter: article.chapter,
        chapterTitle: article.chapterTitle,
        category: article.category,
        tags: article.tags,
        source: article.source,
        status: article.status,
        type: article.type,
        summary,
        body,
        tokens: tokenize(text)
      }
    })
}

export function searchRecords(records: SearchRecord[], query: string, filters: SearchFilters = {}): SearchResult[] {
  const needle = query.trim()
  return records
    .filter((record) => matchesFilters(record, filters))
    .map((record) => ({
      record,
      score: scoreRecord(record, needle),
      snippet: makeSnippet(record, needle)
    }))
    .filter((result) => !needle || result.score > 0)
    .sort((a, b) => b.score - a.score || b.record.date.localeCompare(a.record.date) || a.record.title.localeCompare(b.record.title))
}

export function assertSearchIndexWithinBudget(records: SearchRecord[], maxBytes = 1_500_000): void {
  const bytes = Buffer.byteLength(JSON.stringify(records), 'utf8')
  if (bytes > maxBytes) {
    throw new Error(`search index is too large: ${bytes} bytes exceeds ${maxBytes} bytes`)
  }
}

function scoreRecord(record: SearchRecord, query: string): number {
  if (!query) return 1
  const lower = query.toLowerCase()
  let score = 0
  if (record.title.toLowerCase().includes(lower)) score += 120
  if (record.tags.some((tag) => tag.toLowerCase().includes(lower))) score += 80
  if ((record.section || '').toLowerCase().includes(lower) || (record.chapterTitle || record.chapter || '').toLowerCase().includes(lower)) score += 50
  if (record.summary.toLowerCase().includes(lower)) score += 35
  if (record.body.toLowerCase().includes(lower)) score += 10
  if (record.tokens.includes(lower)) score += 8
  return score
}

function matchesFilters(record: SearchRecord, filters: SearchFilters): boolean {
  if (filters.section && record.section !== filters.section) return false
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
