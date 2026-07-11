import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { auditImportManifest, verifySourceProofs } from '../../scripts/migration/audit-import-manifest'

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

  it('enumerates and classifies every file exactly once with reachable ordered rules', async () => {
    expect(Object.keys(manifest.dispositions).sort()).toEqual(['exclude', 'import', 'merge', 'preserve', 'replace-personal'])
    expect(manifest.classificationRules.at(-1)).toMatchObject({ match: '**/*', disposition: 'exclude' })

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

  it('explicitly excludes Cloudflare, Worker, RAG, KV and Vectorize capabilities', () => {
    const excluded = JSON.stringify(manifest.dispositions.exclude).toLowerCase()
    for (const term of ['wrangler', 'worker', 'rag', 'kv', 'vectorize']) expect(excluded).toContain(term)
    expect(manifest.dispositions.import).not.toContain('wrangler.toml')
  })
})
