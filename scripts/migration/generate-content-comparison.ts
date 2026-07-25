import { createHash } from 'node:crypto'
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import matter from 'gray-matter'
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

const defaultBaseCommit = 'e757f43ad36d758b0c26d4c2d64b875b46b543fa'
const hierarchyFields = ['sectionId', 'routeId', 'stageId', 'articleId'] as const
const gitMaxBuffer = 256 * 1024 * 1024

type Attachment = { path: string; sha256: string }
type BaselineArticle = {
  sourcePath: string
  contentSha256: string
  slug: string
  oldUrl: string
  targetUrl: string
  visibility: string
  encrypted: boolean
  sectionId?: string
  routeId?: string
  stageId?: string
  articleId: string
  attachments: Attachment[]
}
type MigrationBaseline = {
  schemaVersion: number
  stableCommit: string
  protected: { private: { count: number }; encrypted: { count: number }; entries?: ProtectedEntryFingerprint[] }
  articles: BaselineArticle[]
}
type Difference<T> = { id: string; sourcePath: string; previous: T; current: T }
type FieldDifference = Difference<string | boolean | undefined> & { field: string }
type PresenceDifference = { id: string; sourcePath: string; article: BaselineArticle }
type ComparisonAllowlist = { schemaVersion: 1; entries: Array<{ id: string; reason: string }> }

export type ContentComparisonReport = {
  schemaVersion: 1
  generatedBy: string
  reason: 'canonical-hierarchy-normalization'
  baseCommit: string
  inputs: { previousBaselineSha256: string; currentBaselineSha256: string; allowlistSha256: string }
  publicCollection: { added: number; removed: number; retainedPathCount: number }
  hashes: { contentChanged: number; attachmentChanged: number; attachmentCount: number }
  hierarchy: { changed: number; canonicalArticleCount: number; fields: readonly string[]; expectationId?: string }
  protected: { private: number; encrypted: number }
  differences: {
    added: PresenceDifference[]
    removed: PresenceDifference[]
    content: Difference<string>[]
    attachments: Difference<Attachment[]>[]
    urls: FieldDifference[]
    visibility: FieldDifference[]
    encryption: FieldDifference[]
    hierarchy: FieldDifference[]
    protected: Difference<ProtectedEntryFingerprint | undefined>[]
  }
  approvals: Array<{ id: string; reason: string }>
  conclusion: string
}

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const serializeBaseline = (baseline: MigrationBaseline) => `${JSON.stringify(baseline, null, 2)}\n`
const serializeAllowlist = (allowlist: ComparisonAllowlist) => `${JSON.stringify(allowlist, null, 2)}\n`
const differenceId = (category: string, sourcePath: string, field: string, previous: unknown, current: unknown) =>
  sha256(JSON.stringify({ category, sourcePath, field, previous, current }))
const isPublic = (article: BaselineArticle) => article.visibility === 'public' && !article.encrypted

export function validateBaseCommit(commit: string): string {
  if (!/^[0-9a-f]{40}$/i.test(commit)) throw new Error('migration comparison base must be a full 40-character commit SHA')
  return commit.toLowerCase()
}

function validateBaseline(baseline: MigrationBaseline, label: string): void {
  if (baseline.schemaVersion !== 1 || !Array.isArray(baseline.articles)) throw new Error(`${label} migration baseline has an unsupported schema`)
  const sourcePaths = new Set<string>()
  for (const article of baseline.articles) {
    if (sourcePaths.has(article.sourcePath)) throw new Error(`${label} migration baseline contains duplicate sourcePath: ${article.sourcePath}`)
    sourcePaths.add(article.sourcePath)
  }
  if (!Array.isArray(baseline.protected.entries)) throw new Error(`${label} migration baseline is missing protected entry fingerprints`)
  const protectedIds = new Set<string>()
  for (const entry of baseline.protected.entries) {
    if (protectedIds.has(entry.id)) throw new Error(`${label} migration baseline contains duplicate protected id: ${entry.id}`)
    protectedIds.add(entry.id)
  }
  const privateCount = baseline.protected.entries.filter((entry) => entry.visibility === 'private').length
  const encryptedCount = baseline.protected.entries.filter((entry) => entry.visibility === 'encrypted').length
  if (privateCount !== baseline.protected.private.count || encryptedCount !== baseline.protected.encrypted.count) throw new Error(`${label} migration baseline protected counts do not match its entries`)
}

