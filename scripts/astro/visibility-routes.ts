import path from 'node:path'
import { scanMarkdownFiles } from '../kb/articles'
import { decideVisibility, normalizeArticle } from '../kb/domain/normalize-article'

export async function buildNonIndexablePostPaths(rootDir = process.cwd()): Promise<Set<string>> {
  const contentRoot = path.resolve(rootDir, 'content')
  const routes = new Set<string>()
  for (const record of await scanMarkdownFiles({ contentRoot })) {
    const normalizedPath = path.relative(contentRoot, record.absolutePath).replace(/\\/g, '/')
    // 容错：部分 section 总览类文章（README/MISSION/NOTES 等）缺少 routeId，
    // normalizeArticle 会抛错。跳过这些文章，避免阻塞整个配置加载。
    // 这些文章 visibility 为 public，默认可被 sitemap 收录，不影响安全。
    // 注意：只跳过 routeId/sectionId/stageId 缺失错误，visibility 等其他错误必须传播。
    let canonical
    try {
      canonical = normalizeArticle(record.completed, {
        sourcePath: record.relativePath,
        slug: normalizedPath.replace(/\.md$/i, ''),
        column: record.column,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (/routeId|sectionId|stageId|navGroup/i.test(message)) continue
      throw error
    }
    const decision = decideVisibility(canonical.visibility)
    if (decision.sitemap) continue
    const entryId = normalizedPath.replace(/\.md$/i, '').toLowerCase()
    routes.add(`/posts/${entryId}/`)
  }
  return routes
}
