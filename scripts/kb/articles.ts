import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { loadInheritedCategoryDefaults } from './category'
import { nonPublicContentPatterns, shouldExcludeContentPath } from './content-exclusions'
import { completeArticleData, normalizeDate, parseMarkdown, serializeMarkdown } from './frontmatter'
import { contentRoot as defaultContentRoot, stripMarkdownExtension, toPosixPath } from './paths'
import type { ArticleFrontmatter, ArticleRecord } from './types'

export interface ScanOptions {
  contentRoot?: string
  includeHidden?: boolean
}

export interface ScanResult {
  articles: ArticleRecord[]
  warnings: string[]
}

export interface MarkdownFileRecord {
  absolutePath: string
  relativePath: string
  data: ArticleFrontmatter
  completed: ArticleFrontmatter
  body: string
  warnings: string[]
}

export async function scanMarkdownFiles(options: ScanOptions = {}): Promise<MarkdownFileRecord[]> {
  const root = options.contentRoot || defaultContentRoot
  const files = await fg('**/*.md', {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**', ...nonPublicContentPatterns.map((pattern) => pattern.replace(/^content\//, ''))]
  })

  const records: MarkdownFileRecord[] = []
  for (const absolutePath of files.sort()) {
    const relativePath = toPosixPath(path.relative(path.dirname(root), absolutePath))
    const raw = await fs.readFile(absolutePath, 'utf8')
    const parsed = parseMarkdown(raw)
    const stats = await fs.stat(absolutePath)
    const modifiedDate = stats.mtime.toISOString().slice(0, 10)
    const defaults = await loadInheritedCategoryDefaults(absolutePath, root)
    const completed = completeArticleData(parsed.data, defaults, {
      body: parsed.body,
      relativePath,
      modifiedDate
    })

    if (shouldExcludeContentPath(relativePath)) continue

    records.push({
      absolutePath,
      relativePath,
      data: parsed.data,
      completed,
      body: parsed.body,
      warnings: validateArticle(relativePath, completed)
    })
  }

  return records
}

export async function scanArticles(options: ScanOptions = {}): Promise<ScanResult> {
  const root = options.contentRoot || defaultContentRoot
  const records = await scanMarkdownFiles({ ...options, contentRoot: root })
  const warnings: string[] = []
  const articles: ArticleRecord[] = []

  for (const record of records) {
    warnings.push(...record.warnings)
    if (record.completed.visibility === 'private') {
      warnings.push(`${record.relativePath}: skipped because visibility is private`)
      continue
    }
    if (record.completed.visibility === 'encrypted') {
      warnings.push(`${record.relativePath}: skipped because visibility is encrypted`)
      continue
    }
    if (record.completed.visibility === 'hidden' && !options.includeHidden) {
      warnings.push(`${record.relativePath}: skipped because visibility is hidden`)
      continue
    }

    const url = '/content/' + stripMarkdownExtension(toPosixPath(path.relative(root, record.absolutePath))) + '.html'
    articles.push({
      title: String(record.completed.title),
      date: String(record.completed.date),
      updated: record.completed.updated ? String(record.completed.updated) : undefined,
      section: optionalString(record.completed.section),
      chapter: optionalString(record.completed.chapter),
      chapterTitle: optionalString(record.completed.chapterTitle),
      chapterOrder: optionalNumber(record.completed.chapterOrder),
      order: optionalNumber(record.completed.order),
      category: String(record.completed.category || '未分类'),
      tags: Array.isArray(record.completed.tags) ? record.completed.tags.map(String) : [],
      source: String(record.completed.source || 'manual'),
      sourcePath: optionalString(record.completed.sourcePath),
      type: optionalString(record.completed.type),
      difficulty: optionalString(record.completed.difficulty),
      suggestedTags: Array.isArray(record.completed.suggestedTags) ? record.completed.suggestedTags.map(String) : undefined,
      status: String(record.completed.status || 'learning'),
      visibility: String(record.completed.visibility || 'public'),
      summary: String(record.completed.summary || record.completed.title),
      path: record.relativePath,
      url,
      body: record.body
    })

    if (/<script\b/i.test(record.body)) {
      warnings.push(`${record.relativePath}: raw <script> tags are not allowed`)
    }
  }

  articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  return { articles, warnings }
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function optionalNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

export async function writeCompletedFrontmatter(options: ScanOptions = {}): Promise<string[]> {
  const records = await scanMarkdownFiles(options)
  const changed: string[] = []

  for (const record of records) {
    const normalizedExisting = normalizeWritableFields(record.data)
    const missing = pickMissing(normalizedExisting, record.completed)
    const nextData = { ...normalizedExisting, ...missing }
    if (JSON.stringify(nextData) === JSON.stringify(record.data)) continue
    const next = serializeMarkdown(nextData, record.body)
    await fs.writeFile(record.absolutePath, next, 'utf8')
    changed.push(record.relativePath)
  }

  return changed
}

function normalizeWritableFields(data: ArticleFrontmatter): ArticleFrontmatter {
  return {
    ...data,
    date: normalizeDate(data.date) || data.date,
    updated: normalizeDate(data.updated) || data.updated
  }
}

function pickMissing(existing: ArticleFrontmatter, completed: ArticleFrontmatter): ArticleFrontmatter {
  const writableFields = new Set([
    'title',
    'date',
    'updated',
    'section',
    'chapter',
    'chapterTitle',
    'chapterOrder',
    'category',
    'tags',
    'source',
    'sourcePath',
    'type',
    'difficulty',
    'suggestedTags',
    'status',
    'visibility',
    'summary',
    'comments'
  ])
  const missing: ArticleFrontmatter = {}
  for (const [key, value] of Object.entries(completed)) {
    if (writableFields.has(key) && existing[key] === undefined) missing[key] = value
  }
  return missing
}

function validateArticle(relativePath: string, article: ArticleFrontmatter): string[] {
  const warnings: string[] = []
  if (!article.title) warnings.push(`${relativePath}: missing title`)
  if (!article.date) warnings.push(`${relativePath}: missing date`)
  if (!article.summary) warnings.push(`${relativePath}: missing summary`)
  if (!article.category || article.category === '未分类') warnings.push(`${relativePath}: categorized as 未分类`)
  return warnings
}
