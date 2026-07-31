import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { encryptEpubFile, decryptEpubChapter, type EpubManifest } from '../../../scripts/kb/private-reader/encrypt-epub'
import { deriveKey, decryptField } from '../../../scripts/kb/private-reader/crypto'
import { createZip } from '../../../scripts/kb/private-reader/zip-writer'

// 复用 epub-parser.test.ts 的 EPUB fixture
const CONTAINER_XML = `<?xml version="1.0"?>
<container version="1.0">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`

const CONTENT_OPF = `<?xml version="1.0"?>
<package version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Test Book</dc:title>
    <dc:creator>Test Author</dc:creator>
    <dc:identifier id="bookid">urn:uuid:test-001</dc:identifier>
  </metadata>
  <manifest>
    <item id="ch1" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2" href="chapter2.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
  </manifest>
  <spine>
    <itemref idref="ch1"/>
    <itemref idref="ch2"/>
  </spine>
</package>`

const CHAPTER1 = `<?xml version="1.0"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Chapter 1</title></head>
<body><h1>Chapter 1</h1><p>Hello, world!</p></body>
</html>`

const CHAPTER2 = `<?xml version="1.0"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Chapter 2</title></head>
<body><h1>Chapter 2</h1><p>Goodbye, world!</p></body>
</html>`

const NAV_XHTML = `<?xml version="1.0"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title></head>
<body>
<nav epub:type="toc">
<ol>
<li><a href="chapter1.xhtml">Chapter 1</a></li>
<li><a href="chapter2.xhtml">Chapter 2</a></li>
</ol>
</nav>
</body>
</html>`

async function createTestEpub(): Promise<Buffer> {
  return createZip([
    { name: 'META-INF/container.xml', data: Buffer.from(CONTAINER_XML, 'utf-8') },
    { name: 'OEBPS/content.opf', data: Buffer.from(CONTENT_OPF, 'utf-8') },
    { name: 'OEBPS/chapter1.xhtml', data: Buffer.from(CHAPTER1, 'utf-8') },
    { name: 'OEBPS/chapter2.xhtml', data: Buffer.from(CHAPTER2, 'utf-8') },
    { name: 'OEBPS/nav.xhtml', data: Buffer.from(NAV_XHTML, 'utf-8') },
  ])
}

// v2 三层密码测试常量
const PASSWORDS = { gate: 'gate-pw', shelf: 'shelf-pw', book: 'book-pw' }

describe('epub encrypt pipeline', () => {
  let epubBuffer: Buffer
  let tempDir: string
  let epubPath: string

  beforeAll(async () => {
    epubBuffer = await createTestEpub()
  })

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'epub-test-'))
    epubPath = path.join(tempDir, 'test.epub')
    await fs.writeFile(epubPath, epubBuffer)
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it('writes manifest.json and seg-*.bin files', async () => {
    const outputDir = path.join(tempDir, 'output')
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, outputDir)

    const manifestPath = path.join(outputDir, 'manifest.json')
    expect((await fs.stat(manifestPath)).isFile()).toBe(true)

    for (const seg of manifest.segments) {
      const segPath = path.join(outputDir, seg.file)
      expect((await fs.stat(segPath)).isFile()).toBe(true)
    }
  })

  it('produces manifest with kind=epub and correct schema', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    expect(manifest.schema).toBe('private-reader/v2')
    expect(manifest.kind).toBe('epub')
    expect(manifest.slug).toBe('test-book')
  })

  it('uses 210000 PBKDF2 iterations', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    expect(manifest.crypto.iterations).toBe(210_000)
  })

  it('creates one segment per spine chapter', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    expect(manifest.segments.length).toBe(2)
  })

  it('has distinct IVs for all segments', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    const ivs = manifest.segments.map((s) => s.iv)
    expect(new Set(ivs).size).toBe(ivs.length)
  })

  it('does not leak plaintext in manifest', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    const str = JSON.stringify(manifest)
    expect(str).not.toContain('Test Book')
    expect(str).not.toContain('Test Author')
    expect(str).not.toContain('Chapter 1')
    expect(str).not.toContain('Chapter 2')
    expect(str).not.toContain('Hello, world!')
    expect(str).not.toContain('test.epub')
  })

  it('round-trip decryption reproduces original chapter content', async () => {
    const passwords = { gate: 'g', shelf: 's', book: 'round-trip-pw' }
    const outputDir = path.join(tempDir, 'round-trip')
    const manifest = await encryptEpubFile(epubPath, 'test-book', passwords, outputDir)

    // 章节内容用 bookKey 解密
    const bookSalt = Buffer.from(manifest.crypto.bookSalt, 'base64')
    const bookKey = deriveKey(passwords.book, bookSalt, manifest.crypto.iterations)

    // 解密第一章
    const seg0Path = path.join(outputDir, manifest.segments[0].file)
    const seg0Base64 = await fs.readFile(seg0Path, 'utf-8')
    const decrypted0 = decryptEpubChapter(seg0Base64, bookKey, manifest.segments[0].iv)
    expect(decrypted0).toContain('Hello, world!')

    // 解密第二章
    const seg1Path = path.join(outputDir, manifest.segments[1].file)
    const seg1Base64 = await fs.readFile(seg1Path, 'utf-8')
    const decrypted1 = decryptEpubChapter(seg1Base64, bookKey, manifest.segments[1].iv)
    expect(decrypted1).toContain('Goodbye, world!')
  })

  it('decrypts title and author fields via shelfKey', async () => {
    const passwords = { gate: 'g', shelf: 'shelf-pw', book: 'b' }
    const manifest = await encryptEpubFile(epubPath, 'test-book', passwords, path.join(tempDir, 'out'))

    // shelf.title/author 用 shelfKey 解密
    const shelfSalt = Buffer.from(manifest.crypto.shelfSalt, 'base64')
    const shelfKey = deriveKey(passwords.shelf, shelfSalt, manifest.crypto.iterations)

    expect(decryptField(manifest.shelf.title, shelfKey)).toBe('Test Book')
    expect(decryptField(manifest.shelf.author!, shelfKey)).toBe('Test Author')
  })

  it('populates TOC from EPUB nav (toc title encrypted with bookKey)', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    expect(manifest.toc.length).toBe(2)

    // toc[].title 用 bookKey 解密
    const bookSalt = Buffer.from(manifest.crypto.bookSalt, 'base64')
    const bookKey = deriveKey(PASSWORDS.book, bookSalt, manifest.crypto.iterations)
    expect(decryptField(manifest.toc[0].title, bookKey)).toBe('Chapter 1')
    expect(decryptField(manifest.toc[1].title, bookKey)).toBe('Chapter 2')
  })

  it('estimates reading time', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', PASSWORDS, path.join(tempDir, 'out'))
    expect(manifest.reading.estimatedTimeMin).toBeGreaterThan(0)
  })

  it('gate token can be verified with gateKey', async () => {
    const manifest = await encryptEpubFile(epubPath, 'gate-test', PASSWORDS, path.join(tempDir, 'gate'))
    // 用 gateSalt + gate 密码派生 gateKey
    const gateSalt = Buffer.from(manifest.crypto.gateSalt, 'base64')
    const gateKey = deriveKey(PASSWORDS.gate, gateSalt, manifest.crypto.iterations)
    // gate.token 应该能解密为固定的验证字符串（不抛异常即说明密码正确）
    expect(() => decryptField(manifest.gate.token, gateKey)).not.toThrow()
  })
})