function validateAllowlist(allowlist: ComparisonAllowlist): void {
  if (allowlist.schemaVersion !== 1 || !Array.isArray(allowlist.entries)) throw new Error('migration comparison allowlist has an unsupported schema')
  const ids = new Set<string>()
  for (const entry of allowlist.entries) {
    if (!entry.reason.trim()) throw new Error(`migration comparison approval reason is required for ${entry.id}`)
    if (ids.has(entry.id)) throw new Error(`migration comparison allowlist contains duplicate id: ${entry.id}`)
    ids.add(entry.id)
  }
}

function gitShowBuffer(commit: string, sourcePath: string, rootDir: string): Buffer {
  return execFileSync('git', ['show', `${commit}:${sourcePath}`], { cwd: rootDir, maxBuffer: gitMaxBuffer })
}

function gitShowManyBuffers(commit: string, sourcePaths: string[], rootDir: string): Map<string, Buffer> {
  const uniquePaths = [...new Set(sourcePaths)]
  const input = `${uniquePaths.map((sourcePath) => `${commit}:${sourcePath}`).join('\n')}\n`
  const result = spawnSync('git', ['cat-file', '--batch'], { cwd: rootDir, input, maxBuffer: gitMaxBuffer })
  if (result.status !== 0) throw new Error(`git cat-file failed for migration baseline: ${result.stderr.toString('utf8').trim()}`)
  const output = result.stdout
  const blobs = new Map<string, Buffer>()
  let offset = 0
  for (const sourcePath of uniquePaths) {
    const lineEnd = output.indexOf(0x0a, offset)
    if (lineEnd < 0) throw new Error(`git cat-file returned a truncated header for ${sourcePath}`)
    const header = output.subarray(offset, lineEnd).toString('utf8')
    if (header.endsWith(' missing')) throw new Error(`fixed migration commit is missing ${sourcePath}`)
    const size = Number(header.split(' ').at(-1))
    if (!Number.isSafeInteger(size) || size < 0) throw new Error(`git cat-file returned an invalid size for ${sourcePath}`)
    const start = lineEnd + 1
    const end = start + size
    if (end >= output.length) throw new Error(`git cat-file returned truncated content for ${sourcePath}`)
    blobs.set(sourcePath, Buffer.from(output.subarray(start, end)))
    offset = end + 1
  }
  return blobs
}

function hydratePublicHashesAtCommit(baseline: MigrationBaseline, commit: string, rootDir: string): void {
  const sourcePaths = baseline.articles.flatMap((article) => [article.sourcePath, ...article.attachments.map((attachment) => attachment.path)])
  const blobs = gitShowManyBuffers(commit, sourcePaths, rootDir)
  for (const article of baseline.articles) {
    const content = blobs.get(article.sourcePath)
    if (!content) throw new Error(`fixed migration commit is missing ${article.sourcePath}`)
    article.contentSha256 = sha256(canonicalizeTextBytes(content))
    for (const attachment of article.attachments) {
      const data = blobs.get(attachment.path)
      if (!data) throw new Error(`fixed migration commit is missing ${attachment.path}`)
      attachment.sha256 = sha256(canonicalizeAttachmentBytes(data, attachment.path))
    }
  }
}

