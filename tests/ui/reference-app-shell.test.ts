import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('reference Firefly Mod application shell', () => {
  const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
  const articleCatalog = fs.readFileSync('src/components/misc/ArticleCatalog.astro', 'utf8')
  const mainStyles = fs.readFileSync('src/styles/main.css', 'utf8')
  const gridStyles = fs.readFileSync('src/styles/layout/grid.css', 'utf8')
  const contentUtils = fs.readFileSync('src/utils/content-utils.ts', 'utf8')
  const floatingControls = fs.readFileSync('src/components/controls/FloatingControls.astro', 'utf8')
  const animatedTabs = fs.readFileSync('src/components/controls/AnimatedTabs.svelte', 'utf8')

  it('replaces the default fullscreen wallpaper shell with the reference grid', () => {
    expect(layout).toContain('data-firefly-mod-shell')
    expect(layout).toContain('id="main-grid"')
    expect(layout).toContain('id="swup-container"')
    expect(layout).not.toContain('backgroundWallpaper')
    expect(layout).not.toContain('BackgroundPlayer')
    expect(layout).not.toContain('shouldRenderWaves')
    expect(layout).not.toContain('<SideBar')
  })

  it('keeps knowledge navigation and adds the reference article catalog and toc rails', () => {
    expect(layout).toContain('<slot name="knowledge-sidebar"')
    expect(layout).toContain('<ArticleCatalog')
    expect(layout).toContain('id="article-toc-wrapper"')
    expect(articleCatalog).toContain('article-catalog-wrapper')
    expect(articleCatalog).toContain('aria-expanded')
    expect(contentUtils).toContain('getCatalogGroups')
    expect(contentUtils).toMatch(/visibility\s*===\s*["']public["']/)
  })

  it('disposes article rail listeners and pending toc work across Swup replacements', () => {
    expect(articleCatalog).toContain('document.addEventListener("swup:content:replace", dispose')
    expect(layout).toContain('let pendingTocTimer')
    expect(layout).toContain('clearTimeout(pendingTocTimer)')
    expect(layout).not.toContain('document.addEventListener("astro:page-load"')
  })

  it('loads the reference neutral grid stylesheet', () => {
    expect(mainStyles).toContain("@import './layout/grid.css'")
    expect(mainStyles).toContain("@import './navbar.css'")
    expect(gridStyles).toContain('[data-firefly-mod-shell]')
    expect(gridStyles).toContain('.article-toc-wrapper')
    expect(gridStyles).toContain('.knowledge-sidebar-rail')
  })

  it('keeps the active navigation stylesheet without restoring obsolete wallpaper shell CSS', () => {
    expect(mainStyles).toContain("@import './navbar.css'")
    expect(mainStyles).not.toContain("@import './layout-styles.css'")
    expect(mainStyles).not.toContain("@import './banner-title.css'")
    expect(mainStyles).not.toContain("@import './waves.css'")
  })

  it('keeps setting-controlled banner and background selectors in the active grid stylesheet', () => {
    for (const selector of [
      '.banner-home-text-overlay',
      '.banner-title',
      '.mobile-main-no-banner',
      '#header-waves',
      '#wallpaper-gradient',
    ]) {
      expect(gridStyles).toContain(selector)
    }
  })

  it('only imports stylesheets that exist in the workspace', () => {
    const stylesheetImports = [...layout.matchAll(/import\s+["'](@\/styles\/[^"']+)["']/g)]
      .map(([, stylesheet]) => path.join('src', stylesheet.replace('@/', '')))

    expect(stylesheetImports).not.toHaveLength(0)
    expect(stylesheetImports.filter(stylesheet => !fs.existsSync(stylesheet))).toEqual([])
  })

  it('preserves every configured Swup container in the real shell', () => {
    expect(layout).toContain('id="banner-overlay-container"')
    expect(layout).toContain('id="banner-dim-container"')
    expect(layout).toContain('<FloatingControls')
    expect(floatingControls).toContain('FloatingTOC')
    expect(fs.readFileSync('src/components/controls/FloatingTOC.astro', 'utf8')).toContain('id="floating-toc-wrapper"')
  })

  it('uses the reference animated segmented control without tab semantics', () => {
    expect(animatedTabs).toContain('article-index__tab-indicator')
    expect(animatedTabs).toContain('role="group"')
    expect(animatedTabs).toContain('aria-pressed=')
    expect(animatedTabs).toMatch(/transition:\s*transform/)
    expect(animatedTabs).toContain('prefers-reduced-motion: reduce')
    expect(animatedTabs).not.toContain('role="tablist"')
    expect(animatedTabs).not.toContain('aria-selected=')
  })
})
