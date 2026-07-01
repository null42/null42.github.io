import path from 'node:path'
import { convertHtml } from './html-to-markdown'

export interface VueSimulationConversionResult {
  title: string
  markdown: string
}

export function convertVueSimulation(source: string, filePath: string): VueSimulationConversionResult {
  const template = source.match(/<template>([\s\S]*?)<\/template>/i)?.[1] || source
  const h4 = template.match(/<h4\b[^>]*>([\s\S]*?)<\/h4>/i)?.[1]
  const title = cleanInline(h4 || path.basename(filePath, path.extname(filePath)))
  const fragments = [template.match(/<h4\b[^>]*>[\s\S]*?<\/h4>/i)?.[0], ...[...template.matchAll(/<details\b[^>]*>[\s\S]*?<\/details>/gi)].map((match) => match[0])]
    .filter(Boolean)
    .join('\n')

  const normalized = fragments
    .replace(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi, '<h2>$1</h2>')
    .replace(/<template\b[^>]*>/gi, '')
    .replace(/<\/template>/gi, '')
    .replace(/<[^>]+v-[^>]+[^>]*>/gi, '')

  const converted = convertHtml(`<body>${normalized || `<h1>${title}</h1>`}</body>`)
  return {
    title,
    markdown: converted.markdown.startsWith('# ') ? converted.markdown : `# ${title}\n\n${converted.markdown}`
  }
}

function cleanInline(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}
