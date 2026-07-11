import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import fg from 'fast-glob'
import matter from 'gray-matter'
import YAML from 'yaml'

export interface ExportOptions { rootDir?: string }
export interface ExportReport {
  converted: number
  skippedPrivate: number
  encrypted: number
  missingTitles: string[]
  missingDates: string[]
  missingAssets: string[]
  rewrittenLinks: number
  redirects: Record<string, string>
}

const rootRedirects: Record<string, string> = {
  '/index.html': '/',
  '/archive.html': '/archive/',
  '/search.html': '/search/',
  '/about.html': '/about/',
  '/tools.html': '/tools/'
}

export function normalizeMarkdown(body: string, sourcePath: string): { body: string; rewrittenLinks: number } {
  let rewrittenLinks = 0
  let normalized = body.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
  normalized = normalized.replace(/^:::\s*(tip|warning|danger|details)(?:\s+(.+))?\r?\n([\s\S]*?)^:::\s*$/gim, (_, type: string, title = '', content: string) => {
    const label = type.toUpperCase() === 'TIP' ? 'NOTE' : type.toUpperCase() === 'DETAILS' ? 'NOTE' : type.toUpperCase()
    return `> [!${label}]${title ? ` ${title.trim()}` : ''}\n${content.trim().split(/\r?\n/).map((line) => `> ${line}`).join('\n')}`
  })
  const sourceDir = path.posix.dirname(sourcePath.replace(/\\/g, '/'))
  normalized = normalized.replace(/(!?\[[^\]]*\]\()([^:)#][^)]*)(\))/g, (match, prefix: string, target: string, suffix: string) => {
    if (target.startsWith('/') || target.startsWith('#')) return match
    rewrittenLinks++
    const [targetPath, fragment] = target.split(/(?=#)/, 2)
    const resolved = path.posix.normalize(path.posix.join('/', sourceDir, targetPath))
    const publicTarget = resolved.endsWith('.md')
      ? `${resolved.replace(/^\/content\//, '/posts/').replace(/\.md$/i, '/')}${fragment || ''}`
      : `${resolved}${fragment || ''}`
    return `${prefix}${publicTarget}${suffix}`
  })
  return { body: normalized, rewrittenLinks }
}

export async function exportAstroContent(options: ExportOptions = {}): Promise<ExportReport> {
  const rootDir = path.resolve(options.rootDir ?? process.cwd())
  const contentDir = path.join(rootDir, 'content')
  const outputDir = path.join(rootDir, 'src', 'content', 'posts')
  const publicDir = path.join(rootDir, 'public')
  const reportDir = path.join(rootDir, 'reports')
  const report: ExportReport = {
    converted: 0, skippedPrivate: 0, encrypted: 0,
    missingTitles: [], missingDates: [], missingAssets: [], rewrittenLinks: 0,
    redirects: { ...rootRedirects }
  }
  fs.rmSync(outputDir, { recursive: true, force: true })
  fs.rmSync(path.join(publicDir, 'index.html'), { force: true })
  fs.mkdirSync(outputDir, { recursive: true })
  fs.mkdirSync(publicDir, { recursive: true })

  const files = await fg('**/*.md', { cwd: contentDir, onlyFiles: true })
  for (const relativePath of files) {
    const normalizedPath = relativePath.replace(/\\/g, '/')
    if (normalizedPath.startsWith('private/')) {
      report.skippedPrivate++
      continue
    }
    const source = fs.readFileSync(path.join(contentDir, relativePath), 'utf8')
    const parsed = matter(source)
    if (parsed.data.visibility === 'private') {
      report.skippedPrivate++
      continue
    }
    const encrypted = parsed.data.visibility === 'encrypted' || normalizedPath.startsWith('encrypted/')
    if (encrypted) report.encrypted++
    const title = parsed.data.title || parsed.content.match(/^#\s+(.+)$/m)?.[1]?.trim() || path.basename(relativePath, '.md')
    const published = normalizeDate(parsed.data.date)
    if (!parsed.data.title) report.missingTitles.push(normalizedPath)
    if (!published) report.missingDates.push(normalizedPath)
    const converted = normalizeMarkdown(parsed.content, `content/${normalizedPath}`)
    report.rewrittenLinks += converted.rewrittenLinks
    copyReferencedAssets(parsed.content, normalizedPath, contentDir, publicDir, report)
    const data = {
      title,
      published: published || fs.statSync(path.join(contentDir, relativePath)).mtime.toISOString().slice(0, 10),
      ...(parsed.data.updated ? { updated: normalizeDate(parsed.data.updated) } : {}),
      draft: parsed.data.visibility === 'hidden',
      description: parsed.data.summary || title,
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
      category: parsed.data.category || normalizedPath.split('/')[0] || '未分类',
      lang: 'zh-CN',
      // 全局评论关闭时，导出内容不得通过文章级配置重新开启。
      comment: false,
      ...(encrypted ? { encryptedPayload: `/content/${normalizedPath.replace(/\.md$/i, '.json')}` } : {})
    }
    const encryptedNotice = encrypted
      ? '<div class="encrypted-article" data-pagefind-ignore="all">此文章为加密内容，请通过密码界面读取加密载荷。</div>\n'
      : converted.body
    const yaml = YAML.stringify(data, { lineWidth: 0 }).trim()
    const destination = path.join(outputDir, relativePath)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, `---\n${yaml}\n---\n\n${encryptedNotice}`, 'utf8')
    report.converted++
    const slug = normalizedPath.replace(/\.md$/i, '')
    report.redirects[`/content/${slug}.html`] = `/posts/${slug}/`

    if (encrypted) {
      const payload = path.join(contentDir, relativePath.replace(/\.md$/i, '.json'))
      if (fs.existsSync(payload)) {
        const payloadDestination = path.join(publicDir, 'content', relativePath.replace(/\.md$/i, '.json'))
        fs.mkdirSync(path.dirname(payloadDestination), { recursive: true })
        fs.copyFileSync(payload, payloadDestination)
      }
    }
  }

  for (const [oldUrl, newUrl] of Object.entries(report.redirects)) {
    // public/index.html 会覆盖 Astro 生成的首页，根路径本身无需兼容重定向页。
    if (oldUrl === '/index.html') continue
    const destination = path.join(publicDir, oldUrl.replace(/^\//, ''))
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, redirectPage(newUrl), 'utf8')
  }
  fs.mkdirSync(reportDir, { recursive: true })
  fs.writeFileSync(path.join(reportDir, 'astro-content-export.json'), JSON.stringify(report, null, 2), 'utf8')
  fs.writeFileSync(path.join(reportDir, 'old-url-manifest.json'), JSON.stringify(report.redirects, null, 2), 'utf8')
  return report
}

function copyReferencedAssets(body: string, markdownPath: string, contentDir: string, publicDir: string, report: ExportReport): void {
  const sourceDir = path.posix.dirname(markdownPath)
  const assetPattern = /!\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g
  for (const match of body.matchAll(assetPattern)) {
    const target = match[1]
    if (!target || /^(?:[a-z]+:|\/|#)/i.test(target)) continue
    const targetPath = decodeURIComponent(target.split('#', 1)[0])
    const relativeAsset = path.posix.normalize(path.posix.join(sourceDir, targetPath))
    if (relativeAsset.startsWith('../')) continue
    const source = path.join(contentDir, ...relativeAsset.split('/'))
    if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
      report.missingAssets.push(`content/${relativeAsset}`)
      continue
    }
    const destination = path.join(publicDir, 'content', ...relativeAsset.split('/'))
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.copyFileSync(source, destination)
  }
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value !== 'string' || !value.trim()) return undefined
  return value.trim().match(/^\d{4}-\d{2}-\d{2}/)?.[0] || value.trim()
}

function redirectPage(target: string): string {
  const escaped = target.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${escaped}"><link rel="canonical" href="${escaped}"><title>页面迁移</title></head><body><a href="${escaped}">页面已迁移，点击继续</a></body></html>`
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  exportAstroContent().then((report) => console.log(JSON.stringify(report, null, 2)))
}
