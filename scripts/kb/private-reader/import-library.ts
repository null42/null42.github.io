#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash, randomBytes } from 'node:crypto'
import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { decodeBuffer } from './encoding'
import { parseEpub } from './epub-parser'
import { encryptTxtFile } from './encrypt-txt'
import { encryptEpubFile } from './encrypt-epub'
import { getPrivateReaderPasswords } from './password'

type BookKind = 'txt' | 'epub'
type SkipReason = 'duplicate' | 'oversize' | 'unsafe-explicit' | 'unsafe-minor' | 'invalid' | 'budget'

export interface ImportCandidate {
  absolutePath: string
  relativePath: string
  kind: BookKind
  title: string
  group: string
  sha256: string
  sizeBytes: number
}

interface ImportOptions {
  sourceDir: string
  outputDir: string
  dryRun: boolean
  replace: boolean
  allowAdult: boolean
  allowExternalOutput: boolean
  limitPerKind: number
  maxTotalBytes: number
  maxFileBytes: number
}

interface SaltsConfig {
  gateSalt: string
  shelfSalt: string
  createdAt: string
  version: number
}

const ROOT_DIR = process.cwd()
const DEFAULT_OUTPUT = path.join(ROOT_DIR, 'content', 'private-reader')
const SALTS_PATH = path.join(ROOT_DIR, 'scripts', 'private-reader', '.salts.json')
const LOCAL_CONFIG_PATH = path.join(ROOT_DIR, 'scripts', 'private-reader', '.local-paths.json')
const REPORT_PATH = path.join(ROOT_DIR, 'reports', 'private-reader-import-report.json')
const SAMPLE_BYTES = 512 * 1024

const explicitTerms = [
  'r18', '\u0031\u0038\u7981', '\u8272\u60c5', '\u6027\u7231', '\u6027\u5974', '\u8c03\u6559',
  '\u4e71\u4f26', '\u5f3a\u5978', '\u8f6e\u5978', '\u81ea\u6170', '\u70ae\u53cb', '\u8089\u6587',
  '\u6deb', '\u9ad8\u6f6e', '\u6027\u4ea4', '\u505a\u7231', '\u7ea6\u70ae', '\u9b45\u9b54',
]

const minorTerms = [
  '\u5e7c\u5973', '\u841d\u8389', '\u5c0f\u5b66\u751f', '\u521d\u4e2d\u751f', '\u9ad8\u4e2d\u751f',
  '\u672a\u6210\u5e74', '\u513f\u7ae5', '\u7ae5\u5973', '\u5973\u7ae5', '\u7537\u7ae5', '\u5e7c\u7ae5',
  '\u5c0f\u5973\u5b69', '\u5c0f\u7537\u5b69', 'jk',
]

const groupRules: Array<{ group: string; terms: string[] }> = [
  { group: '\u6280\u672f\u4e0e\u79d1\u666e', terms: ['matlab', 'simulink', 'python', 'c++', '\u7b97\u6cd5', '\u7f16\u7a0b', '\u7535\u673a', '\u63a7\u5236', '\u7269\u7406', '\u6570\u5b66'] },
  { group: '\u79d1\u5e7b\u4e0e\u672b\u4e16', terms: ['\u79d1\u5e7b', '\u673a\u7532', '\u661f\u9645', '\u5b87\u5b99', '\u672b\u4e16', '\u673a\u5668\u4eba'] },
  { group: '\u5947\u5e7b\u4e0e\u5192\u9669', terms: ['\u9b54\u6cd5', '\u52c7\u8005', '\u5f02\u4e16\u754c', '\u9b54\u5973', '\u4fee\u771f', '\u4ed9\u4fa0', '\u6b66\u4fa0', '\u9f99', '\u5192\u9669'] },
  { group: '\u60ac\u7591\u4e0e\u63a8\u7406', terms: ['\u60ac\u7591', '\u63a8\u7406', '\u4fa6\u63a2', '\u8c1c\u6848', '\u6848\u4ef6'] },
  { group: '\u5386\u53f2\u4e0e\u519b\u4e8b', terms: ['\u5386\u53f2', '\u519b\u4e8b', '\u6218\u4e89', '\u4e09\u56fd', '\u5510\u671d', '\u660e\u671d', '\u6e05\u671d'] },
  { group: '\u540c\u4eba\u4f5c\u54c1', terms: ['\u539f\u795e', '\u660e\u65e5\u65b9\u821f', '\u5d29\u574f', '\u78a7\u84dd\u822a\u7ebf', '\u4e1c\u65b9', '\u5b9d\u53ef\u68a6', '\u540c\u4eba'] },
  { group: '\u73b0\u5b9e\u4e0e\u60c5\u611f', terms: ['\u90fd\u5e02', '\u6821\u56ed', '\u9752\u6885', '\u604b\u7231', '\u5bb6\u5ead', '\u9752\u6625'] },
]

