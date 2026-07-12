// @vitest-environment happy-dom
import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initNavigationMenu } from '../../src/utils/navigation-menu-controller'

function mountNavigation() {
  document.body.innerHTML = `
    <button id="nav-menu-switch" aria-controls="nav-menu-panel" aria-expanded="false">Top</button>
    <button id="mobile-dock-menu" aria-controls="nav-menu-panel" aria-expanded="false">Dock</button>
    <div id="nav-menu-panel" class="float-panel float-panel-closed" aria-hidden="true" inert hidden>
      <a href="/knowledge/">Knowledge</a>
    </div>
    <button id="outside">Outside</button>
  `
}

beforeEach(mountNavigation)
afterEach(() => {
  window.navigationMenuController?.dispose()
  vi.restoreAllMocks()
})

describe('navigation menu interactions', () => {
  it('keeps the menu open after the Dock click and synchronizes both triggers', () => {
    initNavigationMenu()
    document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!.click()

    const panel = document.querySelector<HTMLElement>('#nav-menu-panel')!
    expect(panel.classList.contains('float-panel-closed')).toBe(false)
    expect(panel.hidden).toBe(false)
    expect(panel.hasAttribute('inert')).toBe(false)
    expect(panel.getAttribute('aria-hidden')).toBe('false')
    expect(document.querySelector('#mobile-dock-menu')!.getAttribute('aria-expanded')).toBe('true')
    expect(document.querySelector('#nav-menu-switch')!.getAttribute('aria-expanded')).toBe('true')
  })

  it('closes from outside click and Escape, synchronizes state, and restores Escape focus', () => {
    initNavigationMenu()
    const top = document.querySelector<HTMLButtonElement>('#nav-menu-switch')!
    const dock = document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!
    const panel = document.querySelector<HTMLElement>('#nav-menu-panel')!

    top.click()
    document.querySelector<HTMLButtonElement>('#outside')!.click()
    expect(panel.hasAttribute('inert')).toBe(true)
    expect(panel.getAttribute('aria-hidden')).toBe('true')
    expect(top.getAttribute('aria-expanded')).toBe('false')
    expect(dock.getAttribute('aria-expanded')).toBe('false')

    dock.click()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(panel.hasAttribute('inert')).toBe(true)
    expect(document.activeElement).toBe(dock)
  })

  it('does not accumulate handlers when initialized repeatedly', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    initNavigationMenu()
    initNavigationMenu()
    document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!.click()

    expect(document.querySelector('#nav-menu-panel')!.classList.contains('float-panel-closed')).toBe(false)
    const activeDocumentHandlers = addSpy.mock.calls.filter(([type]) => type === 'click' || type === 'keydown')
    expect(activeDocumentHandlers).toHaveLength(4)
  })
})

describe('rendered navigation contracts', () => {
  it('uses non-overlapping 767/768 dock breakpoints parsed by CSSOM', () => {
    const css = fs.readFileSync('src/styles/navbar.css', 'utf8')
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css.replace('@reference "tailwindcss";', ''))
    const media = [...sheet.cssRules].filter((rule): rule is CSSMediaRule => rule instanceof CSSMediaRule)
    expect(media.some(rule => rule.conditionText === '(max-width: 767px)' && rule.cssText.includes('.mobile-dock'))).toBe(true)
    expect(media.some(rule => rule.conditionText === '(min-width: 768px)' && rule.cssText.includes('.mobile-dock'))).toBe(true)
  })

  it('renders rel protection for child links opened in a new tab', () => {
    const dropdown = fs.readFileSync('src/components/layout/DropdownMenu.astro', 'utf8')
    const item = fs.readFileSync('src/components/common/DropdownItem.astro', 'utf8')
    expect(dropdown).toContain('target={child.external ? "_blank" : undefined}')
    expect(item).toContain('rel={target === "_blank" ? "noopener noreferrer" : undefined}')
  })
})
