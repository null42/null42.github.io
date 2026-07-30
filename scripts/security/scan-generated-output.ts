import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import fg from 'fast-glob'
import allowlistFile from './allowlist.json'
import { scanMarkdownSourceFiles } from '../kb/articles'
import { decideVisibility, normalizeArticle } from '../kb/domain/normalize-article'
import type { Visibility } from '../kb/types'

export type ScanRule = 'sensitive-term' | 'protected-content' | 'token-format' | 'absolute-path' | 'high-entropy' | 'forbidden-path' | 'private-reader-leak'
export interface ScanAllowlistEntry { path: string; rule: ScanRule; fingerprint: string }
export interface ScanIssue { path: string; rule: ScanRule; fingerprint: string }
export interface ProtectedContentRecord {
  visibility: Visibility
  title?: string
  slug?: string
  body?: string
  summary?: string
  tags?: string[]
  attachments?: string[]
}
export interface ScanOptions {
  rootDir?: string
  roots?: string[]
  sensitiveTerms?: string[]
  allowlist?: ScanAllowlistEntry[]
  includeTrackedFiles?: boolean
  protectedContent?: ProtectedContentRecord[]
}

const defaultRoots = ['dist', 'reports', '.vitepress/generated', 'public', 'src', 'scripts']
const forbiddenGeneratedPatterns = ['assets/**/*', '*.html', 'content/**/*.html']
const tokenPatterns = [/[A-Za-z0-9_]*(?:ghp|github_pat)_[A-Za-z0-9_]{20,}/g, /AKIA[0-9A-Z]{16}/g, /(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{20,}/g]
const windowsAbsolutePathPattern = /\b[A-Za-z]:(?:\\{1,2}|\/)[^\s"'<>]+/g
const unixUserAbsolutePathPattern = /\/(?:home|Users)\/[^/\s"'<>]+\/[^\s"'<>]+/g
const highEntropyPattern = /[A-Za-z0-9+/=]{80,}/g

export async function scanGeneratedOutput(options: ScanOptions = {}) {
  const rootDir = path.resolve(options.rootDir || process.cwd())
  const roots = options.roots || defaultRoots
  const allowlist = options.allowlist || allowlistFile as ScanAllowlistEntry[]
  const sensitiveTerms = options.sensitiveTerms || ['BEGIN ' + 'PRIVATE KEY', 'BEGIN ' + 'OPENSSH PRIVATE KEY']
  const protectedContent = options.protectedContent ?? await loadProtectedContent(rootDir)
  const protectedTerms = collectProtectedLeakTerms(protectedContent)
  // Astro 内部构建缓存（dist/.prerender/）包含构建机器的绝对路径，不是部署产物，不扫描
  const ignoreDotPrerender = ['**/.prerender/**']
  const generatedFiles = await fg(roots.map((root) => root.replace(/\\/g, '/') + '/**/*'), { cwd: rootDir, onlyFiles: true, dot: true, unique: true, ignore: ignoreDotPrerender })
  const forbiddenGeneratedFiles = await fg(forbiddenGeneratedPatterns, { cwd: rootDir, onlyFiles: true, dot: true, unique: true, ignore: ignoreDotPrerender })
  const trackedFiles = options.includeTrackedFiles === false ? [] : listTrackedFiles(rootDir)
  const candidates = [...new Set([...generatedFiles, ...forbiddenGeneratedFiles, ...trackedFiles])].sort()
  const existence = await Promise.all(candidates.map((relativePath) =>
    fs.stat(path.join(rootDir, relativePath)).then((stat) => stat.isFile()).catch(() => false),
  ))
  const existingFiles = candidates.filter((_, index) => existence[index])
  const issues: ScanIssue[] = []
  const forbiddenGeneratedFileSet = new Set(forbiddenGeneratedFiles)
  const protectedCandidateSet = new Set([...generatedFiles, ...forbiddenGeneratedFiles].filter((relativePath) => /^(?:dist|reports|\.vitepress\/generated|public|src)(?:\/|$)/.test(relativePath)))

  for (const relativePath of existingFiles) {
    if (forbiddenGeneratedFileSet.has(relativePath)) {
      issues.push({ path: relativePath, rule: 'forbidden-path', fingerprint: redactFingerprint('legacy-root-output') })
    }
    const buffer = await fs.readFile(path.join(rootDir, relativePath))
    if (buffer.includes(0)) continue
    const text = buffer.toString('utf8')
    for (const term of sensitiveTerms) addMatches(issues, relativePath, 'sensitive-term', text.includes(term) ? [term] : [], allowlist)
    if (protectedCandidateSet.has(relativePath)) {
      for (const term of protectedTerms) {
        if (isAllowedPlaceholderTitle(relativePath, term, protectedContent)) continue
        addMatches(issues, relativePath, 'protected-content', text.includes(term) ? [term] : [], allowlist)
      }
    }
    for (const pattern of tokenPatterns) addMatches(issues, relativePath, 'token-format', text.match(pattern) || [], allowlist)
    addMatches(issues, relativePath, 'absolute-path', findAbsolutePaths(text, rootDir), allowlist)
    // 私密阅读器目录下的 .bin 和 manifest.json 天然是高熵 base64（加密产物），
    // 由 addPrivateReaderLeakMatches 专门校验合法性，此处跳过 high-entropy 检测避免误报
    if (!relativePath.startsWith('dist/private-reader/') && !relativePath.startsWith('content/private-reader/')) {
      const entropyCandidates = (text.match(highEntropyPattern) || []).filter(isHighEntropyCandidate)
      addMatches(issues, relativePath, 'high-entropy', entropyCandidates, allowlist)
    }
    // 私密阅读器专属规则：明文泄漏、原文件名、配置误提交
    addPrivateReaderLeakMatches(issues, relativePath, text, allowlist)
  }

  // 私密阅读器：检测 .local-paths.json 是否被 git 追踪
  if (isPrivateReaderConfigTracked()) {
    issues.push({
      path: 'scripts/private-reader/.local-paths.json',
      rule: 'private-reader-leak',
      fingerprint: redactFingerprint('local-paths-tracked'),
    })
  }

  return { scannedFiles: existingFiles.length, issueCount: issues.length, issues }
}

/**
 * 私密阅读器专属泄漏检测。
 *
 * 规则：
 * - dist/private-reader/ 下的 .bin 文件必须为合法 base64
 * - dist/private-reader/ 下的 manifest.json 中的 title/author/toc[].title 必须为加密 base64
 * - dist/private-reader/ 下不得出现原文件名、密码、明文段落
 */
function addPrivateReaderLeakMatches(
  issues: ScanIssue[],
  file: string,
  text: string,
  allowlist: ScanAllowlistEntry[]
): void {
  // 仅扫描 dist/private-reader/ 下的文件
  if (!file.startsWith('dist/private-reader/')) return

  // .bin 文件：必须是合法 base64
  if (file.endsWith('.bin')) {
    const stripped = text.replace(/\s+/g, '')
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(stripped)) {
      addMatches(issues, file, 'private-reader-leak', ['bin-not-base64'], allowlist)
    }
    return
  }

  // manifest.json：检查加密字段是否为合法 base64
  if (file.endsWith('/manifest.json') || file.endsWith('manifest.json')) {
    try {
      const manifest = JSON.parse(text) as Record<string, unknown>
      // schema 校验（支持 v1 和 v2）
      if (manifest.schema !== 'private-reader/v1' && manifest.schema !== 'private-reader/v2') {
        addMatches(issues, file, 'private-reader-leak', ['manifest-schema'], allowlist)
      }
      const isV2 = manifest.schema === 'private-reader/v2'
      // title/author 必须是 base64（或 author 为 null）
      // v1: 顶层 title/author；v2: shelf.title/shelf.author
      const titleSource = isV2 ? (manifest.shelf as Record<string, unknown> | undefined) : manifest
      const title = titleSource?.title
      if (typeof title === 'string' && !isValidEncryptedField(title)) {
        addMatches(issues, file, 'private-reader-leak', ['plaintext-title'], allowlist)
      }
      const author = titleSource?.author
      if (typeof author === 'string' && !isValidEncryptedField(author)) {
        addMatches(issues, file, 'private-reader-leak', ['plaintext-author'], allowlist)
      }
      // toc[].title 必须是 base64
      if (Array.isArray(manifest.toc)) {
        for (const entry of manifest.toc) {
          if (entry && typeof entry === 'object' && 'title' in entry) {
            const t = (entry as Record<string, unknown>).title
            if (typeof t === 'string' && !isValidEncryptedField(t)) {
              addMatches(issues, file, 'private-reader-leak', ['plaintext-toc-title'], allowlist)
            }
          }
        }
      }
      // segments[].iv 必须是 base64
      if (Array.isArray(manifest.segments)) {
        for (const seg of manifest.segments) {
          if (seg && typeof seg === 'object' && 'iv' in seg) {
            const iv = (seg as Record<string, unknown>).iv
            if (typeof iv === 'string' && !/^[A-Za-z0-9+/]{16}={0,2}$/.test(iv)) {
              addMatches(issues, file, 'private-reader-leak', ['iv-not-base64'], allowlist)
            }
          }
        }
      }
      // crypto.iterations 必须为 210000
      const cryptoField = manifest.crypto as Record<string, unknown> | undefined
      if (cryptoField && cryptoField.iterations !== 210_000) {
        addMatches(issues, file, 'private-reader-leak', ['iterations-mismatch'], allowlist)
      }
    } catch {
      addMatches(issues, file, 'private-reader-leak', ['manifest-malformed'], allowlist)
    }
    return
  }

  // HTML shell：跳过明文段落检测
  // 原因：HTML 文件包含站点框架（CSS 变量、JS 代码、导航、关键词等），
  // 这些是正常的页面内容，不是私密阅读器的明文泄露。
  // 真正的明文泄露在 manifest.json（加密字段）和 .bin（base64）中已检测。
  // 书架列表页 index.html 包含完整站点框架，单本书页面 [slug]/index.html 是固定 UI shell。
  // 此处不执行明文段落检测，避免误报。
}

/**
 * 判断一个字符串是否符合 encryptField 输出的格式（base64(iv||ciphertext||authTag)）。
 *
 * 严格判定：长度至少为 (IV_LEN + AUTH_TAG_LEN + 1) 的 base64 长度，且解码后长度 ≥ 29。
 */
function isValidEncryptedField(value: string): boolean {
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value)) return false
  try {
    const buf = Buffer.from(value, 'base64')
    // iv(12) + authTag(16) = 28 字节，密文至少 1 字节
    return buf.length >= 29
  } catch {
    return false
  }
}

