import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { scanMarkdownFiles, writeCompletedFrontmatter } from '../../scripts/kb/articles'

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
    expect(result.articles[0].url).toBe('/content/power/public.html')
    expect(result.warnings.some((warning) => warning.includes('private.md'))).toBe(true)
  })

  it('writes only article frontmatter fields during safe completion', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-fix-'))
    const content = path.join(root, 'content')
    const article = path.join(content, 'power', 'note.md')
    await fs.mkdir(path.dirname(article), { recursive: true })
    await fs.writeFile(
      path.join(content, 'power', '.category.yml'),
      'category: 电源控制\nsource: power\nnavTitle: 电源控制\norder: 10\n'
    )
    await fs.writeFile(article, '# Note\n\nBody.')

    await writeCompletedFrontmatter({ contentRoot: content })
    const [record] = await scanMarkdownFiles({ contentRoot: content })

    expect(record.data.category).toBe('电源控制')
    expect(record.data.source).toBe('power')
    expect(record.data.navTitle).toBeUndefined()
    expect(record.data.order).toBeUndefined()
  })

  it('normalizes existing YAML date objects when writing completed frontmatter', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-date-fix-'))
    const content = path.join(root, 'content')
    const article = path.join(content, 'blog', 'note.md')
    await fs.mkdir(path.dirname(article), { recursive: true })
    await fs.writeFile(article, '---\ntitle: Note\ndate: 2026-06-30\n---\n\n# Note\n\nBody.')

    await writeCompletedFrontmatter({ contentRoot: content })
    const raw = await fs.readFile(article, 'utf8')

    expect(raw).toContain('date: 2026-06-30')
    expect(raw).not.toContain('T00:00:00.000Z')
  })

  it('inherits section and chapter metadata from category files', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-section-chapter-'))
    const content = path.join(root, 'content')
    const chapter = path.join(content, 'power', '02-pfc')
    await fs.mkdir(chapter, { recursive: true })
    await fs.writeFile(path.join(content, 'power', '.category.yml'), 'section: Power\ncategory: Power\nsource: power\n')
    await fs.writeFile(path.join(chapter, '.category.yml'), 'chapter: 02-PFC\nchapterTitle: Power Factor Correction\nchapterOrder: 20\n')
    await fs.writeFile(path.join(chapter, 'current-loop.md'), '# Current Loop\n\nBody.')

    const result = await scanArticles({ contentRoot: content })

    expect(result.articles[0].section).toBe('Power')
    expect(result.articles[0].chapter).toBe('02-PFC')
    expect(result.articles[0].chapterTitle).toBe('Power Factor Correction')
    expect(result.articles[0].chapterOrder).toBe(20)
  })

  it('excludes encrypted wrappers from public article records', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-encrypted-scan-'))
    const content = path.join(root, 'content')
    await fs.mkdir(path.join(content, 'encrypted'), { recursive: true })
    await fs.writeFile(
      path.join(content, 'encrypted', 'note.md'),
      '---\ntitle: Encrypted Note\nvisibility: encrypted\n---\n\n<EncryptedArticle payload-url="/encrypted/note.json" />'
    )

    const result = await scanArticles({ contentRoot: content })

    expect(result.articles).toHaveLength(0)
    expect(result.warnings.some((warning) => warning.includes('visibility is encrypted'))).toBe(true)
  })

  it('skips local templates and internal planning docs during public scanning', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-scan-excluded-'))
    const content = path.join(root, 'content')
    await fs.mkdir(path.join(content, 'power', 'debug-records'), { recursive: true })
    await fs.mkdir(path.join(content, 'power', 'docs', 'superpowers', 'plans'), { recursive: true })
    await fs.writeFile(path.join(content, 'power', 'debug-records', 'template.md'), '# Debug Record: <topic>\n')
    await fs.writeFile(path.join(content, 'power', 'docs', 'superpowers', 'plans', 'plan.md'), '# Internal Plan\n')
    await fs.writeFile(path.join(content, 'power', 'lesson.md'), '# Lesson\n\nVisible body.')

    const result = await scanArticles({ contentRoot: content })

    expect(result.articles.map((article) => article.path)).toEqual(['content/power/lesson.md'])
  })
})
