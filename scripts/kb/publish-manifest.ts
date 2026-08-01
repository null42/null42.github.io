import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { contentRoot, repoRoot, toPosixPath } from './paths'
import type { ArticleRecord } from './types'

export interface PublishManifestArticle {
  path: string
  url: string
  title: string
  visibility: string
  quality?: string
}

export interface PublishManifestAsset {
  path: string
  kind: 'encrypted-payload'
}

export interface PublishManifest {
  generatedAt: string
  articles: PublishManifestArticle[]
  encryptedPayloads: PublishManifestAsset[]
  forbiddenContentPrefixes: string[]
  forbiddenAssetPatterns: string[]
}

export interface PublishManifestIssue {
  code: 'forbidden-content' | 'forbidden-asset' | 'non-public-article' | 'encrypted-plaintext'
  message: string
  path?: string
}

export const forbiddenContentPrefixes = [
  'content/power/lessons/',
  'content/motor/simulations/'
]

export const forbiddenAssetPatterns = [
  'content_motor_simulations',
  'content_power_lessons'
]

export async function buildPublishManifest(articles: ArticleRecord[]): Promise<PublishManifest> {
  const encryptedPayloads = await fg('encrypted/*.json', {
    cwd: contentRoot,
    absolute: false,
    onlyFiles: true,
    ignore: ['**/column.config.json']
  })

  return {
    generatedAt: new Date().toISOString(),
    articles: articles.map((article) => ({
      path: article.path.replace(/\\/g, '/'),
      url: article.url,
      title: article.title,
      visibility: String(article.visibility),
      quality: article.quality
    })),
    encryptedPayloads: encryptedPayloads.sort().map((item) => ({
      path: `content/${toPosixPath(item)}`,
      kind: 'encrypted-payload'
    })),
    forbiddenContentPrefixes,
    forbiddenAssetPatterns
  }
}

export function validatePublishManifest(manifest: PublishManifest): PublishManifestIssue[] {
  const issues: PublishManifestIssue[] = []
  for (const article of manifest.articles) {
    if (article.visibility !== 'public') {
      issues.push({ code: 'non-public-article', message: `${article.path} is not public`, path: article.path })
    }
    if (isForbiddenContentPath(article.path)) {
      issues.push({ code: 'forbidden-content', message: `${article.path} is forbidden`, path: article.path })
    }
  }

  for (const payload of manifest.encryptedPayloads) {
    if (isForbiddenContentPath(payload.path)) {
      issues.push({ code: 'forbidden-content', message: `${payload.path} is forbidden`, path: payload.path })
    }
    const absolute = path.join(repoRoot, payload.path)
    if (fs.existsSync(absolute)) {
      const text = fs.readFileSync(absolute, 'utf8')
      if (/明文|plaintext|世界观正文|私密正文/i.test(text)) {
        issues.push({ code: 'encrypted-plaintext', message: `${payload.path} appears to contain plaintext`, path: payload.path })
      }
    }
  }

  for (const assetPath of listExistingAssetFiles()) {
    if (manifest.forbiddenAssetPatterns.some((pattern) => assetPath.includes(pattern))) {
      issues.push({ code: 'forbidden-asset', message: `${assetPath} is a stale forbidden asset`, path: assetPath })
    }
  }

  return issues
}

export async function writePublishManifest(manifest: PublishManifest, outFile: string): Promise<void> {
  await fsp.mkdir(path.dirname(outFile), { recursive: true })
  await fsp.writeFile(outFile, JSON.stringify(manifest, null, 2), 'utf8')
}

export function isForbiddenContentPath(value: string): boolean {
  const normalized = value.replace(/\\/g, '/')
  return forbiddenContentPrefixes.some((prefix) => normalized.startsWith(prefix))
}

function listExistingAssetFiles(): string[] {
  const roots = [path.join(repoRoot, '.vitepress', 'dist', 'assets'), path.join(repoRoot, 'assets')]
  const files: string[] = []
  for (const root of roots) {
    if (!fs.existsSync(root)) continue
    walkSync(root, files)
  }
  return files.map((file) => toPosixPath(path.relative(repoRoot, file)))
}

function walkSync(dir: string, files: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkSync(full, files)
    else files.push(full)
  }
}
