import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { repoRoot } from './paths'

export async function cleanDist(root = repoRoot): Promise<void> {
  await Promise.all([
    fs.rm(path.join(root, '.vitepress', 'dist'), { recursive: true, force: true }),
    fs.rm(path.join(root, 'dist'), { recursive: true, force: true }),
  ])
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  await cleanDist()
  console.log('cleaned .vitepress/dist and dist')
}
