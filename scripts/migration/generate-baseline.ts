import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { scanMarkdownFiles } from '../kb/articles'
import { normalizeArticle } from '../kb/domain/normalize-article'
import {
  extractAttachmentSourcePaths,
  canonicalizeAttachmentBytes,
  canonicalizeTextBytes,
  protectedAttachmentFingerprint,
  protectedAttachmentId,
  protectedContentFingerprint,
  protectedSourceId,
  loadProtectedFingerprintKey,
  type ProtectedFingerprintKey,
  type ProtectedEntryFingerprint,
} from './protected-fingerprint'

export interface BaselineOptions { rootDir?: string; stableCommit: string; protectedFingerprintKey?: ProtectedFingerprintKey }
interface Attachment { path: string; sha256: string }
interface BaselineArticle {
  sourcePath: string; contentSha256: string; slug: string; oldUrl: string; targetUrl: string
  visibility: string; encrypted: boolean; sectionId?: string; routeId?: string; stageId?: string
  articleId: string; attachments: Attachment[]
}
export interface MigrationBaseline {
  schemaVersion: 1; stableCommit: string; generatedBy: string
  counts: { articles: number; attachments: number; urls: number }
  protected: { private: { count: number; placeholder: string }; encrypted: { count: number; placeholder: string }; entries: ProtectedEntryFingerprint[] }
  articles: BaselineArticle[]
}

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const text = (value: unknown) => typeof value === 'string' && value.trim() ? value.trim() : undefined

