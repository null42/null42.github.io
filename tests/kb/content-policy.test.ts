import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { exportAstroContent } from '../../scripts/astro/export-content'
import { scanArticles } from '../../scripts/kb/articles'
import { nonPublicContentPatterns, shouldExcludeContentPath } from '../../scripts/kb/content-exclusions'
import { resolveMigrationSources } from '../../scripts/kb/migrate'
import * as articleNormalization from '../../scripts/kb/domain/normalize-article'

const emojiPattern = /(?:\p{Extended_Pictographic}|[\u{1F000}-\u{1FAFF}]|[\u2600-\u27BF]\uFE0F?|\uFE0F|\u200D)/gu
const numericEntityPattern = /&#(x[0-9a-f]+|\d+);/giu

describe('content publishing policy', () => {
  it('defines one explicit visibility decision for every public surface', () => {
    const decideVisibility = (articleNormalization as typeof articleNormalization & {
      decideVisibility?: (visibility: 'public' | 'hidden' | 'private' | 'encrypted') => Record<string, boolean | string>
    }).decideVisibility
    expect(decideVisibility).toBeTypeOf('function')
    if (!decideVisibility) return

    expect(decideVisibility('public')).toMatchObject({
      html: true, pagefind: true, sitemap: true, navigation: true, summary: true,
      attachments: true, encryptedPayload: false, jsonLd: true, publicSurface: 'full',
    })
    expect(decideVisibility('hidden')).toMatchObject({
      html: true, pagefind: false, sitemap: false, navigation: false, summary: false,
      attachments: true, encryptedPayload: false, jsonLd: false, publicSurface: 'excluded',
    })
    expect(decideVisibility('private')).toMatchObject({
      html: false, pagefind: false, sitemap: false, navigation: false, summary: false,
      attachments: false, encryptedPayload: false, jsonLd: false, publicSurface: 'excluded',
    })
    expect(decideVisibility('encrypted')).toMatchObject({
      html: true, pagefind: false, sitemap: false, navigation: true, summary: false,
      attachments: false, encryptedPayload: true, jsonLd: false, publicSurface: 'placeholder',
    })
  })

  it('applies the visibility matrix to generated Markdown, summaries, attachments, and payloads', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'visibility-export-'))
    const contentRoot = path.join(root, 'content')
    fs.mkdirSync(path.join(contentRoot, 'mixed', 'assets'), { recursive: true })
    fs.mkdirSync(path.join(contentRoot, 'encrypted'), { recursive: true })
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'assets', 'public.txt'), 'PUBLIC_ATTACHMENT', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'assets', 'hidden.txt'), 'HIDDEN_ATTACHMENT', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'assets', 'private.txt'), 'PRIVATE_ATTACHMENT', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'assets', 'encrypted.txt'), 'ENCRYPTED_ATTACHMENT', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'public.md'), '---\ntitle: Public\ndate: 2026-07-01\nvisibility: public\nsummary: PUBLIC_SUMMARY\n---\n\nPUBLIC_BODY\n\n![asset](./assets/public.txt)', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'hidden.md'), '---\ntitle: Hidden\ndate: 2026-07-01\nvisibility: hidden\nsummary: HIDDEN_SUMMARY\n---\n\nHIDDEN_BODY\n\n![asset](./assets/hidden.txt)', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'private.md'), '---\ntitle: Private\ndate: 2026-07-01\nvisibility: private\nsummary: PRIVATE_SUMMARY\n---\n\nPRIVATE_BODY\n\n![asset](./assets/private.txt)', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'encrypted.md'), '---\ntitle: Encrypted\ndate: 2026-07-01\nupdated: 2026-07-02\nvisibility: encrypted\nsummary: ENCRYPTED_SUMMARY\ntags: [ENCRYPTED_TAG]\ndifficulty: ENCRYPTED_DIFFICULTY\nquality: draft\n---\n\nENCRYPTED_BODY\n\n![asset](./assets/encrypted.txt)', 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'mixed', 'encrypted.json'), JSON.stringify({
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      contentType: 'text/html',
      iterations: 210000,
      salt: Buffer.alloc(16, 1).toString('base64'),
      iv: Buffer.alloc(12, 2).toString('base64'),
      ciphertext: Buffer.alloc(32, 3).toString('base64'),
    }), 'utf8')
    fs.writeFileSync(path.join(contentRoot, 'encrypted', 'public-in-encrypted-dir.md'), '---\ntitle: Directory Is Not Policy\ndate: 2026-07-01\nvisibility: public\nsummary: DIRECTORY_PUBLIC_SUMMARY\n---\n\nDIRECTORY_PUBLIC_BODY', 'utf8')

    await exportAstroContent({ rootDir: root })

    const generatedRoot = path.join(root, 'src', 'content', 'posts')
    const publicMarkdown = fs.readFileSync(path.join(generatedRoot, 'mixed', 'public.md'), 'utf8')
    const hiddenMarkdown = fs.readFileSync(path.join(generatedRoot, 'mixed', 'hidden.md'), 'utf8')
    const encryptedMarkdown = fs.readFileSync(path.join(generatedRoot, 'mixed', 'encrypted.md'), 'utf8')
    const directoryPublicMarkdown = fs.readFileSync(path.join(generatedRoot, 'encrypted', 'public-in-encrypted-dir.md'), 'utf8')

    expect(publicMarkdown).toContain('PUBLIC_SUMMARY')
    expect(publicMarkdown).toContain('PUBLIC_BODY')
    expect(hiddenMarkdown).toContain('HIDDEN_BODY')
    expect(hiddenMarkdown).not.toContain('HIDDEN_SUMMARY')
    expect(fs.existsSync(path.join(generatedRoot, 'mixed', 'private.md'))).toBe(false)
    expect(encryptedMarkdown).toContain('encryptedPayload: /content/mixed/encrypted.json')
    expect(encryptedMarkdown).toContain('data-pagefind-ignore="all"')
    expect(encryptedMarkdown).not.toMatch(/ENCRYPTED_(?:BODY|SUMMARY|TAG|ATTACHMENT)/)
    expect(encryptedMarkdown).not.toContain('published: 2026-07-01')
    expect(encryptedMarkdown).not.toContain('updated:')
    expect(encryptedMarkdown).not.toContain('difficulty:')
    expect(encryptedMarkdown).not.toContain('quality:')
    expect(directoryPublicMarkdown).toContain('DIRECTORY_PUBLIC_SUMMARY')
    expect(directoryPublicMarkdown).toContain('DIRECTORY_PUBLIC_BODY')

    expect(fs.readFileSync(path.join(root, 'public', 'content', 'mixed', 'assets', 'public.txt'), 'utf8')).toBe('PUBLIC_ATTACHMENT')
    expect(fs.readFileSync(path.join(root, 'public', 'content', 'mixed', 'assets', 'hidden.txt'), 'utf8')).toBe('HIDDEN_ATTACHMENT')
    expect(fs.existsSync(path.join(root, 'public', 'content', 'mixed', 'assets', 'private.txt'))).toBe(false)
    expect(fs.existsSync(path.join(root, 'public', 'content', 'mixed', 'assets', 'encrypted.txt'))).toBe(false)
    expect(fs.readFileSync(path.join(root, 'public', 'content', 'mixed', 'encrypted.json'), 'utf8')).toContain('ciphertext')
  })

  it('excludes rough power imports from public indexes', () => {
    expect(shouldExcludeContentPath('content/power/fundamentals-work/chunks/001-preface.md')).toBe(true)
    expect(shouldExcludeContentPath('content/power/concepts/boost-converter.md')).toBe(true)
    expect(shouldExcludeContentPath('content/power/lessons/0001-boost-converter.md')).toBe(true)
  })

  it('keeps curated power notes public', () => {
    expect(shouldExcludeContentPath('content/power/archive/old-learning-records/0001-ups-system-overview.md')).toBe(false)
    expect(shouldExcludeContentPath('content/power/projects/01-boost-basics/README.md')).toBe(false)
    expect(shouldExcludeContentPath('content/power/roadmap/30-day-plan.md')).toBe(false)
  })

  it('uses the real motor knowledge base instead of simulation components', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('motor-control-knowledge-base')
    expect(migrate).not.toContain('motor-learning-web')
    expect(migrate).not.toContain('*Sim.vue')
  })

  it('keeps tracked knowledge scripts free of literal Windows absolute paths', () => {
    const scripts = [
      'scripts/kb/migrate.ts',
      'scripts/kb/import/inspect-source.ts',
      'scripts/kb/check.ts'
    ]
    const literalWindowsAbsolutePath = /["'`]([a-z]):[\\/]/gi

    for (const script of scripts) {
      expect(fs.readFileSync(script, 'utf8'), script).not.toMatch(literalWindowsAbsolutePath)
    }
  })

  it('requires explicit source-root configuration without reviving the old motor source', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')
    const inspect = fs.readFileSync('scripts/kb/import/inspect-source.ts', 'utf8')

    for (const source of [migrate, inspect]) {
      expect(source).toContain('KB_POWER_SOURCE_ROOT')
      expect(source).toContain('KB_MOTOR_SOURCE_ROOT')
      expect(source).toContain('motor-control-knowledge-base')
      expect(source).not.toContain('motor-learning-web')
    }
    expect(migrate).toContain('KB_MOTOR_SLIDES_ROOT')
    expect(migrate).toContain("readOption(argv, '--power-root')")
    expect(migrate).toContain("readOption(argv, '--motor-root')")
    expect(migrate).toContain("readOption(argv, '--motor-slides-root')")
  })

  it('consumes explicit migration roots and remains empty without configuration', () => {
    const sources = resolveMigrationSources(
      ['--motor-root', 'cli-motor'],
      {
        KB_POWER_SOURCE_ROOT: 'env-power',
        KB_MOTOR_SOURCE_ROOT: 'env-motor',
        KB_MOTOR_SLIDES_ROOT: 'env-slides'
      }
    )
    const motor = sources.find((source) => source.name === 'motor')

    expect(sources.find((source) => source.name === 'power')?.root).toBe('env-power')
    expect(motor?.root).toBe('cli-motor')
    expect(motor?.label).toBe('motor-control-knowledge-base')
    expect(motor?.extraCopies?.[0]?.from).toBe('env-slides')
    expect(resolveMigrationSources([], {})).toEqual([])
  })

  it('filters project-management noise from imported knowledge bases', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('**/CONTRIBUTING.md')
    expect(migrate).toContain('**/HANDOVER.md')
    expect(migrate).toContain('**/TEMPLATE-*.md')
    expect(migrate).toContain('**/*release-checklist.md')
  })

  it('keeps source-adjacent motor examples as static reference files', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('**/*.{md,html,png,jpg,jpeg,gif,svg,yaml,yml,json,c,h,hpp,cpp,rst}')
    expect(migrate).toContain('**/_proofs/**')
    expect(migrate).toContain('**/datasets/**')
    expect(migrate).toContain('**/reports/**')
    expect(migrate).toContain('**/schemas/**')
  })

  it('does not expose the old motor web source name in public indexes', async () => {
    const { articles } = await scanArticles()

    expect(JSON.stringify(articles)).not.toContain('motor-learning-web')
  })

  it('keeps real motor simulation chapters while excluding old web simulations', async () => {
    const { articles } = await scanArticles()
    const paths = articles.map((article) => article.path.replace(/\\/g, '/'))

    expect(paths.some((item) => item.startsWith('content/motor/simulation/'))).toBe(true)
    expect(paths.some((item) => item.startsWith('content/motor/simulations/'))).toBe(false)
  })

  it('keeps unfinished power drafts out of generated public articles', async () => {
    const { articles } = await scanArticles()
    const paths = articles.map((article) => article.path.replace(/\\/g, '/'))

    expect(paths.some((item) => item.startsWith('content/power/fundamentals-work/'))).toBe(false)
    expect(paths.some((item) => item.startsWith('content/power/concepts/'))).toBe(false)
    expect(paths.some((item) => item.startsWith('content/power/lessons/'))).toBe(false)
  })

  it('does not publish local filesystem links or old motor source references', async () => {
    const { articles } = await scanArticles()
    const publicPayload = JSON.stringify(articles)

    expect(publicPayload).not.toContain('file:///')
    expect(publicPayload).not.toContain('motor-learning-web')
    expect(publicPayload).not.toContain('content/motor/simulations/')
  })

  it('keeps handoff and agent planning notes out of the published VitePress source set', () => {
    expect(nonPublicContentPatterns).toContain('docs/handoff-*.md')
    expect(nonPublicContentPatterns).toContain('docs/superpowers/**')
  })

  it('keeps local tool and reference archives out of the legacy VitePress source set', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')
    expect(config).toContain("'env/**'")
  })

  it('keeps public article markdown free of emoji', async () => {
    const { articles } = await scanArticles()
    const offenders = articles.flatMap((article) => {
      const text = fs.readFileSync(article.path, 'utf8')
      const matches = [...new Set(text.match(emojiPattern) || [])]
      const entityMatches = findEmojiEntities(text)
      const allMatches = [...matches, ...entityMatches]
      return allMatches.length ? [`${article.path}: ${allMatches.join(' ')}`] : []
    })

    expect(offenders).toEqual([])
  })

  it('keeps homepage learning-map article links curated', async () => {
    const home = fs.readFileSync('index.md', 'utf8')
    const { articles } = await scanArticles()
    const byUrl = new Map(articles.map((article) => [article.url, article]))
    const publicHomeLinks = [...home.matchAll(/href="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((url) => url.startsWith('/content/') && !url.startsWith('/content/encrypted/'))
    const offenders = publicHomeLinks
      .map((url) => byUrl.get(url))
      .filter((article) => article && article.quality !== 'curated')
      .map((article) => `${article?.url}: ${article?.quality}`)

    expect(offenders).toEqual([])
  })
})

function findEmojiEntities(text: string): string[] {
  const matches = new Set<string>()
  for (const match of text.matchAll(numericEntityPattern)) {
    const raw = match[1]
    const codePoint = raw.toLowerCase().startsWith('x')
      ? Number.parseInt(raw.slice(1), 16)
      : Number.parseInt(raw, 10)
    if (isEmojiCodePoint(codePoint)) matches.add(match[0])
  }
  return [...matches]
}

function isEmojiCodePoint(codePoint: number): boolean {
  return /\p{Extended_Pictographic}/u.test(String.fromCodePoint(codePoint))
    || (codePoint >= 0x1f000 && codePoint <= 0x1faff)
    || (codePoint >= 0x2600 && codePoint <= 0x27bf)
}
