import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { encryptTxtFile, decryptTxtSegment, type TxtManifest } from '../../../scripts/kb/private-reader/encrypt-txt'
import { deriveKey, decryptField } from '../../../scripts/kb/private-reader/crypto'

const FIXTURE_PATH = path.join(process.cwd(), 'tests/fixtures/private-reader/sample.txt')

describe('txt encrypt pipeline', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'private-reader-test-'))
  })

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it('writes manifest.json and seg-*.bin files', async () => {
    const slug = 'test-book'
    const outputDir = path.join(tempDir, slug)
    const manifest = await encryptTxtFile(FIXTURE_PATH, slug, 'test-password', outputDir)

    // manifest.json 存在
    const manifestPath = path.join(outputDir, 'manifest.json')
    const manifestStat = await fs.stat(manifestPath)
    expect(manifestStat.isFile()).toBe(true)

    // seg-*.bin 文件存在
    for (const seg of manifest.segments) {
      const segPath = path.join(outputDir, seg.file)
      const segStat = await fs.stat(segPath)
      expect(segStat.isFile()).toBe(true)
    }
  })

  it('produces manifest with correct schema and kind', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', 'pw', path.join(tempDir, 'test-book')
    )
    expect(manifest.schema).toBe('private-reader/v1')
    expect(manifest.kind).toBe('txt')
    expect(manifest.slug).toBe('test-book')
  })

  it('uses 210000 PBKDF2 iterations', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', 'pw', path.join(tempDir, 'test-book')
    )
    expect(manifest.crypto.iterations).toBe(210_000)
    expect(manifest.crypto.algorithm).toBe('AES-GCM')
    expect(manifest.crypto.kdf).toBe('PBKDF2-SHA256')
  })

  it('has distinct IVs for all segments', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', 'pw', path.join(tempDir, 'test-book')
    )
    const ivs = manifest.segments.map((s) => s.iv)
    const uniqueIvs = new Set(ivs)
    expect(uniqueIvs.size).toBe(ivs.length)
  })

  it('does not leak plaintext or filename in manifest', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', 'pw', path.join(tempDir, 'test-book')
    )
    const manifestStr = JSON.stringify(manifest)
    // 不包含原始文件名
    expect(manifestStr).not.toContain('sample.txt')
    expect(manifestStr).not.toContain('tests/fixtures')
    // 不包含明文内容
    expect(manifestStr).not.toContain('测试文本')
    expect(manifestStr).not.toContain('第一章')
    // title 和 author 是加密的 base64
    expect(manifest.title).not.toBe('第一章 测试文本')
  })

  it('round-trip decryption reproduces original text', async () => {
    const password = 'round-trip-pw'
    const slug = 'round-trip-book'
    const outputDir = path.join(tempDir, slug)
    const manifest = await encryptTxtFile(FIXTURE_PATH, slug, password, outputDir)

    // 派生 key
    const salt = Buffer.from(manifest.crypto.salt, 'base64')
    const key = deriveKey(password, salt, manifest.crypto.iterations)

    // 解密所有段并拼接
    let decryptedText = ''
    for (const seg of manifest.segments) {
      const segPath = path.join(outputDir, seg.file)
      const ciphertextBase64 = await fs.readFile(segPath, 'utf-8')
      decryptedText += decryptTxtSegment(ciphertextBase64, key, seg.iv)
    }

    // 读取原始文件
    const originalText = await fs.readFile(FIXTURE_PATH, 'utf-8')
    expect(decryptedText).toBe(originalText)
  })

  it('decrypts title and author fields correctly', async () => {
    const password = 'field-pw'
    const outputDir = path.join(tempDir, 'field-test')
    const manifest = await encryptTxtFile(FIXTURE_PATH, 'field-test', password, outputDir, {
      title: '我的私密书名',
      author: '测试作者'
    })

    const salt = Buffer.from(manifest.crypto.salt, 'base64')
    const key = deriveKey(password, salt, manifest.crypto.iterations)

    expect(decryptField(manifest.title, key)).toBe('我的私密书名')
    expect(decryptField(manifest.author!, key)).toBe('测试作者')
  })

  it('handles null author', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'no-author', 'pw', path.join(tempDir, 'no-author'),
      { title: 'No Author Book' }
    )
    expect(manifest.author).toBeNull()
  })

  it('estimates reading time', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', 'pw', path.join(tempDir, 'test-book')
    )
    expect(manifest.reading.estimatedTimeMin).toBeGreaterThan(0)
    expect(typeof manifest.reading.estimatedTimeMin).toBe('number')
  })
})
