import type { SearchRecord } from './build-index'

export function makeSnippet(record: SearchRecord, query: string, radius = 64): string {
  const needle = query.trim()
  const source = cleanSnippetSource(record.body || record.summary || record.title)
  const summary = cleanSnippetSource(record.summary)
  if (!needle) return escapeHtml(summary || source.slice(0, radius * 2))

  const lowerSource = source.toLowerCase()
  const lowerNeedle = needle.toLowerCase()
  const index = lowerSource.indexOf(lowerNeedle)
  if (index < 0) return escapeHtml(summary || source.slice(0, radius * 2))

  const start = Math.max(0, index - radius)
  const end = Math.min(source.length, index + needle.length + radius)
  const prefix = start > 0 ? '...' : ''
  const suffix = end < source.length ? '...' : ''
  const excerpt = source.slice(start, end)

  return `${prefix}${highlight(escapeHtml(excerpt), escapeHtml(needle))}${suffix}`
}

function cleanSnippetSource(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$1')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$1')
    .replace(/\$([^$\n]+)\$/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function highlight(html: string, needle: string): string {
  const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return html.replace(new RegExp(escapedNeedle, 'gi'), (match) => `<mark>${match}</mark>`)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
