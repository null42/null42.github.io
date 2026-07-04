import katex from 'katex'

type MarkdownItLike = {
  block: {
    ruler: {
      before(referenceName: string, ruleName: string, rule: (...args: any[]) => boolean, options?: unknown): void
    }
  }
  inline: {
    ruler: {
      before(referenceName: string, ruleName: string, rule: (...args: any[]) => boolean): void
    }
  }
  renderer: {
    rules: Record<string, ((tokens: any[], idx: number) => string) | undefined>
  }
}

export function normalizeMathDelimiters(markdown: string): string {
  const chunks = splitFencedCode(markdown)
  return chunks.map((chunk) => {
    if (chunk.fenced) return chunk.text
    return chunk.text
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, body: string) => `$$${trimDisplayMath(body)}$$`)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, body: string) => `$${body}$`)
  }).join('')
}

function trimDisplayMath(body: string): string {
  const trimmed = body.replace(/^\s*\r?\n/, '').replace(/\r?\n\s*$/, '')
  return `\n${trimmed}\n`
}

export function renderMathToHtml(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: false,
    trust: false,
    output: 'htmlAndMathml'
  })
}

export function markdownItCurrentKatex(md: MarkdownItLike): void {
  md.inline.ruler.before('escape', 'math_inline', mathInline)
  md.block.ruler.before('fence', 'math_block', mathBlock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.math_inline = (tokens, idx) => renderMathToHtml(tokens[idx].content, false)
  md.renderer.rules.math_block = (tokens, idx) => `${renderMathToHtml(tokens[idx].content, true)}\n`
}

export function normalizeMermaidSource(value: string): string {
  return value
    .replace(/^(\s*)state\s+([A-Za-z_][\w-]*)\s+as\s+"([^"\n]+)"\s*$/gm, '$1state "$3" as $2')
    .replace(/\|"-\s*"\|/g, '|"负反馈"|')
    .replace(/\|'\-\s*'\|/g, '|"负反馈"|')
}

function mathInline(state: any, silent: boolean): boolean {
  const start = state.pos
  if (state.src.charCodeAt(start) !== 0x24) return false
  if (state.src.charCodeAt(start + 1) === 0x24) return false
  if (isEscaped(state.src, start)) return false

  const end = findClosingDollar(state.src, start + 1)
  if (end < 0) return false

  const content = state.src.slice(start + 1, end)
  if (!content.trim()) return false

  if (!silent) {
    const token = state.push('math_inline', 'math', 0)
    token.content = content
    token.markup = '$'
  }

  state.pos = end + 1
  return true
}

function mathBlock(state: any, startLine: number, endLine: number, silent: boolean): boolean {
  let start = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  if (state.src.slice(start, start + 2) !== '$$') return false

  let firstLine = state.src.slice(start + 2, max)
  let nextLine = startLine
  const firstLineEnd = firstLine.indexOf('$$')
  let content = ''

  if (firstLineEnd >= 0) {
    content = firstLine.slice(0, firstLineEnd)
  } else {
    const lines = [firstLine]
    for (nextLine = startLine + 1; nextLine < endLine; nextLine += 1) {
      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      const line = state.src.slice(start, max)
      const close = line.indexOf('$$')
      if (close >= 0) {
        lines.push(line.slice(0, close))
        break
      }
      lines.push(line)
    }

    if (nextLine >= endLine) return false
    content = lines.join('\n')
  }

  if (silent) return true

  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content = content.trim()
  token.markup = '$$'
  token.map = [startLine, nextLine + 1]
  state.line = nextLine + 1
  return true
}

function findClosingDollar(value: string, start: number): number {
  for (let index = start; index < value.length; index += 1) {
    if (value.charCodeAt(index) === 0x24 && !isEscaped(value, index)) {
      return index
    }
  }
  return -1
}

function isEscaped(value: string, index: number): boolean {
  let slashCount = 0
  for (let cursor = index - 1; cursor >= 0 && value[cursor] === '\\'; cursor -= 1) {
    slashCount += 1
  }
  return slashCount % 2 === 1
}

function splitFencedCode(markdown: string): Array<{ text: string; fenced: boolean }> {
  const chunks: Array<{ text: string; fenced: boolean }> = []
  const lines = markdown.split(/(\r?\n)/)
  let buffer = ''
  let fenced = false
  let fenceMarker = ''

  for (let index = 0; index < lines.length; index += 2) {
    const line = lines[index] || ''
    const newline = lines[index + 1] || ''
    const match = line.match(/^(\s*)(`{3,}|~{3,})/)

    if (match && (!fenced || match[2].startsWith(fenceMarker[0]))) {
      if (buffer) {
        chunks.push({ text: buffer, fenced })
        buffer = ''
      }
      fenced = !fenced
      fenceMarker = fenced ? match[2] : ''
    }

    buffer += line + newline
  }

  if (buffer) {
    chunks.push({ text: buffer, fenced })
  }

  return chunks
}
