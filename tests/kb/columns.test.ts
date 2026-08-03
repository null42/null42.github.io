import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { buildColumnFilterOptions, loadColumnRegistry, validateColumnRegistry } from '../../scripts/kb/columns'
import type { ArticleRecord } from '../../scripts/kb/types'

describe('column registry', () => {
  it('requires explicit configuration for every public column', async () => {
    const registry = await loadColumnRegistry()
    const { articles } = await scanArticles()
    const issues = validateColumnRegistry(registry, articles)

    expect(registry.columns.map((column) => column.id)).toContain('motor')
    expect(registry.columns.map((column) => column.id)).toContain('power')
    expect(registry.columns.map((column) => column.id)).toContain('foundations')
    expect(registry.columns.map((column) => column.id)).toContain('blog')
    expect(issues.filter((issue) => issue.code === 'missing-column-config')).toEqual([])
  })

  it('requires mapped columns to expose route and stage hierarchy', async () => {
    const registry = await loadColumnRegistry()
    const mappedColumns = registry.columns.filter((column) => column.visibility !== 'hidden' && column.layout !== 'flat')

    expect(mappedColumns.length).toBeGreaterThan(0)
    for (const column of mappedColumns) {
      expect(column.routes.length, column.id).toBeGreaterThan(0)
      expect(column.stages.length, column.id).toBeGreaterThan(0)
    }
  })

  it('builds search filter choices from column configuration order', async () => {
    const registry = await loadColumnRegistry()
    const { articles } = await scanArticles()
    const options = buildColumnFilterOptions(registry, articles)

    expect(options.sections.map((item) => item.id)).toEqual(['foundations', 'power', 'motor', 'blog'])
    expect(options.sections.map((item) => item.label)).toEqual(['共享基础', '电源控制', '电机控制', '随笔'])
    expect(options.routes.some((item) => item.id === 'motor:control')).toBe(true)
    expect(options.routes.some((item) => item.id === 'foundations:simulation')).toBe(true)
    expect(options.stages.some((item) => item.id === 'motor:algorithm')).toBe(true)
    expect(options.stages.some((item) => item.id === 'foundations:simulation-matlab')).toBe(true)
    expect(options.routes.every((item) => item.count > 0)).toBe(true)
    expect(options.stages.every((item) => item.count > 0)).toBe(true)
  })

  it('counts canonical hierarchy fields without relying on source paths', async () => {
    const registry = await loadColumnRegistry()
    const article = {
      title: 'Canonical', date: '2026-07-19', articleId: 'motor/demo', sectionId: 'motor', sectionTitle: '电机控制',
      routeId: 'control', routeTitle: '控制与算法', stageId: 'algorithm', stageTitle: '控制算法', category: '控制算法',
      tags: [], source: 'test', sourcePath: 'virtual.md', status: 'learning', visibility: 'public', summary: '', path: 'virtual.md',
      url: '/content/virtual.html', body: '', slug: 'motor/demo', publicSurface: 'full', order: Number.MAX_SAFE_INTEGER, explicitOrder: false,
    } satisfies ArticleRecord

    const options = buildColumnFilterOptions(registry, [article])
    expect(options.sections.find((item) => item.id === 'motor')?.count).toBe(1)
    expect(options.routes.find((item) => item.id === 'motor:control')?.count).toBe(1)
    expect(options.stages.find((item) => item.id === 'motor:algorithm')?.count).toBe(1)
  })
})
