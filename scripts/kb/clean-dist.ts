import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { repoRoot } from './paths'

/**
 * 分步递归删除目录，绕过 Node.js v24 在 Windows 上 fs.rm 静默失败的 bug。
 * fs.rm({ recursive: true, force: true }) 在某些 Windows 临时目录下不会抛错
 * 但目录仍存在；改为先删除文件再删除目录的深度优先遍历。
 */
async function rmRecursive(target: string): Promise<void> {
  let stat: fsSync.Stats
  try {
    stat = await fs.lstat(target)
  } catch {
    // 路径不存在，直接返回
    return
  }

  if (stat.isDirectory()) {
    const entries = await fs.readdir(target, { withFileTypes: true })
    for (const entry of entries) {
      await rmRecursive(path.join(target, entry.name))
    }
    try {
      await fs.rmdir(target)
    } catch (err) {
      // 重试一次，可能是 Windows 文件系统延迟释放
      await new Promise((resolve) => setTimeout(resolve, 50))
      await fs.rmdir(target).catch(() => {})
    }
  } else {
    try {
      await fs.unlink(target)
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      await fs.unlink(target).catch(() => {})
    }
  }
}

export async function cleanDist(root = repoRoot): Promise<void> {
  await rmRecursive(path.join(root, '.vitepress', 'dist'))
  await rmRecursive(path.join(root, 'dist'))
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  await cleanDist()
  console.log('cleaned .vitepress/dist and dist')
}
