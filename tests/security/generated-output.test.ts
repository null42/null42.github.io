import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { findAbsolutePaths, scanGeneratedOutput, summarizeScanResult } from '../../scripts/security/scan-generated-output'
import fsPromises from 'node:fs/promises'

const windowsPath = (drive: string, ...segments: string[]) => {
  const separator = String.fromCharCode(92)
  return `${drive}:${separator}${segments.join(separator)}`
}

const forwardDrivePath = (drive: string, ...segments: string[]) => `${drive}:/${segments.join('/')}`

describe('generated output privacy scan', () => {
  it('derives protected plaintext and metadata checks from the visibility matrix', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-visibility-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist', 'index.html'), [
      'PRIVATE_BODY_SENTINEL',
      'PRIVATE_SUMMARY_SENTINEL',
      'ENCRYPTED_BODY_SENTINEL',
      'ENCRYPTED_SUMMARY_SENTINEL',
      'HIDDEN_SUMMARY_SENTINEL',
      'HIDDEN_BODY_ALLOWED',
      'ENCRYPTED_TITLE_ALLOWED',
    ].join(' '), 'utf8')

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [
        { visibility: 'public', body: 'PUBLIC_BODY_ALLOWED', summary: 'PUBLIC_SUMMARY_ALLOWED' },
        { visibility: 'hidden', body: 'HIDDEN_BODY_ALLOWED', summary: 'HIDDEN_SUMMARY_SENTINEL' },
        { visibility: 'private', body: 'PRIVATE_BODY_SENTINEL', summary: 'PRIVATE_SUMMARY_SENTINEL' },
        { visibility: 'encrypted', body: 'ENCRYPTED_BODY_SENTINEL', summary: 'ENCRYPTED_SUMMARY_SENTINEL' },
      ],
    })

    expect(result.issues.filter((issue) => issue.rule === 'protected-content')).toHaveLength(5)
    expect(JSON.stringify(result)).not.toContain('PRIVATE_BODY_SENTINEL')
    expect(JSON.stringify(result)).not.toContain('ENCRYPTED_SUMMARY_SENTINEL')
  })

  it('allows only titles that are explicitly published by an encrypted placeholder', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-placeholder-title-'))
    fs.mkdirSync(path.join(root, 'dist', 'posts', 'shared'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist', 'posts', 'shared', 'index.html'), 'SHARED_PLACEHOLDER_TITLE PRIVATE_DETAIL_SENTINEL', 'utf8')
    fs.writeFileSync(path.join(root, 'dist', 'rss.xml'), 'SHARED_PLACEHOLDER_TITLE', 'utf8')

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [
        { visibility: 'private', title: 'SHARED_PLACEHOLDER_TITLE', body: '# SHARED_PLACEHOLDER_TITLE\n\nPRIVATE_DETAIL_SENTINEL' },
        { visibility: 'encrypted', title: 'SHARED_PLACEHOLDER_TITLE', slug: 'shared' },
      ],
    })

    expect(result.issues.filter((issue) => issue.rule === 'protected-content')).toHaveLength(2)
    expect(result.issues.some((issue) => issue.path === 'dist/rss.xml')).toBe(true)
  })

  it('loads protected leak terms from content by default for the production CLI path', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-default-visibility-'))
    fs.mkdirSync(path.join(root, 'content', 'encrypted'), { recursive: true })
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content', 'encrypted', 'note.md'), '---\ntitle: Encrypted\nvisibility: encrypted\nsummary: DEFAULT_ENCRYPTED_SUMMARY_SENTINEL\n---\n\nDEFAULT_ENCRYPTED_BODY_SENTINEL', 'utf8')
    fs.writeFileSync(path.join(root, 'dist', 'index.html'), 'DEFAULT_ENCRYPTED_SUMMARY_SENTINEL', 'utf8')

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
    })

    expect(result.issues.filter((issue) => issue.rule === 'protected-content')).toHaveLength(1)
    expect(JSON.stringify(result)).not.toContain('DEFAULT_ENCRYPTED_SUMMARY_SENTINEL')
  })

  it('scans excluded private sources and normalized Markdown probes without scanning the source itself', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-private-source-'))
    fs.mkdirSync(path.join(root, 'content', 'private'), { recursive: true })
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'content', 'private', 'secret.md'), '---\ntitle: Private\nvisibility: private\nsummary: PVT7\ntags: [x7]\n---\n\n# PRIVATE_HEADING\n\n[PRIVATE_LINK](./private.bin)', 'utf8')
    fs.writeFileSync(path.join(root, 'dist', 'index.html'), '<h1>PRIVATE_HEADING</h1><p>PRIVATE_LINK PVT7 x7</p>', 'utf8')

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
    })

    expect(result.issues.filter((issue) => issue.rule === 'protected-content')).toHaveLength(4)
    expect(result.issues.every((issue) => issue.path === 'dist/index.html')).toBe(true)
  })

  it('detects sensitive terms, token formats, high entropy values, and absolute paths without echoing secrets', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-scan-'))
    const githubToken = ['gh', 'p_', '1234567890abcdefghijklmnop', 'qrstuvwxyz'].join('')
    const awsKey = ['AK', 'IA', 'IOSFODNN7EXAMPLE'].join('')
    const encodedValue = [
      'QWxhZGRpbjpvcGVuIHNlc2FtZV9yYW5kb21fMTIzNDU2Nzg5',
      'QWxhZGRpbjpvcGVuIHNlc2FtZV9yYW5kb21fMTIzNDU2Nzg5',
    ].join('')
    fs.mkdirSync(path.join(root, 'dist/_pagefind'), { recursive: true })
    fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/index.html'), `PRIVATE_SENTINEL ${githubToken} ${windowsPath('C', 'Users', 'secret', 'note.md')}`, 'utf8')
    fs.writeFileSync(path.join(root, 'dist/_pagefind/index.js'), awsKey, 'utf8')
    fs.writeFileSync(path.join(root, 'reports/navigation.json'), JSON.stringify({ value: encodedValue }), 'utf8')

    const result = await scanGeneratedOutput({ rootDir: root, roots: ['dist', 'reports'], sensitiveTerms: ['PRIVATE_SENTINEL'], includeTrackedFiles: false, protectedContent: [] })
    expect(result.issues.map((issue) => issue.rule)).toEqual(expect.arrayContaining(['sensitive-term', 'token-format', 'absolute-path', 'high-entropy']))
    const serialized = JSON.stringify(result)
    expect(serialized).not.toContain('PRIVATE_SENTINEL')
    expect(serialized).not.toContain(githubToken)
    expect(serialized).not.toContain(awsKey)
  })

  it('rejects untracked legacy site output copied into repository-root paths', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-legacy-root-'))
    fs.mkdirSync(path.join(root, 'assets'), { recursive: true })
    fs.mkdirSync(path.join(root, 'content', 'encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'assets', 'encrypted.js'), 'legacy bundle', 'utf8')
    fs.writeFileSync(path.join(root, 'content', 'encrypted', 'demo.html'), '<main>legacy page</main>', 'utf8')

    const result = await scanGeneratedOutput({ rootDir: root, includeTrackedFiles: false })

    expect(result.issues.map((issue) => issue.path)).toEqual(expect.arrayContaining([
      'assets/encrypted.js',
      'content/encrypted/demo.html',
    ]))
  })

  it('detects arbitrary Windows drive absolute paths, not only user or workspace paths', () => {
    const workspace = windowsPath('E', 'gitee_CodeStorage', '学习', 'null42.github.io')
    expect(findAbsolutePaths(`leak ${windowsPath('E', 'gitee_CodeStorage', '学习', 'null42.github.io', 'content', 'private.md')}`, workspace)).toHaveLength(1)
    expect(findAbsolutePaths(`leak ${windowsPath('D', 'private-sources', 'worldbuilding', 'chapter.md')}`, workspace)).toHaveLength(1)
    expect(findAbsolutePaths(`leak ${forwardDrivePath('Z', 'archives', 'private', 'chapter.md')}`, workspace)).toHaveLength(1)
  })

  it('detects JSON-escaped Windows user directory paths', () => {
    const serialized = JSON.stringify({ source: windowsPath('C', 'Users', 'alice', 'private.md') })
    expect(findAbsolutePaths(serialized, windowsPath('E', 'workspace'))).toHaveLength(1)
  })

  it('detects JSON-escaped absolute paths on arbitrary Windows drives', () => {
    const serialized = JSON.stringify({ source: windowsPath('Q', 'private-sources', 'worldbuilding', 'chapter.md') })
    expect(findAbsolutePaths(serialized, windowsPath('E', 'workspace'))).toHaveLength(1)
  })

  it('ignores JavaScript ternary regular expressions that resemble drive paths', () => {
    const source = 'const value = enabled ? n:/[%p]/.test(input) ? selected : fallback'
    expect(findAbsolutePaths(source, windowsPath('E', 'workspace'))).toEqual([])
  })

  it.each([
    ['expect(css).not.toMatch(/overflow-', 'x:', '\\s*hidden/s)'].join(''),
    ['expect(css).toMatch(/overflow-', 'x:', '\\s*auto/s)'].join(''),
  ])('ignores CSS regular expression fragments: %s', (source) => {
    expect(findAbsolutePaths(source, windowsPath('E', 'workspace'))).toEqual([])
  })

  it('does not classify its own CSS detector regex literal as an absolute path', async () => {
    const scannerSource = await fsPromises.readFile(path.resolve('scripts/security/scan-generated-output.ts'), 'utf8')
    const detectorMatches = findAbsolutePaths(scannerSource, windowsPath('E', 'workspace'))
      .filter((match) => match.startsWith('x:') && match.includes('hidden|auto'))
    expect(detectorMatches).toEqual([])
  })

  it('preserves Unicode, forward-slash, and JSON-escaped paths on arbitrary drives', () => {
    const workspace = windowsPath('E', '代码仓库', '学习', 'null42.github.io')
    const serialized = JSON.stringify({ source: windowsPath('Q', '私人资料', '世界观', '章节.md') })
    expect(findAbsolutePaths(`leak ${windowsPath('E', '代码仓库', '学习', 'null42.github.io', '内容', '私密.md')}`, workspace)).toHaveLength(1)
    expect(findAbsolutePaths(`leak ${forwardDrivePath('Z', '档案', '私人', '章节.md')}`, workspace)).toHaveLength(1)
    expect(findAbsolutePaths(serialized, workspace)).toHaveLength(1)
  })

  it('honors exact allowlist entries while retaining other findings', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-allow-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/app.js'), 'PRIVATE_SENTINEL SECOND_SECRET', 'utf8')
    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: ['PRIVATE_SENTINEL', 'SECOND_SECRET'],
      allowlist: [{ path: 'dist/app.js', rule: 'sensitive-term', fingerprint: 'fnv1a:2d5fda01' }],
      includeTrackedFiles: false,
      protectedContent: [],
    })
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0].path).toBe('dist/app.js')
  })

  it('supports narrowly scoped wildcard allowlist entries', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-wildcard-'))
    const encodedValue = [
      'QWxhZGRpbjpvcGVuIHNlc2FtZV9yYW5kb21fMTIzNDU2Nzg5',
      'QWxhZGRpbjpvcGVuIHNlc2FtZV9yYW5kb21fMTIzNDU2Nzg5',
    ].join('')
    fs.mkdirSync(path.join(root, 'dist/content/encrypted'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/content/encrypted/demo.json'), encodedValue, 'utf8')
    const result = await scanGeneratedOutput({ rootDir: root, roots: ['dist'], sensitiveTerms: [], allowlist: [{ path: 'dist/content/encrypted/*.json', rule: 'high-entropy', fingerprint: '*' }], includeTrackedFiles: false, protectedContent: [] })
    expect(result.issues).toHaveLength(0)
  })

  it('does not classify ordinary long slugs or hexadecimal hashes as high entropy secrets', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-noise-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    await fsPromises.writeFile(path.join(root, 'dist/data.json'), 'power/projects/matlab-simulink-power-electronics-fast-track 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef /home/home.webp')
    const result = await scanGeneratedOutput({ rootDir: root, roots: ['dist'], sensitiveTerms: [], includeTrackedFiles: false, protectedContent: [] })
    expect(result.issues.filter((issue) => issue.rule === 'high-entropy')).toHaveLength(0)
    expect(result.issues.filter((issue) => issue.rule === 'absolute-path')).toHaveLength(0)
  })

  it('ignores tracked paths deleted from the current worktree', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-deleted-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/index.html'), '<main>safe</main>', 'utf8')
    fs.writeFileSync(path.join(root, 'deleted.txt'), 'PRIVATE_SENTINEL', 'utf8')
    execFileSync('git', ['init'], { cwd: root, stdio: 'ignore' })
    execFileSync('git', ['add', 'deleted.txt'], { cwd: root, stdio: 'ignore' })
    fs.unlinkSync(path.join(root, 'deleted.txt'))
    expect(await scanGeneratedOutput({ rootDir: root, roots: ['dist'], sensitiveTerms: ['PRIVATE_SENTINEL'], protectedContent: [] })).toMatchObject({ issueCount: 0 })
  })

  it('fails closed when tracked-file enumeration is unavailable', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-no-git-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.mkdirSync(path.join(root, 'content'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/index.html'), '<main>safe</main>', 'utf8')

    await expect(scanGeneratedOutput({ rootDir: root, roots: ['dist'], sensitiveTerms: [] })).rejects.toThrow(/git ls-files|tracked files/i)
  })

  it('fails closed when the protected content root is missing', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-no-content-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/index.html'), '<main>safe</main>', 'utf8')

    await expect(scanGeneratedOutput({ rootDir: root, roots: ['dist'], sensitiveTerms: [], includeTrackedFiles: false })).rejects.toThrow(/content root|protected content/i)
  })

  it('summarizes CLI findings by rule and path with redacted fingerprints', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-summary-'))
    fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
    fs.writeFileSync(path.join(root, 'dist/app.js'), 'FIRST_SECRET SECOND_SECRET', 'utf8')
    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: ['FIRST_SECRET', 'SECOND_SECRET'],
      includeTrackedFiles: false,
      protectedContent: [],
    })

    const summary = summarizeScanResult(result)
    expect(summary.groups).toEqual([{
      rule: 'sensitive-term',
      paths: [{
        path: 'dist/app.js',
        fingerprints: expect.arrayContaining([expect.stringMatching(/^fnv1a:[0-9a-f]{8}$/)]),
      }],
    }])
    expect(summary.groups[0].paths[0].fingerprints).toHaveLength(2)
    expect(JSON.stringify(summary)).not.toContain('FIRST_SECRET')
    expect(JSON.stringify(summary)).not.toContain('SECOND_SECRET')
  })

  it('flags private-reader manifest with plaintext title or author', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-private-reader-'))
    fs.mkdirSync(path.join(root, 'dist/private-reader/sample'), { recursive: true })
    // 故意写入明文 title 和 author
    const manifest = {
      schema: 'private-reader/v1',
      kind: 'txt',
      slug: 'sample',
      title: 'Plain Title Should Be Encrypted',
      author: 'Plain Author Should Be Encrypted',
      crypto: { algorithm: 'AES-GCM', kdf: 'PBKDF2-SHA256', iterations: 210000, salt: 'dGVzdA==' },
      segments: [{ index: 0, file: 'seg-0000.bin', iv: 'aaaaaaaaaaaaaaaa', bytes: 100, charHint: 0 }],
      reading: { estimatedTimeMin: 1 },
    }
    fs.writeFileSync(
      path.join(root, 'dist/private-reader/sample/manifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf8'
    )

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [],
    })

    const privateReaderIssues = result.issues.filter((issue) => issue.rule === 'private-reader-leak')
    // 至少检测出 title、author 两条
    expect(privateReaderIssues.length).toBeGreaterThanOrEqual(2)
    expect(JSON.stringify(result)).not.toContain('Plain Title Should Be Encrypted')
    expect(JSON.stringify(result)).not.toContain('Plain Author Should Be Encrypted')
  })

  it('accepts private-reader manifest with encrypted base64 fields', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-private-reader-ok-'))
    fs.mkdirSync(path.join(root, 'dist/private-reader/sample'), { recursive: true })
    // 构造合法的加密字段（base64编码，解码后长度 ≥ 29）
    // iv(12) + ciphertext(16) + authTag(16) = 44 字节 → base64 长度 60
    const validEncrypted = Buffer.alloc(44, 0x41).toString('base64')
    const validIv = Buffer.alloc(12, 0x42).toString('base64')
    const manifest = {
      schema: 'private-reader/v1',
      kind: 'txt',
      slug: 'sample',
      title: validEncrypted,
      author: validEncrypted,
      crypto: { algorithm: 'AES-GCM', kdf: 'PBKDF2-SHA256', iterations: 210000, salt: 'dGVzdA==' },
      segments: [{ index: 0, file: 'seg-0000.bin', iv: validIv, bytes: 100, charHint: 0 }],
      toc: [{ id: 'ch1', title: validEncrypted, segmentIndex: 0 }],
      reading: { estimatedTimeMin: 1 },
    }
    fs.writeFileSync(
      path.join(root, 'dist/private-reader/sample/manifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf8'
    )
    // 写入合法 base64 的 .bin 文件
    fs.writeFileSync(
      path.join(root, 'dist/private-reader/sample/seg-0000.bin'),
      Buffer.alloc(100, 0x41).toString('base64'),
      'utf8'
    )

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [],
    })

    const privateReaderIssues = result.issues.filter((issue) => issue.rule === 'private-reader-leak')
    expect(privateReaderIssues).toEqual([])
  })

  it('rejects private-reader .bin files containing non-base64 content', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-private-reader-bin-'))
    fs.mkdirSync(path.join(root, 'dist/private-reader/sample'), { recursive: true })
    // 写入非 base64 内容（明文泄漏）
    fs.writeFileSync(
      path.join(root, 'dist/private-reader/sample/seg-0000.bin'),
      'This is plaintext leaking from a bin file!!!',
      'utf8'
    )

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [],
    })

    const privateReaderIssues = result.issues.filter((issue) => issue.rule === 'private-reader-leak')
    expect(privateReaderIssues.length).toBeGreaterThanOrEqual(1)
    expect(JSON.stringify(result)).not.toContain('This is plaintext leaking')
  })

  it('flags private-reader HTML shells leaking plaintext paragraphs', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-private-reader-html-'))
    fs.mkdirSync(path.join(root, 'dist/private-reader/sample'), { recursive: true })
    // 模拟 HTML shell 中嵌入明文段落（应被检测）
    const html = `
<!DOCTYPE html>
<html><body>
  <div class="password-gate">Enter password</div>
  <div class="content-leak">
    The quick brown fox jumps over the lazy dog and this is a plaintext leak.
  </div>
</body></html>`
    fs.writeFileSync(
      path.join(root, 'dist/private-reader/sample/index.html'),
      html,
      'utf8'
    )

    const result = await scanGeneratedOutput({
      rootDir: root,
      roots: ['dist'],
      sensitiveTerms: [],
      includeTrackedFiles: false,
      protectedContent: [],
    })

    const privateReaderIssues = result.issues.filter((issue) => issue.rule === 'private-reader-leak')
    expect(privateReaderIssues.length).toBeGreaterThanOrEqual(1)
  })
})
