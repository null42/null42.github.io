import fs from 'node:fs/promises'
import path from 'node:path'
import YAML from 'yaml'
import type { CategoryDefaults } from './types'

export async function loadInheritedCategoryDefaults(filePath: string, contentRoot: string): Promise<CategoryDefaults> {
  const absoluteContentRoot = path.resolve(contentRoot)
  const absoluteFilePath = path.resolve(filePath)
  const startDir = path.dirname(absoluteFilePath)
  const dirs: string[] = []

  let current = startDir
  while (current.startsWith(absoluteContentRoot)) {
    dirs.unshift(current)
    if (current === absoluteContentRoot) break
    current = path.dirname(current)
  }

  const merged: CategoryDefaults = {}
  for (const dir of dirs) {
    const categoryFile = path.join(dir, '.category.yml')
    try {
      const raw = await fs.readFile(categoryFile, 'utf8')
      Object.assign(merged, YAML.parse(raw) as CategoryDefaults)
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code !== 'ENOENT') throw error
    }
  }

  return merged
}
