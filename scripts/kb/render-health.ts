export interface RenderHealthIssue {
  code:
    | 'table-column-mismatch'
    | 'mermaid-failed-wording'
    | 'math-code-span'
    | 'raw-script'
    | 'unclosed-display-math'
    | 'unclosed-fence'
  message: string
  line: number
}

export interface RenderHealthReport {
  path: string
  features: {
    math: boolean
    table: boolean
    mermaid: boolean
    image: boolean
    code: boolean
  }
  issues: RenderHealthIssue[]
}

export function analyzeMarkdownRendering(markdown: string, path: string): RenderHealthReport {
  const lines = markdown.split(/\r?\n/)
  const issues: RenderHealthIssue[] = []

  if (/Mermaid failed to load/i.test(markdown)) {
    issues.push({ code: 'mermaid-failed-wording', message: 'Do not publish Mermaid failed-to-load wording.', line: findLine(lines, /Mermaid failed to load/i) })
  }
  if (/<script\b/i.test(markdown)) {
    issues.push({ code: 'raw-script', message: 'Raw script tags are not allowed in Markdown.', line: findLine(lines, /<script\b/i) })
  }

  checkTables(lines, issues)
  checkMathCodeSpans(lines, issues)
  checkDisplayMath(lines, issues)
  checkFences(lines, issues)

  return {
    path,
    features: {
      math: /(^|\s)(\$[^$\n]+\$|\$\$|\\\[|\\\()/m.test(markdown),
      table: lines.some((line) => isTableRow(line)),
      mermaid: /```mermaid\b/.test(markdown),
      image: /!\[[^\]]*]\([^)]+\)/.test(markdown),
      code: /```[A-Za-z0-9_-]*/.test(markdown)
    },
    issues
  }
}

function checkTables(lines: string[], issues: RenderHealthIssue[]): void {
  for (let index = 0; index < lines.length - 1; index += 1) {
    const header = lines[index]
    const separator = lines[index + 1]
    if (!isTableRow(header) || !isTableSeparator(separator)) continue
    const expected = countTableCells(header)
    const separatorCells = countTableCells(separator)
    if (separatorCells !== expected) {
      issues.push({
        code: 'table-column-mismatch',
        message: `Markdown table separator has ${separatorCells} cells; expected ${expected}.`,
        line: index + 2
      })
    }
    for (let cursor = index + 2; cursor < lines.length && isTableRow(lines[cursor]); cursor += 1) {
      const actual = countTableCells(lines[cursor])
      if (actual !== expected) {
        issues.push({
          code: 'table-column-mismatch',
          message: `Markdown table has ${actual} cells; expected ${expected}.`,
          line: cursor + 1
        })
      }
    }
  }
}

function checkMathCodeSpans(lines: string[], issues: RenderHealthIssue[]): void {
  let inFence = false
  let fenceMarker = ''
  lines.forEach((line, index) => {
    const fenceMatch = line.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      if (!inFence) {
        inFence = true
        fenceMarker = fenceMatch[1][0]
      } else if (fenceMatch[1][0] === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }
      return
    }
    if (inFence) return
    if (hasMathCodeSpan(line)) {
      issues.push({
        code: 'math-code-span',
        message: 'Math delimiters are wrapped in inline code, so KaTeX cannot render them.',
        line: index + 1
      })
    }
  })
}

function hasMathCodeSpan(line: string): boolean {
  const codeSpanPattern = /(`+)([\s\S]*?)\1/g
  let match: RegExpExecArray | null
  while ((match = codeSpanPattern.exec(line))) {
    const value = match[2].trim()
    if (/^\$[^$\n].*[^$\n]\$$/.test(value)) return true
    if (/^\\\([^]*\\\)$/.test(value)) return true
    if (/^\\\[[^]*\\\]$/.test(value)) return true
  }
  return false
}

function checkDisplayMath(lines: string[], issues: RenderHealthIssue[]): void {
  let openLine = 0
  let inMath = false
  lines.forEach((line, index) => {
    const markers = [...line.matchAll(/\$\$/g)].length
    if (markers % 2 === 0) return
    inMath = !inMath
    openLine = inMath ? index + 1 : 0
  })
  if (inMath) {
    issues.push({ code: 'unclosed-display-math', message: 'Display math block is not closed.', line: openLine })
  }
}

function checkFences(lines: string[], issues: RenderHealthIssue[]): void {
  let marker = ''
  let openLine = 0
  lines.forEach((line, index) => {
    const match = line.match(/^(`{3,}|~{3,})/)
    if (!match) return
    if (!marker) {
      marker = match[1][0]
      openLine = index + 1
      return
    }
    if (match[1][0] === marker) {
      marker = ''
      openLine = 0
    }
  })
  if (marker) {
    issues.push({ code: 'unclosed-fence', message: 'Code fence is not closed.', line: openLine })
  }
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.endsWith('|') && countTableCells(trimmed) >= 2
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line)
}

function countTableCells(line: string): number {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return splitUnescapedPipes(trimmed).length
}

function splitUnescapedPipes(line: string): string[] {
  const cells: string[] = []
  let buffer = ''
  let escaped = false
  let inInlineMath = false
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    if (escaped) {
      buffer += char
      escaped = false
      continue
    }
    if (char === '\\') {
      buffer += char
      escaped = true
      continue
    }
    if (char === '$') {
      if (inInlineMath) inInlineMath = false
      else if (hasClosingDollarBeforePipe(line, index + 1)) inInlineMath = true
    }
    if (char === '|' && !inInlineMath) {
      cells.push(buffer)
      buffer = ''
      continue
    }
    buffer += char
  }
  cells.push(buffer)
  return cells
}

function hasClosingDollarBeforePipe(value: string, start: number): boolean {
  let escaped = false
  for (let index = start; index < value.length; index += 1) {
    const char = value[index]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === '|') return false
    if (char === '$') return true
  }
  return false
}

function findLine(lines: string[], pattern: RegExp): number {
  const index = lines.findIndex((line) => pattern.test(line))
  return index >= 0 ? index + 1 : 1
}
