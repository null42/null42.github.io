import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

const manifest = JSON.parse(await fs.readFile('content/code-library/manifest.json', 'utf8')) as { schema: string; projects: Array<{ codeId: string; articles?: Array<{ slug: string }>; files: Array<{ path: string; sha256: string; binary: boolean; lineRange: { start: number; end: number } | null }> }> }
if (manifest.schema !== 'code-library/v1') throw new Error(`Unsupported manifest schema: ${manifest.schema}`)
const ids = new Set<string>()
for (const project of manifest.projects) {
  if (ids.has(project.codeId)) throw new Error(`Duplicate codeId: ${project.codeId}`)
  ids.add(project.codeId)
  for (const article of project.articles || []) {
    if (/^[A-Za-z]:[\\/]|^\//.test(article.slug)) throw new Error(`Absolute article association: ${article.slug}`)
  }
  for (const file of project.files) {
    const absolute = path.resolve('content/code-library', file.path)
    const relative = path.relative(path.resolve('content/code-library'), absolute)
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error(`Manifest path escaped root: ${file.path}`)
    const bytes = await fs.readFile(absolute)
    const hash = createHash('sha256').update(bytes).digest('hex')
    if (hash !== file.sha256) throw new Error(`Hash mismatch: ${file.path}`)
    if (!file.binary && (!file.lineRange || file.lineRange.start !== 1 || file.lineRange.end < 1)) throw new Error(`Invalid line range: ${file.path}`)
  }
}
console.log(`Verified ${manifest.projects.length} code projects.`)
