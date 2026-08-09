import fs from 'node:fs/promises'
import path from 'node:path'
import manifest from '../../../../content/code-library/manifest.json'

type ManifestFile = { path: string; name: string; language: string; binary: boolean }
const files = manifest.projects.flatMap(project => project.files) as ManifestFile[]

export function getStaticPaths() {
  return files.map(file => ({ params: { path: file.path }, props: { file } }))
}

export async function GET({ props }: { props: { file: ManifestFile } }) {
  const root = path.resolve('content/code-library')
  const absolute = path.resolve(root, props.file.path)
  const relative = path.relative(root, absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return new Response('Code file path escaped library root.', { status: 400 })
  try {
    const bytes = await fs.readFile(absolute)
    const contentType = props.file.binary ? 'application/octet-stream' : 'text/plain; charset=utf-8'
    return new Response(bytes, { headers: { 'content-type': contentType, 'content-disposition': `attachment; filename*=UTF-8''${encodeURIComponent(props.file.name)}` } })
  } catch {
    return new Response(`Code file not found: ${props.file.path}`, { status: 404 })
  }
}
