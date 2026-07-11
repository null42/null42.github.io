import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { glob } from 'glob'
import yauzl from 'yauzl'

const sha256 = async (file: string) => createHash('sha256').update(await fs.readFile(file)).digest('hex')

type ZipLimits = { maxEntries?: number, maxEntrySize?: number, maxTotalSize?: number }

const compareCodePoints = (left: string, right: string) => left < right ? -1 : left > right ? 1 : 0

export async function readZipFiles(buffer: Buffer, limits: ZipLimits = {}) {
  const { maxEntries = 10_000, maxEntrySize = 64 * 1024 * 1024, maxTotalSize = 256 * 1024 * 1024 } = limits
  const zip = await new Promise<yauzl.ZipFile>((resolve, reject) => yauzl.fromBuffer(buffer, { lazyEntries: true, decodeStrings: true, validateEntrySizes: true, strictFileNames: true }, (error, file) => error ? reject(new Error(`invalid ZIP: ${error.message}`)) : resolve(file)))
  const files = new Map<string, string>()
  const paths = new Map<string, 'file' | 'directory'>()
  const topLevels = new Set<string>()
  let entries = 0
  let totalSize = 0

  return new Promise<{ files: Map<string, string>, topLevels: string[] }>((resolve, reject) => {
    const fail = (error: unknown) => { zip.close(); reject(error) }
    zip.on('error', fail)
    zip.on('end', () => resolve({ files, topLevels: [...topLevels].sort(compareCodePoints) }))
    zip.on('entry', (entry: yauzl.Entry) => {
      try {
        entries++
        if (entries > maxEntries) throw new Error('ZIP entry count limit exceeded')
        const name = entry.fileName
        const directory = name.endsWith('/')
        if (!name || name.includes('\0') || name.includes('\\') || name.startsWith('/') || /^[A-Za-z]:/.test(name)) throw new Error(`invalid ZIP entry name: ${JSON.stringify(name)}`)
        const segments = name.split('/').filter((_, index, all) => !(directory && index === all.length - 1))
        if (!segments.length || segments.some(segment => !segment || segment === '.' || segment === '..')) throw new Error(`invalid ZIP entry name: ${JSON.stringify(name)}`)
        const normalized = segments.join('/')
        const kind = directory ? 'directory' : 'file'
        if (paths.has(normalized)) throw new Error(`duplicate ZIP entry name: ${JSON.stringify(name)}`)
        for (let index = 1; index < segments.length; index++) if (paths.get(segments.slice(0, index).join('/')) === 'file') throw new Error(`ZIP file/directory conflict: ${JSON.stringify(name)}`)
        if (kind === 'file' && [...paths].some(([existing]) => existing.startsWith(`${normalized}/`))) throw new Error(`ZIP file/directory conflict: ${JSON.stringify(name)}`)
        paths.set(normalized, kind)
        topLevels.add(segments[0])
        if (entry.uncompressedSize > maxEntrySize) throw new Error(`ZIP entry size limit exceeded: ${JSON.stringify(name)}`)
        totalSize += entry.uncompressedSize
        if (totalSize > maxTotalSize) throw new Error('ZIP total size limit exceeded')
        if (directory) { zip.readEntry(); return }
        zip.openReadStream(entry, (error, stream) => {
          if (error || !stream) { fail(error ?? new Error(`cannot read ZIP entry: ${name}`)); return }
          const hash = createHash('sha256')
          stream.on('data', chunk => hash.update(chunk))
          stream.on('error', fail)
          stream.on('end', () => {
            files.set(segments.slice(1).join('/'), hash.digest('hex'))
            zip.readEntry()
          })
        })
      } catch (error) { fail(error) }
    })
    zip.readEntry()
  })
}

export const treeDigest = (files: Map<string, string>) => createHash('sha256').update([...files].sort(([a], [b]) => compareCodePoints(a, b)).map(([name, digest]) => `${name}\0${digest}\n`).join('')).digest('hex')

export async function verifySourceProofs(manifest: any, rootDir = process.cwd()) {
  return Promise.all(manifest.sources.map(async (source: any) => {
    const proof = source.provenance
    const archivePath = path.resolve(rootDir, proof.archivePath)
    const referencePath = path.resolve(rootDir, source.localPath)
    const actualArchiveSha256 = await sha256(archivePath)
    const archive = await readZipFiles(await fs.readFile(archivePath))
    const localNames = (await glob('**/*', { cwd: referencePath, nodir: true, dot: true })).map(name => name.replaceAll('\\', '/')).sort()
    const extractedFiles = new Map(await Promise.all(localNames.map(async name => [name, await sha256(path.join(referencePath, name))] as const)))
    const actualLicenseSha256 = extractedFiles.get(source.license.path)
    const topLevels = archive.topLevels
    const mismatches = new Set([...archive.files.keys(), ...extractedFiles.keys()].filter(name => archive.files.get(name) !== extractedFiles.get(name)))
    if (mismatches.size) throw new Error(`${source.repository}: extracted tree mismatch (${[...mismatches].sort().join(', ')})`)
    if (proof.expectedCommit !== source.commit) throw new Error(`${source.repository}: expected commit mismatch`)
    if (proof.archiveUrl !== `https://github.com/${source.repository}/archive/${source.commit}.zip`) throw new Error(`${source.repository}: archive URL mismatch`)
    if (actualArchiveSha256 !== proof.archiveSha256) throw new Error(`${source.repository}: archive SHA-256 mismatch`)
    if (actualLicenseSha256 !== proof.licenseSha256) throw new Error(`${source.repository}: LICENSE SHA-256 mismatch`)
    if (topLevels.length !== 1 || topLevels[0] !== proof.topLevelDirectory) throw new Error(`${source.repository}: archive top-level directory mismatch`)
    await fs.access(path.join(referencePath, source.license.path))
    return { archiveUrl: proof.archiveUrl, expectedCommit: proof.expectedCommit, archiveSha256: actualArchiveSha256, topLevelDirectory: topLevels[0], licenseSha256: actualLicenseSha256, archiveFileCount: archive.files.size, extractedFileCount: extractedFiles.size, treeDigest: treeDigest(archive.files) }
  }))
}

