import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { createNavigationArtifacts, selectExpectedArticleIds, validateNavigationCoverage } from '../../scripts/kb/navigation/build-navigation'
import type { CanonicalArticleRecord } from '../../scripts/kb/domain/article-record'

const sections = [{
  id: 'power', title: 'Power', order: 10,
  routes: [{ id: 'learn', title: 'Learn', order: 10 }],
  stages: [{ id: 'basic', title: 'Basic', order: 10, routeId: 'learn' }],
}]

const article = (overrides: Partial<CanonicalArticleRecord> = {}): CanonicalArticleRecord => ({
  sectionId: 'power', sectionTitle: 'Power', routeId: 'learn', routeTitle: 'Learn', stageId: 'basic', stageTitle: 'Basic',
  articleId: 'power/basic/demo', title: 'Demo', sourcePath: 'content/power/basic/demo.md', slug: 'power/basic/demo', order: 10,
  visibility: 'public', publicSurface: 'full', difficulty: 'beginner', quality: 'reviewed', tags: ['motor'], ...overrides,
})

describe('knowledge navigation generation', () => {
  it('regenerates navigation before the production Astro build', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')) as { scripts: Record<string, string> }
    expect(pkg.scripts.build.indexOf('kb:navigation')).toBeGreaterThan(-1)
    expect(pkg.scripts.build.indexOf('kb:navigation')).toBeLessThan(pkg.scripts.build.indexOf('astro build'))
  })
  it('creates deterministic navigation and complete relationship coverage', () => {
    const artifacts = createNavigationArtifacts(sections, [article()], ['power/basic/demo'])
    expect(artifacts.navigation[0].routes[0].stages[0].articles[0]).toMatchObject({ articleId: 'power/basic/demo', slug: 'power/basic/demo' })
    expect(artifacts.navigation[0].routes[0].stages[0].articles[0]).toMatchObject({ difficulty: 'beginner', quality: 'reviewed', tags: ['motor'] })
    expect(artifacts.coverage.counts).toEqual({ sections: 1, routes: 1, stages: 1, articles: 1 })
    expect(artifacts.coverage.relationships.stages).toEqual([{ id: 'basic', sectionId: 'power', routeId: 'learn' }])
    expect(artifacts.coverage.baseline).toEqual({ expected: 1, mapped: 1, missing: [], unexpected: [] })
    expect(validateNavigationCoverage(artifacts.coverage)).toEqual([])
  })

  it('fails the coverage gate for missing, unexpected, or duplicate mappings', () => {
    const artifacts = createNavigationArtifacts(sections, [article()], ['power/basic/missing'])
    expect(validateNavigationCoverage(artifacts.coverage)).toEqual(expect.arrayContaining([
      expect.stringMatching(/missing/i),
      expect.stringMatching(/unexpected/i),
    ]))
    const duplicate = structuredClone(artifacts.coverage)
    duplicate.mappedArticleIds.push(duplicate.mappedArticleIds[0])
    expect(validateNavigationCoverage(duplicate)).toEqual(expect.arrayContaining([expect.stringMatching(/duplicate/i)]))
  })

  it('selects baseline knowledge articles by authoritative sectionId, not articleId prefix', () => {
    expect(selectExpectedArticleIds([
      { articleId: 'custom-id', sectionId: 'power', visibility: 'public' },
      { articleId: 'power-looking-id', sectionId: 'other', visibility: 'public' },
    ], new Set(['power']))).toEqual(['custom-id'])
  })
})
