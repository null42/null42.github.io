import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { buildColumnFilterOptions, loadColumnRegistry, validateColumnRegistry } from '../../scripts/kb/columns'

describe('column registry', () => {
  it('requires explicit configuration for every public column', async () => {
    const registry = await loadColumnRegistry()
    const { articles } = await scanArticles()
    const issues = validateColumnRegistry(registry, articles)

    expect(registry.columns.map((column) => column.id)).toContain('motor')
    expect(registry.columns.map((column) => column.id)).toContain('power')
    expect(registry.columns.map((column) => column.id)).toContain('matlab-simulink')
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

    expect(options.sections.map((item) => item.id)).toEqual(['power', 'motor', 'matlab-simulink', 'blog'])
    expect(options.sections.map((item) => item.label)).toEqual(['电源控制', '电机控制', 'Matlab/Simulink 仿真', '随笔'])
    expect(options.routes.some((item) => item.id === 'motor:control')).toBe(true)
    expect(options.routes.some((item) => item.id === 'matlab-simulink:custom-blocks')).toBe(true)
    expect(options.stages.some((item) => item.id === 'motor:algorithm')).toBe(true)
    expect(options.stages.some((item) => item.id === 'matlab-simulink:s-function')).toBe(true)
    expect(options.routes.every((item) => item.count > 0)).toBe(true)
    expect(options.stages.every((item) => item.count > 0)).toBe(true)
  })
})
