import fs from 'node:fs/promises'
import path from 'node:path'

export interface HtmlConversionResult {
  title: string
  markdown: string
  assets: string[]
}

export async function convertHtmlFile(filePath: string): Promise<HtmlConversionResult> {
  const html = await fs.readFile(filePath, 'utf8')
  return convertHtml(html, path.dirname(filePath))
}

export function convertHtml(html: string, baseDir = ''): HtmlConversionResult {
  const cleaned = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '')

  const title = decodeEntities(
    stripTags(firstMatch(cleaned, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || firstMatch(cleaned, /<title\b[^>]*>([\s\S]*?)<\/title>/i) || 'Untitled')
  )

  const assets: string[] = []
  const body = firstMatch(cleaned, /<body\b[^>]*>([\s\S]*?)<\/body>/i) || cleaned
  const markdown = htmlFragmentToMarkdown(body, baseDir, assets).replace(/\n{3,}/g, '\n\n').trim() + '\n'

  return { title: normalizeSpace(title), markdown, assets }
}

function htmlFragmentToMarkdown(fragment: string, baseDir: string, assets: string[]): string {
  let output = fragment

  output = output.replace(/<pre\b[^>]*>\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (_match, code) => {
    return `\n\n\`\`\`text\n${decodeEntities(stripTags(code)).trim()}\n\`\`\`\n\n`
  })

  output = output.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = attr(tag, 'src')
    const alt = attr(tag, 'alt') || 'image'
    if (src) assets.push(path.normalize(path.join(baseDir, src)))
    return src ? `\n\n![${decodeEntities(alt)}](${src.replace(/\\/g, '/')})\n\n` : ''
  })

  for (const level of [6, 5, 4, 3, 2, 1]) {
    const pattern = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi')
    output = output.replace(pattern, (_match, content) => `\n\n${'#'.repeat(level)} ${decodeEntities(stripTags(content)).trim()}\n\n`)
  }

  output = output.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_match, content) => `\n\n${inlineMarkdown(content)}\n\n`)
  output = output.replace(/<br\s*\/?>/gi, '\n')
  output = output.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_match, content) => `\n- ${inlineMarkdown(content).trim()}`)
  output = output.replace(/<\/?(ul|ol)\b[^>]*>/gi, '\n')
  output = output.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_match, content) => {
    return `\n\n${inlineMarkdown(content)
      .split(/\r?\n/)
      .map((line) => `> ${line}`)
      .join('\n')}\n\n`
  })
  output = output.replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_match, table) => tableToMarkdown(table))
  output = output.replace(/<[^>]+>/g, '')

  return decodeEntities(output)
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join('\n')
}

function tableToMarkdown(table: string): string {
  const rows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) => {
    return [...row[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) => inlineMarkdown(cell[1]).trim())
  })
  if (rows.length === 0) return ''
  const [head, ...body] = rows
  return `\n\n| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${body.map((row) => `| ${row.join(' | ')} |`).join('\n')}\n\n`
}

function inlineMarkdown(value: string): string {
  return decodeEntities(
    value
      .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
      .replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
      .replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
      .replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
      .replace(/<i\b[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
      .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
      .replace(/<[^>]+>/g, '')
  ).trim()
}

function firstMatch(value: string, pattern: RegExp): string | undefined {
  return value.match(pattern)?.[1]
}

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1]
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, '')
}

function normalizeSpace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
