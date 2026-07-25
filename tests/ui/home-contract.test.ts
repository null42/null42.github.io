import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'

const read = (file: string) => fs.readFileSync(file, 'utf8')
const index = read('src/pages/index.astro')
const config = read('src/config/homeConfig.ts')
const components = [
  'HomeHero.astro',
  'HomeTicker.astro',
  'HomeDataLayer.astro',
	'HomeDisplayLayer.astro',
	'HomePortfolioShutterLayer.astro',
	'HomeLatestLayer.astro',
].map(file => read(path.join('src/components/layout', file)))
const homeCss = read('src/styles/home.css')
const homeController = read('src/utils/home-experience-controller.ts')
const backgroundWallpaper = read('src/config/backgroundWallpaper.ts')
const lqips = read('src/constants/lqips.json')
const legacyVitePressTheme = read('.vitepress/theme/kb-theme.ts')
const visualProvenance = JSON.parse(read('reports/firefly-mod-visual-asset-provenance.json')) as {
  source: { commit: string; license: string; licenseNotice: string; licenseNoticeReference: string }
  assets: Array<{ sourceSha256?: string; sha256: string; targetPath: string; transformation?: string }>
}
const hero = components[0]

function mediaBlock(css: string, query: RegExp): string {
  const match = query.exec(css)
  if (!match) return ''
  let depth = 1
  for (let cursor = match.index + match[0].length; cursor < css.length; cursor += 1) {
    if (css[cursor] === '{') depth += 1
    if (css[cursor] === '}') depth -= 1
    if (depth === 0) return css.slice(match.index + match[0].length, cursor)
  }
  return ''
}