export function scanPrivateBookSafety(value: string): 'safe' | 'unsafe-explicit' | 'unsafe-minor' {
  const normalized = value.normalize('NFKC').toLocaleLowerCase()
  if (explicitTerms.some(term => normalized.includes(term))) return 'unsafe-explicit'
  if (minorTerms.some(term => normalized.includes(term))) return 'unsafe-minor'
  return 'safe'
}

export function classifyPrivateBookGroup(title: string, relativePath = ''): string {
  const normalized = `${title} ${relativePath}`.normalize('NFKC').toLocaleLowerCase()
  for (const rule of groupRules) {
    if (rule.terms.some(term => normalized.includes(term))) return rule.group
  }
  return '\u6587\u5b66\u4e0e\u5176\u4ed6'
}

export function makePrivateBookSlug(kind: BookKind, sha256: string): string {
  return `${kind}-${sha256.slice(0, 16)}`
}

export function selectImportCandidates(
  candidates: ImportCandidate[],
  limitPerKind: number,
  maxTotalBytes: number,
): { selected: ImportCandidate[]; budgetSkipped: number } {
  const selected: ImportCandidate[] = []
  let totalBytes = 0
  let budgetSkipped = 0
  for (const kind of ['txt', 'epub'] as const) {
    const buckets = new Map<string, ImportCandidate[]>()
    for (const candidate of candidates.filter(item => item.kind === kind)) {
      const bucket = buckets.get(candidate.group) || []
      bucket.push(candidate)
      buckets.set(candidate.group, bucket)
    }
    for (const bucket of buckets.values()) bucket.sort((left, right) => left.sizeBytes - right.sizeBytes || left.sha256.localeCompare(right.sha256))
    const groups = [...buckets.keys()].sort((left, right) => left.localeCompare(right, 'zh-CN'))
    let kindCount = 0
    let madeProgress = true
    while (kindCount < limitPerKind && madeProgress) {
      madeProgress = false
      for (const group of groups) {
        const candidate = buckets.get(group)?.shift()
        if (!candidate) continue
        madeProgress = true
        if (totalBytes + candidate.sizeBytes > maxTotalBytes) {
          budgetSkipped++
          continue
        }
        selected.push(candidate)
        totalBytes += candidate.sizeBytes
        kindCount++
        if (kindCount >= limitPerKind) break
      }
    }
  }
  return { selected, budgetSkipped }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2))
  const skipped = new Map<SkipReason, number>()
  const candidates: ImportCandidate[] = []
  const hashes = new Set<string>()
  const files = await scanFiles(options.sourceDir)

  for (const absolutePath of files) {
    try {
      const stat = await fs.stat(absolutePath)
      if (stat.size > options.maxFileBytes) {
        increment(skipped, 'oversize')
        continue
      }
      const kind = path.extname(absolutePath).slice(1).toLocaleLowerCase() as BookKind
      const relativePath = path.relative(options.sourceDir, absolutePath)
      const title = cleanTitle(path.basename(absolutePath, path.extname(absolutePath)))
      if (!options.allowAdult) {
        const nameSafety = scanPrivateBookSafety(`${relativePath} ${title}`)
        if (nameSafety !== 'safe') {
          increment(skipped, nameSafety)
          continue
        }
      }

      const buffer = await fs.readFile(absolutePath)
      const sha256 = createHash('sha256').update(buffer).digest('hex')
      if (hashes.has(sha256)) {
        increment(skipped, 'duplicate')
        continue
      }
      hashes.add(sha256)

      if (!options.allowAdult) {
        const contentSafety = kind === 'txt'
          ? scanPrivateBookSafety(decodeBuffer(sampleBuffer(buffer)))
          : scanPrivateBookSafety(await extractEpubSafetyText(buffer))
        if (contentSafety !== 'safe') {
          increment(skipped, contentSafety)
          continue
        }
      }

      candidates.push({
        absolutePath,
        relativePath,
        kind,
        title,
        group: classifyPrivateBookGroup(title, relativePath),
        sha256,
        sizeBytes: stat.size,
      })
    } catch {
      increment(skipped, 'invalid')
    }
  }

  const selection = selectImportCandidates(candidates, options.limitPerKind, options.maxTotalBytes)
  skipped.set('budget', selection.budgetSkipped)
  const report = {
    generatedAt: new Date().toISOString(),
    sourceFiles: files.length,
    uniqueSafeCandidates: candidates.length,
    selected: selection.selected.length,
    selectedByKind: countBy(selection.selected, item => item.kind),
    selectedByGroup: countBy(selection.selected, item => item.group),
    selectedSourceBytes: selection.selected.reduce((sum, item) => sum + item.sizeBytes, 0),
    skipped: Object.fromEntries(skipped),
    dryRun: options.dryRun,
    imported: 0,
    failed: 0,
  }

  if (!options.dryRun) {
    await assertSafeOutput(options.outputDir, options.allowExternalOutput)
    if (options.replace) await fs.rm(options.outputDir, { recursive: true, force: true })
    await fs.mkdir(options.outputDir, { recursive: true })
    await fs.writeFile(path.join(options.outputDir, '.private-reader-library.json'), JSON.stringify({ schema: 'private-reader-external/v1' }), 'utf8')
    const salts = await readOrCreateSalts()
    const passwords = getPrivateReaderPasswords()
    const localBooks: Array<Record<string, unknown>> = []

    for (const candidate of selection.selected) {
      const slug = makePrivateBookSlug(candidate.kind, candidate.sha256)
      const outputDir = path.join(options.outputDir, slug)
      try {
        if (candidate.kind === 'txt') {
          await encryptTxtFile(candidate.absolutePath, slug, passwords, outputDir, {
            title: candidate.title,
            group: candidate.group,
            sourceHash: candidate.sha256,
            compress: true,
            gateSalt: salts.gateSalt,
            shelfSalt: salts.shelfSalt,
          })
        } else {
          await encryptEpubFile(candidate.absolutePath, slug, passwords, outputDir, {
            title: candidate.title,
            group: candidate.group,
            sourceHash: candidate.sha256,
            compress: true,
            gateSalt: salts.gateSalt,
            shelfSalt: salts.shelfSalt,
          })
        }
        localBooks.push({
          slug,
          kind: candidate.kind,
          path: path.relative(ROOT_DIR, candidate.absolutePath),
          title: candidate.title,
          group: candidate.group,
          sourceHash: candidate.sha256,
          compress: true,
        })
        report.imported++
      } catch {
        report.failed++
        await fs.rm(outputDir, { recursive: true, force: true })
      }
    }
    await fs.writeFile(LOCAL_CONFIG_PATH, JSON.stringify({ books: localBooks }, null, 2), 'utf8')
    await writeExternalCatalog(options.outputDir)
  }

  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true })
  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify(report))
  if (report.failed > 0) process.exitCode = 1
}

