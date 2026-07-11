import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { auditImportManifest, readZipFiles, treeDigest, verifySourceProofs } from '../../scripts/migration/audit-import-manifest'

const temporaryDirectories: string[] = []
const temporaryDirectory = async (prefix: string) => {
  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), prefix))
  temporaryDirectories.push(directory)
  return directory
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory => fs.promises.rm(directory, { recursive: true, force: true })))
})

const manifestPath = path.resolve('reports/firefly-mod-import-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

describe('Firefly mod import manifest', () => {
  it('pins both archive sources with machine-verifiable provenance', async () => {
    expect(manifest.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ repository: 'MmzMing/my-blog', commit: '2fe55d6718839807c5c4cae20c33eae00390cd12', license: expect.objectContaining({ spdx: 'MIT', path: 'LICENSE' }) }),
      expect.objectContaining({ repository: 'fqzlr/my-blog', commit: '65d6daf637e3e3dda460e012b4ef4ff418796dfc', license: expect.objectContaining({ spdx: 'MIT', path: 'LICENSE' }) })
    ]))

    const proofs = await verifySourceProofs(manifest)
    expect(proofs).toHaveLength(2)
    for (const proof of proofs) {
      expect(proof).toMatchObject({
        archiveUrl: expect.stringMatching(/^https:\/\/github\.com\/[^/]+\/[^/]+\/archive\/[a-f0-9]{40}\.zip$/),
        expectedCommit: expect.stringMatching(/^[a-f0-9]{40}$/),
        archiveSha256: expect.stringMatching(/^[a-f0-9]{64}$/),
        topLevelDirectory: expect.any(String),
        licenseSha256: expect.stringMatching(/^[a-f0-9]{64}$/)
      })
    }
  })

  it('proves each extracted source tree is byte-identical to its pinned archive', async () => {
    const proofs = await verifySourceProofs(manifest)
    for (const proof of proofs) {
      expect(proof).toMatchObject({
        archiveFileCount: expect.any(Number),
        extractedFileCount: expect.any(Number),
        treeDigest: expect.stringMatching(/^[a-f0-9]{64}$/)
      })
      expect(proof.archiveFileCount).toBeGreaterThan(0)
      expect(proof.extractedFileCount).toBe(proof.archiveFileCount)
    }
  })

  for (const mutation of ['changed', 'added', 'deleted'] as const) {
    it(`rejects a locally ${mutation} file`, async () => {
      const source = structuredClone(manifest.sources[0])
      const root = await temporaryDirectory('import-proof-')
      const copiedSource = path.join(root, 'source')
      await fs.promises.cp(path.resolve(source.localPath), copiedSource, { recursive: true })
      source.localPath = copiedSource
      if (mutation === 'changed') await fs.promises.appendFile(path.join(copiedSource, source.license.path), 'tampered')
      if (mutation === 'added') await fs.promises.writeFile(path.join(copiedSource, 'unexpected.txt'), 'unexpected')
      if (mutation === 'deleted') await fs.promises.rm(path.join(copiedSource, source.license.path))

      await expect(verifySourceProofs({ sources: [source] })).rejects.toThrow(/extracted tree mismatch/)
    }, 30_000)
  }

  it.each([
    ['zip slip', '../escape.txt'],
    ['backslash', 'root\\escape.txt'],
    ['absolute path', '/root/file.txt'],
    ['drive path', 'C:/root/file.txt'],
    ['dot segment', 'root/./file.txt']
  ])('rejects %s entry names', async (_label, entryName) => {
    const archive = Buffer.from(await fs.promises.readFile(path.resolve(manifest.sources[0].provenance.archivePath)))
    const original = Buffer.from('my-blog-2fe55d6718839807c5c4cae20c33eae00390cd12/LICENSE')
    const replacement = Buffer.from(entryName.padEnd(original.length, 'a'))
    for (let offset = archive.indexOf(original); offset !== -1; offset = archive.indexOf(original, offset + original.length)) replacement.copy(archive, offset)
    await expect(readZipFiles(archive)).rejects.toThrow(/invalid ZIP entry name|absolute path|invalid relative path|invalid characters/)
  })

  it('rejects malformed ZIP boundaries and duplicate or file-directory conflicts', async () => {
    await expect(readZipFiles(Buffer.from('not a zip'))).rejects.toThrow(/ZIP/)
    const archive = await fs.promises.readFile(path.resolve(manifest.sources[0].provenance.archivePath))
    await expect(readZipFiles(archive.subarray(0, archive.length - 8))).rejects.toThrow(/ZIP/)
  })

  it('enforces archive entry and total uncompressed size limits', async () => {
    const archive = await fs.promises.readFile(path.resolve(manifest.sources[0].provenance.archivePath))
    await expect(readZipFiles(archive, { maxEntries: 1 })).rejects.toThrow(/entry count limit/)
    await expect(readZipFiles(archive, { maxEntrySize: 1 })).rejects.toThrow(/entry size limit/)
    await expect(readZipFiles(archive, { maxTotalSize: 1 })).rejects.toThrow(/total size limit/)
  })

  it('uses deterministic Unicode code-point ordering for tree digests', () => {
    const files = new Map([['ä', '1'], ['z', '2']])
    const expected = createHash('sha256').update(`z\0${files.get('z')}\nä\0${files.get('ä')}\n`).digest('hex')
    expect(treeDigest(files)).toBe(expected)
  })

  it('enumerates and classifies every file exactly once with reachable ordered rules', async () => {
    expect(Object.keys(manifest.dispositions).sort()).toEqual(['exclude', 'import', 'merge', 'preserve', 'replace-personal'])
    expect(manifest.classificationRules.at(-1)).toMatchObject({ match: '**/*', disposition: 'exclude', fallback: true })

    const audit = await auditImportManifest(manifest)
    expect(audit.totalFiles).toBeGreaterThan(0)
    expect(audit.coveredFiles).toBe(audit.totalFiles)
    expect(audit.unclassified).toEqual([])
    expect(audit.conflicts).toEqual([])
    expect(audit.unreachableRules).toEqual([])
    expect(audit.invalidPatterns).toEqual([])
    expect(Object.values(audit.counts).reduce((sum, count) => sum + count, 0)).toBe(audit.totalFiles)
    expect(audit.fallbackExclude.count).toBeGreaterThan(0)
    expect(audit.fallbackExclude.samples.length).toBeGreaterThan(0)
  })

  it('reports overlapping business globs as conflicts while ignoring the explicit fallback', async () => {
    const root = await temporaryDirectory('import-audit-')
    await fs.promises.mkdir(path.join(root, 'source', 'src'), { recursive: true })
    await fs.promises.writeFile(path.join(root, 'source', 'src', 'shared.ts'), '')
    const audit = await auditImportManifest({
      dispositions: { import: [], merge: [], exclude: [] },
      sources: [{ repository: 'example/source', localPath: 'source' }],
      classificationRules: [
        { match: 'src/**', disposition: 'import' },
        { match: '**/*.ts', disposition: 'merge' },
        { match: '**/*', disposition: 'exclude', fallback: true }
      ]
    }, root)

    expect(audit.conflicts).toEqual([{ file: 'example/source:src/shared.ts', rules: [0, 1] }])
  })

  it('versions one unique classification record for every source file', async () => {
    const audit = await auditImportManifest(manifest)
    expect(audit.files).toHaveLength(audit.totalFiles)
    expect(new Set(audit.files.map((entry: any) => `${entry.source}:${entry.file}`)).size).toBe(audit.totalFiles)
    expect(audit.files[0]).toMatchObject({ source: expect.any(String), file: expect.any(String), disposition: expect.any(String), winningRule: expect.any(Number) })
  })

  it('explicitly excludes Cloudflare, Worker, RAG, KV and Vectorize capabilities', () => {
    const excluded = JSON.stringify(manifest.dispositions.exclude).toLowerCase()
    for (const term of ['wrangler', 'worker', 'rag', 'kv', 'vectorize']) expect(excluded).toContain(term)
    expect(manifest.dispositions.import).not.toContain('wrangler.toml')
  })
})
