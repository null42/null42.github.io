import fs from 'node:fs/promises'
import path from 'node:path'
import { contentRoot, repoRoot } from '../paths'

export interface CopyEncryptedPayloadsOptions {
  sourceDir?: string
  distDir?: string
}

export async function copyEncryptedPayloadsToDist(options: CopyEncryptedPayloadsOptions = {}): Promise<string[]> {
  const sourceDir = options.sourceDir || path.join(contentRoot, 'encrypted')
  const distDir = options.distDir || path.join(repoRoot, '.vitepress', 'dist')
  const targetDir = path.join(distDir, 'content', 'encrypted')
  const copied: string[] = []

  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(sourceDir, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return copied
    throw error
  }

  await fs.mkdir(targetDir, { recursive: true })
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const from = path.join(sourceDir, entry.name)
    const to = path.join(targetDir, entry.name)
    await fs.copyFile(from, to)
    copied.push(to)
  }

  return copied
}
