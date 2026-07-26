import { describe, it, expect, beforeAll } from 'vitest'
import { parseEpub } from '../../../scripts/kb/private-reader/epub-parser'
import { createZip } from '../../../scripts/kb/private-reader/zip-writer'

// 合成 EPUB 文件内容
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
    <item id="cover" href="cover.png" media-type="image/png"/>
  </manifest>
  <spine toc="ncx">
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

// 1x1 PNG (透明像素)
const COVER_PNG = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41,
  0x54, 0x78, 0x9c, 0x62, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
  0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82
])

async function createTestEpub(): Promise<Buffer> {
  return createZip([
    { name: 'META-INF/container.xml', data: Buffer.from(CONTAINER_XML, 'utf-8') },
    { name: 'OEBPS/content.opf', data: Buffer.from(CONTENT_OPF, 'utf-8') },
    { name: 'OEBPS/chapter1.xhtml', data: Buffer.from(CHAPTER1, 'utf-8') },
    { name: 'OEBPS/chapter2.xhtml', data: Buffer.from(CHAPTER2, 'utf-8') },
    { name: 'OEBPS/nav.xhtml', data: Buffer.from(NAV_XHTML, 'utf-8') },
    { name: 'OEBPS/cover.png', data: COVER_PNG },
  ])
}

describe('epub parser', () => {
  let epubBuffer: Buffer

  beforeAll(async () => {
    epubBuffer = await createTestEpub()
  })

  it('parses OPF path from container.xml', async () => {
    const epub = await parseEpub(epubBuffer)
    expect(epub.opfPath).toBe('OEBPS/content.opf')
  })

  it('extracts metadata (title and author)', async () => {
    const epub = await parseEpub(epubBuffer)
    expect(epub.metadata.title).toBe('Test Book')
    expect(epub.metadata.author).toBe('Test Author')
  })

  it('parses manifest with all items', async () => {
    const epub = await parseEpub(epubBuffer)
    expect(epub.manifest.length).toBeGreaterThanOrEqual(4)
    const ids = epub.manifest.map((m) => m.id)
    expect(ids).toContain('ch1')
    expect(ids).toContain('ch2')
    expect(ids).toContain('nav')
  })

  it('parses spine in correct order', async () => {
    const epub = await parseEpub(epubBuffer)
    expect(epub.spine.length).toBe(2)
    expect(epub.spine[0].id).toBe('ch1')
    expect(epub.spine[0].href).toBe('OEBPS/chapter1.xhtml')
    expect(epub.spine[1].id).toBe('ch2')
    expect(epub.spine[1].href).toBe('OEBPS/chapter2.xhtml')
  })

  it('parses TOC from nav.xhtml (EPUB3)', async () => {
    const epub = await parseEpub(epubBuffer)
    expect(epub.toc.length).toBe(2)
    expect(epub.toc[0].title).toBe('Chapter 1')
    expect(epub.toc[0].href).toBe('OEBPS/chapter1.xhtml')
    expect(epub.toc[1].title).toBe('Chapter 2')
    expect(epub.toc[1].href).toBe('OEBPS/chapter2.xhtml')
  })

  it('collects image assets', async () => {
    const epub = await parseEpub(epubBuffer)
    const imageAssets = epub.assets.filter((a) => a.mediaType.startsWith('image/'))
    expect(imageAssets.length).toBeGreaterThanOrEqual(1)
    expect(imageAssets.some((a) => a.href.includes('cover.png'))).toBe(true)
  })

  it('provides content map for spine items', async () => {
    const epub = await parseEpub(epubBuffer)
    const ch1Content = epub.content.get('OEBPS/chapter1.xhtml')
    expect(ch1Content).toBeDefined()
    expect(ch1Content!.toString('utf-8')).toContain('Hello, world!')
  })

  it('rejects zip bomb (exceeds maxUncompressedBytes)', async () => {
    await expect(parseEpub(epubBuffer, { maxUncompressedBytes: 10 })).rejects.toThrow()
  })

  it('rejects too many entries (exceeds maxEntries)', async () => {
    await expect(parseEpub(epubBuffer, { maxEntries: 2 })).rejects.toThrow()
  })
})
