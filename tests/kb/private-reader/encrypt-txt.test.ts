import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { encryptTxtFile, decryptTxtSegment, type TxtManifest } from '../../../scripts/kb/private-reader/encrypt-txt'
import { deriveKey, decryptField } from '../../../scripts/kb/private-reader/crypto'

const FIXTURE_PATH = path.join(process.cwd(), 'tests/fixtures/private-reader/sample.txt')

// v2 三层密码测试常量
const PASSWORDS = { gate: 'gate-pw', shelf: 'shelf-pw', book: 'book-pw' }

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
    const manifest = await encryptTxtFile(FIXTURE_PATH, slug, PASSWORDS, outputDir)

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
      FIXTURE_PATH, 'test-book', PASSWORDS, path.join(tempDir, 'test-book')
    )
    expect(manifest.schema).toBe('private-reader/v2')
    expect(manifest.kind).toBe('txt')
    expect(manifest.slug).toBe('test-book')
  })

  it('uses 210000 PBKDF2 iterations', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', PASSWORDS, path.join(tempDir, 'test-book')
    )
    expect(manifest.crypto.iterations).toBe(210_000)
    expect(manifest.crypto.algorithm).toBe('AES-GCM')
    expect(manifest.crypto.kdf).toBe('PBKDF2-SHA256')
  })

  it('has distinct IVs for all segments', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', PASSWORDS, path.join(tempDir, 'test-book')
    )
    const ivs = manifest.segments.map((s) => s.iv)
    const uniqueIvs = new Set(ivs)
    expect(uniqueIvs.size).toBe(ivs.length)
  })

  it('does not leak plaintext or filename in manifest', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', PASSWORDS, path.join(tempDir, 'test-book')
    )
    const manifestStr = JSON.stringify(manifest)
    // 不包含原始文件名
    expect(manifestStr).not.toContain('sample.txt')
    expect(manifestStr).not.toContain('tests/fixtures')
    // 不包含明文内容
    expect(manifestStr).not.toContain('测试文本')
    expect(manifestStr).not.toContain('第一章')
    // shelf.title 是加密的 base64
    expect(manifest.shelf.title).not.toBe('第一章 测试文本')
  })

  it('round-trip decryption reproduces original text', async () => {
    const passwords = { gate: 'g', shelf: 's', book: 'round-trip-pw' }
    const slug = 'round-trip-book'
    const outputDir = path.join(tempDir, slug)
    const manifest = await encryptTxtFile(FIXTURE_PATH, slug, passwords, outputDir)

    // 用 bookSalt + book 密码派生 bookKey
    const bookSalt = Buffer.from(manifest.crypto.bookSalt, 'base64')
    const bookKey = deriveKey(passwords.book, bookSalt, manifest.crypto.iterations)

    // 解密所有段并拼接
    let decryptedText = ''
    for (const seg of manifest.segments) {
      const segPath = path.join(outputDir, seg.file)
      const ciphertextBase64 = await fs.readFile(segPath, 'utf-8')
      decryptedText += decryptTxtSegment(ciphertextBase64, bookKey, seg.iv)
    }

    // 读取原始文件
    const originalText = await fs.readFile(FIXTURE_PATH, 'utf-8')
    expect(decryptedText).toBe(originalText)
  })

  it('decrypts title and author fields correctly via shelfKey', async () => {
    const passwords = { gate: 'g', shelf: 'shelf-pw', book: 'b' }
    const outputDir = path.join(tempDir, 'field-test')
    const manifest = await encryptTxtFile(FIXTURE_PATH, 'field-test', passwords, outputDir, {
      title: '我的私密书名',
      author: '测试作者'
    })

    // 用 shelfSalt + shelf 密码派生 shelfKey
    const shelfSalt = Buffer.from(manifest.crypto.shelfSalt, 'base64')
    const shelfKey = deriveKey(passwords.shelf, shelfSalt, manifest.crypto.iterations)

    expect(decryptField(manifest.shelf.title, shelfKey)).toBe('我的私密书名')
    expect(decryptField(manifest.shelf.author!, shelfKey)).toBe('测试作者')
  })

  it('handles null author', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'no-author', PASSWORDS, path.join(tempDir, 'no-author'),
      { title: 'No Author Book' }
    )
    expect(manifest.shelf.author).toBeNull()
  })

  it('estimates reading time', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'test-book', PASSWORDS, path.join(tempDir, 'test-book')
    )
    expect(manifest.reading.estimatedTimeMin).toBeGreaterThan(0)
    expect(typeof manifest.reading.estimatedTimeMin).toBe('number')
  })

  it('gate token can be verified with gateKey', async () => {
    const manifest = await encryptTxtFile(
      FIXTURE_PATH, 'gate-test', PASSWORDS, path.join(tempDir, 'gate-test')
    )
    // 用 gateSalt + gate 密码派生 gateKey
    const gateSalt = Buffer.from(manifest.crypto.gateSalt, 'base64')
    const gateKey = deriveKey(PASSWORDS.gate, gateSalt, manifest.crypto.iterations)
    // gate.token 应该能解密为固定的验证字符串（不抛异常即说明密码正确）
    expect(() => decryptField(manifest.gate.token, gateKey)).not.toThrow()
  })
})
