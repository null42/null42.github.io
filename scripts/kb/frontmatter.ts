import matter from 'gray-matter'
import YAML from 'yaml'
import type { ArticleFrontmatter, CategoryDefaults, CompletionContext } from './types'

export interface ParsedMarkdown {
  data: ArticleFrontmatter
  body: string
}

type CompletedArticleFrontmatter = Required<
  Pick<ArticleFrontmatter, 'title' | 'date' | 'category' | 'tags' | 'source' | 'status' | 'visibility' | 'summary'>
> &
  ArticleFrontmatter

export function parseMarkdown(input: string): ParsedMarkdown {
  const parsed = matter(input)
  return {
    data: parsed.data as ArticleFrontmatter,
    body: parsed.content.replace(/^\r?\n/, '')
  }
}

export function extractTitleFromMarkdown(body: string): string | undefined {
  const heading = body.match(/^#\s+(.+)$/m)
  return heading?.[1]?.trim()
}

export function sourceFromPath(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/')
  const parts = normalized.split('/')
  const contentIndex = parts.indexOf('content')
  return parts[contentIndex + 1] || parts[0] || 'manual'
}

export function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean)
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  }
  return []
}

export function completeArticleData(
  fileData: ArticleFrontmatter,
  directoryDefaults: Partial<CategoryDefaults>,
  context: CompletionContext
): CompletedArticleFrontmatter {
  const tags = normalizeTags(fileData.tags)
  const defaultTags = normalizeTags(directoryDefaults.defaultTags ?? directoryDefaults.tags)
  const title =
    fileData.title ||
    (typeof directoryDefaults.title === 'string' ? directoryDefaults.title : undefined) ||
    extractTitleFromMarkdown(context.body) ||
    filenameTitle(context.relativePath)
  const category = fileData.category || directoryDefaults.category || '未分类'
  const source = fileData.source || directoryDefaults.source || sourceFromPath(context.relativePath)
  const summary = fileData.summary || firstParagraph(context.body) || title

  return {
    ...directoryDefaults,
    ...fileData,
    title,
    date: fileData.date || context.modifiedDate,
    category,
    tags: tags.length > 0 ? tags : defaultTags,
    source,
    status: fileData.status || 'learning',
    visibility: fileData.visibility || directoryDefaults.visibility || 'public',
    summary
  }
}

export function serializeMarkdown(data: ArticleFrontmatter, body: string): string {
  const yaml = YAML.stringify(data, {
    lineWidth: 0,
    defaultStringType: 'PLAIN'
  }).trim()
  return `---\n${yaml}\n---\n\n${body.replace(/^\r?\n/, '')}`
}

function filenameTitle(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/')
  const filename = normalized.split('/').pop() || 'untitled'
  return filename.replace(/\.md$/i, '').replace(/[-_]+/g, ' ')
}

function firstParagraph(body: string): string | undefined {
  const withoutHeading = body.replace(/^#\s+.+$/m, '').trim()
  const paragraph = withoutHeading
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find(Boolean)
  return paragraph?.replace(/\s+/g, ' ').slice(0, 160)
}
