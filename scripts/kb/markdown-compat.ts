interface ParsedLines {
  lines: string[]
  nextIndex: number
  closed: boolean
}

interface CodeFence {
  marker: '`' | '~'
  length: number
}

const containerStart = /^(:{3,})[^\S\r\n]*(tip|warning|danger|details)(?:[^\S\r\n]+([^\r\n]+))?[^\S\r\n]*$/i
const codeFenceStart = /^[\t ]*(`{3,}|~{3,})/

function parseCodeFence(line: string): CodeFence | undefined {
  const match = line.match(codeFenceStart)
  if (!match) return undefined
  return { marker: match[1][0] as CodeFence['marker'], length: match[1].length }
}

function closesCodeFence(line: string, fence: CodeFence): boolean {
  const pattern = new RegExp('^[\\t ]*' + (fence.marker === '`' ? '`' : '~') + '{' + fence.length + ',}[\\t ]*$')
  return pattern.test(line)
}

function quoteLines(lines: string[]): string[] {
  const content = [...lines]
  while (content[0] === '') content.shift()
  while (content.at(-1) === '') content.pop()
  return content.map((line) => line ? '> ' + line : '>')
}

function calloutLabel(type: string): string {
  const upperType = type.toUpperCase()
  return upperType === 'TIP' || upperType === 'DETAILS' ? 'NOTE' : upperType
}

function parseLines(lines: string[], startIndex: number, closingFence?: string): ParsedLines {
  const output: string[] = []
  let codeFence: CodeFence | undefined

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index]

    if (codeFence) {
      output.push(line)
      if (closesCodeFence(line, codeFence)) codeFence = undefined
      continue
    }

    const openedCodeFence = parseCodeFence(line)
    if (openedCodeFence) {
      codeFence = openedCodeFence
      output.push(line)
      continue
    }

    if (closingFence && line.trimEnd() === closingFence) {
      return { lines: output, nextIndex: index + 1, closed: true }
    }

    const container = line.match(containerStart)
    if (!container) {
      output.push(line)
      continue
    }

    const nested = parseLines(lines, index + 1, container[1])
    if (!nested.closed) {
      output.push(line, ...nested.lines)
      return { lines: output, nextIndex: nested.nextIndex, closed: false }
    }

    const title = container[3]?.trim()
    output.push('> [!' + calloutLabel(container[2]) + ']' + (title ? ' ' + title : ''), '>', ...quoteLines(nested.lines))
    index = nested.nextIndex - 1
  }

  return { lines: output, nextIndex: lines.length, closed: !closingFence }
}

export function normalizeVitePressContainers(body: string): string {
  const newline = body.includes('\r\n') ? '\r\n' : '\n'
  return parseLines(body.split(/\r?\n/), 0).lines.join(newline)
}
