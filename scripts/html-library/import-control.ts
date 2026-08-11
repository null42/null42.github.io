import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const repositoryRoot = process.cwd()
const sourceRoot = path.resolve(process.argv[2] || process.env.CONTROL_HTML_SOURCE || path.join(os.homedir(), 'Documents', 'control', 'course-notes'))
const contentRoot = path.join(repositoryRoot, 'content', 'html', 'control')
const assetRoot = path.join(repositoryRoot, 'public', 'html-assets', 'control')

function decodeText(bytes: Buffer): string {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes) }
  catch { return new TextDecoder('gb18030', { fatal: true }).decode(bytes) }
}

function toPosix(value: string): string { return value.replace(/\\/g, '/') }

const textAssetPattern = /\.(?:css|js|json|md|svg|txt|xml)$/i
const windowsAbsolutePathPattern = /\b[A-Za-z]:(?:\\|\/)[^\r\n`"'<>]+/g
const unixUserAbsolutePathPattern = /\/(?:home|Users)\/[^/\s`"'<>]+\/[^\r\n`"'<>]+/g

function sanitizePublishedText(value: string): string {
  return value
    .replace(windowsAbsolutePathPattern, '[本地源文件]')
    .replace(unixUserAbsolutePathPattern, '[本地源文件]')
}

function walk(root: string): string[] {
  const files: string[] = []
  const visit = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolute)
      else files.push(absolute)
    }
  }
  visit(root)
  return files
}

function extractTitle(html: string, fallback: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return (match?.[1] || fallback).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function rewriteHtml(source: string, relativeHtml: string): { html: string; assets: string[] } {
  const directory = path.posix.dirname(relativeHtml)
  const assets = new Set<string>()
  let html = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
  if (!/<html\b/i.test(html)) {
    const fallbackTitle = path.basename(relativeHtml, path.extname(relativeHtml)).replace(/[-_]+/g, ' ')
    html = `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${fallbackTitle}</title><style>body{margin:0 auto;max-width:72rem;padding:2rem;font:16px/1.75 system-ui,sans-serif;color:#1a1a1a;background:#fff}img,svg{max-width:100%;height:auto}code{overflow-wrap:anywhere}</style></head><body>${html}</body></html>`
  } else if (/<meta\b[^>]*\bcharset\s*=/i.test(html)) {
    html = html.replace(/<meta\b[^>]*\bcharset\s*=\s*["']?[^\s"'>]+["']?[^>]*>/i, '<meta charset="utf-8">')
  } else if (/<head(?:\s[^>]*)?>/i.test(html)) {
    html = html.replace(/<head(\s[^>]*)?>/i, match => `${match}\n<meta charset="utf-8">`)
  } else {
    html = `<meta charset="utf-8">\n${html}`
  }
  html = html.replace(/\b(src|href)=(["'])([^"']+)\2/gi, (full, attribute: string, quote: string, value: string) => {
    if (/^(?:[a-z]+:|#|\/)/i.test(value)) return full
    const suffixIndex = value.search(/[?#]/)
    const bare = suffixIndex >= 0 ? value.slice(0, suffixIndex) : value
    const suffix = suffixIndex >= 0 ? value.slice(suffixIndex) : ''
    const resolved = path.posix.normalize(path.posix.join(directory, bare))
    if (resolved.startsWith('../')) return full
    if (/\.html?$/i.test(resolved)) return `${attribute}=${quote}/html-raw/control/${resolved.replace(/\.html?$/i, '')}/${suffix}${quote}`
    assets.add(resolved)
    return `${attribute}=${quote}/html-assets/control/${resolved}${suffix}${quote}`
  })
  return { html, assets: [...assets].sort() }
}

if (!fs.existsSync(sourceRoot)) throw new Error(`Control HTML source not found: ${sourceRoot}`)
fs.rmSync(contentRoot, { recursive: true, force: true })
fs.rmSync(assetRoot, { recursive: true, force: true })
fs.mkdirSync(contentRoot, { recursive: true })
fs.mkdirSync(assetRoot, { recursive: true })

const allFiles = walk(sourceRoot)
const htmlFiles = allFiles.filter(file => /\.html?$/i.test(file) && !/\.tmp\.html$/i.test(file))
const documents: Array<{ slug: string; title: string }> = []

for (const absolute of allFiles) {
  if (/\.html?$/i.test(absolute)) continue
  const relative = toPosix(path.relative(sourceRoot, absolute))
  const destination = path.join(assetRoot, ...relative.split('/'))
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  if (textAssetPattern.test(absolute)) {
    fs.writeFileSync(destination, sanitizePublishedText(decodeText(fs.readFileSync(absolute))), 'utf8')
  } else {
    fs.copyFileSync(absolute, destination)
  }
}

for (const absolute of htmlFiles) {
  const relative = toPosix(path.relative(sourceRoot, absolute))
  const slug = `control/${relative.replace(/\.html?$/i, '')}`
  const source = sanitizePublishedText(decodeText(fs.readFileSync(absolute)))
  const rewritten = rewriteHtml(source, relative)
  const htmlOutput = path.join(contentRoot, ...relative.split('/')).replace(/\.htm$/i, '.html')
  const metadataOutput = htmlOutput.replace(/\.html$/i, '.json')
  const title = extractTitle(rewritten.html, path.basename(relative, path.extname(relative)))
  fs.mkdirSync(path.dirname(htmlOutput), { recursive: true })
  fs.writeFileSync(htmlOutput, rewritten.html, 'utf8')
  fs.writeFileSync(metadataOutput, `${JSON.stringify({
    title,
    description: '控制理论与信号系统交互课程页面。',
    source: `control/course-notes/${relative}`,
    assets: rewritten.assets.map(asset => `/html-assets/control/${asset}`),
    group: relative.split('/')[0] || 'course-notes',
  }, null, 2)}\n`, 'utf8')
  documents.push({ slug, title })
}

const manifestPath = path.join(repositoryRoot, 'content', 'html', 'manifest.json')
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : { documents: [] }
manifest.documents = [...(manifest.documents || []).filter((entry: { slug?: string }) => !entry.slug?.startsWith('control/')), ...documents]
manifest.documents.sort((left: { slug: string }, right: { slug: string }) => left.slug.localeCompare(right.slug))
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`Imported ${documents.length} control HTML documents.`)