function readProtectedEntriesAtCommit(commit: string, rootDir: string, protectedFingerprintKey: ProtectedFingerprintKey): ProtectedEntryFingerprint[] {
  const files = new Set<string>()
  try {
    const matches = execFileSync('git', ['grep', '-l', '-E', '^visibility:[[:space:]]*(private|encrypted)[[:space:]]*$', commit, '--', 'content'], { cwd: rootDir, encoding: 'utf8', maxBuffer: gitMaxBuffer })
    for (const match of matches.split(/\r?\n/)) {
      const sourcePath = match.startsWith(`${commit}:`) ? match.slice(commit.length + 1) : match
      if (sourcePath.endsWith('.md')) files.add(sourcePath)
    }
  } catch { /* git grep exits with 1 when no protected frontmatter exists */ }
  const encryptedFiles = execFileSync('git', ['ls-tree', '-r', '--name-only', commit, '--', 'content/encrypted'], { cwd: rootDir, encoding: 'utf8', maxBuffer: gitMaxBuffer })
  for (const sourcePath of encryptedFiles.split(/\r?\n/)) if (sourcePath.endsWith('.md')) files.add(sourcePath)
  const entries: ProtectedEntryFingerprint[] = []
  for (const sourcePath of [...files].sort()) {
    const content = gitShowBuffer(commit, sourcePath, rootDir)
    const parsed = matter(content.toString('utf8'))
    const visibility = typeof parsed.data.visibility === 'string' ? parsed.data.visibility : 'public'
    if (visibility !== 'private' && visibility !== 'encrypted' && !sourcePath.startsWith('content/encrypted/')) continue
    const protectedVisibility = visibility === 'private' ? 'private' : 'encrypted'
    const attachments = []
    for (const attachmentSourcePath of extractAttachmentSourcePaths(parsed.content, sourcePath)) {
      try {
        const attachment = gitShowBuffer(commit, attachmentSourcePath, rootDir)
        attachments.push({ id: protectedAttachmentId(attachmentSourcePath, protectedFingerprintKey), fingerprint: protectedAttachmentFingerprint(attachment, protectedFingerprintKey, attachmentSourcePath) })
      } catch (error) { throw new Error(`failed to fingerprint protected attachment ${protectedAttachmentId(attachmentSourcePath, protectedFingerprintKey)} at fixed commit`, { cause: error }) }
    }
    entries.push({
      id: protectedSourceId(sourcePath, protectedFingerprintKey),
      contentFingerprint: protectedContentFingerprint(content, protectedFingerprintKey),
      visibility: protectedVisibility,
      encrypted: protectedVisibility === 'encrypted',
      attachments,
    })
  }
  return entries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
}

export function readBaselineAtCommit(commit: string, rootDir = process.cwd(), protectedFingerprintKey: ProtectedFingerprintKey = loadProtectedFingerprintKey(rootDir)): MigrationBaseline {
  const baseline = JSON.parse(execFileSync('git', ['show', `${commit}:reports/migration-baseline.json`], { cwd: rootDir, encoding: 'utf8', maxBuffer: gitMaxBuffer })) as MigrationBaseline
  hydratePublicHashesAtCommit(baseline, commit, rootDir)
  if (!baseline.protected.entries) baseline.protected.entries = readProtectedEntriesAtCommit(commit, rootDir, protectedFingerprintKey)
  return baseline
}

