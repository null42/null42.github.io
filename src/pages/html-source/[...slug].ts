import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'

type HtmlDocument = { slug: string; output: string }

export function getStaticPaths() {
  const root = path.resolve('content/html')
  if (!fsSync.existsSync(root)) return []
  const documents: HtmlDocument[] = []
  const walk = (directory: string) => {
    for (const entry of fsSync.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(absolute)
      else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        const relative = path.relative(root, absolute).replace(/\\/g, '/')
        documents.push({ slug: relative.replace(/\.html$/i, ''), output: relative })
      }
    }
  }
  walk(root)
  return documents.map(document => ({ params: { slug: document.output }, props: { document } }))
}

export async function GET({ props }: { props: { document: HtmlDocument } }) {
  const root = path.resolve('content/html')
  const absolute = path.resolve(root, `${props.document.slug}.html`)
  const relative = path.relative(root, absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return new Response('HTML path escaped library root.', { status: 400 })
  try {
    const html = await fs.readFile(absolute)
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'content-disposition': `inline; filename*=UTF-8''${encodeURIComponent(path.basename(props.document.output))}` } })
  } catch {
    return new Response(`HTML document not found: ${props.document.slug}`, { status: 404 })
  }
}
