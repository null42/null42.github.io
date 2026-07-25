import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildMigrationBaseline, serializeBaseline } from '../../scripts/migration/generate-baseline'

describe('migration baseline', () => {
  it('records deterministic article, URL, hierarchy and attachment hashes without leaking protected plaintext', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'migration-baseline-'))
    const content = path.join(root, 'content')
    await fs.mkdir(path.join(content, 'motor'), { recursive: true })
    await fs.writeFile(path.join(content, 'motor', 'scope.png'), Buffer.from('scope'))
    await fs.writeFile(path.join(content, 'motor', 'secret.json'), Buffer.from('ciphertext'))
    await fs.writeFile(path.join(content, 'motor', 'public.md'), '---\ntitle: Public\nslug: custom\nsection: motor\nrouteId: foc\nstage: current\n---\n\n![scope](scope.png)\n')
    await fs.writeFile(path.join(content, 'motor', 'private.md'), '---\ntitle: Private\nvisibility: private\n---\n\nDO-NOT-LEAK\n')
    await fs.writeFile(path.join(content, 'motor', 'encrypted.md'), '---\ntitle: Secret\nvisibility: encrypted\n---\n\nENCRYPTED-PLAINTEXT\n\n<EncryptedArticle payload-url="/content/motor/secret.json" />\n')

    const protectedFingerprintKey = 'test-only-protected-fingerprint-key-32-bytes'
    const first = await buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123', protectedFingerprintKey })
    const second = await buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123', protectedFingerprintKey })
    const publicPath = path.join(content, 'motor', 'public.md')
    const publicLf = await fs.readFile(publicPath, 'utf8')
    await fs.writeFile(publicPath, publicLf.replace(/\n/g, '\r\n'), 'utf8')
    const withCrlf = await buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123', protectedFingerprintKey })
    const json = serializeBaseline(first)

    expect(json).toBe(serializeBaseline(second))
    expect(withCrlf.articles.find((article) => article.slug === 'custom')?.contentSha256).toBe(first.articles.find((article) => article.slug === 'custom')?.contentSha256)
    expect(json).not.toContain('DO-NOT-LEAK')
    expect(json).not.toContain('ENCRYPTED-PLAINTEXT')
    expect(first.articles.map((article) => article.sourcePath)).toEqual([...first.articles.map((article) => article.sourcePath)].sort())
    expect(first.articles[0]).toMatchObject({ contentSha256: expect.stringMatching(/^[a-f0-9]{64}$/), oldUrl: expect.any(String), targetUrl: expect.any(String), visibility: expect.any(String), encrypted: expect.any(Boolean) })
    expect(first.articles.find((article) => article.slug === 'custom')).toMatchObject({ sectionId: 'motor', routeId: 'foc', stageId: 'current', articleId: 'custom', attachments: [{ path: 'content/motor/scope.png', sha256: expect.stringMatching(/^[a-f0-9]{64}$/) }] })
    for (const secret of ['private.md', 'encrypted.md', 'motor/private', 'motor/encrypted', 'DO-NOT-LEAK', 'ENCRYPTED-PLAINTEXT']) expect(json).not.toContain(secret)
    for (const content of ['---\ntitle: Private\nvisibility: private\n---\n\nDO-NOT-LEAK\n', '---\ntitle: Secret\nvisibility: encrypted\n---\n\nENCRYPTED-PLAINTEXT\n']) {
      expect(json).not.toContain((await import('node:crypto')).createHash('sha256').update(content).digest('hex'))
    }
    expect(first.protected).toMatchObject({ private: { count: 1, placeholder: 'protected:private:v1' }, encrypted: { count: 1, placeholder: 'protected:encrypted:v1' } })
    expect(first.protected.entries).toHaveLength(2)
    expect(first.protected.entries.map((entry) => entry.id)).toEqual([...first.protected.entries.map((entry) => entry.id)].sort())
    expect(first.protected.entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: expect.stringMatching(/^[a-f0-9]{64}$/), contentFingerprint: expect.stringMatching(/^[a-f0-9]{64}$/), visibility: 'private', encrypted: false, attachments: [] }),
      expect.objectContaining({ id: expect.stringMatching(/^[a-f0-9]{64}$/), contentFingerprint: expect.stringMatching(/^[a-f0-9]{64}$/), visibility: 'encrypted', encrypted: true, attachments: [expect.objectContaining({ id: expect.stringMatching(/^[a-f0-9]{64}$/), fingerprint: expect.stringMatching(/^[a-f0-9]{64}$/) })] }),
    ]))
    expect(json).not.toContain('secret.json')
    expect(json).not.toContain((await import('node:crypto')).createHash('sha256').update('ciphertext').digest('hex'))
  })

  it('sorts by Unicode code points independent of locale', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'migration-sort-'))
    await fs.mkdir(path.join(root, 'content'))
    for (const name of ['中.md', 'a.md', 'B.md', '-.md', '_.md']) await fs.writeFile(path.join(root, 'content', name), `---\ntitle: ${name}\n---\n`)
    const baseline = await buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123' })
    expect(baseline.articles.map(article => article.sourcePath)).toEqual(['content/-.md', 'content/B.md', 'content/_.md', 'content/a.md', 'content/中.md'])
  })

  it('fails closed for public attachments that escape content or cannot be read', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'migration-attachment-boundary-'))
    await fs.mkdir(path.join(root, 'content', 'blog'), { recursive: true })
    await fs.writeFile(path.join(root, 'outside.txt'), 'outside')
    const articlePath = path.join(root, 'content', 'blog', 'post.md')

    await fs.writeFile(articlePath, '---\ntitle: Escape\n---\n\n![escape](../../outside.txt)\n')
    await expect(buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123' })).rejects.toThrow(/outside the content root/)

    await fs.writeFile(articlePath, '---\ntitle: Missing\n---\n\n![missing](missing.png)\n')
    await expect(buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123' })).rejects.toThrow(/failed to read public attachment/)

    await fs.writeFile(articlePath, '---\ntitle: Backslash\n---\n\n![escape](..\\..\\outside.txt)\n')
    await expect(buildMigrationBaseline({ rootDir: root, stableCommit: 'abc123' })).rejects.toThrow(/backslash/)
  })
})