export function buildContentComparison(
  previous: MigrationBaseline,
  current: MigrationBaseline,
  baseCommit: string,
  allowlist: ComparisonAllowlist = { schemaVersion: 1, entries: [] },
): ContentComparisonReport {
  validateBaseline(previous, 'previous')
  validateBaseline(current, 'current')
  validateAllowlist(allowlist)
  const previousByPath = new Map(previous.articles.map((article) => [article.sourcePath, article]))
  const previousPublic = new Map(previous.articles.filter(isPublic).map((article) => [article.sourcePath, article]))
  const currentPublic = new Map(current.articles.filter(isPublic).map((article) => [article.sourcePath, article]))
  const differences: ContentComparisonReport['differences'] = {
    added: [...currentPublic.entries()].filter(([sourcePath]) => !previousPublic.has(sourcePath)).map(([sourcePath, article]) => ({ id: differenceId('added', sourcePath, 'article', undefined, article), sourcePath, article })),
    removed: [...previousPublic.entries()].filter(([sourcePath]) => !currentPublic.has(sourcePath)).map(([sourcePath, article]) => ({ id: differenceId('removed', sourcePath, 'article', article, undefined), sourcePath, article })),
    content: [],
    attachments: [],
    urls: [],
    visibility: [],
    encryption: [],
    hierarchy: [],
    protected: [],
  }
  let canonicalArticleCount = 0

  for (const article of current.articles) {
    const prior = previousByPath.get(article.sourcePath)
    if (!prior) continue
    if (article.contentSha256 !== prior.contentSha256) differences.content.push({ id: differenceId('content', article.sourcePath, 'contentSha256', prior.contentSha256, article.contentSha256), sourcePath: article.sourcePath, previous: prior.contentSha256, current: article.contentSha256 })
    if (JSON.stringify(article.attachments) !== JSON.stringify(prior.attachments)) differences.attachments.push({ id: differenceId('attachment', article.sourcePath, 'attachments', prior.attachments, article.attachments), sourcePath: article.sourcePath, previous: prior.attachments, current: article.attachments })
    for (const field of ['slug', 'oldUrl', 'targetUrl'] as const) {
      if (article[field] !== prior[field]) differences.urls.push({ id: differenceId('url', article.sourcePath, field, prior[field], article[field]), sourcePath: article.sourcePath, field, previous: prior[field], current: article[field] })
    }
    if (article.visibility !== prior.visibility) differences.visibility.push({ id: differenceId('visibility', article.sourcePath, 'visibility', prior.visibility, article.visibility), sourcePath: article.sourcePath, field: 'visibility', previous: prior.visibility, current: article.visibility })
    if (article.encrypted !== prior.encrypted) differences.encryption.push({ id: differenceId('encryption', article.sourcePath, 'encrypted', prior.encrypted, article.encrypted), sourcePath: article.sourcePath, field: 'encrypted', previous: prior.encrypted, current: article.encrypted })
    if (article.sectionId && article.routeId && article.stageId) canonicalArticleCount += 1
    for (const field of hierarchyFields) {
      if (article[field] !== prior[field]) differences.hierarchy.push({ id: differenceId('hierarchy', article.sourcePath, field, prior[field], article[field]), sourcePath: article.sourcePath, field, previous: prior[field], current: article[field] })
    }
  }

  const previousProtected = new Map(previous.protected.entries!.map((entry) => [entry.id, entry]))
  const currentProtected = new Map(current.protected.entries!.map((entry) => [entry.id, entry]))
  for (const protectedId of new Set([...previousProtected.keys(), ...currentProtected.keys()])) {
    const prior = previousProtected.get(protectedId)
    const next = currentProtected.get(protectedId)
    if (JSON.stringify(prior) !== JSON.stringify(next)) differences.protected.push({ id: differenceId('protected', protectedId, 'entry', prior, next), sourcePath: protectedId, previous: prior, current: next })
  }

  const hierarchyExpectationId = differences.hierarchy.length > 0
    ? differenceId('hierarchy-set', 'knowledge-hierarchy', 'differenceIds', undefined, differences.hierarchy.map((difference) => difference.id).sort())
    : undefined
  const currentDifferenceIds = new Set([
    ...differences.added.map((difference) => difference.id),
    ...differences.removed.map((difference) => difference.id),
    ...differences.content.map((difference) => difference.id),
    ...differences.attachments.map((difference) => difference.id),
    ...differences.urls.map((difference) => difference.id),
    ...differences.visibility.map((difference) => difference.id),
    ...differences.encryption.map((difference) => difference.id),
    ...differences.protected.map((difference) => difference.id),
    ...(hierarchyExpectationId ? [hierarchyExpectationId] : []),
  ])
  for (const approval of allowlist.entries) {
    if (!currentDifferenceIds.has(approval.id)) throw new Error(`migration comparison approval ${approval.id} does not match a current difference`)
  }

  const report: ContentComparisonReport = {
    schemaVersion: 1,
    generatedBy: 'corepack pnpm migration:comparison',
    reason: 'canonical-hierarchy-normalization',
    baseCommit,
    inputs: {
      previousBaselineSha256: sha256(serializeBaseline(previous)),
      currentBaselineSha256: sha256(serializeBaseline(current)),
      allowlistSha256: sha256(serializeAllowlist(allowlist)),
    },
    publicCollection: { added: differences.added.length, removed: differences.removed.length, retainedPathCount: [...currentPublic.keys()].filter((sourcePath) => previousPublic.has(sourcePath)).length },
    hashes: { contentChanged: differences.content.length, attachmentChanged: differences.attachments.length, attachmentCount: [...currentPublic.values()].reduce((count, article) => count + article.attachments.length, 0) },
    hierarchy: { changed: new Set(differences.hierarchy.map((difference) => difference.sourcePath)).size, canonicalArticleCount, fields: hierarchyFields, expectationId: hierarchyExpectationId },
    protected: { private: current.protected.private.count, encrypted: current.protected.encrypted.count },
    differences,
    approvals: allowlist.entries,
    conclusion: '',
  }
  const blocking = getBlockingContentDifferences(report)
  report.conclusion = blocking.length === 0
    ? 'Public content, URLs, visibility, encryption state, protected fingerprints, and attachment bytes are preserved; differences are limited to expected canonical hierarchy identifiers or approved exceptions.'
    : `Migration preservation gate failed for: ${blocking.join(', ')}.`
  return report
}

