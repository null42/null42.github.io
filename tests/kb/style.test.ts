import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync('.vitepress/theme/style.css', 'utf8')

describe('theme style', () => {
  it('keeps dark mode explicit and does not force the global background to light colors', () => {
    expect(css).not.toMatch(/--vp-c-bg:\s*#fbfcff/)
    expect(css).toContain('.dark .VPHome')
    expect(css).toContain('--kb-surface')
  })

  it('keeps wide article content from expanding the mobile page width', () => {
    expect(css).toContain('.vp-doc div[class*="language-"]')
    expect(css).toContain('.vp-doc table')
    expect(css).toContain('.VPDoc .container')
    expect(css).toContain('max-width: 100%')
    expect(css).toContain('overflow-x: auto')
    expect(css).toContain('overflow-x: hidden')
  })
})
