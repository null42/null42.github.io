import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const navConfig = fs.readFileSync('src/config/navBarConfig.ts', 'utf8')
const navbar = fs.readFileSync('src/components/layout/Navbar.astro', 'utf8')
const dropdown = fs.readFileSync('src/components/layout/DropdownMenu.astro', 'utf8')
const mobileDock = fs.readFileSync('src/components/layout/MobileDock.astro', 'utf8')
const menuController = fs.readFileSync('src/utils/navigation-menu-controller.ts', 'utf8')
const linkFilter = fs.existsSync('src/utils/navigation-links.ts')
	? fs.readFileSync('src/utils/navigation-links.ts', 'utf8')
	: ''
const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
const siteConfig = fs.readFileSync('src/config/siteConfig.ts', 'utf8')
const styles = fs.readFileSync('src/styles/navbar.css', 'utf8')
const gridStyles = fs.readFileSync('src/styles/layout/grid.css', 'utf8')

const requiredTargets = ['/', '/knowledge/', '/list/', '/archive/', '/categories/', '/tags/', '/search/', '/about/']

describe('navigation contract', () => {
  it('provides exactly the requested navigation targets without forbidden entries', () => {
    for (const target of requiredTargets) expect(navConfig).toContain(`url: "${target}"`)
    expect(navConfig).not.toMatch(/RAG|动态留言板|Cloudflare/i)
  })

  it('keeps disabled page presets out of rendered desktop and mobile navigation', () => {
    expect(navConfig).toContain('pageKey:')
    expect(siteConfig).toMatch(/bangumi:\s*false/)
    expect(siteConfig).toMatch(/anime:\s*false/)
    expect(siteConfig).toMatch(/friends:\s*true/)
    expect(linkFilter).toContain('filterEnabledNavLinks')
    expect(navbar).toContain('filterEnabledNavLinks(navBarConfig.links, siteConfig.pages)')
    expect(layout).toContain('filterEnabledNavLinks(navBarConfig.links, siteConfig.pages)')
    expect(layout).toContain('<NavMenuPanel links={enabledNavLinks} />')
    expect(layout).not.toContain('<NavMenuPanel links={navBarConfig.links} />')
  })

  it('secures external links opened in a new tab', () => {
    expect(dropdown).toContain('rel={processedLink.external ? "noopener noreferrer" : undefined}')
  })

  it('mounts an accessible mobile-only dock', () => {
    expect(layout).toContain('<MobileDock />')
    expect(mobileDock).toContain('aria-label="移动导航"')
    expect(mobileDock).toContain('aria-expanded=')
    expect(menuController).toContain("event.key === 'Escape'")
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*\.mobile-dock[\s\S]*display:\s*flex/)
    expect(styles).toMatch(/@media \(min-width: 768px\)[\s\S]*\.mobile-dock[\s\S]*display:\s*none/)
  })

  it('uses replaceable handlers so Swup lifecycle initialization is idempotent', () => {
    expect(navbar).toContain('AbortController')
    expect(menuController).toContain('AbortController')
  })

  it('implements the reference three-segment capsule navbar', () => {
    for (const marker of [
      'navbar-segments',
      'navbar-seg--left',
      'navbar-seg--center',
      'navbar-seg--right',
      'navbar-hover-highlight',
      'nav-search-btn__shortcut',
    ]) expect(navbar).toContain(marker)
    expect(styles).toContain('.navbar-segments')
    expect(styles).toContain('#navbar.scrolled .navbar-seg--left')
    expect(styles).toContain('#navbar.scrolled .navbar-seg--right')
    expect(styles).toMatch(/\[data-page-kind=home\][\s\S]*\.navbar-seg[\s\S]*color:\s*white[\s\S]*background:\s*rgba\(10,\s*12,\s*16,\s*\.78\)/)
    expect(styles).toContain('[data-page-kind=home] .navbar-seg .text-black')
    expect(styles).toMatch(/\.navbar-seg \.text-black[\s\S]*color:\s*white\s*!important/)
    expect(styles).toContain('.navbar-seg--center > .dropdown-container > :is(a, button)')
  })

  it('implements the reference five-control mobile dock and accessible tools sheet', () => {
    for (const marker of [
      'mobile-dock__btn--center',
      'mobile-dock-tools-btn',
      'mobile-dock-menu',
      'mobile-dock__overlay',
      'mobile-dock__sheet',
      'mobile-dock__sheet-grid',
    ]) expect(mobileDock).toContain(marker)
    expect(mobileDock).toContain('aria-controls="mobile-dock-sheet"')
    expect(mobileDock).toContain('aria-expanded="false"')
    expect(mobileDock).toContain('import { navigateToPage }')
    expect(mobileDock).not.toContain('window.navigateToPage')
    expect(styles).toContain('.mobile-dock__btn--center')
    expect(styles).toContain('.mobile-dock__sheet.is-open')
  })

  it('replaces every Mobile Dock listener when Swup executes the script again', () => {
    expect(mobileDock).toContain('__mobileDockAbortController')
    expect(mobileDock).toContain('__mobileDockAbortController?.abort()')
    expect(mobileDock).toContain('__mobileDockSwupUnsubscribe?.()')
    expect(mobileDock).toContain('__initMobileDock = initMobileDock')
    expect(mobileDock).toContain('new AbortController()')
    expect(mobileDock).toContain('{ signal }')
    expect(mobileDock).not.toMatch(/document\.addEventListener\(["']keydown["'],\s*\(event\)/)
  })

  it('delegates Mobile Dock actions to real theme, TOC, comment, and navigation controls', () => {
    expect(mobileDock).toContain('getStoredTheme')
    expect(mobileDock).toContain('setTheme')
    expect(mobileDock).toContain('navigateToPage("/")')
    expect(mobileDock).toContain('document.getElementById("floating-toc-btn")')
    expect(mobileDock).toContain('document.getElementById("back-to-comment-btn")')
    expect(mobileDock).toContain('aria-disabled')
    expect(mobileDock).toContain('disabled = !available')
  })

  it('reserves raised-dock height plus the mobile safe area below page content', () => {
    expect(styles).toContain('--mobile-dock-clearance')
    expect(styles).toMatch(/--mobile-dock-clearance:\s*calc\([\s\S]*env\(safe-area-inset-bottom\)[\s\S]*\)/)
    expect(gridStyles).toMatch(/@media \(max-width: 767px\)[\s\S]*#main-grid[\s\S]*padding-bottom:\s*var\(--mobile-dock-clearance/)
  })
})
