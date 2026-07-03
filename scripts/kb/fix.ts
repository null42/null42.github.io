import fs from 'node:fs/promises'
import { scanMarkdownFiles, writeCompletedFrontmatter } from './articles'
import { inferPathDefaults } from './path-defaults'
import { serializeMarkdown } from './frontmatter'
import type { ArticleFrontmatter } from './types'

const changed = await writeCompletedFrontmatter()
const normalized = await normalizeKnowledgeDefaults()
const sanitized = await normalizeLocalFileLinks()
if (changed.length === 0 && normalized.length === 0 && sanitized.length === 0) {
  console.log('no frontmatter changes needed')
} else {
  console.log(`updated frontmatter in ${changed.length} files:`)
  for (const file of changed) console.log(`- ${file}`)
  console.log(`normalized knowledge metadata in ${normalized.length} files:`)
  for (const file of normalized) console.log(`- ${file}`)
  console.log(`removed local file links in ${sanitized.length} files:`)
  for (const file of sanitized) console.log(`- ${file}`)
}

async function normalizeKnowledgeDefaults(): Promise<string[]> {
  const records = await scanMarkdownFiles({ includeHidden: true })
  const normalized: string[] = []

  for (const record of records) {
    const defaults = inferPathDefaults(record.relativePath)
    if (!defaults.source || !['motor', 'power'].includes(String(defaults.source))) continue
    const next: ArticleFrontmatter = { ...record.data }
    let changed = false
    for (const key of ['section', 'chapter', 'chapterTitle', 'chapterOrder', 'navGroup', 'navGroupOrder', 'category', 'source', 'visibility'] as const) {
      const value = defaults[key]
      if (value !== undefined && next[key] !== value) {
        next[key] = value as never
        changed = true
      }
    }
    if (!changed) continue
    await fs.writeFile(record.absolutePath, serializeMarkdown(next, record.body), 'utf8')
    normalized.push(record.relativePath)
  }

  return normalized
}

async function normalizeLocalFileLinks(): Promise<string[]> {
  const records = await scanMarkdownFiles({ includeHidden: true })
  const sanitized: string[] = []

  for (const record of records) {
    const nextBody = sanitizeMarkdownLocalFileLinks(record.body)
    if (nextBody === record.body) continue
    await fs.writeFile(record.absolutePath, serializeMarkdown(record.data, nextBody), 'utf8')
    sanitized.push(record.relativePath)
  }

  return sanitized
}

function sanitizeMarkdownLocalFileLinks(body: string): string {
  return body
    .replace(/\[([^\]]+)]\(file:\/\/\/[^)\s]+(?:\s+"[^"]*")?\)/g, '`$1`')
    .replace(/file:\/\/\/[^\s)]+/g, '`local source file`')
}
