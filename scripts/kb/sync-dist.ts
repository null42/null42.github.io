import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = process.cwd()
const dist = path.join(root, '.vitepress', 'dist')

export async function syncDistToRoot(): Promise<void> {
  await fs.access(dist)

  await removeIfExists(path.join(root, 'assets'))
  await copyDir(path.join(dist, 'assets'), path.join(root, 'assets'))

  for (const entry of await fs.readdir(dist, { withFileTypes: true })) {
    if (entry.isFile()) {
      await copyFile(path.join(dist, entry.name), path.join(root, entry.name))
    }
  }

  await syncHtmlFiles(path.join(dist, 'content'), path.join(root, 'content'))
}

async function syncHtmlFiles(fromRoot: string, toRoot: string): Promise<void> {
  await removeHtmlFiles(toRoot)
  for await (const file of walk(fromRoot)) {
    if (!file.endsWith('.html')) continue
    const relative = path.relative(fromRoot, file)
    await copyFile(file, path.join(toRoot, relative))
  }
}

async function removeHtmlFiles(dir: string): Promise<void> {
  for await (const file of walk(dir)) {
    if (file.endsWith('.html')) await fs.rm(file, { force: true })
  }
}

async function copyDir(from: string, to: string): Promise<void> {
  await removeIfExists(to)
  await fs.mkdir(to, { recursive: true })
  for await (const file of walk(from)) {
    const relative = path.relative(from, file)
    await copyFile(file, path.join(to, relative))
  }
}

async function copyFile(from: string, to: string): Promise<void> {
  await fs.mkdir(path.dirname(to), { recursive: true })
  await fs.copyFile(from, to)
}

async function removeIfExists(target: string): Promise<void> {
  await fs.rm(target, { recursive: true, force: true })
}

async function* walk(dir: string): AsyncGenerator<string> {
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return
    throw error
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  await syncDistToRoot()
  console.log('synced .vitepress/dist to repository root')
}
