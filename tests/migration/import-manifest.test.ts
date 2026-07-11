import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const manifestPath = path.resolve('reports/firefly-mod-import-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

describe('Firefly mod import manifest', () => {
  it('pins both MIT reference sources with traceable licenses', () => {
    expect(manifest.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ repository: 'MmzMing/my-blog', commit: '2fe55d6718839807c5c4cae20c33eae00390cd12', license: expect.objectContaining({ spdx: 'MIT', path: 'LICENSE' }) }),
      expect.objectContaining({ repository: 'fqzlr/my-blog', commit: '65d6daf637e3e3dda460e012b4ef4ff418796dfc', license: expect.objectContaining({ spdx: 'MIT', path: 'LICENSE' }) })
    ]))
  })

  it('defines all required dispositions and classifies every reference file by ordered rules', () => {
    expect(Object.keys(manifest.dispositions).sort()).toEqual(['exclude', 'import', 'merge', 'preserve', 'replace-personal'])
    expect(manifest.classificationRules.at(-1)).toMatchObject({ match: '**/*', disposition: 'exclude' })
    for (const source of manifest.sources) {
      expect(source.localPath).toMatch(/^env\/(?:firefly-mod-reference|fqzlr-blog-reference)$/)
    }
  })

  it('explicitly excludes Cloudflare, Worker, RAG, KV and Vectorize capabilities', () => {
    const excluded = JSON.stringify(manifest.dispositions.exclude).toLowerCase()
    for (const term of ['wrangler', 'worker', 'rag', 'kv', 'vectorize']) expect(excluded).toContain(term)
    expect(manifest.dispositions.import).not.toContain('wrangler.toml')
  })
})