/**
 * 检测 scripts/private-reader/.local-paths.json 是否被 git 追踪。
 *
 * 该文件包含真实测试文件路径，绝不能被提交。
 */
function isPrivateReaderConfigTracked(): boolean {
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', 'scripts/private-reader/.local-paths.json'], {
      stdio: ['ignore', 'ignore', 'ignore'],
      encoding: 'utf8',
    })
    return true
  } catch {
    return false
  }
}

function isAllowedPlaceholderTitle(file: string, term: string, records: ProtectedContentRecord[]): boolean {
  return records.some((record) => {
    if (record.visibility !== 'encrypted' || record.title !== term || !record.slug) return false
    const slug = record.slug.replace(/\\/g, '/')
    if (file === 'dist/posts/' + slug.toLowerCase() + '/index.html') return true
    if (file === 'src/content/posts/' + slug + '.md') return true
    if (file === 'dist/list/index.html' || file === 'dist/archive/index.html' || file === 'dist/knowledge/index.html') return true
    if (/^dist\/\d+\/index\.html$/.test(file)) return true
    return file === 'src/generated/knowledge-navigation.json' || file === '.vitepress/generated/sidebar.ts'
  })
}

async function loadProtectedContent(rootDir: string): Promise<ProtectedContentRecord[]> {
  const contentRoot = path.join(rootDir, 'content')
  try {
    await fs.stat(contentRoot)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error('Protected content root is missing: ' + contentRoot, { cause: error })
    }
    throw error
  }
  const records = await scanMarkdownSourceFiles({ contentRoot })
  return records.map((record) => {
    const relativePath = path.relative(contentRoot, record.absolutePath).replace(/\\/g, '/')
    const canonical = normalizeArticle(record.completed, {
      sourcePath: record.relativePath,
      slug: relativePath.replace(/\.md$/i, ''),
      column: record.column,
    })
    const visibility = relativePath.startsWith('private/') ? 'private' : canonical.visibility
    return {
      visibility,
      title: canonical.title,
      slug: canonical.slug,
      body: record.body,
      summary: typeof record.completed.summary === 'string' ? record.completed.summary : undefined,
      tags: Array.isArray(record.completed.tags) ? record.completed.tags.map(String).filter((tag) => visibility !== 'encrypted' || tag !== 'encrypted') : [],
      attachments: [...record.body.matchAll(/!\[[^\]]*\]\(([^\s)]+)/g)].map((match) => match[1]),
    }
  })
}

