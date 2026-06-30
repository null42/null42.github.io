import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync('.vitepress/theme/style.css', 'utf8')

describe('theme style', () => {
  it('keeps dark mode explicit and does not force the global background to light colors', () => {
    expect(css).not.toMatch(/--vp-c-bg:\s*#fbfcff/)
    expect(css).toContain('.dark .VPHome')
    expect(css).toContain('--kb-surface')
  })
})
