import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { analyzeMarkdownRendering } from '../../scripts/kb/render-health'

describe('markdown rendering health', () => {
  it('passes the fixture that covers math, tables, Mermaid, images, callouts, and code', () => {
    const markdown = fs.readFileSync('content/playground/rendering-fixture.md', 'utf8')
    const report = analyzeMarkdownRendering(markdown, 'content/playground/rendering-fixture.md')

    expect(report.issues).toEqual([])
    expect(report.features).toMatchObject({
      math: true,
      table: true,
      mermaid: true,
      image: true,
      code: true
    })
  })

  it('detects broken table separators and Mermaid load wording before publishing', () => {
    const report = analyzeMarkdownRendering(
      ['# Bad', '', '| A | B |', '| --- |', '| 1 | 2 |', '', 'Mermaid failed to load'].join('\n'),
      'content/example.md'
    )

    expect(report.issues.map((issue) => issue.code)).toContain('table-column-mismatch')
    expect(report.issues.map((issue) => issue.code)).toContain('mermaid-failed-wording')
  })
})
