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
    expect(css).toContain('.kb-table-scroll')
    expect(css).toContain('.VPDoc .container')
    expect(css).toContain('max-width: 100%')
    expect(css).toContain('overflow-x: auto')
    expect(css).not.toMatch(/\.vp-doc\s+table\s*\{[^}]*display:\s*block/s)
    expect(css).not.toMatch(/\.vp-doc\s*\{[^}]*overflow-x:\s*hidden/s)
  })

  it('lets display math scroll inside the article instead of clipping it', () => {
    expect(css).toContain('.vp-doc .katex-display')
    expect(css).toMatch(/\.vp-doc\s+\.katex-display\s*\{[^}]*overflow-x:\s*auto/s)
  })
})
