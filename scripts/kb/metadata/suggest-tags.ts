import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanMarkdownFiles, type MarkdownFileRecord } from '../articles'
import { tokenize } from '../search/tokenize'

export interface TagSuggestionEntry {
  path: string
  title: string
  tags: string[]
  suggestedTags: string[]
}

const common = new Set([
  'body',
  'note',
  'summary',
  'imported',
  'from',
  'this',
  'that',
  'with',
  '使用',
  '可以',
  '这个',
  '需要',
  '进行',
  '通过',
  '一个',
  '系统',
  '这个系统可以使用',
  '可以使',
  '以使用',
  '采样需要稳定',
  '需要稳',
  '要稳定'
])

export function suggestTagsForText(text: string, limit = 8): string[] {
  const counts = new Map<string, number>()
  for (const token of tokenize(text)) {
    if (common.has(token) || token.length < 2 || isNoisyChineseFragment(token)) continue
    counts.set(token, (counts.get(token) || 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => scoreToken(b) - scoreToken(a) || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([token]) => token)
}

function scoreToken([token, count]: [string, number]): number {
  let score = count * 10
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(token)) score += 8
  if (/^[a-z]{2,6}$/.test(token)) score += 6
  if (token.includes('-')) score += 5
  if (/[\u4e00-\u9fff]/.test(token) && token.length >= 2 && token.length <= 4) score += 3
  if (/[\u4e00-\u9fff]/.test(token) && token.length > 4) score -= 8
  return score
}

function isNoisyChineseFragment(token: string): boolean {
  if (!/[\u4e00-\u9fff]/.test(token)) return false
  if (token.length > 4) return true
  return /[这个可以使用需要进行通过系统]/.test(token) && !['电流环', '采样'].includes(token)
}

export function buildTagSuggestionReport(records: Array<Pick<MarkdownFileRecord, 'relativePath' | 'completed' | 'body'>>): TagSuggestionEntry[] {
  return records.map((record) => {
    const tags = Array.isArray(record.completed.tags) ? record.completed.tags.map(String) : []
    const manual = new Set(tags.map((tag) => tag.toLowerCase()))
    const suggestedTags = suggestTagsForText(record.body).filter((tag) => !manual.has(tag.toLowerCase()))
    return {
      path: record.relativePath,
      title: String(record.completed.title || record.relativePath),
      tags,
      suggestedTags
    }
  })
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  const records = await scanMarkdownFiles()
  const report = buildTagSuggestionReport(records)
  await fs.mkdir('.vitepress/generated', { recursive: true })
  await fs.writeFile('.vitepress/generated/tag-suggestions.json', JSON.stringify(report, null, 2), 'utf8')
  console.log(`generated tag suggestions for ${report.length} files`)
}
