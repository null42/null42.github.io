import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { repoRoot } from './paths'

export async function cleanDist(): Promise<void> {
  await fs.rm(path.join(repoRoot, '.vitepress', 'dist'), { recursive: true, force: true })
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  await cleanDist()
  console.log('cleaned .vitepress/dist')
}
