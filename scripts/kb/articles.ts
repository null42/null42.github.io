import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { loadInheritedCategoryDefaults } from './category'
import { completeArticleData, parseMarkdown, serializeMarkdown } from './frontmatter'
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
    ignore: ['**/node_modules/**']
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
    if (record.completed.visibility === 'hidden' && !options.includeHidden) {
      warnings.push(`${record.relativePath}: skipped because visibility is hidden`)
      continue
    }

    const url = '/content/' + stripMarkdownExtension(toPosixPath(path.relative(root, record.absolutePath))) + '/'
    articles.push({
      title: String(record.completed.title),
      date: String(record.completed.date),
      updated: record.completed.updated ? String(record.completed.updated) : undefined,
      category: String(record.completed.category || '未分类'),
      tags: Array.isArray(record.completed.tags) ? record.completed.tags.map(String) : [],
      source: String(record.completed.source || 'manual'),
      status: String(record.completed.status || 'learning'),
      visibility: String(record.completed.visibility || 'public'),
      summary: String(record.completed.summary || record.completed.title),
      path: record.relativePath,
      url,
      body: record.body
    })
  }

  articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  return { articles, warnings }
}

export async function writeCompletedFrontmatter(options: ScanOptions = {}): Promise<string[]> {
  const records = await scanMarkdownFiles(options)
  const changed: string[] = []

  for (const record of records) {
    const missing = pickMissing(record.data, record.completed)
    if (Object.keys(missing).length === 0) continue
    const next = serializeMarkdown({ ...record.data, ...missing }, record.body)
    await fs.writeFile(record.absolutePath, next, 'utf8')
    changed.push(record.relativePath)
  }

  return changed
}

function pickMissing(existing: ArticleFrontmatter, completed: ArticleFrontmatter): ArticleFrontmatter {
  const writableFields = new Set(['title', 'date', 'updated', 'category', 'tags', 'source', 'status', 'visibility', 'summary', 'comments'])
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
