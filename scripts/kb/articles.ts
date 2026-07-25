import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { loadInheritedCategoryDefaults } from './category'
import { columnDefaultsForPath, columnIdFromPath, loadColumnRegistry } from './columns'
import type { ColumnConfig } from './columns'
import { normalizeArticle } from './domain/normalize-article'
import { shouldExcludeContentPath } from './content-exclusions'
import { completeArticleData, normalizeDate, parseMarkdown, serializeMarkdown } from './frontmatter'
import { inferPathDefaults } from './path-defaults'
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
  column?: ColumnConfig
}

export async function scanMarkdownFiles(options: ScanOptions = {}): Promise<MarkdownFileRecord[]> {
  return (await scanMarkdownSourceFiles(options)).filter((record) => !shouldExcludeContentPath(record.relativePath))
}

export async function scanMarkdownSourceFiles(options: ScanOptions = {}): Promise<MarkdownFileRecord[]> {
  const root = options.contentRoot || defaultContentRoot
  const resolvedRoot = path.resolve(root)
  if ((await fs.lstat(resolvedRoot)).isSymbolicLink()) throw new Error(`Content root must not be a symbolic link: ${resolvedRoot}`)
  const realRoot = await fs.realpath(resolvedRoot)
  const shouldInferPathDefaults = path.resolve(root) === path.resolve(defaultContentRoot)
  const columnRegistry = await loadColumnRegistry({ contentRoot: root })
  const files = await fg('**/*.md', {
    cwd: root,
    absolute: true,
    followSymbolicLinks: false,
    ignore: ['**/node_modules/**']
  })

  const records: MarkdownFileRecord[] = []
  for (const absolutePath of files.sort()) {
    const sourceStats = await fs.lstat(absolutePath)
    if (sourceStats.isSymbolicLink()) throw new Error(`Markdown source must not be a symbolic link: ${absolutePath}`)
    const realSource = await fs.realpath(absolutePath)
    const relativeRealSource = path.relative(realRoot, realSource)
    if (relativeRealSource === '..' || relativeRealSource.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRealSource)) {
      throw new Error(`Markdown source escaped content root: ${absolutePath}`)
    }
    const relativePath = toPosixPath(path.relative(path.dirname(root), absolutePath))
    const raw = await fs.readFile(absolutePath, 'utf8')
    const parsed = parseMarkdown(raw)
    const modifiedDate = sourceStats.mtime.toISOString().slice(0, 10)
    const directoryDefaults = await loadInheritedCategoryDefaults(absolutePath, root)
    const pathDefaults = shouldInferPathDefaults ? inferPathDefaults(relativePath) : {}
    const columnDefaults = shouldInferPathDefaults ? columnDefaultsForPath(columnRegistry, relativePath) : {}
    const defaults = {
      ...pathDefaults,
      ...directoryDefaults,
      ...columnDefaults,
      defaultTags: columnDefaults.defaultTags || directoryDefaults.defaultTags || pathDefaults.defaultTags,
      tags: columnDefaults.tags || directoryDefaults.tags || pathDefaults.tags,
      visibility: columnDefaults.visibility || directoryDefaults.visibility || pathDefaults.visibility
    }
    const completed = completeArticleData(parsed.data, defaults, {
      body: parsed.body,
      relativePath,
      modifiedDate
    })

    records.push({
      absolutePath,
      relativePath,
      data: parsed.data,
      completed,
      body: parsed.body,
      warnings: validateArticle(relativePath, completed),
      column: columnRegistry.columns.find((column) => column.id === columnIdFromPath(relativePath))
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
    const slug = stripMarkdownExtension(toPosixPath(path.relative(root, record.absolutePath)))
    let canonical
    try {
      canonical = normalizeArticle(record.completed, {
        sourcePath: record.relativePath,
        slug,
        column: record.column,
        orderWasExplicit: finiteNumber(record.data.order) !== undefined,
      })
    } catch (error) {
      throw new Error(record.relativePath + ': ' + (error as Error).message)
    }
    articles.push({
      ...canonical,
      title: String(record.completed.title),
      date: String(record.completed.date),
      updated: record.completed.updated ? String(record.completed.updated) : undefined,
      order: canonical.order,
      category: String(record.completed.category || '未分类'),
      tags: Array.isArray(record.completed.tags) ? record.completed.tags.map(String) : [],
      source: String(record.completed.source || 'manual'),
      sourcePath: canonical.sourcePath,
      type: optionalString(record.completed.type),
      difficulty: optionalString(record.completed.difficulty),
      suggestedTags: Array.isArray(record.completed.suggestedTags) ? record.completed.suggestedTags.map(String) : undefined,
      status: String(record.completed.status || 'learning'),
      visibility: canonical.visibility,
      quality: inferArticleQuality(record.completed),
      summary: normalizePublicSummary(record.completed),
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

function finiteNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value)
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
    'navGroup',
    'navGroupOrder',
    'category',
    'tags',
    'source',
    'sourcePath',
    'type',
    'difficulty',
    'suggestedTags',
    'status',
    'visibility',
    'quality',
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

function normalizePublicSummary(article: ArticleFrontmatter): string {
  const summary = String(article.summary || '').trim()
  if (isImportedSummary(summary)) {
    const title = String(article.title || '这篇文章').trim()
    return `整理自「${title}」的知识库文章，待整理为个人总结。`
  }
  return summary || String(article.title || '').trim()
}

function inferArticleQuality(article: ArticleFrontmatter): string {
  const explicit = optionalString(article.quality)
  if (explicit) return explicit

  const summary = String(article.summary || '')
  const status = String(article.status || '').toLowerCase()
  const source = String(article.source || '').toLowerCase()
  const tags = Array.isArray(article.tags) ? article.tags.map((tag) => String(tag).toLowerCase()) : []

  if (isImportedSummary(summary)) return 'needsRewrite'
  if (status === 'draft') return 'draft'
  if (tags.includes('imported') || article.sourcePath || (source && source !== 'manual')) return 'imported'
  return 'curated'
}

function isImportedSummary(summary: string): boolean {
  return /^Imported from\b/i.test(summary.trim())
}
