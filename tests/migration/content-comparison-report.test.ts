import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  buildContentComparison,
  getBlockingContentDifferences,
  readBaselineAtCommit,
  serializeContentComparison,
  validateBaseCommit,
} from '../../scripts/migration/generate-content-comparison'

const article = (overrides: Record<string, unknown> = {}) => ({
  sourcePath: 'content/power/example.md',
  contentSha256: 'content-a',
  slug: 'power/example',
  oldUrl: '/content/power/example.html',
  targetUrl: '/posts/power/example/',
  visibility: 'public',
  encrypted: false,
  sectionId: 'power',
  routeId: 'route',
  stageId: 'stage',
  articleId: 'example',
  attachments: [{ path: 'content/power/example.png', sha256: 'attachment-a' }],
  ...overrides,
})

const protectedEntry = (overrides: Record<string, unknown> = {}) => ({
  id: 'protected-id',
  contentFingerprint: 'protected-content-a',
  visibility: 'encrypted',
  encrypted: true,
  attachments: [{ id: 'attachment-id', fingerprint: 'protected-attachment-a' }],
  ...overrides,
})

const baseline = (articles: ReturnType<typeof article>[], protectedEntries: ReturnType<typeof protectedEntry>[] = []) => ({
  schemaVersion: 1,
  stableCommit: 'stable',
  protected: { private: { count: 0 }, encrypted: { count: protectedEntries.length }, entries: protectedEntries },
  articles,
})

describe('migration content comparison report', () => {
  it('is portable UTF-8 JSON and records only reviewed migration differences', () => {
    const source = fs.readFileSync('reports/migration-content-comparison.json', 'utf8')
    expect(source.charCodeAt(0)).not.toBe(0xfeff)
    const report = JSON.parse(source)
    expect(report).toMatchObject({
      schemaVersion: 1,
      generatedBy: 'corepack pnpm migration:comparison',
      reason: 'canonical-hierarchy-normalization',
      baseCommit: 'e757f43ad36d758b0c26d4c2d64b875b46b543fa',
      publicCollection: { added: 0, removed: 0 },
      hashes: { attachmentChanged: 0 },
      hierarchy: { changed: 374, canonicalArticleCount: 371 },
      protected: { private: 0, encrypted: 2 },
    })
    expect(report.hashes.contentChanged).toBe(report.differences.content.length)
    expect(report.hashes.contentChanged).toBeGreaterThan(0)
    expect(getBlockingContentDifferences(report)).toEqual([])
    const approvedIds = new Set(report.approvals.map((approval: { id: string }) => approval.id))
    expect(report.differences.content.every((difference: { id: string }) => approvedIds.has(difference.id))).toBe(true)
    expect(report.differences.protected.every((difference: { id: string }) => approvedIds.has(difference.id))).toBe(true)
  })

  it('is reproduced from the pinned pre-normalization baseline and current baseline', () => {
    const current = JSON.parse(fs.readFileSync('reports/migration-baseline.json', 'utf8'))
    const previous = readBaselineAtCommit('e757f43ad36d758b0c26d4c2d64b875b46b543fa')
    const allowlist = JSON.parse(fs.readFileSync('reports/migration-content-comparison-allowlist.json', 'utf8'))
    const report = buildContentComparison(previous, current, 'e757f43ad36d758b0c26d4c2d64b875b46b543fa', allowlist)
    expect(fs.readFileSync('reports/migration-content-comparison.json', 'utf8')).toBe(serializeContentComparison(report))
  })

  it.each([
    ['removed article', baseline([article()]), baseline([]), 'removed'],
    ['changed content', baseline([article()]), baseline([article({ contentSha256: 'content-b' })]), 'content'],
    ['changed attachment', baseline([article()]), baseline([article({ attachments: [{ path: 'content/power/example.png', sha256: 'attachment-b' }] })]), 'attachment'],
    ['changed target URL', baseline([article()]), baseline([article({ targetUrl: '/posts/power/renamed/' })]), 'url'],
    ['changed visibility', baseline([article()]), baseline([article({ visibility: 'hidden' })]), 'visibility'],
    ['changed encryption state', baseline([article()]), baseline([article({ encrypted: true })]), 'encryption'],
  ])('blocks an unexplained %s', (_label, previous, current, expectedCategory) => {
    const report = buildContentComparison(previous, current, 'base')
    expect(getBlockingContentDifferences(report)).toContain(expectedCategory)
    expect(report.conclusion).not.toContain('differences are limited to expected canonical hierarchy identifiers')
  })

  it('allows canonical hierarchy normalization without blocking content preservation', () => {
    const previous = baseline([article({ sectionId: undefined, routeId: undefined, stageId: undefined })])
    const current = baseline([article()])
    const unapproved = buildContentComparison(previous, current, 'base')
    expect(getBlockingContentDifferences(unapproved)).toContain('hierarchy')
    expect(unapproved.differences.hierarchy).toHaveLength(3)
    const approval = { id: unapproved.hierarchy.expectationId, reason: 'Reviewed canonical hierarchy normalization' }
    expect(getBlockingContentDifferences(buildContentComparison(previous, current, 'base', { schemaVersion: 1, entries: [approval] }))).toEqual([])

    const corrupted = baseline([article({ sectionId: 'wrong-section' })])
    expect(() => buildContentComparison(previous, corrupted, 'base', { schemaVersion: 1, entries: [approval] })).toThrow(/does not match a current difference/)
  })

  it('rejects a movable Git ref instead of treating it as a pinned baseline', () => {
    expect(() => validateBaseCommit('HEAD')).toThrow(/40-character commit SHA/)
  })

  it('rejects duplicate source paths before a Map can hide them', () => {
    expect(() => buildContentComparison(baseline([article(), article()]), baseline([article()]), 'base')).toThrow(/duplicate sourcePath/)
  })

  it('requires every approved exception to have a review reason', () => {
    const previous = baseline([article()])
    const current = baseline([article({ contentSha256: 'content-b' })])
    expect(() => buildContentComparison(previous, current, 'base', { schemaVersion: 1, entries: [{ id: 'approval', reason: '' }] })).toThrow(/approval reason/)
  })

  it('blocks protected content replacement even when aggregate counts are unchanged', () => {
    const previous = baseline([], [protectedEntry()])
    const current = baseline([], [protectedEntry({ contentFingerprint: 'protected-content-b' })])
    expect(getBlockingContentDifferences(buildContentComparison(previous, current, 'base'))).toContain('protected')
  })

  it('binds an added-article approval to the complete reviewed article snapshot', () => {
    const previous = baseline([])
    const firstCurrent = baseline([article()])
    const firstReport = buildContentComparison(previous, firstCurrent, 'base')
    const approval = { id: firstReport.differences.added[0].id, reason: 'Reviewed addition' }
    expect(getBlockingContentDifferences(buildContentComparison(previous, firstCurrent, 'base', { schemaVersion: 1, entries: [approval] }))).toEqual([])

    const changedCurrent = baseline([article({ contentSha256: 'content-b', targetUrl: '/posts/power/changed/' })])
    expect(() => buildContentComparison(previous, changedCurrent, 'base', { schemaVersion: 1, entries: [approval] })).toThrow(/does not match a current difference/)
  })

  it('rejects approval IDs that do not match a current non-hierarchy difference', () => {
    expect(() => buildContentComparison(baseline([article()]), baseline([article()]), 'base', { schemaVersion: 1, entries: [{ id: 'stale', reason: 'Old review' }] })).toThrow(/does not match a current difference/)
  })
})
