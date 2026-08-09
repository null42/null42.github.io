import fs from 'node:fs'
import path from 'node:path'
import { HTML_DOCUMENT_SOURCES } from './catalog'

const repositoryRoot = process.cwd()
const contentRoot = path.join(repositoryRoot, 'content', 'html')
const assetRoot = path.join(repositoryRoot, 'public', 'html-assets')
const LEARNING_ROOT = path.resolve(repositoryRoot, '..')

function decodeText(bytes: Buffer): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  } catch {
    return new TextDecoder('gb18030', { fatal: true }).decode(bytes)
  }
}

function normalizeHtml(source: string, slug: string): string {
  let html = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
  if (/<meta\s+charset=/i.test(html)) html = html.replace(/<meta\s+charset=[^>]+>/i, '<meta charset="utf-8">')
  else html = html.replace(/<head(\s[^>]*)?>/i, match => `${match}\n<meta charset="utf-8">`)
  return html
    .replace(/(["'])\.\/styles\.css\1/g, `$1/html-assets/${slug}/styles.css$1`)
    .replace(/(["'])\.\/app\.js\1/g, `$1/html-assets/${slug}/app.js$1`)
}

fs.mkdirSync(contentRoot, { recursive: true })
fs.mkdirSync(assetRoot, { recursive: true })

const manifest = { documents: [] as Array<{ slug: string; title: string }> }
for (const document of HTML_DOCUMENT_SOURCES) {
  const sourcePath = path.join(LEARNING_ROOT, ...document.source.split('/'))
  if (!fs.existsSync(sourcePath)) throw new Error(`HTML source not found: ${sourcePath}`)
  const html = normalizeHtml(decodeText(fs.readFileSync(sourcePath)), document.slug)
  fs.writeFileSync(path.join(contentRoot, `${document.slug}.html`), html, 'utf8')
  fs.writeFileSync(path.join(contentRoot, `${document.slug}.json`), `${JSON.stringify({
    title: document.title,
    description: document.description,
    source: `learning/${document.source}`,
    assets: document.assets?.map(asset => `/html-assets/${document.slug}/${path.basename(asset)}`) || [],
  }, null, 2)}\n`, 'utf8')
  manifest.documents.push({ slug: document.slug, title: document.title })

  if (document.assets?.length) {
    const destination = path.join(assetRoot, document.slug)
    fs.mkdirSync(destination, { recursive: true })
    for (const asset of document.assets) {
      const assetPath = path.join(LEARNING_ROOT, ...asset.split('/'))
      if (!fs.existsSync(assetPath)) throw new Error(`HTML asset not found: ${assetPath}`)
      const bytes = fs.readFileSync(assetPath)
      const extension = path.extname(assetPath).toLowerCase()
      fs.writeFileSync(path.join(destination, path.basename(asset)), ['.css', '.js'].includes(extension) ? decodeText(bytes).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n') : bytes)
    }
  }
}
fs.writeFileSync(path.join(contentRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

console.log(`Imported ${HTML_DOCUMENT_SOURCES.length} HTML documents.`)
