import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('TOC lifecycle contracts', () => {
  it('installs FloatingTOC global listeners and history wrappers only once', () => {
    const component = fs.readFileSync('src/components/controls/FloatingTOC.astro', 'utf8')
    const initBody = component.match(/async function initFloatingTOC\(\) \{([\s\S]*?)\n  \}/)?.[1] ?? ''
    expect(initBody).not.toContain('setupAutoClose();')
    expect(component).toContain('!window.floatingTOCListenersInitialized')
    expect(component).toContain('setupAutoClose();')
    expect(component).toContain('tocContent.dataset.tocClickBound')
  })

  it('replaces SidebarTOC listeners, timers, and Swup hooks as one lifecycle', () => {
    const component = fs.readFileSync('src/components/widget/SidebarTOC.astro', 'utf8')
    expect(component).toContain('__sidebarTOCLifecycle?.dispose()')
    expect(component).toContain('new AbortController()')
    expect(component).toContain('removePageViewHook?.()')
    expect(component).toContain('if (pendingInit) clearTimeout(pendingInit)')
    expect(component).not.toContain('document.addEventListener("astro:page-load"')
    expect(component).not.toContain('window.addEventListener("popstate"')
  })
})
