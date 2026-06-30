import path from 'node:path'
import { fileURLToPath } from 'node:url'

const thisFile = fileURLToPath(import.meta.url)
export const repoRoot = path.resolve(path.dirname(thisFile), '../..')
export const contentRoot = path.join(repoRoot, 'content')
export const generatedRoot = path.join(repoRoot, '.vitepress', 'generated')

export function toPosixPath(value: string): string {
  return value.split(path.sep).join('/')
}

export function stripMarkdownExtension(value: string): string {
  return value.replace(/\.md$/i, '')
}
