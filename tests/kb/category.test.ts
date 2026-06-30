import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadInheritedCategoryDefaults } from '../../scripts/kb/category'

describe('category metadata', () => {
  it('inherits parent metadata and lets child metadata override it', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-category-'))
    const content = path.join(root, 'content')
    const child = path.join(content, 'power', 'pfc')
    await fs.mkdir(child, { recursive: true })
    await fs.writeFile(path.join(content, 'power', '.category.yml'), 'category: 电源控制\nsource: power\norder: 10\n')
    await fs.writeFile(path.join(child, '.category.yml'), 'category: PFC\nslug: pfc\n')

    const defaults = await loadInheritedCategoryDefaults(path.join(child, 'note.md'), content)

    expect(defaults.category).toBe('PFC')
    expect(defaults.source).toBe('power')
    expect(defaults.order).toBe(10)
    expect(defaults.slug).toBe('pfc')
  })
})
