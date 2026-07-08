import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isImageAsset, toMarkdownImage } from '../../scripts/kb/import/assets'
import { normalizeMarkdownTables, normalizeMathDelimiters, normalizeMermaidSource, renderMathToHtml } from '../../scripts/kb/markdown-rendering'

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

  it('wraps markdown tables without turning the table element into a scroll box', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(config).toContain('kb-table-scroll')
    expect(config).toContain('table_open')
    expect(config).toContain('table_close')
  })

  it('normalizes imported table rows to the header column count before rendering', () => {
    const markdown = [
      '| 步骤 | 概念 | 说明 |',
      '| --- | --- | --- |',
      '| ① Clarke | FOC | ALG-01 | 多出来的说明列 |',
      '| ② Park | FOC |',
      '',
      '正文'
    ].join('\n')

    expect(normalizeMarkdownTables(markdown)).toBe([
      '| 步骤 | 概念 | 说明 |',
      '| --- | --- | --- |',
      '| ① Clarke | FOC | ALG-01；多出来的说明列 |',
      '| ② Park | FOC |  |',
      '',
      '正文'
    ].join('\n'))
  })

  it('does not treat currency values in tables as math delimiters', () => {
    const markdown = [
      '| 区域 | 范围 | 成本 |',
      '| --- | --- | --- |',
      '| 恒转矩区 | $0 \\sim \\omega_{base}$ | $0.70 |'
    ].join('\n')

    expect(normalizeMarkdownTables(markdown)).toBe(markdown)
  })

  it('normalizes imported Mermaid state aliases before rendering', () => {
    const mermaidComponent = fs.readFileSync('.vitepress/theme/components/MermaidDiagram.vue', 'utf8')
    const source = 'state Motor_Run as "电机运行"'

    expect(mermaidComponent).toContain('normalizeMermaidSource')
    expect(normalizeMermaidSource(source)).toBe('state "电机运行" as Motor_Run')
  })

  it('normalizes Mermaid labels that trigger markdown list parsing errors', () => {
    const source = [
      'flowchart LR',
      '    R["R(s)"] --> SUM["⊕"]',
      '    Y -->|"反馈 H(s)=1"| FB',
      '    FB -->|"- "| SUM'
    ].join('\n')

    const normalized = normalizeMermaidSource(source)

    expect(normalized).toContain('FB -->|"负反馈"| SUM')
    expect(normalized).not.toContain('|"- "|')
  })

  it('normalizes Mermaid source before the fence content reaches the component', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(config).toContain('normalizeMermaidSource(token.content)')
  })

  it('normalizes Mermaid list-like edge labels even when the quote spacing changes', () => {
    const source = [
      'flowchart LR',
      '    A -->| - | B',
      '    B -->|"- "| C',
      "    C -->|'- '| D"
    ].join('\n')

    const normalized = normalizeMermaidSource(source)

    expect(normalized.match(/"负反馈"/g)?.length).toBe(3)
    expect(normalized).not.toContain('| - |')
  })

  it('normalizes CT-01 feedback edges that Mermaid would parse as markdown lists', () => {
    const source = [
      'flowchart LR',
      '    R["R(s)"] --> SUM["⊕"] --> C["C(s)"]',
      '    Y -->|"反馈 H(s)=1"| FB',
      '    FB -->|"-"| SUM',
      '    FB -->|"- "| SUM'
    ].join('\n')

    const normalized = normalizeMermaidSource(source)

    expect(normalized.match(/"负反馈"/g)?.length).toBe(2)
    expect(normalized).not.toContain('|"-"|')
    expect(normalized).not.toContain('|"- "|')
  })

  it('loads math and mermaid from local packages without the stale markdown-it-katex renderer', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')
    const theme = fs.readFileSync('.vitepress/theme/index.ts', 'utf8')
    const mermaidComponent = fs.readFileSync('.vitepress/theme/components/MermaidDiagram.vue', 'utf8')

    expect(packageJson.dependencies).toHaveProperty('katex')
    expect(packageJson.dependencies).toHaveProperty('mermaid')
    expect(packageJson.dependencies).not.toHaveProperty('markdown-it-katex')
    expect(config).not.toContain('markdownItKatex')
    expect(config).toContain('markdownItCurrentKatex')
    expect(theme).toContain('katex/dist/katex.min.css')
    expect(mermaidComponent).toContain("import('mermaid')")
    expect(mermaidComponent).toContain("securityLevel: 'loose'")
    expect(mermaidComponent).toContain('markdownAutoWrap: false')
    expect(mermaidComponent).not.toContain('cdn.jsdelivr.net')
  })

  it('keeps published client chunks small enough for reliable GitHub Pages serving', () => {
    const chunkDir = 'assets/chunks'
    const chunkLimit = 8 * 1024 * 1024
    const chunks = fs.readdirSync(chunkDir)
      .filter((name) => name.endsWith('.js'))
      .map((name) => ({
        name,
        size: fs.statSync(`${chunkDir}/${name}`).size
      }))

    const oversized = chunks.filter((chunk) => chunk.size > chunkLimit)

    expect(oversized).toEqual([])
  })

  it('renders math with the project KaTeX version used by the loaded CSS', () => {
    const inline = renderMathToHtml('T_{open}(s)=C(s)G(s)', false)
    const display = renderMathToHtml('\\frac{C(s)G(s)}{1+C(s)G(s)}', true)

    expect(inline).toContain('class="katex"')
    expect(inline).toContain('<msub>')
    expect(display).toContain('class="katex-display"')
    expect(display).toContain('<mfrac>')
  })

  it('normalizes bracket math delimiters without changing fenced code', () => {
    const markdown = [
      'Inline: \\(i_q = 1\\).',
      '',
      '\\[',
      'T_e = k_t i_q',
      '\\]',
      '',
      '```text',
      '\\(keep as code\\)',
      '\\[keep as code\\]',
      '```'
    ].join('\n')

    expect(normalizeMathDelimiters(markdown)).toBe([
      'Inline: $i_q = 1$.',
      '',
      '$$',
      'T_e = k_t i_q',
      '$$',
      '',
      '```text',
      '\\(keep as code\\)',
      '\\[keep as code\\]',
      '```'
    ].join('\n'))
  })

  it('protects math absolute-value pipes inside markdown table rows', () => {
    const markdown = [
      '| 条件 | 含义 |',
      '| --- | --- |',
      '| $|z| < |p|$ | 超前补偿 |'
    ].join('\n')

    const normalized = normalizeMathDelimiters(markdown)

    expect(normalized).toContain('$\\lvert z \\rvert < \\lvert p \\rvert$')
  })

  it('does not corrupt escaped norm delimiters while protecting table pipes', () => {
    const markdown = '$$\\left\\| \\begin{matrix} W_1 S \\\\ W_2 KS \\end{matrix} \\right\\|_\\infty$$'

    const normalized = normalizeMathDelimiters(markdown)

    expect(normalized).toContain('\\left\\lVert')
    expect(normalized).toContain('\\right\\rVert')
    expect(normalized).not.toContain('\\left\\\\lvert')
  })

  it('normalizes same-line display delimiters inside prose to inline math', () => {
    const markdown = '工程说明：$$V_{out}=D \\cdot V_{in}$$，这里不是独立公式块。'

    expect(normalizeMathDelimiters(markdown)).toBe('工程说明：$V_{out}=D \\cdot V_{in}$，这里不是独立公式块。')
  })

  it('splits formula definition lines into display math to avoid cramped inline layout', () => {
    const markdown = '传递函数：$T_{open}(s) = C(s)G(s)$'

    expect(normalizeMathDelimiters(markdown)).toBe('传递函数：\n\n$$T_{open}(s) = C(s)G(s)$$')
  })

  it('keeps standalone display math but preserves trailing prose on the next line', () => {
    const markdown = '$$G(s)=\\frac{1}{Ls+R}$$电机电气模型。'

    expect(normalizeMathDelimiters(markdown)).toBe('$$G(s)=\\frac{1}{Ls+R}$$\n\n电机电气模型。')
  })

  it('wraps bare TeX lines that start with absolute-value notation as display math', () => {
    const markdown = '|z| = \\left| \\frac{1 + T_s(\\sigma + j\\omega)/2}{1 - T_s(\\sigma + j\\omega)/2} \\right|'

    expect(normalizeMathDelimiters(markdown)).toBe(`$$${markdown}$$`)
  })

  it('does not turn headings or numbered implementation steps into display math', () => {
    const markdown = [
      '### 7.4 simuser_*.c/h 自定义算法',
      '1. 在 `ACMConfig.h` 中定义用户 ID 宏：`#define USER_YOURNAME 123456`',
      '2. 创建 `simuser_yourname.c` 和 `simuser_yourname.h`',
      '3. 在 `main_switch.c` 中添加 `#if WHO_IS_USER == USER_YOURNAME`'
    ].join('\n')

    expect(normalizeMathDelimiters(markdown)).toBe(markdown)
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
