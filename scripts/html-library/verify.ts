import fs from 'node:fs'
import path from 'node:path'
import { HTML_DOCUMENT_SOURCES } from './catalog'

const root = process.cwd()
const failures: string[] = []
for (const document of HTML_DOCUMENT_SOURCES) {
  const htmlPath = path.join(root, 'content', 'html', `${document.slug}.html`)
  const metadataPath = path.join(root, 'content', 'html', `${document.slug}.json`)
  if (!fs.existsSync(htmlPath)) failures.push(`Missing HTML: ${document.slug}`)
  if (!fs.existsSync(metadataPath)) failures.push(`Missing metadata: ${document.slug}`)
  if (!fs.existsSync(htmlPath) || !fs.existsSync(metadataPath)) continue
  const html = fs.readFileSync(htmlPath, 'utf8')
  if (!/<meta\s+charset=["']?utf-8/i.test(html)) failures.push(`Missing UTF-8 charset: ${document.slug}`)
  if (/\b(?:src|href)=["'](?:\.\/|\.\.\/)/i.test(html)) failures.push(`Unrewritten relative asset: ${document.slug}`)
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as { assets?: string[]; source?: string }
  if (!metadata.source?.startsWith('learning/')) failures.push(`Invalid source metadata: ${document.slug}`)
  for (const asset of metadata.assets || []) {
    const assetPath = path.join(root, 'public', ...asset.replace(/^\//, '').split('/'))
    if (!fs.existsSync(assetPath)) failures.push(`Missing asset: ${asset}`)
  }
}

if (failures.length) throw new Error(`HTML library verification failed:\n${failures.join('\n')}`)
console.log(`Verified ${HTML_DOCUMENT_SOURCES.length} HTML documents with no broken local assets.`)
