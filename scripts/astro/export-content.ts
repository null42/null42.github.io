import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import fg from 'fast-glob'
import YAML from 'yaml'
import { scanMarkdownFiles } from '../kb/articles'
import { decideVisibility, normalizeArticle } from '../kb/domain/normalize-article'
import { normalizeVitePressContainers } from '../kb/markdown-compat'

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
  '/about.html': '/about/'
}

export function normalizeMarkdown(body: string, sourcePath: string): { body: string; rewrittenLinks: number } {
  let rewrittenLinks = 0
  let normalized = body.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
  normalized = normalizeVitePressContainers(normalized)
  const sourceDir = path.posix.dirname(sourcePath.replace(/\\/g, '/'))
  normalized = normalized.replace(/(!?\[[^\]]*\]\()([^:)#][^)]*)(\))/g, (match, prefix: string, target: string, suffix: string) => {
    if (target.startsWith('/') || target.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(target)) return match
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
  const rootDirReal = fs.realpathSync(rootDir)
  const contentDir = path.join(rootDir, 'content')
  if (fs.lstatSync(contentDir).isSymbolicLink()) throw new Error(`Content root must not be a symbolic link: ${contentDir}`)
  const contentDirReal = fs.realpathSync(contentDir)
  const outputDir = path.join(rootDir, 'src', 'content', 'posts')
  const publicDir = path.join(rootDir, 'public')
  const reportDir = path.join(rootDir, 'reports')
  const distDir = path.join(rootDir, 'dist')
  const previousRedirectsPath = path.join(reportDir, 'old-url-manifest.json')
  const report: ExportReport = {
    converted: 0, skippedPrivate: 0, encrypted: 0,
    missingTitles: [], missingDates: [], missingAssets: [], rewrittenLinks: 0,
    redirects: { ...rootRedirects }
  }
  await cleanGeneratedDirectory(outputDir, rootDir, rootDirReal)
  await cleanGeneratedDirectory(path.join(distDir, 'content'), rootDir, rootDirReal)
  await cleanGeneratedDirectory(path.join(distDir, 'posts', 'private'), rootDir, rootDirReal)
  await cleanGeneratedDirectory(path.join(publicDir, 'content'), rootDir, rootDirReal)
  if (fs.existsSync(previousRedirectsPath)) {
    const previousRedirects = JSON.parse(fs.readFileSync(previousRedirectsPath, 'utf8')) as Record<string, string>
    for (const oldUrl of Object.keys(previousRedirects)) {
      if (oldUrl === '/index.html') continue
      for (const outputRoot of [publicDir, distDir]) removeGeneratedFile(resolveLegacyOutputPath(outputRoot, oldUrl))
    }
  }
  removeGeneratedFile(path.join(publicDir, 'index.html'))
  fs.mkdirSync(outputDir, { recursive: true })
  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(distDir, { recursive: true })

  const privateFiles = await fg('private/**/*.md', { cwd: contentDir, onlyFiles: true, followSymbolicLinks: false })
  report.skippedPrivate += privateFiles.length
  const records = await scanMarkdownFiles({ contentRoot: contentDir })
  for (const record of records) {
    const normalizedPath = path.relative(contentDir, record.absolutePath).replace(/\\/g, '/')
    const relativePath = normalizedPath
    if (normalizedPath.startsWith('private/')) {
      await cleanGeneratedDirectory(path.join(distDir, 'posts', ...normalizedPath.replace(/\.md$/i, '').toLowerCase().split('/')), rootDir, rootDirReal)
      report.skippedPrivate++
      continue
    }
    const parsed = { data: record.completed, content: record.body }
    const slug = normalizedPath.replace(/\.md$/i, '')
    const canonical = normalizeArticle(record.completed, {
      sourcePath: record.relativePath,
      slug,
      column: record.column,
      orderWasExplicit: finiteNumber(record.data.order) !== undefined,
    })
    const visibilityDecision = decideVisibility(canonical.visibility)
    if (!visibilityDecision.html) {
      await cleanGeneratedDirectory(path.join(distDir, 'posts', ...normalizedPath.replace(/\.md$/i, '').toLowerCase().split('/')), rootDir, rootDirReal)
      report.skippedPrivate++
      continue
    }
    const encrypted = visibilityDecision.encryptedPayload
    const encryptedPayloadSource = visibilityDecision.encryptedPayload ? path.join(contentDir, relativePath.replace(/\.md$/i, '.json')) : undefined
    if (encryptedPayloadSource && (!fs.existsSync(encryptedPayloadSource) || !fs.statSync(encryptedPayloadSource).isFile())) {
      throw new Error(`Encrypted payload missing for content/${normalizedPath}`)
    }
    if (encryptedPayloadSource) assertContentSourceFile(encryptedPayloadSource, contentDirReal, 'Encrypted payload')
    if (encryptedPayloadSource) validateEncryptedPayloadFile(encryptedPayloadSource, normalizedPath)
    if (encrypted) report.encrypted++
    const title = parsed.data.title || parsed.content.match(/^#\s+(.+)$/m)?.[1]?.trim() || path.basename(relativePath, '.md')
    const published = normalizeDate(parsed.data.date)
    if (!parsed.data.title) report.missingTitles.push(normalizedPath)
    if (!published) report.missingDates.push(normalizedPath)
    const converted = normalizeMarkdown(parsed.content, `content/${normalizedPath}`)
    converted.body = degradeUnavailableLocalLinks(converted.body, rootDir)
    report.rewrittenLinks += converted.rewrittenLinks
    if (visibilityDecision.attachments) copyReferencedAssets(parsed.content, normalizedPath, contentDir, contentDirReal, [publicDir, distDir], report)
    const encryptedDescription = '该文章已加密，请打开后验证访问权限'
    const data = {
      title,
      published: encrypted ? '1970-01-01' : published || fs.statSync(path.join(contentDir, relativePath)).mtime.toISOString().slice(0, 10),
      ...(!encrypted && parsed.data.updated ? { updated: normalizeDate(parsed.data.updated) } : {}),
      draft: canonical.visibility === 'hidden',
      visibility: canonical.visibility,
      description: visibilityDecision.summary ? parsed.data.summary || title : encrypted ? encryptedDescription : title,
      tags: visibilityDecision.summary && Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
      category: visibilityDecision.summary ? parsed.data.category || normalizedPath.split('/')[0] || '未分类' : encrypted ? '加密内容' : '隐藏内容',
      lang: 'zh-CN',
      // 全局评论关闭时，导出内容不得通过文章级配置重新开启。
      comment: false,
      ...(canonical.sectionId ? { sectionId: canonical.sectionId, sectionTitle: canonical.sectionTitle } : {}),
      ...(canonical.routeId ? { routeId: canonical.routeId, routeTitle: canonical.routeTitle } : {}),
      ...(canonical.stageId ? { stageId: canonical.stageId, stageTitle: canonical.stageTitle } : {}),
      articleId: canonical.articleId,
      order: canonical.order,
      ...(visibilityDecision.summary && canonical.difficulty ? { difficulty: canonical.difficulty } : {}),
      ...(visibilityDecision.summary && canonical.quality ? { quality: canonical.quality } : {}),
      ...(visibilityDecision.encryptedPayload ? { encryptedPayload: '/content/' + normalizedPath.replace(/\.md$/i, '.json') } : {})
    }
    const encryptedNotice = encrypted
      ? '<div class="encrypted-article" data-pagefind-ignore="all">此文章为加密内容，请通过密码界面读取加密载荷。</div>\n'
      : converted.body
    const yaml = YAML.stringify(data, { lineWidth: 0 }).trim()
    const destination = path.join(outputDir, relativePath)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, `---\n${yaml}\n---\n\n${encryptedNotice}`, 'utf8')
    report.converted++
    report.redirects[`/content/${slug}.html`] = `/posts/${slug.toLowerCase()}/`

    if (encryptedPayloadSource) {
			for (const outputRoot of [publicDir, distDir]) {
				const payloadDestination = path.join(outputRoot, 'content', relativePath.replace(/\.md$/i, '.json'))
				fs.mkdirSync(path.dirname(payloadDestination), { recursive: true })
				fs.copyFileSync(encryptedPayloadSource, payloadDestination)
			}
    }
  }

  for (const [oldUrl, newUrl] of Object.entries(report.redirects)) {
    // public/index.html 会覆盖 Astro 生成的首页，根路径本身无需兼容重定向页。
    if (oldUrl === '/index.html') continue
		for (const outputRoot of [publicDir, distDir]) {
			const destination = resolveLegacyOutputPath(outputRoot, oldUrl)
			fs.mkdirSync(path.dirname(destination), { recursive: true })
			fs.writeFileSync(destination, redirectPage(newUrl), 'utf8')
		}
  }
  for (const removedUrl of removedRootPages) {
		for (const outputRoot of [publicDir, distDir]) {
			const destination = resolveLegacyOutputPath(outputRoot, removedUrl)
			fs.writeFileSync(destination, '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>页面已移除</title></head><body><p>此页面已移除。</p></body></html>', 'utf8')
		}
  }
  fs.mkdirSync(reportDir, { recursive: true })
  fs.writeFileSync(path.join(reportDir, 'astro-content-export.json'), JSON.stringify(report, null, 2), 'utf8')
  fs.writeFileSync(path.join(reportDir, 'old-url-manifest.json'), JSON.stringify(report.redirects, null, 2), 'utf8')
  return report
}

const removedRootPages = ['/tools.html']

function resolveLegacyOutputPath(outputRoot: string, oldUrl: string): string {
  if (!oldUrl.startsWith('/') || oldUrl.includes('\\') || oldUrl.includes('\0')) {
    throw new Error(`Unsafe legacy redirect path: ${oldUrl}`)
  }
  const relativeUrl = oldUrl.slice(1)
  if (!relativeUrl || path.isAbsolute(relativeUrl)) throw new Error(`Unsafe legacy redirect path: ${oldUrl}`)
  const destination = path.resolve(outputRoot, relativeUrl)
  const relativeDestination = path.relative(outputRoot, destination)
  if (relativeDestination === '..' || relativeDestination.startsWith(`..${path.sep}`) || path.isAbsolute(relativeDestination)) {
    throw new Error(`Unsafe legacy redirect path: ${oldUrl}`)
  }
  return destination
}

function removeGeneratedFile(filePath: string): void {
  try {
    fs.unlinkSync(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

async function cleanGeneratedDirectory(directory: string, workspaceRoot: string, workspaceRootReal: string): Promise<void> {
  assertGeneratedRootWithinWorkspace(directory, workspaceRoot, workspaceRootReal)
  if (!fs.existsSync(directory)) return
  const root = path.resolve(directory)
  if (fs.lstatSync(root).isSymbolicLink()) {
    fs.unlinkSync(root)
    return
  }
  const realRoot = fs.realpathSync(root)
  const cleanDirectory = (currentDirectory: string): void => {
    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const child = path.resolve(currentDirectory, entry.name)
      const relativeChild = path.relative(root, child)
      if (relativeChild === '..' || relativeChild.startsWith(`..${path.sep}`) || path.isAbsolute(relativeChild)) {
        throw new Error(`Unsafe generated path: ${child}`)
      }
      const stats = fs.lstatSync(child)
      if (stats.isSymbolicLink()) {
        fs.unlinkSync(child)
        continue
      }
      if (stats.isDirectory()) {
        const realChild = fs.realpathSync(child)
        const relativeRealChild = path.relative(realRoot, realChild)
        if (relativeRealChild === '..' || relativeRealChild.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRealChild)) {
          throw new Error(`Generated directory escaped its root: ${child}`)
        }
        cleanDirectory(child)
        fs.rmdirSync(child)
        continue
      }
      fs.unlinkSync(child)
    }
  }
  cleanDirectory(root)
}

function assertGeneratedRootWithinWorkspace(directory: string, workspaceRoot: string, workspaceRootReal: string): void {
  const root = path.resolve(workspaceRoot)
  const target = path.resolve(directory)
  const relativeTarget = path.relative(root, target)
  if (relativeTarget === '..' || relativeTarget.startsWith(`..${path.sep}`) || path.isAbsolute(relativeTarget)) {
    throw new Error(`Generated root escaped workspace: ${directory}`)
  }
  let current = root
  for (const segment of relativeTarget.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment)
    if (!fs.existsSync(current)) break
    if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Generated root escaped workspace: ${directory}`)
  }
  if (!fs.existsSync(target)) return
  const realTarget = fs.realpathSync(target)
  const relativeRealTarget = path.relative(workspaceRootReal, realTarget)
  if (relativeRealTarget === '..' || relativeRealTarget.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRealTarget)) {
    throw new Error(`Generated root escaped workspace: ${directory}`)
  }
}

function copyReferencedAssets(body: string, markdownPath: string, contentDir: string, contentDirReal: string, outputRoots: string[], report: ExportReport): void {
  const sourceDir = path.posix.dirname(markdownPath)
  const assetPattern = /!\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g
  for (const match of body.matchAll(assetPattern)) {
    const target = match[1]
    if (!target || /^(?:[a-z]+:|\/|#)/i.test(target)) continue
    const targetPath = decodeURIComponent(target.split('#', 1)[0])
    if (targetPath.includes('\\')) throw new Error(`Invalid attachment path in content/${markdownPath}: ${target}`)
    const relativeAsset = path.posix.normalize(path.posix.join(sourceDir, targetPath))
    if (relativeAsset === '..' || relativeAsset.startsWith('../') || path.posix.isAbsolute(relativeAsset)) {
      throw new Error(`Invalid attachment path in content/${markdownPath}: ${target}`)
    }
    const source = path.join(contentDir, ...relativeAsset.split('/'))
    if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
      report.missingAssets.push(`content/${relativeAsset}`)
      continue
    }
		assertContentSourceFile(source, contentDirReal, 'Attachment source')
		for (const outputRoot of outputRoots) {
			const destination = path.join(outputRoot, 'content', ...relativeAsset.split('/'))
			fs.mkdirSync(path.dirname(destination), { recursive: true })
			fs.copyFileSync(source, destination)
		}
  }
}

function assertContentSourceFile(source: string, contentDirReal: string, label: string): void {
  const sourceStats = fs.lstatSync(source)
  if (sourceStats.isSymbolicLink()) throw new Error(`${label} escaped content root: ${source}`)
  const realSource = fs.realpathSync(source)
  const relativeSource = path.relative(contentDirReal, realSource)
  if (relativeSource === '..' || relativeSource.startsWith(`..${path.sep}`) || path.isAbsolute(relativeSource)) {
    throw new Error(`${label} escaped content root: ${source}`)
  }
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value !== 'string' || !value.trim()) return undefined
  return value.trim().match(/^\d{4}-\d{2}-\d{2}/)?.[0] || value.trim()
}

function finiteNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value)
  return undefined
}

export function redirectPage(target: string): string {
  target = target.replace(/\/index\/$/i, '/')
  const escaped = target.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  const scriptTarget = JSON.stringify(target)
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${escaped}"><link rel="canonical" href="${escaped}"><title>页面迁移</title></head><body><a href="${escaped}">页面已迁移，点击继续</a><script>const target=${scriptTarget};location.replace(target+(location.hash||''));</script></body></html>`
}

function validateEncryptedPayloadFile(payloadPath: string, markdownPath: string): void {
  let payload: unknown
  try {
    payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
  } catch {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: malformed JSON`)
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: expected object`)
  }

  const record = payload as Record<string, unknown>
  const allowedKeys = new Set(['algorithm', 'kdf', 'contentType', 'iterations', 'salt', 'iv', 'ciphertext'])
  if (Object.keys(record).some((key) => !allowedKeys.has(key))) {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: unknown field`)
  }
  if (record.algorithm !== 'AES-GCM' || record.kdf !== 'PBKDF2-SHA256' || record.contentType !== 'text/html') {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: unsupported format`)
  }
  if (!Number.isInteger(record.iterations) || Number(record.iterations) < 100_000 || Number(record.iterations) > 1_000_000) {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: unsafe iterations`)
  }

  const salt = decodeStrictBase64(record.salt)
  const iv = decodeStrictBase64(record.iv)
  const ciphertext = decodeStrictBase64(record.ciphertext)
  if (!salt || salt.length < 16 || !iv || iv.length !== 12 || !ciphertext || ciphertext.length <= 16) {
    throw new Error(`Invalid encrypted payload for content/${markdownPath}: invalid AES-GCM parameters`)
  }
}

function decodeStrictBase64(value: unknown): Buffer | undefined {
  if (typeof value !== 'string' || !value || value.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return undefined
  const decoded = Buffer.from(value, 'base64')
  return decoded.toString('base64') === value ? decoded : undefined
}

function degradeUnavailableLocalLinks(body: string, rootDir: string): string {
  return body.replace(/\[([^\]]+)\]\((\/(?:content|sims)\/[^)]+)\)/g, (match, label: string, target: string) => {
    const pathname = decodeURIComponent(target.split(/[?#]/, 1)[0])
    const source = pathname.startsWith('/content/')
      ? path.join(rootDir, ...pathname.slice(1).split('/'))
      : path.join(rootDir, 'public', ...pathname.slice(1).split('/'))
    return fs.existsSync(source) ? match : `\`${label}\``
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  exportAstroContent().then((report) => console.log(JSON.stringify(report, null, 2)))
}
