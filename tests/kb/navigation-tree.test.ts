import { describe, expect, it } from 'vitest'
import { buildNavigationTree } from '../../scripts/kb/domain/navigation'
import type { CanonicalArticleRecord } from '../../scripts/kb/domain/article-record'

const config = [{
  id: 'power', title: '电源控制', order: 10, allowEmpty: false,
  routes: [{ id: 'project', title: '项目实践', order: 20, allowEmpty: false }],
  stages: [{ id: 'projects', title: '项目实践', order: 30, routeId: 'project', allowEmpty: false }],
}]

const article = (overrides: Partial<CanonicalArticleRecord> = {}): CanonicalArticleRecord => ({
  sectionId: 'power', sectionTitle: '电源控制', routeId: 'project', routeTitle: '项目实践',
  stageId: 'projects', stageTitle: '项目实践', articleId: 'power/projects/demo', title: 'Demo',
  sourcePath: 'content/power/projects/demo.md', slug: 'power/projects/demo', order: 10,
  explicitOrder: true, visibility: 'public', publicSurface: 'full', ...overrides,
})

describe('NavigationTreeBuilder', () => {
  it('builds a deterministic section-route-stage-article tree', () => {
    const tree = buildNavigationTree(config, [article({ articleId: 'power/projects/b', title: 'B', order: 20 }), article({ articleId: 'power/projects/a', title: 'A', order: 10 })])
    expect(tree[0].routes[0].stages[0].articles.map((item) => item.articleId)).toEqual(['power/projects/a', 'power/projects/b'])
  })

  it('includes every public article exactly once and encrypted articles as title-only placeholders', () => {
    const tree = buildNavigationTree(config, [article(), article({ articleId: 'power/projects/secret', title: 'Secret', order: 20, visibility: 'encrypted', publicSurface: 'placeholder' }), article({ articleId: 'power/projects/private', visibility: 'private', publicSurface: 'excluded' })])
    const articles = tree[0].routes[0].stages[0].articles
    expect(articles).toHaveLength(2)
    expect(articles.find((item) => item.articleId.endsWith('secret'))).toMatchObject({ title: 'Secret', placeholder: true })
  })

  it.each([
    ['unknown route', article({ routeId: 'missing' })],
    ['unknown stage', article({ stageId: 'missing' })],
    ['cross parent', article({ routeId: 'other', stageId: 'projects' })],
  ])('rejects %s mappings', (_name, record) => {
    expect(() => buildNavigationTree(config, [record])).toThrow()
  })

  it('rejects duplicate article IDs and duplicate sibling order values', () => {
    expect(() => buildNavigationTree(config, [article(), article({ sourcePath: 'content/power/projects/other.md' })])).toThrow(/duplicate articleId/i)
    expect(() => buildNavigationTree([{ ...config[0], routes: [...config[0].routes, { id: 'debug', title: 'Debug', order: 20, allowEmpty: true }] }], [article()])).toThrow(/duplicate order/i)
  })

  it('allows empty config nodes only when allowEmpty is true', () => {
    expect(() => buildNavigationTree(config, [])).toThrow(/empty/i)
    expect(buildNavigationTree([{ ...config[0], allowEmpty: true, routes: [{ ...config[0].routes[0], allowEmpty: true }], stages: [{ ...config[0].stages[0], allowEmpty: true }] }], [])).toHaveLength(1)
  })

  it('rejects missing hierarchy and duplicate configuration IDs', () => {
    expect(() => buildNavigationTree(config, [article({ stageId: undefined })])).toThrow(/missing hierarchy/i)
    expect(() => buildNavigationTree([...config, { ...config[0] }], [article()])).toThrow(/duplicate section id/i)
    expect(() => buildNavigationTree([{ ...config[0], routes: [...config[0].routes, { ...config[0].routes[0], order: 40 }] }], [article()])).toThrow(/duplicate route .* id/i)
    expect(() => buildNavigationTree([{ ...config[0], stages: [...config[0].stages, { ...config[0].stages[0], order: 40 }] }], [article()])).toThrow(/duplicate stage .* id/i)
  })

  it('rejects route and stage IDs duplicated across sections', () => {
    const secondSection = {
      id: 'motor',
      title: 'Motor',
      order: 20,
      allowEmpty: true,
      routes: [{ id: 'project', title: 'Projects', order: 10, allowEmpty: true }],
      stages: [{ id: 'projects', title: 'Projects', routeId: 'project', order: 10, allowEmpty: true }],
    }

    expect(() => buildNavigationTree([...config, secondSection], [article()])).toThrow(/duplicate route id.*project/i)
    expect(() => buildNavigationTree([...config, {
      ...secondSection,
      routes: [{ id: 'motor-project', title: 'Projects', order: 10, allowEmpty: true }],
      stages: [{ id: 'projects', title: 'Projects', routeId: 'motor-project', order: 10, allowEmpty: true }],
    }], [article()])).toThrow(/duplicate stage id.*projects/i)
  })

  it('rejects duplicate stage order and duplicate explicit article order', () => {
    expect(() => buildNavigationTree([{ ...config[0], stages: [...config[0].stages, { id: 'advanced', title: 'Advanced', routeId: 'project', order: 30, allowEmpty: true }] }], [article()])).toThrow(/duplicate order/i)
    expect(() => buildNavigationTree(config, [article({ articleId: 'power/projects/z', sourcePath: 'content/z.md', order: 10 }), article({ articleId: 'power/projects/a', sourcePath: 'content/a.md', order: 10 })])).toThrow(/duplicate order.*article/i)
  })

  it('sorts missing article order by filename prefix, title, and source path', () => {
    const tree = buildNavigationTree(config, [
      article({ articleId: 'power/projects/ten', title: 'A', sourcePath: 'content/power/projects/10-ten.md', order: Number.MAX_SAFE_INTEGER, explicitOrder: false }),
      article({ articleId: 'power/projects/two-z', title: 'Z', sourcePath: 'content/power/projects/02-z.md', order: Number.MAX_SAFE_INTEGER, explicitOrder: false }),
      article({ articleId: 'power/projects/two-a-2', title: 'A', sourcePath: 'content/power/projects/02-a-2.md', order: Number.MAX_SAFE_INTEGER, explicitOrder: false }),
      article({ articleId: 'power/projects/two-a-1', title: 'A', sourcePath: 'content/power/projects/02-a-1.md', order: Number.MAX_SAFE_INTEGER, explicitOrder: false }),
    ])
    expect(tree[0].routes[0].stages[0].articles.map((item) => item.articleId)).toEqual([
      'power/projects/two-a-1',
      'power/projects/two-a-2',
      'power/projects/two-z',
      'power/projects/ten',
    ])
  })

  it('allows the same stage order under different routes', () => {
    const multiRoute = [{
      ...config[0],
      routes: [...config[0].routes, { id: 'debug', title: 'Debug', order: 40, allowEmpty: true }],
      stages: [...config[0].stages, { id: 'diagnostics', title: 'Diagnostics', routeId: 'debug', order: 30, allowEmpty: true }],
    }]
    expect(buildNavigationTree(multiRoute, [article()])).toHaveLength(1)
  })

  it('maps each included knowledge article exactly once', () => {
    const tree = buildNavigationTree(config, [article({ articleId: 'power/projects/a' }), article({ articleId: 'power/projects/b', order: 20 }), article({ articleId: 'power/projects/hidden', visibility: 'hidden', publicSurface: 'excluded' })])
    const mapped = tree.flatMap((section) => section.routes.flatMap((route) => route.stages.flatMap((stage) => stage.articles)))
    expect(mapped.map((item) => item.articleId)).toEqual(['power/projects/a', 'power/projects/b'])
    expect(new Set(mapped.map((item) => item.articleId)).size).toBe(mapped.length)
  })

  it('sorts missing orders by Unicode code point at all four levels', () => {
    const afterAscii = '\u00e4'
    const unorderedConfig = [{
      id: 'z', title: 'First', allowEmpty: true,
      routes: [{ id: afterAscii, title: 'Second', allowEmpty: true }, { id: 'z', title: 'First', allowEmpty: true }],
      stages: [{ id: afterAscii, title: 'Second', routeId: 'z', allowEmpty: true }, { id: 'z', title: 'First', routeId: 'z', allowEmpty: true }],
    }, {
      id: afterAscii, title: 'Second', allowEmpty: true,
      routes: [{ id: 'only', title: 'Only', allowEmpty: true }],
      stages: [{ id: 'only', title: 'Only', routeId: 'only', allowEmpty: true }],
    }]
    const records = [
      article({ sectionId: 'z', routeId: 'z', stageId: 'z', articleId: afterAscii, title: afterAscii, sourcePath: `content/${afterAscii}.md`, order: Number.POSITIVE_INFINITY, explicitOrder: false }),
      article({ sectionId: 'z', routeId: 'z', stageId: 'z', articleId: 'z', title: 'z', sourcePath: 'content/z.md', order: Number.POSITIVE_INFINITY, explicitOrder: false }),
    ]

    const tree = buildNavigationTree(unorderedConfig, records)
    expect(tree.map((section) => section.id)).toEqual(['z', afterAscii])
    expect(tree[0].routes.map((route) => route.id)).toEqual(['z', afterAscii])
    expect(tree[0].routes[0].stages.map((stage) => stage.id)).toEqual(['z', afterAscii])
    expect(tree[0].routes[0].stages[0].articles.map((item) => item.articleId)).toEqual(['z', afterAscii])
  })
})