function parseArgs(args: string[]): ImportOptions {
  const read = (name: string): string | undefined => {
    const inline = args.find(arg => arg.startsWith(`${name}=`))
    if (inline) return inline.slice(name.length + 1)
    const index = args.indexOf(name)
    return index >= 0 ? args[index + 1] : undefined
  }
  const importAll = args.includes('--all')
  const limitPerKind = importAll ? Number.MAX_SAFE_INTEGER : Math.max(1, Number(read('--limit-per-kind') || 50))
  const maxTotalMb = importAll ? Number.MAX_SAFE_INTEGER / (1024 * 1024) : Math.max(1, Number(read('--max-total-mb') || 180))
  const maxFileMb = Math.max(1, Number(read('--max-file-mb') || 25))
  const source = read('--source') || process.env.PRIVATE_READER_IMPORT_SOURCE
  if (!source) throw new Error('Missing --source <directory> or PRIVATE_READER_IMPORT_SOURCE')
  return {
    sourceDir: path.resolve(source),
    outputDir: path.resolve(read('--output') || DEFAULT_OUTPUT),
    dryRun: args.includes('--dry-run'),
    replace: !args.includes('--keep-existing'),
    allowAdult: args.includes('--allow-adult'),
    allowExternalOutput: args.includes('--external-output'),
    limitPerKind,
    maxTotalBytes: maxTotalMb * 1024 * 1024,
    maxFileBytes: maxFileMb * 1024 * 1024,
  }
}

async function scanFiles(root: string): Promise<string[]> {
  const results: string[] = []
  const visit = async (directory: string): Promise<void> => {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    entries.sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'))
    for (const entry of entries) {
      const absolutePath = path.join(directory, entry.name)
      if (entry.isDirectory()) await visit(absolutePath)
      else if (/\.(?:txt|epub)$/i.test(entry.name)) results.push(absolutePath)
    }
  }
  await visit(root)
  return results
}