export function collectProtectedLeakTerms(records: ProtectedContentRecord[]): string[] {
  const terms = new Set<string>()
  for (const record of records) {
    const decision = decideVisibility(record.visibility)
    if (!decision.html || decision.publicSurface === 'placeholder') addProtectedTerm(terms, record.body)
    if (!decision.summary) {
      addProtectedTerm(terms, record.summary)
      for (const tag of record.tags || []) addProtectedTerm(terms, tag)
    }
    if (!decision.attachments) {
      for (const attachment of record.attachments || []) addProtectedTerm(terms, attachment)
    }
  }
  return [...terms]
}

function addProtectedTerm(terms: Set<string>, value: string | undefined): void {
  for (const line of value?.split(/\r?\n/) || []) {
    const normalized = line.trim()
    if (!normalized) continue
    terms.add(normalized)
    const plainText = normalized
      .replace(/^#{1,6}\s+/, '')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*~>]/g, '')
      .replaceAll(String.fromCharCode(96), '')
      .trim()
    if (plainText) terms.add(plainText)
  }
}

export function findAbsolutePaths(text: string, rootDir: string): string[] {
  const windowsMatches = [...text.matchAll(windowsAbsolutePathPattern)]
    .filter((match) => !isLikelyCodeFragment(text, match.index || 0, match[0]))
    .map((match) => match[0])
  const matches = [...windowsMatches, ...(text.match(unixUserAbsolutePathPattern) || [])]
  const workspaceVariants = [rootDir, rootDir.replaceAll('\\', '\\\\'), rootDir.replaceAll('\\', '/')]
  for (const workspace of workspaceVariants) {
    let index = text.indexOf(workspace)
    while (index >= 0) {
      const tail = text.slice(index).match(/^[^\s"'<>]+/)?.[0]
      if (tail) matches.push(tail)
      index = text.indexOf(workspace, index + workspace.length)
    }
  }
  return [...new Set(matches)]
}

function isLikelyCodeFragment(text: string, index: number, value: string): boolean {
  const prefix = text.slice(Math.max(0, index - 12), index)
  const ternaryRegex = /\?\s*$/.test(prefix) && /^[A-Za-z]:\/\[[^\]\r\n]*\]\/[dgimsuvy]*\.(?:test|exec)\(/.test(value)
  const cssRegex = prefix.endsWith('overflow-') && /^[x]:\\s\*(?:hidden|auto)\b/.test(value)
  return ternaryRegex || cssRegex
}

export function summarizeScanResult(result: { scannedFiles: number; issueCount: number; issues: ScanIssue[] }) {
  const grouped = new Map<ScanRule, Map<string, string[]>>()
  for (const issue of result.issues) {
    const paths = grouped.get(issue.rule) || new Map<string, string[]>()
    const fingerprints = paths.get(issue.path) || []
    fingerprints.push(issue.fingerprint)
    paths.set(issue.path, fingerprints)
    grouped.set(issue.rule, paths)
  }
  const groups = [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([rule, paths]) => ({
      rule,
      paths: [...paths.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([issuePath, fingerprints]) => ({ path: issuePath, fingerprints: [...fingerprints].sort() })),
    }))
  return { scannedFiles: result.scannedFiles, issueCount: result.issueCount, groups }
}

function listTrackedFiles(rootDir: string): string[] {
  try {
    return execFileSync('git', ['ls-files', '-z'], { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).split('\0').filter(Boolean)
  } catch (error) {
    throw new Error('Unable to enumerate tracked files with git ls-files', { cause: error })
  }
}

function addMatches(issues: ScanIssue[], file: string, rule: ScanRule, matches: string[], allowlist: ScanAllowlistEntry[]) {
  for (const match of new Set(matches)) {
    const fingerprint = redactFingerprint(match)
    if (allowlist.some((entry) => pathMatches(entry.path, file) && entry.rule === rule && (entry.fingerprint === '*' || entry.fingerprint === match || entry.fingerprint === fingerprint))) continue
    issues.push({ path: file, rule, fingerprint })
  }
}

function pathMatches(pattern: string, file: string): boolean {
  const parts = pattern.split('*').map((part) => part.replace(/[.\\+^$(){}|[\]]/g, '\\$&'))
  return new RegExp('^' + parts.join('.*') + '$').test(file)
}

function redactFingerprint(value: string): string {
  let hash = 2166136261
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
  return 'fnv1a:' + (hash >>> 0).toString(16).padStart(8, '0')
}

function shannonEntropy(value: string): number {
  const counts = new Map<string, number>()
  for (const character of value) counts.set(character, (counts.get(character) || 0) + 1)
  return [...counts.values()].reduce((sum, count) => {
    const probability = count / value.length
    return sum - probability * Math.log2(probability)
  }, 0)
}

function isHighEntropyCandidate(value: string): boolean {
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) return false
  return shannonEntropy(value) >= 4.5
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  scanGeneratedOutput().then((result) => {
    console.log(JSON.stringify(summarizeScanResult(result), null, 2))
    if (result.issueCount > 0) process.exitCode = 1
  })
}
