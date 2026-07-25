import path from 'node:path'
import { scanMarkdownFiles } from '../kb/articles'
import { decideVisibility, normalizeArticle } from '../kb/domain/normalize-article'

export async function buildNonIndexablePostPaths(rootDir = process.cwd()): Promise<Set<string>> {
  const contentRoot = path.resolve(rootDir, 'content')
  const routes = new Set<string>()
  for (const record of await scanMarkdownFiles({ contentRoot })) {
    const normalizedPath = path.relative(contentRoot, record.absolutePath).replace(/\\/g, '/')
    const canonical = normalizeArticle(record.completed, {
      sourcePath: record.relativePath,
      slug: normalizedPath.replace(/\.md$/i, ''),
      column: record.column,
    })
    const decision = decideVisibility(canonical.visibility)
    if (decision.sitemap) continue
    const entryId = normalizedPath.replace(/\.md$/i, '').toLowerCase()
    routes.add(`/posts/${entryId}/`)
  }
  return routes
}
