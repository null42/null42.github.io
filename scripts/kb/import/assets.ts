import fs from 'node:fs/promises'
import path from 'node:path'

const imageExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'])

export function isImageAsset(filePath: string): boolean {
  return imageExtensions.has(path.extname(filePath).toLowerCase())
}

export async function copyAsset(from: string, to: string): Promise<void> {
  await fs.mkdir(path.dirname(to), { recursive: true })
  await fs.copyFile(from, to)
}

export function toMarkdownImage(alt: string, relativePath: string): string {
  return `![${alt}](${relativePath.replace(/\\/g, '/')})`
}
