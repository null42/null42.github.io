import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isImageAsset, toMarkdownImage } from '../../scripts/kb/import/assets'
import { normalizeMarkdownTables, normalizeMathDelimiters, normalizeMermaidSource, renderMathToHtml } from '../../scripts/kb/markdown-rendering'
import { renderEncryptedMarkdown } from '../../scripts/kb/encrypt/render-markdown'
import { normalizeVitePressContainers } from '../../scripts/kb/markdown-compat'

describe('rendering fixture', () => {
  it('does not close a VitePress container on markers inside fenced code', () => {
    const markdown = [
      '::: tip Fence safety',
      'Before code.',
      '```text',
      ':::',
      '```',
      'After code.',
      ':::',
    ].join('\n')

    const normalized = normalizeVitePressContainers(markdown)

    expect(normalized).toContain('> [!NOTE] Fence safety')
    expect(normalized).toContain('> ```text\n> :::\n> ```')
    expect(normalized).toContain('> After code.')
    expect(normalized.trimEnd().endsWith(':::')).toBe(false)
  })

  it('does not close a VitePress container on markers inside indented code', () => {
    const markdown = [
      '::: tip Indented safety',
      'Before code.',
      '    :::',
      'After code.',
      ':::',
    ].join('\n')

    const normalized = normalizeVitePressContainers(markdown)

    expect(normalized).toContain('>     :::')
    expect(normalized).toContain('> After code.')
    expect(normalized.trimEnd().endsWith(':::')).toBe(false)
  })

  it('normalizes nested VitePress containers using matching fence lengths', () => {
    const markdown = [
      ':::: details Outer details',
      'Outer body.',
      '::: warning Inner warning',
      'Inner body.',
      ':::',
      '::::',
    ].join('\n')

    const normalized = normalizeVitePressContainers(markdown)

    expect(normalized).toContain('> [!NOTE] Outer details')
    expect(normalized).toContain('> > [!WARNING] Inner warning')
    expect(normalized).toContain('> > Inner body.')
    expect(normalized).not.toMatch(/^:{3,}/m)
  })

  it('renders the full migration Markdown feature sample through the shared site pipeline', async () => {
    const html = await renderEncryptedMarkdown([
      '# Migration rendering contract',
      '',
      '::: tip',
      'Callout body',
      ':::',
      '',
      '| Item | Value |',
      '| --- | --- |',
      '| FOC | Ready |',
      '',
      'Inline math: $i_d = 0$.',
      '',
      '~~~ts',
      'const duty = vin / vout',
      '~~~',
      '',
      '~~~mermaid',
      'flowchart LR; A-->B',
      '~~~',
      '',
      '~~~plantuml',
      '@startuml',
      'Alice -> Bob',
      '@enduml',
      '~~~',
      '',
      '![Control delay](/control-delay-timing.svg)',
    ].join('\n'))

    expect(html).toContain('class="callout"')
    expect(html).toContain('<div class="callout-content"><p>Callout body</p>')
    expect(html).toContain('<table>')
    expect(html).toContain('class="katex"')
    expect(html).toContain('data-language="ts"')
    expect(html).toContain('vin')
    expect(html).toContain('mermaid-diagram-container')
    expect(html).toContain('plantuml-diagram-container')
    expect(html).toContain('src="/control-delay-timing.svg"')
  })

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
    expect(mermaidComponent).toContain("import mermaid from 'mermaid'")
    expect(mermaidComponent).not.toContain("import('mermaid')")
    expect(mermaidComponent).toContain("securityLevel: 'loose'")
    expect(mermaidComponent).toContain('markdownAutoWrap: false')
    expect(mermaidComponent).not.toContain('cdn.jsdelivr.net')
  })

  it('does not mutate Mermaid component DOM from a global fallback renderer', () => {
    const theme = fs.readFileSync('.vitepress/theme/index.ts', 'utf8')

    expect(theme).not.toContain('renderPendingMermaid')
    expect(theme).not.toContain('block.innerHTML')
  })

  it('guards Mermaid async rendering when routes change before render completes', () => {
    const mermaidComponent = fs.readFileSync('.vitepress/theme/components/MermaidDiagram.vue', 'utf8')

    expect(mermaidComponent).toContain('onBeforeUnmount')
    expect(mermaidComponent).toContain('isMounted')
    expect(mermaidComponent).toContain('renderRun')
  })

  it('keeps Mermaid component DOM stable while switching from source to rendered SVG', () => {
    const mermaidComponent = fs.readFileSync('.vitepress/theme/components/MermaidDiagram.vue', 'utf8')

    expect(mermaidComponent).toContain('v-show="rendered"')
    expect(mermaidComponent).not.toContain('v-if="rendered"')
    expect(mermaidComponent).not.toContain('v-else-if')
  })

  it('keeps published client chunks small enough for reliable GitHub Pages serving', () => {
    const chunkDir = 'dist/_astro'
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

  it('keeps complex formula definitions readable inside list items', () => {
    const markdown = '- PI控制器：$C(s) = K_p + \\frac{K_i}{s} = K_p \\frac{s + K_i/K_p}{s}$'

    expect(normalizeMathDelimiters(markdown)).toBe([
      '- PI控制器：',
      '',
      '  $$C(s) = K_p + \\frac{K_i}{s} = K_p \\frac{s + K_i/K_p}{s}$$'
    ].join('\n'))
  })

  it('keeps quoted display math inside the quote block', () => {
    const markdown = '> $$T_i = \\frac{K_p}{K_i}$$'

    expect(normalizeMathDelimiters(markdown)).toBe([
      '>',
      '> $$T_i = \\frac{K_p}{K_i}$$'
    ].join('\n'))
  })

  it('normalizes the real CT-01 formulas and feedback Mermaid label before rendering', () => {
    const markdown = fs.readFileSync('content/motor/control-theory/CT-01-Open-Loop-Closed-Loop.md', 'utf8')
    const normalizedMath = normalizeMathDelimiters(markdown)
    const mermaidBlocks = [...markdown.matchAll(/```mermaid\s*\n([\s\S]*?)\n```/g)].map((match) => match[1])
    const closedLoopDiagram = mermaidBlocks.find((block) => block.includes('FB -->|"- "| SUM')) || ''

    expect(normalizedMath).toContain('传递函数：\n\n$$T_{open}(s) = C(s)G(s)$$')
    expect(normalizedMath).toContain('- PI控制器：\n\n  $$C(s) = K_p + \\frac{K_i}{s} = K_p \\frac{s + (K_i/K_p)}{s}$$')
    expect(normalizeMermaidSource(closedLoopDiagram)).toContain('FB -->|"负反馈"| SUM')
  })

  it('rechecks table columns after math pipe normalization in real imported articles', () => {
    const markdown = fs.readFileSync('content/motor/controllers-evolution/CE-10-Lead-Lag-Compensator.md', 'utf8')
    const normalized = normalizeMathDelimiters(markdown)

    expect(normalized).toContain('| 超前：$K\\frac{s+z}{s+p}$，$\\lvert z \\rvert<\\lvert p \\rvert$ | $K_p + K_d s$（PD） | 超前有一个极点滚降高频增益——PD无限放大噪声 |  |')
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
