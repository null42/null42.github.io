export function stripFrontmatter(markdown: string): string {
  return markdown.replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\s*\n?/, '')
}

export function renderDecryptedMarkdown(markdown: string): string {
  return renderMarkdown(stripFrontmatter(markdown).trimStart())
}

function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    html.push(`<p>${paragraph.map(renderInline).join('<br>')}</p>`)
    paragraph = []
  }
  const flushList = () => {
    if (list.length === 0) return
    html.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`)
    list = []
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      continue
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      const level = heading[1].length
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`)
      continue
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph()
      flushList()
      html.push(`<blockquote><p>${renderInline(trimmed.slice(2))}</p></blockquote>`)
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph()
      list.push(trimmed.replace(/^[-*]\s+/, ''))
      continue
    }

    if (isTableStart(lines, index)) {
      flushParagraph()
      flushList()
      const table = collectTable(lines, index)
      html.push(renderTable(table.rows))
      index = table.nextIndex - 1
      continue
    }

    flushList()
    paragraph.push(trimmed)
  }

  flushParagraph()
  flushList()
  return html.join('\n')
}

function isTableStart(lines: string[], index: number): boolean {
  return isTableRow(lines[index]) && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
}

function collectTable(lines: string[], startIndex: number): { rows: string[][]; nextIndex: number } {
  const rows: string[][] = [splitTableRow(lines[startIndex])]
  let index = startIndex + 2
  while (index < lines.length && isTableRow(lines[index])) {
    rows.push(splitTableRow(lines[index]))
    index += 1
  }
  return { rows, nextIndex: index }
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith('|') && line.includes('|')
}

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
}

function renderTable(rows: string[][]): string {
  const [header, ...body] = rows
  return [
    '<div class="kb-table-scroll"><table>',
    `<thead><tr>${header.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`,
    `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`,
    '</table></div>'
  ].join('')
}

function renderInline(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
