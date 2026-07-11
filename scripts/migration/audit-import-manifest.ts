import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { glob } from 'glob'

const sha256 = async (file: string) => createHash('sha256').update(await fs.readFile(file)).digest('hex')

function zipTopLevels(buffer: Buffer) {
  const names = new Set<string>()
  for (let offset = 0; offset <= buffer.length - 46; offset++) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) continue
    const nameLength = buffer.readUInt16LE(offset + 28)
    const extraLength = buffer.readUInt16LE(offset + 30)
    const commentLength = buffer.readUInt16LE(offset + 32)
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString('utf8')
    if (name) names.add(name.split('/')[0])
    offset += 45 + nameLength + extraLength + commentLength
  }
  return [...names].sort()
}

export async function verifySourceProofs(manifest: any, rootDir = process.cwd()) {
  return Promise.all(manifest.sources.map(async (source: any) => {
    const proof = source.provenance
    const archivePath = path.resolve(rootDir, proof.archivePath)
    const referencePath = path.resolve(rootDir, source.localPath)
    const actualArchiveSha256 = await sha256(archivePath)
    const actualLicenseSha256 = await sha256(path.join(referencePath, source.license.path))
    const topLevels = zipTopLevels(await fs.readFile(archivePath))
    if (proof.expectedCommit !== source.commit) throw new Error(`${source.repository}: expected commit mismatch`)
    if (proof.archiveUrl !== `https://github.com/${source.repository}/archive/${source.commit}.zip`) throw new Error(`${source.repository}: archive URL mismatch`)
    if (actualArchiveSha256 !== proof.archiveSha256) throw new Error(`${source.repository}: archive SHA-256 mismatch`)
    if (actualLicenseSha256 !== proof.licenseSha256) throw new Error(`${source.repository}: LICENSE SHA-256 mismatch`)
    if (topLevels.length !== 1 || topLevels[0] !== proof.topLevelDirectory) throw new Error(`${source.repository}: archive top-level directory mismatch`)
    await fs.access(path.join(referencePath, source.license.path))
    return { archiveUrl: proof.archiveUrl, expectedCommit: proof.expectedCommit, archiveSha256: actualArchiveSha256, topLevelDirectory: topLevels[0], licenseSha256: actualLicenseSha256 }
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
  let fallbackCount = 0
  const fallbackIndex = manifest.classificationRules.length - 1

  for (const file of allFiles.sort()) {
    const matches = ruleMatches.flatMap((files, index) => files.has(file) ? [index] : [])
    if (!matches.length) { unclassified.push(file); continue }
    const winner = matches[0]
    winningRules.add(winner)
    counts[manifest.classificationRules[winner].disposition]++
    if (winner === fallbackIndex) {
      fallbackCount++
      if (fallbackSamples.length < 10) fallbackSamples.push(file)
    }
    const samePattern = matches.filter(index => manifest.classificationRules[index].match === manifest.classificationRules[winner].match)
    if (samePattern.length > 1) conflicts.push({ file, rules: samePattern })
  }

  return {
    totalFiles: allFiles.length,
    coveredFiles: allFiles.length - unclassified.length,
    counts,
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