function sampleBuffer(buffer: Buffer): Buffer {
  if (buffer.length <= SAMPLE_BYTES * 3) return buffer
  const middle = Math.max(0, Math.floor(buffer.length / 2) - Math.floor(SAMPLE_BYTES / 2))
  return Buffer.concat([
    buffer.subarray(0, SAMPLE_BYTES),
    buffer.subarray(middle, middle + SAMPLE_BYTES),
    buffer.subarray(buffer.length - SAMPLE_BYTES),
  ])
}

async function extractEpubSafetyText(buffer: Buffer): Promise<string> {
  const epub = await parseEpub(buffer, { maxUncompressedBytes: 250 * 1024 * 1024, maxEntries: 6000 })
  const chunks = [epub.metadata.title, epub.metadata.author || '']
  let length = chunks.join('').length
  for (const content of epub.content.values()) {
    const text = content.toString('utf8')
    chunks.push(text.slice(0, Math.max(0, 1_500_000 - length)))
    length += text.length
    if (length >= 1_500_000) break
  }
  return chunks.join('\n')
}

function cleanTitle(value: string): string {
  const cleaned = value
    .normalize('NFKC')
    .replace(/\[[^\]]*(?:\.com|\u641c\u4e66|\u4e0b\u8f7d)[^\]]*\]/gi, '')
    .replace(/[\s._-]+$/g, '')
    .trim()
  return cleaned.slice(0, 160) || '\u672a\u547d\u540d\u4e66\u7c4d'
}

function increment(map: Map<SkipReason, number>, reason: SkipReason): void {
  map.set(reason, (map.get(reason) || 0) + 1)
}

function countBy<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const result: Record<string, number> = {}
  for (const item of items) {
    const value = key(item)
    result[value] = (result[value] || 0) + 1
  }
  return result
}

async function readOrCreateSalts(): Promise<{ gateSalt: Buffer; shelfSalt: Buffer }> {
  if (existsSync(SALTS_PATH)) {
    const config = JSON.parse(await fs.readFile(SALTS_PATH, 'utf8')) as SaltsConfig
    return { gateSalt: Buffer.from(config.gateSalt, 'base64'), shelfSalt: Buffer.from(config.shelfSalt, 'base64') }
  }
  const config: SaltsConfig = {
    gateSalt: randomBytes(16).toString('base64'),
    shelfSalt: randomBytes(16).toString('base64'),
    createdAt: new Date().toISOString(),
    version: 2,
  }
  await fs.mkdir(path.dirname(SALTS_PATH), { recursive: true })
  await fs.writeFile(SALTS_PATH, JSON.stringify(config, null, 2), 'utf8')
  return { gateSalt: Buffer.from(config.gateSalt, 'base64'), shelfSalt: Buffer.from(config.shelfSalt, 'base64') }
}

async function assertSafeOutput(outputDir: string, allowExternalOutput: boolean): Promise<void> {
  const root = path.resolve(ROOT_DIR)
  const target = path.resolve(outputDir)
  const repositoryOutput = path.join(root, 'content', 'private-reader')
  if (target === repositoryOutput) return
  if (!allowExternalOutput) throw new Error(`Refusing external output without --external-output: ${target}`)
  const relative = path.relative(root, target)
  if (!relative.startsWith('..') && !path.isAbsolute(relative)) throw new Error(`External output must stay outside the repository: ${target}`)
  if (existsSync(target)) {
    const marker = path.join(target, '.private-reader-library.json')
    const entries = await fs.readdir(target)
    if (entries.length > 0 && !existsSync(marker)) throw new Error(`Refusing to replace an unmarked external directory: ${target}`)
  }
}

async function writeExternalCatalog(outputDir: string): Promise<void> {
  const entries = await fs.readdir(outputDir, { withFileTypes: true })
  const books: Array<Record<string, unknown>> = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const manifestPath = path.join(outputDir, entry.name, 'manifest.json')
    if (!existsSync(manifestPath)) continue
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as Record<string, unknown>
    books.push({ slug: entry.name, manifest: `${entry.name}/manifest.json`, kind: manifest.kind })
  }
  books.sort((left, right) => String(left.slug).localeCompare(String(right.slug)))
  await fs.writeFile(path.join(outputDir, 'catalog.json'), JSON.stringify({ schema: 'private-reader-catalog/v1', books }, null, 2), 'utf8')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