export function getBlockingContentDifferences(report: ContentComparisonReport): string[] {
  const approved = new Set(report.approvals.map((entry) => entry.id))
  const categories: Array<[string, string[]]> = [
    ['added', report.differences.added.map((difference) => difference.id)],
    ['removed', report.differences.removed.map((difference) => difference.id)],
    ['content', report.differences.content.map((difference) => difference.id)],
    ['attachment', report.differences.attachments.map((difference) => difference.id)],
    ['url', report.differences.urls.map((difference) => difference.id)],
    ['visibility', report.differences.visibility.map((difference) => difference.id)],
    ['encryption', report.differences.encryption.map((difference) => difference.id)],
    ['protected', report.differences.protected.map((difference) => difference.id)],
    ['hierarchy', report.hierarchy.expectationId ? [report.hierarchy.expectationId] : []],
  ]
  return categories.filter(([, ids]) => ids.some((id) => !approved.has(id))).map(([category]) => category)
}

export function serializeContentComparison(report: ContentComparisonReport): string {
  return `${JSON.stringify(report, null, 2)}\n`
}

async function main() {
  const check = process.argv.includes('--check')
  const baseCommit = validateBaseCommit(process.env.MIGRATION_COMPARISON_BASE_SHA ?? defaultBaseCommit)
  const output = path.resolve('reports/migration-content-comparison.json')
  const current = JSON.parse(await fs.readFile(path.resolve('reports/migration-baseline.json'), 'utf8')) as MigrationBaseline
  const allowlist = JSON.parse(await fs.readFile(path.resolve('reports/migration-content-comparison-allowlist.json'), 'utf8')) as ComparisonAllowlist
  const report = buildContentComparison(readBaselineAtCommit(baseCommit, process.cwd(), loadProtectedFingerprintKey()), current, baseCommit, allowlist)
  const generated = serializeContentComparison(report)
  if (check) {
    if (await fs.readFile(output, 'utf8') !== generated) throw new Error('reports/migration-content-comparison.json is not reproducible; run migration:comparison')
    const blocking = getBlockingContentDifferences(report)
    if (blocking.length > 0) throw new Error(`migration content preservation gate failed: ${blocking.join(', ')}`)
  } else {
    await fs.writeFile(output, generated, 'utf8')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1 })
}
