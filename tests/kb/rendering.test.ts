import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isImageAsset, toMarkdownImage } from '../../scripts/kb/import/assets'

describe('rendering fixture', () => {
  it('contains markdown, mermaid, svg, table, callout, and code examples', () => {
    const text = fs.readFileSync('content/playground/rendering-fixture.md', 'utf8')

    expect(text).toContain('```mermaid')
    expect(text).toContain('$$')
    expect(text).toContain('```unknown-diagram')
    expect(text).toContain('| 项目 | 说明 |')
    expect(text).toContain('![控制延迟示意]')
    expect(text).toContain('::: tip')
    expect(text).toContain('```ts')
  })

  it('documents safe rendering rules for markdown, mermaid, and svg', () => {
    const docs = fs.readFileSync('docs/kb/rendering-support.md', 'utf8')

    expect(docs).toContain('Mermaid diagrams')
    expect(docs).toContain('Local SVG/PNG/JPG/JPEG/GIF/WebP images')
    expect(docs).toContain('Raw `<script>` is not allowed')
  })

  it('configures mermaid fences to use the MermaidDiagram component', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(config).toContain("info === 'mermaid'")
    expect(config).toContain('MermaidDiagram')
  })

  it('loads math and mermaid from local packages', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')
    const theme = fs.readFileSync('.vitepress/theme/index.ts', 'utf8')
    const mermaidComponent = fs.readFileSync('.vitepress/theme/components/MermaidDiagram.vue', 'utf8')

    expect(packageJson.dependencies).toHaveProperty('katex')
    expect(packageJson.dependencies).toHaveProperty('markdown-it-katex')
    expect(packageJson.dependencies).toHaveProperty('mermaid')
    expect(config).toContain('markdownItKatex')
    expect(theme).toContain('katex/dist/katex.min.css')
    expect(mermaidComponent).toContain("import('mermaid')")
    expect(mermaidComponent).not.toContain('cdn.jsdelivr.net')
  })

  it('normalizes unknown fence languages to text before highlighting', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(config).toContain('normalizeFenceInfo')
    expect(config).toContain("return 'text'")
  })

  it('recognizes svg and image assets for imported documentation', () => {
    expect(isImageAsset('control-delay-timing.svg')).toBe(true)
    expect(isImageAsset('diagram.PNG')).toBe(true)
    expect(isImageAsset('notes.md')).toBe(false)
    expect(toMarkdownImage('figure', 'assets\\control.svg')).toBe('![figure](assets/control.svg)')
  })
})
