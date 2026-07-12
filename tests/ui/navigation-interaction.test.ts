// @vitest-environment happy-dom
import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initNavigationMenu } from '../../src/utils/navigation-menu-controller'

function mountNavigation() {
  document.body.innerHTML = `
    <main id="swup-container" tabindex="-1">Content</main>
    <button id="nav-menu-switch" aria-controls="nav-menu-panel" aria-expanded="false">Top</button>
    <button id="mobile-dock-menu" aria-controls="nav-menu-panel" aria-expanded="false">Dock</button>
    <div id="nav-menu-panel" class="float-panel float-panel-closed" aria-hidden="true" inert hidden>
      <a id="panel-link" href="/knowledge/">Knowledge</a>
      <div class="mobile-dropdown" data-mobile-dropdown>
        <button data-mobile-dropdown-trigger aria-expanded="false">Section</button>
        <div class="mobile-submenu" data-mobile-submenu><a id="child-link" href="/child/">Child</a></div>
      </div>
    </div>
    <button id="outside">Outside</button>
  `
}

beforeEach(() => {
  vi.useFakeTimers()
  mountNavigation()
})
afterEach(() => {
  window.navigationMenuController?.dispose()
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

function transition(target: Element, propertyName: string) {
  const event = new TransitionEvent('transitionend', { bubbles: true })
  Object.defineProperty(event, 'propertyName', { value: propertyName })
  target.dispatchEvent(event)
}

describe('navigation menu interactions', () => {
  it('opens the menu and synchronizes both triggers', () => {
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

  it('uses the 300ms fallback to hide a closed panel', () => {
    initNavigationMenu()
    document.querySelector<HTMLButtonElement>('#nav-menu-switch')!.click()
    document.querySelector<HTMLButtonElement>('#outside')!.click()
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.hidden).toBe(false)
    vi.advanceTimersByTime(299)
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.hidden).toBe(false)
    vi.advanceTimersByTime(1)
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.hidden).toBe(true)
  })

  it('hides only on a panel opacity or transform transition', () => {
    initNavigationMenu()
    const top = document.querySelector<HTMLButtonElement>('#nav-menu-switch')!
    const panel = document.querySelector<HTMLElement>('#nav-menu-panel')!
    top.click()
    top.click()
    transition(document.querySelector('#panel-link')!, 'opacity')
    expect(panel.hidden).toBe(false)
    transition(panel, 'color')
    expect(panel.hidden).toBe(false)
    transition(panel, 'opacity')
    expect(panel.hidden).toBe(true)
  })

  it('does not let stale close work hide a quickly reopened panel', () => {
    initNavigationMenu()
    const top = document.querySelector<HTMLButtonElement>('#nav-menu-switch')!
    const panel = document.querySelector<HTMLElement>('#nav-menu-panel')!
    top.click()
    top.click()
    top.click()
    vi.advanceTimersByTime(300)
    transition(panel, 'transform')
    expect(panel.hidden).toBe(false)
  })

  it('cancels pending hiding when disposed', () => {
    const controller = initNavigationMenu()!
    const top = document.querySelector<HTMLButtonElement>('#nav-menu-switch')!
    const panel = document.querySelector<HTMLElement>('#nav-menu-panel')!
    top.click()
    top.click()
    controller.dispose()
    vi.advanceTimersByTime(300)
    expect(panel.hidden).toBe(false)
  })

  it('restores focus when an outside close would inert the focused panel subtree', () => {
    initNavigationMenu()
    const top = document.querySelector<HTMLButtonElement>('#nav-menu-switch')!
    top.click()
    document.querySelector<HTMLAnchorElement>('#panel-link')!.focus()
    document.querySelector<HTMLButtonElement>('#outside')!.click()
    expect(document.activeElement).toBe(top)
  })

  it('moves focus to the production Swup target for a replacement close', () => {
    const controller = initNavigationMenu()!
    document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!.click()
    document.querySelector<HTMLAnchorElement>('#panel-link')!.focus()
    controller.close({ reason: 'swup-replace' })
    expect(document.activeElement).toBe(document.querySelector('#swup-container'))
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.contains(document.activeElement)).toBe(false)
  })

  it('falls back to the connected trigger when the Swup target rejects focus', () => {
    const controller = initNavigationMenu()!
    const trigger = document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!
    const target = document.querySelector<HTMLElement>('#swup-container')!
    trigger.click()
    document.querySelector<HTMLAnchorElement>('#panel-link')!.focus()
    vi.spyOn(target, 'focus').mockImplementation(() => {})
    controller.close({ reason: 'swup-replace' })
    expect(document.activeElement).toBe(trigger)
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.contains(document.activeElement)).toBe(false)
  })

  it('blurs safely when neither the Swup target nor its trigger can receive focus', () => {
    const controller = initNavigationMenu()!
    const trigger = document.querySelector<HTMLButtonElement>('#mobile-dock-menu')!
    const target = document.querySelector<HTMLElement>('#swup-container')!
    trigger.click()
    document.querySelector<HTMLAnchorElement>('#panel-link')!.focus()
    vi.spyOn(target, 'focus').mockImplementation(() => {})
    trigger.remove()
    controller.close({ reason: 'swup-replace' })
    expect(document.activeElement).toBe(document.body)
    expect(document.querySelector<HTMLElement>('#nav-menu-panel')!.contains(document.activeElement)).toBe(false)
  })

  it('makes collapsed submenus hidden and inert and synchronizes their trigger', () => {
    initNavigationMenu()
    const trigger = document.querySelector<HTMLButtonElement>('[data-mobile-dropdown-trigger]')!
    const submenu = document.querySelector<HTMLElement>('[data-mobile-submenu]')!
    expect(submenu.getAttribute('aria-hidden')).toBe('true')
    expect(submenu.hasAttribute('inert')).toBe(true)
    trigger.click()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(submenu.getAttribute('aria-hidden')).toBe('false')
    expect(submenu.hasAttribute('inert')).toBe(false)
    trigger.click()
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(submenu.getAttribute('aria-hidden')).toBe('true')
    expect(submenu.hasAttribute('inert')).toBe(true)
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
