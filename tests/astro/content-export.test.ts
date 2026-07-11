import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { exportAstroContent, normalizeMarkdown } from '../../scripts/astro/export-content'

describe('Astro content export', () => {
  it('maps public frontmatter and preserves the source slug', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-export-'))
    const contentDir = path.join(root, 'content')
    fs.mkdirSync(path.join(contentDir, 'motor'), { recursive: true })
    fs.writeFileSync(path.join(contentDir, 'motor', 'FOC.md'), `---\ntitle: FOC 入门\ndate: 2026-07-01\nsummary: 电流环基础\ncategory: 电机控制\ntags: [FOC, 电流环]\ncomments: false\nvisibility: public\n---\n\n正文`, 'utf8')

    const report = await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/motor/FOC.md'), 'utf8')

    expect(output).toContain('published: 2026-07-01')
    expect(output).toContain('description: 电流环基础')
    expect(output).toContain('comment: false')
    expect(output).toContain('draft: false')
    expect(report.converted).toBe(1)
    expect(report.redirects['/content/motor/FOC.html']).toBe('/posts/motor/FOC/')
  })

  it('excludes private plaintext and exports encrypted wrappers without their plaintext', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-private-'))
    fs.mkdirSync(path.join(root, 'content/private'), { recursive: true })
    fs.mkdirSync(path.join(root, 'content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/private/secret.md'), 'PRIVATE_SENTINEL', 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/note.md'), `---\ntitle: 加密笔记\ndate: 2026-07-01\nvisibility: encrypted\n---\n\n<EncryptedArticle payload-url="/content/encrypted/note.json" />`, 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/note.json'), '{"ciphertext":"safe"}', 'utf8')

    const report = await exportAstroContent({ rootDir: root })
    const generated = fs.readFileSync(path.join(root, 'src/content/posts/encrypted/note.md'), 'utf8')

    expect(report.skippedPrivate).toBe(1)
    expect(report.encrypted).toBe(1)
    expect(generated).not.toContain('PRIVATE_SENTINEL')
    expect(generated).toContain('encryptedPayload: /content/encrypted/note.json')
    expect(generated).toContain('data-pagefind-ignore="all"')
    expect(fs.readFileSync(path.join(root, 'public/content/encrypted/note.json'), 'utf8')).toContain('ciphertext')
  })

  it('rewrites Markdown documents to Astro post routes while preserving anchors', () => {
    const markdown = '[相邻文章](./next.md#调试)\n\n[上级文章](../power/intro.md)'
    const result = normalizeMarkdown(markdown, 'content/motor/topic.md')

    expect(result.body).toContain('[相邻文章](/posts/motor/next/#调试)')
    expect(result.body).toContain('[上级文章](/posts/power/intro/)')
  })

  it('converts VitePress containers, relative public images and strips scripts', () => {
    const markdown = '::: warning 注意\n小心操作\n:::\n\n![图](./figure.png)\n\n<script>alert(1)</script>'
    const result = normalizeMarkdown(markdown, 'content/motor/topic.md')

    expect(result.body).toContain('> [!WARNING] 注意')
    expect(result.body).toContain('![图](/content/motor/figure.png)')
    expect(result.body).not.toContain('<script>')
  })

  it('copies referenced local assets and reports missing assets', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-assets-'))
    fs.mkdirSync(path.join(root, 'content/motor'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/motor/topic.md'), '![存在](./figure.png)\n\n![缺失](./missing.png)', 'utf8')
    fs.writeFileSync(path.join(root, 'content/motor/figure.png'), 'image', 'utf8')

    const report = await exportAstroContent({ rootDir: root })

    expect(fs.readFileSync(path.join(root, 'public/content/motor/figure.png'), 'utf8')).toBe('image')
    expect(report.missingAssets).toEqual(['content/motor/missing.png'])
  })

  it('generates root compatibility redirects and static pages', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-redirect-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.mkdirSync(path.join(root, 'public'), { recursive: true })
    fs.writeFileSync(path.join(root, 'public/index.html'), 'stale redirect', 'utf8')

    const report = await exportAstroContent({ rootDir: root })

    expect(report.redirects['/index.html']).toBe('/')
    expect(report.redirects['/archive.html']).toBe('/archive/')
    expect(fs.existsSync(path.join(root, 'public/index.html'))).toBe(false)
    expect(fs.readFileSync(path.join(root, 'public/archive.html'), 'utf8')).toContain('url=/archive/')
    expect(fs.existsSync(path.join(root, 'reports/astro-content-export.json'))).toBe(true)
  })
})