describe('branded home page contract', () => {
  it('uses the V2.2.2 character composition as the primary hero visual', () => {
    expect(config).toContain('/assets/images/firefly-v22/home-hero.webp')
    expect(hero).toContain('v22-character')
    expect(hero).toContain('home-hero__soft-light')
    expect(hero).not.toContain('home-hero__grid')
    expect(hero).not.toContain('home-rain')
    expect(hero).not.toContain('home-hero__camera-params')
    expect(hero).not.toContain('home-hero__focus-frame')
    expect(hero).not.toContain('home-hero__right-panel')
    expect(homeCss).not.toMatch(/home-hero__viewfinder|home-hero__camera-params|home-hero__focus-frame|home-hero__right-panel|home-rain-fall/)
  })

  it('composes the complete V2.2.2 scroll story inside the existing application shell', () => {
    expect(index).toContain('<MainGridLayout>')
    for (const component of ['HomeHero', 'HomeTicker', 'HomeDataLayer', 'HomeDisplayLayer', 'HomePortfolioShutterLayer', 'HomeLatestLayer']) {
      expect(index).toMatch(new RegExp(`<${component}(?:\\s+[^>]*)?\\s*/>`))
    }
    expect(components.map(source => source.match(/data-home-section="([^"]+)"/)?.[1])).toEqual([
      'hero', 'ticker', 'data', 'display', 'shutter', 'latest',
    ])
    expect(index).not.toContain('PostPage')
  })

  it('drives all visible copy, metrics, links and media from a complete typed config', () => {
    for (const source of components) expect(source).toContain('homeConfig')
    expect(config).toMatch(/export interface HomeConfig/)
    expect(config).toMatch(/satisfies HomeConfig/)
    expect(config).toMatch(/brand:\s*"null42"/)
    expect(config).not.toMatch(/metrics:\s*\[/)
    expect(config).toMatch(/links:\s*\[/)
    expect(config).toMatch(/media:\s*\{/)
    expect(config).toMatch(/labels:\s*\{/)
    expect(components.join('\n')).not.toMatch(/https?:\/\//)
    expect(components.join('\n')).not.toMatch(/DATA \/ PRACTICE|用可检查的数据|首页主要入口|知识库原则|00 — 01/)
  })

  it('contains no reference-author identity or private resource residue', () => {
    const source = [index, config, ...components, homeCss].join('\n')
    expect(source).not.toMatch(/MmzMing|fqzlr|20447289|co\.tsh520\.cn/i)
    expect(source).not.toMatch(/(?:qq|bilibili|github)\.com\/(?:MmzMing|fqzlr)/i)
  })

  it('defines intrinsic dimensions and explicit loading semantics for every image', () => {
    const images = components.join('\n').match(/<img[\s\S]*?>/g) ?? []
    expect(images.length).toBeGreaterThan(1)
    expect(images.filter(image => /loading="eager"/.test(image))).toHaveLength(1)
    expect(images.filter(image => /loading="lazy"/.test(image)).length).toBeGreaterThanOrEqual(1)
    expect(images.filter(image => /loading="eager"/.test(image))[0]).toMatch(/fetchpriority="high"/)
    for (const image of images) {
      expect(image).toMatch(/width=\{homeConfig\.media\.[a-z]+\.width\}/)
      expect(image).toMatch(/height=\{homeConfig\.media\.[a-z]+\.height\}/)
      expect(image).toMatch(/alt=\{homeConfig\.media\.[a-z]+\.alt\}/)
      expect(image).toMatch(/loading="(?:eager|lazy)"/)
    }
  })

  it('disables expensive effects at 390px and all nonessential motion for reduced motion', () => {
    const mobile = mediaBlock(homeCss, /@media\s*\(max-width:\s*767px\)\s*\{/)
    expect(mobile).toMatch(/\.home-hero__soft-light[\s\S]*display:\s*none/)
    expect(mobile).toMatch(/\.home-display-shutter[\s\S]*display:\s*none/)
    expect(components[3]).not.toMatch(/<video\b/)
    expect(homeCss).not.toContain('home-background-video')

    const reduced = mediaBlock(homeCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/)
    expect(reduced).toMatch(/animation:\s*none\s*!important/)
    expect(reduced).toMatch(/scroll-behavior:\s*auto\s*!important/)
    expect(reduced).not.toMatch(/\.home-page\s+\*[^}]*transform:\s*none\s*!important/)
    expect(reduced).toMatch(/\.home-ticker__track[^}]*animation:\s*none\s*!important/)
    expect(homeCss).toMatch(/\.home-hero__floating-dock\s*\{[^}]*transform:\s*translateY\(-50%\)/)
  })

  it('exposes resilient content and delegates lifecycle ownership to the global layout', () => {
    const layout = read('src/layouts/Layout.astro')
    expect(config).toMatch(/href:\s*"\/list\/"/)
    expect(config).toMatch(/href:\s*"\/knowledge\/"/)
    expect(index).not.toMatch(/client:(?:only|load)/)
    expect(index).not.toContain('initHomeExperience')
    expect(layout).toContain('initHomeExperienceLifecycle')
    expect(homeController).toMatch(/hooks\.on\("content:replace"/)
  })

  it('uses one h1 and a JS-backed dynamic viewport fallback', () => {
    expect(components.join('\n').match(/<h1\b/g)).toHaveLength(1)
    expect(homeCss).toMatch(/min-height:\s*var\(--home-viewport-height,\s*100dvh\)/)
  })

  it('implements the V2.2.2 character hero, dialogue deck, and layered portfolio narrative', () => {
    const displayLayer = components[3]
    const dataLayer = components[2]
    const shutterLayer = components[4]
    for (const marker of [
      'home-hero__media',
      'home-hero__soft-light',
      'home-hero-dialogue',
      'home-hero__floating-dock',
    ]) expect(hero).toContain(marker)
    expect(dataLayer).toContain('home-data__matrix')
    expect(displayLayer).toContain('home-display-shutter')
    expect(displayLayer).not.toContain('home-portfolio-shutter home-shutter')
    expect(shutterLayer).toContain('home-portfolio-shutter')
    expect(shutterLayer).not.toContain('home-portfolio-shutter home-shutter')
    expect(shutterLayer).toContain('href={item.href}')
    expect(config).toContain('href: "/knowledge/"')
    expect(config).toContain('heroHud:')
  })

  it('keeps every reused visual asset traceable to the pinned licensed source', () => {
    const licenseNotice = fs.readFileSync(visualProvenance.source.licenseNotice, 'utf8')
    expect(visualProvenance.source.commit).toBe('65d6daf637e3e3dda460e012b4ef4ff418796dfc')
    expect(visualProvenance.source.license).toBe('MIT')
    expect(fs.existsSync(visualProvenance.source.licenseNotice)).toBe(true)
    expect(licenseNotice).toContain(visualProvenance.source.licenseNoticeReference)
    expect(licenseNotice).toContain('fqzlr/my-blog')
    expect(licenseNotice).toContain(visualProvenance.source.commit)
    expect(licenseNotice).toContain('MIT License')
    expect(licenseNotice).toContain('Copyright (c) 2024 saicaca')
    expect(licenseNotice).toContain('Copyright (c) 2025 CuteLeaf')

    for (const asset of visualProvenance.assets) {
      expect(asset.sourceSha256).toMatch(/^[a-f0-9]{64}$/)
      expect(fs.existsSync(asset.targetPath)).toBe(true)
      const targetSha256 = createHash('sha256').update(fs.readFileSync(asset.targetPath)).digest('hex')
      expect(targetSha256).toBe(asset.sha256)
      if (asset.sourceSha256 !== asset.sha256) expect(asset.transformation?.trim()).toBeTruthy()
    }
  })

  it('keeps a pinned V2.2.2 screenshot comparison record with the current captures', () => {
    const comparisonPath = 'reports/visual-baseline/2026-07-25-v22-home/comparison.json'
    expect(fs.existsSync(comparisonPath)).toBe(true)
    const comparison = JSON.parse(read(comparisonPath)) as {
      source: { repository: string; commit: string }
      pairs: Array<{ reference: string; current: string; viewportClass: string }>
    }
    expect(comparison.source).toMatchObject({
      repository: 'fqzlr/my-blog',
      commit: '65d6daf637e3e3dda460e012b4ef4ff418796dfc',
    })
    expect(comparison.pairs.length).toBeGreaterThan(0)
    expect(new Set(comparison.pairs.map((pair) => pair.viewportClass))).toEqual(
      new Set(['desktop', 'tablet', 'mobile']),
    )
    for (const pair of comparison.pairs) {
      expect(fs.existsSync(pair.reference)).toBe(true)
      expect(fs.existsSync(pair.current)).toBe(true)
    }
  })

  it('adds build-derived latest article links without disabled feature entries', () => {
    const latestLayer = components[5]
    expect(index).toContain('getSortedPosts')
    expect(index).toContain('isPublicArticle')
    expect(index).toContain('latestPosts')
    expect(latestLayer).toContain('posts.map')
    expect(latestLayer).toContain('href={post.href}')
  })

  it('does not expose disabled feature shells or the removed Rikka asset', () => {
    expect(index).not.toContain('HomeFeatureLayer')
    expect(config).not.toMatch(/\/gallery\/|\/friends\/|\/guestbook\/|\/sponsor\/|\/ai\/|STATIC|SHELL|home-01\.webp/)
    expect(backgroundWallpaper).not.toContain('home-01.webp')
    expect(lqips).not.toContain('home-01.webp')
    expect(legacyVitePressTheme).not.toMatch(/home-01\.webp|宝多六花|Rikka|Takarada/i)
    expect(fs.existsSync('public/images/home/home-01.webp')).toBe(false)
  })

  it('builds homepage metrics from canonical public content and versioned reports', () => {
    const dataLayer = components[2]
    expect(index).toContain('migration-baseline.json')
    expect(index).toContain('knowledge-navigation-coverage.json')
    expect(index).toContain('publicPosts.length')
    expect(index).toContain('coverageReport.counts.sections')
    expect(index).toContain('migrationBaseline.counts.attachments')
    expect(index).toContain('<HomeDataLayer metrics={homeMetrics} />')
    expect(dataLayer).toContain('interface Props')
    expect(dataLayer).toContain('const { metrics } = Astro.props')
    expect(dataLayer).not.toContain('homeConfig.metrics')
  })

  it('uses honest, operable hero controls instead of decorative fake buttons', () => {
    const hero = components[0]
    expect(hero).toMatch(/<button[^>]+data-home-dialogue-action="back"/)
    expect(hero).toMatch(/<button[^>]+data-home-dialogue-action="auto"[^>]+aria-pressed="false"/)
    expect(hero).toMatch(/<button[^>]+data-home-dialogue-action="hide"/)
    expect(hero).not.toMatch(/home-hero-dialogue__controls"\s+aria-hidden="true"/)
    expect(hero).toMatch(/href="\/search\/"/)
    expect(hero).toMatch(/href="\/list\/"/)
    expect(hero).toMatch(/data-home-hud-action="toggle"/)
    expect(homeController).toContain('data-home-dialogue-action')
    expect(homeController).toContain('renderDialogue(Math.max(0, dialogueIndex - 1), false)')
    expect(homeCss).toMatch(/\.home-hero-dialogue__controls\s*\{[^}]*position:\s*static/)
  })

  it('restores a controller-driven four-chapter scroll narrative with reduced-motion fallback', () => {
    expect(homeController).toContain('IntersectionObserver')
    expect(homeController).toContain('--home-scroll-progress')
    expect(homeController).toContain('prefers-reduced-motion: reduce')
    expect(homeCss).toMatch(/\.home-data__layout[\s\S]*position:\s*sticky/)
    expect(homeCss).toMatch(/\.home-display__stage[\s\S]*position:\s*sticky/)
    expect(homeCss).toMatch(/\[data-home-section="data"\][\s\S]*min-height:/)
    expect(homeCss).toMatch(/\[data-home-section="display"\][\s\S]*min-height:/)
  })
})