export async function auditImportManifest(manifest: any, rootDir = process.cwd()) {
  const dispositions = new Set(Object.keys(manifest.dispositions))
  const invalidPatterns: Array<{ rule: number, pattern: string, error: string }> = []
  const ruleMatches: Set<string>[] = []
  const allFiles: string[] = []

  for (const source of manifest.sources) {
    const cwd = path.resolve(rootDir, source.localPath)
    const files = (await glob('**/*', { cwd, nodir: true, dot: true })).map(file => `${source.repository}:${file.replaceAll('\\', '/')}`)
    allFiles.push(...files)
  }

  for (const [index, rule] of manifest.classificationRules.entries()) {
    if (typeof rule.match !== 'string' || !rule.match || !dispositions.has(rule.disposition)) {
      invalidPatterns.push({ rule: index, pattern: String(rule.match), error: 'invalid pattern or disposition' })
      ruleMatches.push(new Set())
      continue
    }
    const matched = new Set<string>()
    try {
      const patterns = rule.match.split('|')
      if (patterns.some((pattern: string) => !pattern)) throw new Error('empty alternative')
      for (const source of manifest.sources) {
        const cwd = path.resolve(rootDir, source.localPath)
        for (const file of await glob(patterns, { cwd, nodir: true, dot: true })) matched.add(`${source.repository}:${file.replaceAll('\\', '/')}`)
      }
    } catch (error) {
      invalidPatterns.push({ rule: index, pattern: rule.match, error: String(error) })
    }
    ruleMatches.push(matched)
  }

  const counts = Object.fromEntries([...dispositions].map(name => [name, 0])) as Record<string, number>
  const unclassified: string[] = []
  const conflicts: Array<{ file: string, rules: number[] }> = []
  const winningRules = new Set<number>()
  const fallbackSamples: string[] = []
  const files: Array<{ source: string, file: string, disposition: string, winningRule: number }> = []
  let fallbackCount = 0
  const fallbackIndices = manifest.classificationRules.flatMap((rule: any, index: number) => rule.fallback === true ? [index] : [])
  if (fallbackIndices.length !== 1) invalidPatterns.push({ rule: -1, pattern: '', error: 'exactly one explicit fallback rule is required' })

  for (const qualifiedFile of allFiles.sort()) {
    const matches = ruleMatches.flatMap((matchedFiles, index) => matchedFiles.has(qualifiedFile) ? [index] : [])
    const businessMatches = matches.filter(index => !manifest.classificationRules[index].fallback)
    if (businessMatches.length > 1) conflicts.push({ file: qualifiedFile, rules: businessMatches })
    const winner = businessMatches[0] ?? matches.find(index => manifest.classificationRules[index].fallback)
    if (winner === undefined) { unclassified.push(qualifiedFile); continue }
    winningRules.add(winner)
    const disposition = manifest.classificationRules[winner].disposition
    counts[disposition]++
    const separator = qualifiedFile.indexOf(':')
    files.push({ source: qualifiedFile.slice(0, separator), file: qualifiedFile.slice(separator + 1), disposition, winningRule: winner })
    if (manifest.classificationRules[winner].fallback) {
      fallbackCount++
      if (fallbackSamples.length < 10) fallbackSamples.push(qualifiedFile)
    }
  }

  return {
    totalFiles: allFiles.length,
    coveredFiles: allFiles.length - unclassified.length,
    counts,
    files,
    fallbackExclude: { count: fallbackCount, samples: fallbackSamples },
    unclassified,
    conflicts,
    unreachableRules: manifest.classificationRules.flatMap((_: any, index: number) => winningRules.has(index) ? [] : [index]),
    invalidPatterns
  }
}

async function main() {
  const manifestPath = path.resolve('reports/firefly-mod-import-manifest.json')
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
  const sources = await verifySourceProofs(manifest)
  const classification = await auditImportManifest(manifest)
  const report = { schemaVersion: 1, sources, classification }
  const output = `${JSON.stringify(report, null, 2)}\n`
  const reportPath = path.resolve('reports/firefly-mod-import-audit.json')
  if (process.argv.includes('--check')) {
    if (await fs.readFile(reportPath, 'utf8') !== output) throw new Error('Import audit report is stale')
  } else await fs.writeFile(reportPath, output)
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main().catch(error => { console.error(error); process.exitCode = 1 })
