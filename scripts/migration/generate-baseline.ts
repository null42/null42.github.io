import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { scanMarkdownFiles } from '../kb/articles'

export interface BaselineOptions { rootDir?: string; stableCommit: string }
interface Attachment { path: string; sha256: string }
interface BaselineArticle {
  sourcePath: string; contentSha256: string; slug: string; oldUrl: string; targetUrl: string
  visibility: string; encrypted: boolean; sectionId?: string; routeId?: string; stageId?: string
  articleId: string; attachments: Attachment[]
}
export interface MigrationBaseline {
  schemaVersion: 1; stableCommit: string; generatedBy: string
  counts: { articles: number; attachments: number; urls: number }
  articles: BaselineArticle[]
}

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const text = (value: unknown) => typeof value === 'string' && value.trim() ? value.trim() : undefined

export async function buildMigrationBaseline(options: BaselineOptions): Promise<MigrationBaseline> {
  const rootDir = path.resolve(options.rootDir ?? process.cwd())
  const contentRoot = path.join(rootDir, 'content')
  const records = await scanMarkdownFiles({ contentRoot })
  const articles: BaselineArticle[] = []
  for (const record of records) {
    const relative = path.relative(contentRoot, record.absolutePath).replace(/\\/g, '/')
    const slug = text(record.completed.slug) ?? relative.replace(/\.md$/i, '')
    const visibility = text(record.completed.visibility) ?? 'public'
    const attachments: Attachment[] = []
    for (const match of record.body.matchAll(/!\[[^\]]*\]\(([^\s)#]+)(?:#[^)]*)?(?:\s+[^)]*)?\)/g)) {
      const target = match[1]
      if (/^(?:[a-z]+:|\/|#)/i.test(target)) continue
      const absolute = path.resolve(path.dirname(record.absolutePath), decodeURIComponent(target))
      try {
        const data = await fs.readFile(absolute)
        attachments.push({ path: path.relative(rootDir, absolute).replace(/\\/g, '/'), sha256: sha256(data) })
      } catch { /* missing attachments are reported by existing scanners */ }
    }
    attachments.sort((a, b) => a.path.localeCompare(b.path))
    articles.push({
      sourcePath: `content/${relative}`,
      contentSha256: sha256(await fs.readFile(record.absolutePath)),
      slug,
      oldUrl: `/content/${relative.replace(/\.md$/i, '.html')}`,
      targetUrl: `/posts/${slug}/`,
      visibility,
      encrypted: visibility === 'encrypted' || relative.startsWith('encrypted/'),
      sectionId: text(record.completed.section),
      routeId: text(record.completed.routeId) ?? text(record.completed.navGroup),
      stageId: text(record.completed.stage) ?? text(record.completed.chapter),
      articleId: text(record.completed.articleId) ?? slug,
      attachments
    })
  }
  articles.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath))
  const attachmentCount = articles.reduce((count, article) => count + article.attachments.length, 0)
  return { schemaVersion: 1, stableCommit: options.stableCommit, generatedBy: 'corepack pnpm migration:baseline', counts: { articles: articles.length, attachments: attachmentCount, urls: articles.length * 2 }, articles }
}

export function serializeBaseline(baseline: MigrationBaseline): string {
  return `${JSON.stringify(baseline, null, 2)}\n`
}

async function main(): Promise<void> {
  const check = process.argv.includes('--check')
  const stableCommit = process.env.MIGRATION_STABLE_SHA ?? '61c1c29f3460e7d158a0c9daf1176ea95a5b8675'
  const output = path.resolve('reports/migration-baseline.json')
  const generated = serializeBaseline(await buildMigrationBaseline({ stableCommit }))
  if (check) {
    const existing = await fs.readFile(output, 'utf8')
    if (existing !== generated) throw new Error('reports/migration-baseline.json is not reproducible; run migration:baseline')
  } else {
    await fs.mkdir(path.dirname(output), { recursive: true })
    await fs.writeFile(output, generated, 'utf8')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1 })
}
