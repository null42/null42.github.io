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

  it('installs SidebarTOC navigation and decrypt listeners only once', () => {
    const component = fs.readFileSync('src/components/widget/SidebarTOC.astro', 'utf8')
    expect(component).toContain('if (!window.sidebarTOCListenersInitialized)')
    expect(component).toContain('window.sidebarTOCListenersInitialized = true')
  })
})
