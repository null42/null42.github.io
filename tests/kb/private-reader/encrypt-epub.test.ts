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
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', outputDir)

    const manifestPath = path.join(outputDir, 'manifest.json')
    expect((await fs.stat(manifestPath)).isFile()).toBe(true)

    for (const seg of manifest.segments) {
      const segPath = path.join(outputDir, seg.file)
      expect((await fs.stat(segPath)).isFile()).toBe(true)
    }
  })

  it('produces manifest with kind=epub and correct schema', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    expect(manifest.schema).toBe('private-reader/v1')
    expect(manifest.kind).toBe('epub')
    expect(manifest.slug).toBe('test-book')
  })

  it('uses 210000 PBKDF2 iterations', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    expect(manifest.crypto.iterations).toBe(210_000)
  })

  it('creates one segment per spine chapter', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    expect(manifest.segments.length).toBe(2)
  })

  it('has distinct IVs for all segments', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    const ivs = manifest.segments.map((s) => s.iv)
    expect(new Set(ivs).size).toBe(ivs.length)
  })

  it('does not leak plaintext in manifest', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    const str = JSON.stringify(manifest)
    expect(str).not.toContain('Test Book')
    expect(str).not.toContain('Test Author')
    expect(str).not.toContain('Chapter 1')
    expect(str).not.toContain('Chapter 2')
    expect(str).not.toContain('Hello, world!')
    expect(str).not.toContain('test.epub')
  })

  it('round-trip decryption reproduces original chapter content', async () => {
    const password = 'round-trip-pw'
    const outputDir = path.join(tempDir, 'round-trip')
    const manifest = await encryptEpubFile(epubPath, 'test-book', password, outputDir)

    const salt = Buffer.from(manifest.crypto.salt, 'base64')
    const key = deriveKey(password, salt, manifest.crypto.iterations)

    // 解密第一章
    const seg0Path = path.join(outputDir, manifest.segments[0].file)
    const seg0Base64 = await fs.readFile(seg0Path, 'utf-8')
    const decrypted0 = decryptEpubChapter(seg0Base64, key, manifest.segments[0].iv)
    expect(decrypted0).toContain('Hello, world!')

    // 解密第二章
    const seg1Path = path.join(outputDir, manifest.segments[1].file)
    const seg1Base64 = await fs.readFile(seg1Path, 'utf-8')
    const decrypted1 = decryptEpubChapter(seg1Base64, key, manifest.segments[1].iv)
    expect(decrypted1).toContain('Goodbye, world!')
  })

  it('decrypts title and author fields', async () => {
    const password = 'field-pw'
    const manifest = await encryptEpubFile(epubPath, 'test-book', password, path.join(tempDir, 'out'))

    const salt = Buffer.from(manifest.crypto.salt, 'base64')
    const key = deriveKey(password, salt, manifest.crypto.iterations)

    expect(decryptField(manifest.title, key)).toBe('Test Book')
    expect(decryptField(manifest.author!, key)).toBe('Test Author')
  })

  it('populates TOC from EPUB nav', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    expect(manifest.toc.length).toBe(2)

    const salt = Buffer.from(manifest.crypto.salt, 'base64')
    const key = deriveKey('pw', salt, manifest.crypto.iterations)
    expect(decryptField(manifest.toc[0].title, key)).toBe('Chapter 1')
    expect(decryptField(manifest.toc[1].title, key)).toBe('Chapter 2')
  })

  it('estimates reading time', async () => {
    const manifest = await encryptEpubFile(epubPath, 'test-book', 'pw', path.join(tempDir, 'out'))
    expect(manifest.reading.estimatedTimeMin).toBeGreaterThan(0)
  })
})
