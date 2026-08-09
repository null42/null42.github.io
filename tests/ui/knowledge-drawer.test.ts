// @vitest-environment happy-dom
import fs from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { initKnowledgeDrawer, installKnowledgeDrawerLifecycle } from '../../src/utils/knowledge-drawer-controller'

function mountDrawer() {
  document.body.innerHTML = `<div data-knowledge-drawer><button data-drawer-open aria-expanded="false" aria-controls="knowledge-drawer-panel">目录</button><div data-drawer-backdrop hidden></div><dialog id="knowledge-drawer-panel" data-drawer-panel hidden aria-hidden="true" aria-modal="true"><button data-drawer-close>关闭</button><a href="/posts/a/" data-tree-article="a">A</a><a href="/posts/b/" data-tree-article="b">B</a></dialog></div>`
  const panel = document.querySelector<HTMLDialogElement>('[data-drawer-panel]')!
  const showModal = vi.fn(() => panel.setAttribute('open', ''))
  const close = vi.fn(() => panel.removeAttribute('open'))
  Object.defineProperty(panel, 'showModal', { configurable: true, value: showModal })
  Object.defineProperty(panel, 'close', { configurable: true, value: close })
  return { panel, showModal, close }
}
beforeEach(() => { vi.restoreAllMocks(); document.body.style.overflow = ''; mountDrawer() })

describe('knowledge drawer interactions', () => {
  it('opens with focus lock and closes with Escape while restoring body scroll', () => {
    const panel = document.querySelector<HTMLDialogElement>('[data-drawer-panel]')!
    const controller = initKnowledgeDrawer()!
    document.querySelector<HTMLButtonElement>('[data-drawer-open]')!.click()
    expect(panel.tagName).toBe('DIALOG')
    expect(panel.showModal).toHaveBeenCalledOnce()
    expect(panel.open).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.querySelector('[data-drawer-panel]')!.getAttribute('aria-hidden')).toBe('false')
    expect(document.activeElement).toBe(document.querySelector('[data-drawer-close]'))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(panel.close).toHaveBeenCalledOnce()
    expect(panel.open).toBe(false)
    expect(document.querySelector<HTMLElement>('[data-drawer-panel]')!.hidden).toBe(true)
    expect(document.body.style.overflow).toBe('')
    controller.dispose()
  })

  it('closes a native dialog backdrop pointer without leaving scroll locked', () => {
    const panel = document.querySelector<HTMLDialogElement>('[data-drawer-panel]')!
    Object.defineProperty(panel, 'getBoundingClientRect', { configurable: true, value: () => ({ left: 10, right: 110, top: 10, bottom: 110, width: 100, height: 100, x: 10, y: 10, toJSON() {} }) })
    initKnowledgeDrawer()
    document.querySelector<HTMLButtonElement>('[data-drawer-open]')!.click()
    panel.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }))
    expect(panel.hidden).toBe(true)
    expect(document.body.style.overflow).toBe('')
  })

  it('closes from backdrop or article selection and traps Tab focus', () => {
    const panel = document.querySelector<HTMLDialogElement>('[data-drawer-panel]')!
    initKnowledgeDrawer()
    const open = document.querySelector<HTMLButtonElement>('[data-drawer-open]')!
    open.click()
    const last = document.querySelectorAll<HTMLElement>('[data-drawer-panel] button, [data-drawer-panel] a')[2]
    last.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
    expect(document.activeElement).toBe(document.querySelector('[data-drawer-close]'))
    document.querySelector<HTMLElement>('[data-tree-article="a"]')!.click()
    expect(panel.close).toHaveBeenCalledTimes(1)
    expect(document.querySelector<HTMLElement>('[data-drawer-panel]')!.hidden).toBe(true)
    open.click(); document.querySelector<HTMLElement>('[data-drawer-backdrop]')!.click()
    expect(panel.showModal).toHaveBeenCalledTimes(2)
    expect(panel.close).toHaveBeenCalledTimes(2)
    expect(document.querySelector<HTMLElement>('[data-drawer-panel]')!.hidden).toBe(true)
  })

  it('rebinds through one Swup hook without accumulating drawer controllers', () => {
    const callbacks = new Set<() => void>()
    const hooks = { on(_name: string, callback: () => void) { callbacks.add(callback); return () => callbacks.delete(callback) } }
    installKnowledgeDrawerLifecycle({ hooks })
    const lifecycle = installKnowledgeDrawerLifecycle({ hooks })
    expect(callbacks.size).toBe(1)
    callbacks.forEach(callback => callback())
    document.querySelector<HTMLButtonElement>('[data-drawer-open]')!.click()
    expect(document.querySelector('[data-drawer-panel]')!.getAttribute('aria-hidden')).toBe('false')
    lifecycle.dispose()
    expect(callbacks.size).toBe(0)
  })

  it('ignores a stale Swup refresh after the entering drawer reinstalls its lifecycle', () => {
    const callbacks = new Set<() => void>()
    let executeEnteringScript = false
    const hooks = { on(_name: string, callback: () => void) { callbacks.add(callback); return () => callbacks.delete(callback) } }
    callbacks.add(() => { if (executeEnteringScript) installKnowledgeDrawerLifecycle({ hooks }) })
    installKnowledgeDrawerLifecycle({ hooks })
    document.body.innerHTML = ''
    Array.from(callbacks).forEach(callback => callback())

    mountDrawer(); executeEnteringScript = true
    const openButton = document.querySelector<HTMLButtonElement>('[data-drawer-open]')!
    const originalAdd = openButton.addEventListener.bind(openButton)
    const originalRemove = openButton.removeEventListener.bind(openButton)
    let activeOpenClicks = 0
    openButton.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (type === 'click') activeOpenClicks++
      originalAdd(type, listener, options)
    }) as typeof openButton.addEventListener
    openButton.removeEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
      if (type === 'click') activeOpenClicks--
      originalRemove(type, listener, options)
    }) as typeof openButton.removeEventListener
    Array.from(callbacks).forEach(callback => callback())
    expect(activeOpenClicks).toBe(1)
    document.body.innerHTML = ''; executeEnteringScript = false
    Array.from(callbacks).forEach(callback => callback())
    expect(activeOpenClicks).toBe(0)
  })
})

describe('knowledge drawer template', () => {
  it('covers every viewport below the three-column shell and provides reduced-motion fallback', () => {
    const component = fs.readFileSync('src/components/knowledge/KnowledgeDrawer.astro', 'utf8')
    const css = fs.readFileSync('src/components/knowledge/knowledge-drawer.css', 'utf8')
    expect(component).toContain('data-knowledge-drawer')
    expect(component).toContain('<KnowledgeTree')
    expect(component).toContain('<dialog')
    expect(component).toContain('aria-modal=')
    const controller = fs.readFileSync('src/utils/knowledge-drawer-controller.ts', 'utf8')
    expect(controller).toContain('panel.showModal()')
    expect(css).toContain('@media (max-width: 84.999rem)')
    expect(css).toMatch(/\.knowledge-drawer__trigger\s*\{[^}]*left:\s*1rem;[^}]*right:\s*auto;/s)
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })
})
