import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { nonPublicContentPatterns, shouldExcludeContentPath } from '../../scripts/kb/content-exclusions'

describe('content publishing policy', () => {
  it('excludes rough power imports from public indexes', () => {
    expect(shouldExcludeContentPath('content/power/fundamentals-work/chunks/001-preface.md')).toBe(true)
    expect(shouldExcludeContentPath('content/power/concepts/boost-converter.md')).toBe(true)
    expect(shouldExcludeContentPath('content/power/lessons/0001-boost-converter.md')).toBe(true)
  })

  it('keeps curated power notes public', () => {
    expect(shouldExcludeContentPath('content/power/archive/old-learning-records/0001-ups-system-overview.md')).toBe(false)
    expect(shouldExcludeContentPath('content/power/projects/01-boost-basics/README.md')).toBe(false)
    expect(shouldExcludeContentPath('content/power/roadmap/30-day-plan.md')).toBe(false)
  })

  it('uses the real motor knowledge base instead of simulation components', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('motor-control-knowledge-base')
    expect(migrate).not.toContain('motor-learning-web')
    expect(migrate).not.toContain('*Sim.vue')
  })

  it('filters project-management noise from imported knowledge bases', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('**/CONTRIBUTING.md')
    expect(migrate).toContain('**/HANDOVER.md')
    expect(migrate).toContain('**/TEMPLATE-*.md')
    expect(migrate).toContain('**/*release-checklist.md')
  })

  it('keeps source-adjacent motor examples as static reference files', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('**/*.{md,html,png,jpg,jpeg,gif,svg,yaml,yml,json,c,h,hpp,cpp,rst}')
    expect(migrate).toContain('**/_proofs/**')
    expect(migrate).toContain('**/datasets/**')
    expect(migrate).toContain('**/reports/**')
    expect(migrate).toContain('**/schemas/**')
  })

  it('does not expose the old motor web source name in public indexes', async () => {
    const { articles } = await scanArticles()

    expect(JSON.stringify(articles)).not.toContain('motor-learning-web')
  })

  it('keeps real motor simulation chapters while excluding old web simulations', async () => {
    const { articles } = await scanArticles()
    const paths = articles.map((article) => article.path.replace(/\\/g, '/'))

    expect(paths.some((item) => item.startsWith('content/motor/simulation/'))).toBe(true)
    expect(paths.some((item) => item.startsWith('content/motor/simulations/'))).toBe(false)
  })

  it('keeps unfinished power drafts out of generated public articles', async () => {
    const { articles } = await scanArticles()
    const paths = articles.map((article) => article.path.replace(/\\/g, '/'))

    expect(paths.some((item) => item.startsWith('content/power/fundamentals-work/'))).toBe(false)
    expect(paths.some((item) => item.startsWith('content/power/concepts/'))).toBe(false)
    expect(paths.some((item) => item.startsWith('content/power/lessons/'))).toBe(false)
  })

  it('does not publish local filesystem links or old motor source references', async () => {
    const { articles } = await scanArticles()
    const publicPayload = JSON.stringify(articles)

    expect(publicPayload).not.toContain('file:///')
    expect(publicPayload).not.toContain('motor-learning-web')
    expect(publicPayload).not.toContain('content/motor/simulations/')
  })

  it('keeps handoff and agent planning notes out of the published VitePress source set', () => {
    expect(nonPublicContentPatterns).toContain('docs/handoff-*.md')
    expect(nonPublicContentPatterns).toContain('docs/superpowers/**')
  })
})
