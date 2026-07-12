import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const navConfig = fs.readFileSync('src/config/navBarConfig.ts', 'utf8')
const navbar = fs.readFileSync('src/components/layout/Navbar.astro', 'utf8')
const dropdown = fs.readFileSync('src/components/layout/DropdownMenu.astro', 'utf8')
const mobileDock = fs.readFileSync('src/components/layout/MobileDock.astro', 'utf8')
const menuController = fs.readFileSync('src/utils/navigation-menu-controller.ts', 'utf8')
const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
const styles = fs.readFileSync('src/styles/navbar.css', 'utf8')

const requiredTargets = ['/', '/knowledge/', '/list/', '/archive/', '/categories/', '/tags/', '/search/', '/about/', '/friends/']

describe('navigation contract', () => {
  it('provides exactly the requested navigation targets without forbidden entries', () => {
    for (const target of requiredTargets) expect(navConfig).toContain(`url: "${target}"`)
    expect(navConfig).not.toMatch(/RAG|动态留言板|Cloudflare/i)
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
})
