import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { decideVisibility, normalizeArticle } from '../../scripts/kb/domain/normalize-article'
import type { ArticleNormalizationContext } from '../../scripts/kb/domain/normalize-article'
import { scanArticles } from '../../scripts/kb/articles'

const context: ArticleNormalizationContext = {
  sourcePath: 'content/power/projects/demo.md',
  slug: 'power/projects/demo',
  column: {
    id: 'power',
    title: '电源控制',
    section: '电源控制',
    layout: 'map',
    routes: [
      { id: 'project', title: '项目实践', order: 20 },
      { id: 'debug', title: '调试与复盘', order: 30 },
    ],
    stages: [
      { id: 'projects', title: '项目实践', order: 20, routeId: 'project', chapter: 'projects' },
      { id: 'debug-records', title: '调试记录', order: 10, routeId: 'debug', chapter: 'records' },
    ],
  },
}

describe('visibility decisions', () => {
  it('returns runtime-immutable shared decisions', () => {
    const decision = decideVisibility('public')

    expect(Object.isFrozen(decision)).toBe(true)
    expect(() => {
      Reflect.set(decision, 'html', false)
    }).not.toThrow()
    expect(decideVisibility('public').html).toBe(true)
  })
})

describe('article hierarchy normalization', () => {
  it('maps section, navGroup, chapter, and stage compatibility inputs to canonical fields', () => {
    expect(normalizeArticle({ title: 'Demo', section: '电源控制', navGroup: '项目实践', chapter: 'projects' }, context)).toMatchObject({
      sectionId: 'power', sectionTitle: '电源控制', routeId: 'project', routeTitle: '项目实践',
      stageId: 'projects', stageTitle: '项目实践', articleId: 'power/projects/demo', title: 'Demo',
      sourcePath: context.sourcePath, slug: context.slug, order: Number.MAX_SAFE_INTEGER, explicitOrder: false,
    })
    expect(normalizeArticle({ title: 'Demo', sectionId: 'power', routeId: 'project', stage: 'projects' }, context).stageId).toBe('projects')
  })

  it('rejects conflicting routeId and navGroup values', () => {
    expect(() => normalizeArticle({ title: 'Demo', routeId: 'debug', navGroup: '项目实践', stage: 'debug-records' }, context)).toThrow(/routeId.*navGroup/i)
  })

  it.each([
    [{ sectionId: 'power', section: '错误栏目', routeId: 'project', stageId: 'projects' }, /section/i],
    [{ sectionId: 'power', routeId: 'project', navGroup: '不存在路线', stageId: 'projects' }, /navGroup/i],
    [{ sectionId: 'power', routeId: 'project', stageId: 'projects', stage: 'debug-records' }, /stageId.*stage/i],
    [{ sectionId: 'power', routeId: 'project', stageId: 'projects', chapter: 'records' }, /stageId.*chapter/i],
  ] as const)('rejects conflicting canonical and compatibility hierarchy input %#', (input, pattern) => {
    expect(() => normalizeArticle({ title: 'Demo', ...input }, context)).toThrow(pattern)
  })

  it.each([
    [{ sectionId: 'power', section: 'Power' }, /section/i],
    [{ routeId: 'project', navGroup: 'Projects' }, /navGroup/i],
    [{ stageId: 'build', stage: 'Build' }, /stageId.*stage/i],
    [{ stageId: 'build', chapter: 'Build' }, /stageId.*chapter/i],
  ] as const)('rejects conflicting dual-source hierarchy input without registry %#', (input, pattern) => {
    expect(() => normalizeArticle({ title: 'Demo', ...input }, { sourcePath: 'content/demo.md', slug: 'demo' })).toThrow(pattern)
  })

  it('rejects an explicit unknown routeId instead of falling back to navGroup', () => {
    expect(() => normalizeArticle({ title: 'Demo', routeId: 'missing', navGroup: '项目实践', stage: 'projects' }, context)).toThrow(/unknown routeId/i)
  })

  it('rejects stage and chapter inputs that do not resolve uniquely', () => {
    const ambiguous = { ...context, column: { ...context.column!, stages: [...context.column!.stages, { id: 'projects-2', title: '项目实践二', order: 30, routeId: 'project', chapter: 'projects' }] } }
    expect(() => normalizeArticle({ title: 'Demo', routeId: 'project', chapter: 'projects' }, ambiguous)).toThrow(/chapter.*unique|ambiguous/i)
  })

  it('requires all four hierarchy levels for public mapped knowledge articles', () => {
    expect(() => normalizeArticle({ title: 'Demo', section: '电源控制', navGroup: '项目实践' }, context)).toThrow(/stageId/i)
  })

  it('allows ordinary blog articles without hierarchy identifiers', () => {
    expect(normalizeArticle({ title: 'Hello', visibility: 'public' }, { sourcePath: 'content/blog/hello.md', slug: 'blog/hello' })).toMatchObject({
      articleId: 'blog/hello', title: 'Hello', visibility: 'public', publicSurface: 'full',
    })
  })

  it('does not promote legacy hierarchy labels from flat columns into canonical knowledge IDs', () => {
    const flatContext: ArticleNormalizationContext = {
      sourcePath: 'content/playground/rendering-fixture.md',
      slug: 'playground/rendering-fixture',
      column: {
        id: 'playground',
        title: '渲染验证',
        section: 'Playground',
        layout: 'flat',
        routes: [],
        stages: [],
      },
    }

    expect(normalizeArticle({ title: 'Fixture', section: 'Playground', chapter: '00-Fixtures' }, flatContext)).toMatchObject({
      sectionId: undefined,
      routeId: undefined,
      stageId: undefined,
      articleId: 'playground/rendering-fixture',
    })
  })

  it('preserves explicit canonical identifiers when no registry context is available', () => {
    expect(normalizeArticle({ title: 'Demo', sectionId: 'motor', routeId: 'foc', stageId: 'current' }, { sourcePath: 'content/motor/demo.md', slug: 'motor/demo' })).toMatchObject({
      sectionId: 'motor', routeId: 'foc', stageId: 'current', articleId: 'motor/demo',
    })
  })

  it('does not reinterpret canonical stageId values as legacy stage titles', () => {
    expect(() => normalizeArticle({ title: 'Demo', sectionId: 'power', routeId: 'project', stageId: '项目实践' }, context)).toThrow(/unknown stageId/i)
  })

  it('rejects canonical sectionId values that conflict with the mapped column', () => {
    expect(() => normalizeArticle({ title: 'Demo', sectionId: 'motor', routeId: 'project', stageId: 'projects' }, context)).toThrow(/sectionId/i)
  })

  it('requires a non-empty canonical articleId in the Astro schema', () => {
    const schema = fs.readFileSync('src/content.config.ts', 'utf8')
    expect(schema).toMatch(/articleId:\s*z\.string\(\)\.min\(1\)/)
    expect(schema).not.toMatch(/articleId:\s*z\.string\(\)\.optional/)
  })

  it.each([
    ['private', 'excluded'],
    ['hidden', 'excluded'],
    ['encrypted', 'placeholder'],
    ['public', 'full'],
  ] as const)('applies the visibility matrix for %s articles', (visibility, publicSurface) => {
    expect(normalizeArticle({ title: 'Demo', visibility, section: '电源控制', navGroup: '项目实践', chapter: 'projects' }, context).publicSurface).toBe(publicSurface)
  })

  it('rejects unknown visibility values instead of publishing them', () => {
    expect(() => normalizeArticle({ title: 'Demo', visibility: 'publci' as never }, { sourcePath: 'content/blog/demo.md', slug: 'blog/demo' })).toThrow(/visibility/i)
  })

  it('keeps the full ArticleRecord canonical contract required', () => {
    const types = fs.readFileSync('scripts/kb/types.ts', 'utf8')
    const record = types.slice(types.indexOf('export interface ArticleRecord'), types.indexOf('export interface CompletionContext'))
    expect(record).toMatch(/order:\s*number/)
    expect(record).toMatch(/explicitOrder:\s*boolean/)
  })

  it('emits canonical hierarchy fields from the article scanner', async () => {
    const { articles } = await scanArticles()
    const knowledge = articles.find((article) => article.path === 'content/power/projects/02-boost-c-firmware-skeleton/README.md')
    expect(knowledge).toMatchObject({
      sectionId: 'power',
      sectionTitle: '电源控制',
      routeId: 'project',
      routeTitle: '项目实践',
      stageId: 'projects',
      stageTitle: '项目实践',
      articleId: 'power/projects/02-boost-c-firmware-skeleton/README',
      slug: 'power/projects/02-boost-c-firmware-skeleton/README',
    })
    expect(knowledge).not.toHaveProperty('section')
    expect(knowledge).not.toHaveProperty('navGroup')
    expect(knowledge).not.toHaveProperty('chapter')
    expect(knowledge).not.toHaveProperty('stage')
    const blog = articles.find((article) => article.path === 'content/blog/hello.md')
    expect(blog?.articleId).toBe('blog/hello')
    expect(blog?.sectionId).toBeUndefined()
  })
})
