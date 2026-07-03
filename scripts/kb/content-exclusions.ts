export const nonPublicContentPatterns = [
  '**/template.md',
  'docs/handoff-*.md',
  'docs/superpowers/**',
  'content/**/docs/superpowers/**',
  'content/private/**',
  'content/power/fundamentals-work/**',
  'content/power/concepts/**',
  'content/power/lessons/**'
]

export function shouldExcludeContentPath(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, '/')
  if (normalized.endsWith('/template.md')) return true
  if (/^docs\/handoff-.*\.md$/.test(normalized)) return true
  if (normalized.startsWith('docs/superpowers/')) return true
  if (normalized.includes('/docs/superpowers/')) return true
  if (normalized.startsWith('content/private/')) return true
  if (normalized.startsWith('content/power/fundamentals-work/')) return true
  if (normalized.startsWith('content/power/concepts/')) return true
  if (normalized.startsWith('content/power/lessons/')) return true
  return false
}
