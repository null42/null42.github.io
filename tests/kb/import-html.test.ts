import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { convertHtml } from '../../scripts/kb/import/html-to-markdown'

describe('HTML import', () => {
  it('converts headings, paragraphs, images, and code blocks', () => {
    const html = fs.readFileSync('tests/fixtures/html/simple-lesson.html', 'utf8')
    const result = convertHtml(html, 'tests/fixtures/html')

    expect(result.title).toBe('概念：Boost Converter')
    expect(result.markdown).toContain('# 概念：Boost Converter')
    expect(result.markdown).toContain('Boost converter 用电感储能实现升压。')
    expect(result.markdown).toContain('![Boost 控制框图]')
    expect(result.markdown).toContain('```text')
    expect(result.assets.some((asset) => asset.replace(/\\/g, '/').endsWith('assets/boost.svg'))).toBe(true)
  })
})
