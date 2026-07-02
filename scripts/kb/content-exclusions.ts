export const nonPublicContentPatterns = [
  '**/template.md',
  'content/**/docs/superpowers/**',
  'content/private/**'
]

export function shouldExcludeContentPath(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, '/')
  if (normalized.endsWith('/template.md')) return true
  if (normalized.includes('/docs/superpowers/')) return true
  if (normalized.startsWith('content/private/')) return true
  return false
}
