import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'

describe('article scanning', () => {
  it('scans markdown files, completes missing metadata, and excludes private articles from public records', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-articles-'))
    const content = path.join(root, 'content')
    await fs.mkdir(path.join(content, 'power'), { recursive: true })
    await fs.writeFile(path.join(content, 'power', '.category.yml'), 'category: 电源控制\nsource: power\nvisibility: public\n')
    await fs.writeFile(path.join(content, 'power', 'public.md'), '# Public Note\n\nVisible body.')
    await fs.writeFile(path.join(content, 'power', 'private.md'), '---\nvisibility: private\n---\n\n# Private Note\n')

    const result = await scanArticles({ contentRoot: content })

    expect(result.articles).toHaveLength(1)
    expect(result.articles[0].title).toBe('Public Note')
    expect(result.articles[0].category).toBe('电源控制')
    expect(result.warnings.some((warning) => warning.includes('private.md'))).toBe(true)
  })
})