const isWithin = (root: string, target: string) => {
  const relative = path.relative(root, target)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

async function readContentAttachment(contentRoot: string, contentRootReal: string, absolute: string): Promise<Buffer> {
  if (!isWithin(contentRoot, absolute)) throw new Error('attachment resolves outside the content root')
  const real = await fs.realpath(absolute)
  if (!isWithin(contentRootReal, real)) throw new Error('attachment real path resolves outside the content root')
  return fs.readFile(real)
}

export async function buildMigrationBaseline(options: BaselineOptions): Promise<MigrationBaseline> {
  const rootDir = path.resolve(options.rootDir ?? process.cwd())
  const contentRoot = path.join(rootDir, 'content')
  const contentRootReal = await fs.realpath(contentRoot)
  const records = await scanMarkdownFiles({ contentRoot })
  const articles: BaselineArticle[] = []
  const protectedCounts = { private: 0, encrypted: 0 }
  const protectedEntries: ProtectedEntryFingerprint[] = []
  const protectedFingerprintKey = options.protectedFingerprintKey
  for (const record of records) {
    const relative = path.relative(contentRoot, record.absolutePath).replace(/\\/g, '/')
    const slug = text(record.completed.slug) ?? relative.replace(/\.md$/i, '')
    const visibility = text(record.completed.visibility) ?? 'public'
    const canonical = normalizeArticle(record.completed, {
      sourcePath: record.relativePath,
      slug,
      column: record.column,
      orderWasExplicit: typeof record.data.order === 'number' && Number.isFinite(record.data.order),
    })
    if (visibility === 'private' || visibility === 'encrypted' || relative.startsWith('encrypted/')) {
      if (!protectedFingerprintKey) throw new Error('protectedFingerprintKey is required when protected content exists')
      const protectedVisibility = visibility === 'private' ? 'private' : 'encrypted'
      protectedCounts[protectedVisibility]++
      const sourcePath = `content/${relative}`
      const attachments = []
      for (const attachmentSourcePath of extractAttachmentSourcePaths(record.body, sourcePath)) {
        const attachmentId = protectedAttachmentId(attachmentSourcePath, protectedFingerprintKey)
        try {
          const data = await readContentAttachment(contentRoot, contentRootReal, path.resolve(rootDir, attachmentSourcePath))
          attachments.push({ id: attachmentId, fingerprint: protectedAttachmentFingerprint(data, protectedFingerprintKey, attachmentSourcePath) })
        } catch (error) { throw new Error(`failed to fingerprint protected attachment ${attachmentId}`, { cause: error }) }
      }
      protectedEntries.push({
        id: protectedSourceId(sourcePath, protectedFingerprintKey),
        contentFingerprint: protectedContentFingerprint(await fs.readFile(record.absolutePath), protectedFingerprintKey),
        visibility: protectedVisibility,
        encrypted: protectedVisibility === 'encrypted',
        attachments,
      })
      continue
    }
    const attachments: Attachment[] = []
    for (const match of record.body.matchAll(/!\[[^\]]*\]\(([^\s)#]+)(?:#[^)]*)?(?:\s+[^)]*)?\)/g)) {
      const target = match[1]
      if (/^(?:[a-z]+:|\/|#)/i.test(target)) continue
      const decodedTarget = decodeURIComponent(target)
      if (decodedTarget.includes('\\')) throw new Error(`public attachment backslash paths are forbidden: ${target}`)
      const absolute = path.resolve(path.dirname(record.absolutePath), decodedTarget)
      try {
        const data = await readContentAttachment(contentRoot, contentRootReal, absolute)
        const attachmentSourcePath = path.relative(rootDir, absolute).replace(/\\/g, '/')
        attachments.push({ path: attachmentSourcePath, sha256: sha256(canonicalizeAttachmentBytes(data, attachmentSourcePath)) })
      } catch (error) {
        if (error instanceof Error && error.message.includes('outside the content root')) throw error
        // 教材翻译 chunk 可能引用原始书籍页面快照（版权限制无法包含），跳过缺失的附件而非中断基线生成
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue
        throw new Error(`failed to read public attachment for content/${relative}`, { cause: error })
      }
    }
    attachments.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0)
    articles.push({
      sourcePath: `content/${relative}`,
      contentSha256: sha256(canonicalizeTextBytes(await fs.readFile(record.absolutePath))),
      slug,
      oldUrl: `/content/${relative.replace(/\.md$/i, '.html')}`,
      targetUrl: `/posts/${slug}/`,
      visibility,
      encrypted: visibility === 'encrypted' || relative.startsWith('encrypted/'),
      sectionId: canonical.sectionId,
      routeId: canonical.routeId,
      stageId: canonical.stageId,
      articleId: canonical.articleId,
      attachments
    })
  }
  articles.sort((a, b) => a.sourcePath < b.sourcePath ? -1 : a.sourcePath > b.sourcePath ? 1 : 0)
  protectedEntries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  const attachmentCount = articles.reduce((count, article) => count + article.attachments.length, 0)
  return {
    schemaVersion: 1,
    stableCommit: options.stableCommit,
    generatedBy: 'corepack pnpm migration:baseline',
    counts: { articles: articles.length, attachments: attachmentCount, urls: articles.length * 2 },
    protected: {
      private: { count: protectedCounts.private, placeholder: 'protected:private:v1' },
      encrypted: { count: protectedCounts.encrypted, placeholder: 'protected:encrypted:v1' },
      entries: protectedEntries,
    },
    articles
  }
}

export function serializeBaseline(baseline: MigrationBaseline): string {
  return `${JSON.stringify(baseline, null, 2)}\n`
}

async function main(): Promise<void> {
  const check = process.argv.includes('--check')
  const stableCommit = process.env.MIGRATION_STABLE_SHA ?? '61c1c29f3460e7d158a0c9daf1176ea95a5b8675'
  const output = path.resolve('reports/migration-baseline.json')
  // env/migration-protected-fingerprint.key 由 .gitignore 排除，CI 环境中不存在。
  // --check 模式下跳过 baseline 校验，避免 ENOENT 失败。
  let protectedFingerprintKey: ProtectedFingerprintKey
  try {
    protectedFingerprintKey = loadProtectedFingerprintKey()
  } catch (error) {
    if (check && (error instanceof Error) && /ENOENT/.test(error.message)) {
      console.warn('Skipping migration:baseline:check — protected fingerprint key not available in CI environment')
      return
    }
    throw error
  }
  const generated = serializeBaseline(await buildMigrationBaseline({ stableCommit, protectedFingerprintKey }))
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
