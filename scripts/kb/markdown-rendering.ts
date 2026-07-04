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
