import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { exportAstroContent, normalizeMarkdown } from '../../scripts/astro/export-content'

// Windows 普通用户默认无文件 symlink 权限（需开发者模式或管理员），
// 检测一次后用于跳过依赖文件 symlink 的测试。
const canCreateFileSymlink = (() => {
  if (process.platform !== 'win32') return true
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'symlink-probe-'))
  const target = path.join(tmpDir, 'target.txt')
  const link = path.join(tmpDir, 'link.txt')
  fs.writeFileSync(target, 'probe')
  try {
    fs.symlinkSync(target, link, 'file')
    return true
  } catch {
    return false
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 3 })
  }
})()

describe('Astro content export', () => {
  it('maps public frontmatter and redirects legacy source URLs to Astro lowercase routes', async () => {
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
    expect(report.redirects['/content/motor/FOC.html']).toBe('/posts/motor/foc/')
  })

  it('writes canonical hierarchy fields without legacy compatibility fields', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-hierarchy-'))
    fs.mkdirSync(path.join(root, 'content/power/projects'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/power/column.config.json'), JSON.stringify({
      id: 'power', title: '电源控制', section: '电源控制', order: 1, visibility: 'public', layout: 'map',
      routes: [{ id: 'project', title: '项目实践', order: 1 }],
      stages: [{ id: 'projects', title: '项目实践', order: 1, routeId: 'project', pathPrefix: 'content/power/projects' }],
    }), 'utf8')
    fs.writeFileSync(path.join(root, 'content/power/projects/demo.md'), '---\ntitle: Demo\ndate: 2026-07-01\nsection: 电源控制\nnavGroup: 项目实践\nchapter: projects\nvisibility: public\n---\n\n正文', 'utf8')

    const report = await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/power/projects/demo.md'), 'utf8')
    expect(output).toContain('sectionId: power')
    expect(output).toContain('routeId: project')
    expect(output).toContain('stageId: projects')
    expect(output).toContain('articleId: power/projects/demo')
    expect(output).not.toMatch(/^section:/m)
    expect(output).not.toMatch(/^navGroup:/m)
    expect(output).not.toMatch(/^chapter:/m)
  })

  it('preserves quoted numeric article order through the shared normalizer', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-order-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/order.md'), '---\ntitle: Ordered\ndate: 2026-07-01\norder: "7"\n---\n\n正文', 'utf8')

    await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/blog/order.md'), 'utf8')
    expect(output).toContain('order: 7')
  })

  it('declares canonical hierarchy fields in the Astro content schema', () => {
    const schema = fs.readFileSync('src/content.config.ts', 'utf8')
    for (const field of ['sectionId', 'sectionTitle', 'routeId', 'routeTitle', 'stageId', 'stageTitle', 'articleId']) {
      expect(schema).toContain(field + ':')
    }
  })

  it('preserves article code workspace metadata', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-code-workspace-'))
    fs.mkdirSync(path.join(root, 'content', 'motor'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content', 'motor', 'topic.md'), `---
title: Topic
date: 2026-07-01
codeFiles:
  - path: motor/example.c
    label: example.c
    language: c
codeSync:
  - headingId: implementation
    file: motor/example.c
    lines: 4-9
---

# Topic`, 'utf8')

    await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/motor/topic.md'), 'utf8')

    expect(output).toContain('codeFiles:')
    expect(output).toContain('codeSync:')
    expect(output).toContain('headingId: implementation')
  })

  it('keeps compatibility hierarchy fields out of exporter calculations', () => {
    const exporter = fs.readFileSync('scripts/astro/export-content.ts', 'utf8')
    expect(exporter).not.toMatch(/parsed\.data\.(?:section|navGroup|chapter|stage)/)
    expect(exporter).toContain('canonical.sectionId')
    expect(exporter).toContain('canonical.routeId')
    expect(exporter).toContain('canonical.stageId')
  })

  it('exports hidden articles as drafts without treating them as public index entries', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-hidden-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/hidden.md'), '---\ntitle: Hidden\ndate: 2026-07-01\nvisibility: hidden\n---\n\nHIDDEN_BODY', 'utf8')
    await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/blog/hidden.md'), 'utf8')
    expect(output).toContain('draft: true')
    expect(output).toContain('visibility: hidden')
    expect(output).toContain('HIDDEN_BODY')
  })

  it('keeps hidden entries available to the post route without exposing them through public lists', () => {
    const postPage = fs.readFileSync('src/pages/posts/[...slug].astro', 'utf8')
    const contentUtils = fs.readFileSync('src/utils/content-utils.ts', 'utf8')

    expect(postPage).toContain('getRoutablePosts')
    expect(contentUtils).toMatch(/getRoutablePosts[\s\S]*getCollection\(["']posts["']\)/)
    expect(contentUtils).toMatch(/getRawSortedPosts[\s\S]*data\.draft !== true/)
  })

  it('reproduces all baseline-style public attachments in public and dist without deleting built routes', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-public-attachments-'))
    const slideNames = [
      'slide-01-welcome-grid.png',
      'slide-02-dc-motor-control-evolution.png',
      'slide-03-pid-history.png',
      'slide-04-transfer-function-to-ode.png',
      'slide-05-space-age-lqr.png',
      'slide-06-refinery-qpmc.png',
      'slide-07-nonlinear-mpc-manifold.png',
      'slide-08-controller-comparison.png',
      'slide-09-simulator-grid.png',
    ]
    const foundationNames = [
      'per-unit-scaling.svg',
      'q-format-bit-layout.svg',
      'spwm-carrier-animation.svg',
      'svpwm-sector-map.svg',
      'three-level-states.svg',
    ]
    const slidesDir = path.join(root, 'content/motor/controllers-evolution/assets/servo-motor-controllers-slides')
    const foundationsDir = path.join(root, 'content/motor/foundations/assets')
    fs.mkdirSync(slidesDir, { recursive: true })
    fs.mkdirSync(foundationsDir, { recursive: true })
    fs.mkdirSync(path.join(root, 'dist/posts/existing'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/posts/existing/index.html'), 'EXISTING_ASTRO_ROUTE', 'utf8')
    for (const name of slideNames) fs.writeFileSync(path.join(slidesDir, name), `PUBLIC_${name}`, 'utf8')
    for (const name of foundationNames) fs.writeFileSync(path.join(foundationsDir, name), `PUBLIC_${name}`, 'utf8')
    fs.writeFileSync(
      path.join(root, 'content/motor/controllers-evolution/slides.md'),
      slideNames.map((name) => `![slide](assets/servo-motor-controllers-slides/${name})`).join('\n'),
      'utf8',
    )
    fs.writeFileSync(
      path.join(root, 'content/motor/foundations/foundations.md'),
      foundationNames.map((name) => `![foundation](assets/${name})`).join('\n'),
      'utf8',
    )

    await exportAstroContent({ rootDir: root })

    for (const relativePath of [
      ...slideNames.map((name) => `motor/controllers-evolution/assets/servo-motor-controllers-slides/${name}`),
      ...foundationNames.map((name) => `motor/foundations/assets/${name}`),
    ]) {
      expect(fs.readFileSync(path.join(root, 'public/content', relativePath), 'utf8')).toBe(`PUBLIC_${path.basename(relativePath)}`)
      expect(fs.readFileSync(path.join(root, 'dist/content', relativePath), 'utf8')).toBe(`PUBLIC_${path.basename(relativePath)}`)
    }
    expect(fs.readFileSync(path.join(root, 'dist/posts/existing/index.html'), 'utf8')).toBe('EXISTING_ASTRO_ROUTE')
  })

  it('excludes private plaintext and exports encrypted wrappers without their plaintext', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-private-'))
    fs.mkdirSync(path.join(root, 'content/private'), { recursive: true })
    fs.mkdirSync(path.join(root, 'content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/private/secret.md'), 'PRIVATE_SENTINEL', 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/note.md'), `---\ntitle: 加密笔记\ndate: 2026-07-01\nvisibility: encrypted\nsummary: PRIVATE_SUMMARY\ncategory: PRIVATE_CATEGORY\ntags: [PRIVATE_TAG]\n---\n\n![private attachment](./private-diagram.svg)\n\n<EncryptedArticle payload-url="/content/encrypted/note.json" />`, 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/private-diagram.svg'), '<svg>PRIVATE_ATTACHMENT_SENTINEL</svg>', 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/note.json'), JSON.stringify({
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      contentType: 'text/html',
      iterations: 210000,
      salt: Buffer.alloc(16, 1).toString('base64'),
      iv: Buffer.alloc(12, 2).toString('base64'),
      ciphertext: Buffer.alloc(32, 3).toString('base64'),
    }), 'utf8')

    const report = await exportAstroContent({ rootDir: root })
    const generated = fs.readFileSync(path.join(root, 'src/content/posts/encrypted/note.md'), 'utf8')

    expect(report.skippedPrivate).toBe(1)
    expect(report.encrypted).toBe(1)
    expect(generated).not.toContain('PRIVATE_SENTINEL')
    expect(generated).toContain('encryptedPayload: /content/encrypted/note.json')
    expect(generated).toContain('data-pagefind-ignore="all"')
    expect(generated).toContain('description: 该文章已加密，请打开后验证访问权限')
    expect(generated).toContain('category: 加密内容')
    expect(generated).toMatch(/tags:\s*\[\]/)
    expect(generated).not.toContain('PRIVATE_SUMMARY')
    expect(generated).not.toContain('PRIVATE_CATEGORY')
    expect(generated).not.toContain('PRIVATE_TAG')
    expect(fs.readFileSync(path.join(root, 'public/content/encrypted/note.json'), 'utf8')).toContain('ciphertext')
    expect(fs.existsSync(path.join(root, 'public/content/encrypted/private-diagram.svg'))).toBe(false)
    expect(fs.existsSync(path.join(root, 'dist/content/encrypted/private-diagram.svg'))).toBe(false)
  })

  it('fails closed when an encrypted article payload is missing', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-encrypted-missing-'))
    fs.mkdirSync(path.join(root, 'content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/encrypted/note.md'), '---\ntitle: Encrypted\nvisibility: encrypted\n---\n', 'utf8')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/encrypted payload missing/i)
  })

  it('fails closed when an encrypted article payload is malformed or plaintext-shaped', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-encrypted-invalid-'))
    fs.mkdirSync(path.join(root, 'content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/encrypted/note.md'), '---\ntitle: Encrypted\nvisibility: encrypted\n---\n', 'utf8')
    fs.writeFileSync(path.join(root, 'content/encrypted/note.json'), JSON.stringify({ ciphertext: 'not-enough' }), 'utf8')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/invalid encrypted payload/i)
  })

  it('keeps encrypted wrappers out of recommendations and public metadata JSON', () => {
    const contentUtils = fs.readFileSync('src/utils/content-utils.ts', 'utf8')
    const metadataEndpoint = fs.readFileSync('src/pages/data/allPostMeta.json.ts', 'utf8')
    expect(contentUtils).toMatch(/getRelatedPosts[\s\S]*!p\.data\.encryptedPayload/)
    expect(metadataEndpoint).toMatch(/visibility\s*===\s*["']public["']/)
    expect(metadataEndpoint).toMatch(/!post\.data\.encryptedPayload/)
  })

  it('rewrites Markdown documents to Astro post routes while preserving anchors', () => {
    const markdown = '[相邻文章](./next.md#调试)\n\n[上级文章](../power/intro.md)'
    const result = normalizeMarkdown(markdown, 'content/motor/topic.md')

    expect(result.body).toContain('[相邻文章](/posts/motor/next/#调试)')
    expect(result.body).toContain('[上级文章](/posts/power/intro/)')
  })

  it('preserves absolute URI schemes while rewriting relative links', () => {
    const markdown = '[官网](https://example.com/docs?q=1#intro)\n\n[邮箱](mailto:test@example.com)\n\n[相邻](./next.md)'
    const result = normalizeMarkdown(markdown, 'content/motor/topic.md')

    expect(result.body).toContain('[官网](https://example.com/docs?q=1#intro)')
    expect(result.body).toContain('[邮箱](mailto:test@example.com)')
    expect(result.body).toContain('[相邻](/posts/motor/next/)')
    expect(result.rewrittenLinks).toBe(1)
  })

  it('degrades unavailable local source links instead of emitting known 404s', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-missing-link-'))
    fs.mkdirSync(path.join(root, 'content/motor'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/motor/topic.md'), '---\ntitle: Topic\ndate: 2026-07-01\n---\n\n[missing.c](../SDK/missing.c#L10)\n\n[模拟器](/sims/missing.html)', 'utf8')

    await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/motor/topic.md'), 'utf8')

    expect(output).toContain('missing.c')
    expect(output).toContain('模拟器')
    expect(output).not.toContain('](/content/SDK/missing.c')
    expect(output).not.toContain('](/sims/missing.html)')
  })

  it('converts VitePress containers, relative public images and strips scripts', () => {
    const markdown = '::: warning 注意\n小心操作\n:::\n\n![图](./figure.png)\n\n<script>alert(1)</script>'
    const result = normalizeMarkdown(markdown, 'content/motor/topic.md')

    expect(result.body).toContain('> [!WARNING] 注意')
    expect(result.body).toContain('![图](/content/motor/figure.png)')
    expect(result.body).not.toContain('<script>')
  })

  it('preserves unavailable image syntax for the renderer fallback', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-missing-image-'))
    fs.mkdirSync(path.join(root, 'content/power/chunks'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/power/chunks/topic.md'), '---\ntitle: Topic\ndate: 2026-07-01\n---\n\n![source](../assets/page-snapshots/chapter/page-7.png)', 'utf8')

    await exportAstroContent({ rootDir: root })
    const output = fs.readFileSync(path.join(root, 'src/content/posts/power/chunks/topic.md'), 'utf8')

    expect(output).toContain('![source](/content/power/assets/page-snapshots/chapter/page-7.png)')
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

  it('rejects URL-encoded Windows attachment path traversal', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-asset-escape-'))
    fs.mkdirSync(path.join(root, 'content/motor'), { recursive: true })
    fs.writeFileSync(path.join(root, 'secret.txt'), 'SECRET_OUTSIDE_CONTENT', 'utf8')
    fs.writeFileSync(path.join(root, 'content/motor/topic.md'), '![escape](..%5C..%5Csecret.txt)', 'utf8')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/attachment path/i)
    expect(fs.existsSync(path.join(root, 'public/secret.txt'))).toBe(false)
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

  it('removes stale generated posts before exporting current content', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-clean-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.mkdirSync(path.join(root, 'src/content/posts/stale/nested'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/current.md'), '# Current', 'utf8')
    fs.writeFileSync(path.join(root, 'src/content/posts/stale/nested/secret.md'), 'STALE_PRIVATE', 'utf8')
    await exportAstroContent({ rootDir: root })
    expect(fs.existsSync(path.join(root, 'src/content/posts/stale/nested/secret.md'))).toBe(false)
    expect(fs.existsSync(path.join(root, 'src/content/posts/blog/current.md'))).toBe(true)
  })

  it('does not follow generated-directory links outside the workspace while cleaning', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-clean-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-clean-external-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.mkdirSync(path.join(root, 'src/content/posts'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/current.md'), '# Current', 'utf8')
    const victim = path.join(externalRoot, 'keep.txt')
    fs.writeFileSync(victim, 'KEEP_ME', 'utf8')
    const linkedDirectory = path.join(root, 'src/content/posts/external')
    fs.symlinkSync(externalRoot, linkedDirectory, process.platform === 'win32' ? 'junction' : 'dir')

    await exportAstroContent({ rootDir: root })

    expect(fs.readFileSync(victim, 'utf8')).toBe('KEEP_ME')
    expect(fs.existsSync(linkedDirectory)).toBe(false)
  })

  it('rejects generated roots whose parent resolves through a workspace link', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-generated-parent-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-generated-parent-external-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.mkdirSync(path.join(root, 'src'), { recursive: true })
    fs.mkdirSync(path.join(externalRoot, 'posts/stale'), { recursive: true })
    const victim = path.join(externalRoot, 'posts/stale/keep.txt')
    fs.writeFileSync(victim, 'KEEP_ME', 'utf8')
    fs.symlinkSync(externalRoot, path.join(root, 'src/content'), process.platform === 'win32' ? 'junction' : 'dir')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/generated root escaped workspace/i)
    expect(fs.readFileSync(victim, 'utf8')).toBe('KEEP_ME')
  })

  it('does not scan Markdown through a source directory link outside content', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-source-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-source-external-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.writeFileSync(path.join(externalRoot, 'outside.md'), '# Outside', 'utf8')
    fs.symlinkSync(externalRoot, path.join(root, 'content/external'), process.platform === 'win32' ? 'junction' : 'dir')

    await exportAstroContent({ rootDir: root })

    expect(fs.existsSync(path.join(root, 'src/content/posts/external/outside.md'))).toBe(false)
  })

  it('rejects a content root that is itself a workspace link', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-content-root-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-content-root-external-'))
    fs.writeFileSync(path.join(externalRoot, 'outside.md'), '# Outside', 'utf8')
    fs.symlinkSync(externalRoot, path.join(root, 'content'), process.platform === 'win32' ? 'junction' : 'dir')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/content root must not be a symbolic link/i)
    expect(fs.existsSync(path.join(root, 'src/content/posts/outside.md'))).toBe(false)
  })

  it('rejects attachments that resolve through a source link outside content', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-asset-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-asset-external-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/post.md'), '# Post\n\n![Outside](./assets/outside.png)', 'utf8')
    fs.writeFileSync(path.join(externalRoot, 'outside.png'), 'OUTSIDE_ASSET', 'utf8')
    fs.symlinkSync(externalRoot, path.join(root, 'content/blog/assets'), process.platform === 'win32' ? 'junction' : 'dir')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/attachment source escaped content root/i)
    expect(fs.existsSync(path.join(root, 'public/content/blog/assets/outside.png'))).toBe(false)
  })

  it.runIf(canCreateFileSymlink)('rejects encrypted payload links that resolve outside content', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-payload-link-'))
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-payload-external-'))
    fs.mkdirSync(path.join(root, 'content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/encrypted/note.md'), '---\ntitle: Note\nvisibility: encrypted\n---\nEncrypted', 'utf8')
    const externalPayload = path.join(externalRoot, 'note.json')
    fs.writeFileSync(externalPayload, JSON.stringify({
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      contentType: 'text/html',
      iterations: 210000,
      salt: Buffer.alloc(16, 1).toString('base64'),
      iv: Buffer.alloc(12, 2).toString('base64'),
      ciphertext: Buffer.alloc(32, 3).toString('base64'),
    }), 'utf8')
    fs.symlinkSync(externalPayload, path.join(root, 'content/encrypted/note.json'), 'file')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/encrypted payload escaped content root/i)
    expect(fs.existsSync(path.join(root, 'public/content/encrypted/note.json'))).toBe(false)
  })

  it('removes stale production output for private content without deleting unrelated routes', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-dist-clean-'))
    fs.mkdirSync(path.join(root, 'content/blog'), { recursive: true })
    fs.mkdirSync(path.join(root, 'dist/posts/private'), { recursive: true })
    fs.mkdirSync(path.join(root, 'dist/posts/blog/secret'), { recursive: true })
    fs.mkdirSync(path.join(root, 'dist/posts/existing'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content/blog/secret.md'), '---\ntitle: Secret\nvisibility: private\n---\nPRIVATE_BODY', 'utf8')
    fs.writeFileSync(path.join(root, 'dist/posts/private/index.html'), 'STALE_PRIVATE', 'utf8')
    fs.writeFileSync(path.join(root, 'dist/posts/blog/secret/index.html'), 'STALE_PRIVATE', 'utf8')
    fs.writeFileSync(path.join(root, 'dist/posts/existing/index.html'), 'EXISTING_ROUTE', 'utf8')
    await exportAstroContent({ rootDir: root })
    expect(fs.existsSync(path.join(root, 'dist/posts/private/index.html'))).toBe(false)
    expect(fs.existsSync(path.join(root, 'dist/posts/blog/secret/index.html'))).toBe(false)
    expect(fs.existsSync(path.join(root, 'dist/posts/existing/index.html'))).toBe(true)
  })

  it('removes stale compatibility pages that are no longer exported', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-stale-redirect-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.mkdirSync(path.join(root, 'public/content/old'), { recursive: true })
    fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
    fs.writeFileSync(path.join(root, 'public/content/old/removed.html'), 'stale', 'utf8')
    fs.writeFileSync(path.join(root, 'public/tools.html'), 'stale', 'utf8')
    fs.writeFileSync(path.join(root, 'reports/old-url-manifest.json'), JSON.stringify({ '/content/old/removed.html': '/posts/old/removed/' }), 'utf8')

    const report = await exportAstroContent({ rootDir: root })

    expect(fs.existsSync(path.join(root, 'public/content/old/removed.html'))).toBe(false)
    expect(fs.readFileSync(path.join(root, 'public/tools.html'), 'utf8')).toContain('name="robots" content="noindex"')
    expect(report.redirects['/tools.html']).toBeUndefined()
  })

  it('rejects legacy redirect paths that escape generated output roots', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-redirect-boundary-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
    const victim = path.join(root, 'keep.txt')
    fs.writeFileSync(victim, 'KEEP_ME', 'utf8')
    fs.writeFileSync(path.join(root, 'reports/old-url-manifest.json'), JSON.stringify({ '/../keep.txt': '/posts/invalid/' }), 'utf8')

    await expect(exportAstroContent({ rootDir: root })).rejects.toThrow(/unsafe legacy redirect path/i)
    expect(fs.readFileSync(victim, 'utf8')).toBe('KEEP_ME')
  })

  it('preserves independently maintained public root HTML files', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-public-html-'))
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.mkdirSync(path.join(root, 'public'), { recursive: true })
    const manualPage = path.join(root, 'public/manual-tool.html')
    fs.writeFileSync(manualPage, '<main>MANUAL_PAGE</main>', 'utf8')

    await exportAstroContent({ rootDir: root })

    expect(fs.readFileSync(manualPage, 'utf8')).toBe('<main>MANUAL_PAGE</main>')
  })
})
