import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { decryptMarkdownForTest, encryptMarkdown, renderEncryptedArticle } from '../../scripts/kb/encrypt/encrypt'
import { copyEncryptedPayloadsToDist } from '../../scripts/kb/encrypt/publish-payloads'

describe('encrypted articles', () => {
  it('encrypts markdown without storing plaintext in the payload', async () => {
    const payload = await encryptMarkdown('secret project note: current-loop tuning', 'passphrase')

    expect(JSON.stringify(payload)).not.toContain('secret project note')
    expect(payload.algorithm).toBe('AES-GCM')
    expect(await decryptMarkdownForTest(payload, 'passphrase')).toBe('secret project note: current-loop tuning')
    await expect(decryptMarkdownForTest(payload, 'wrong-password')).rejects.toThrow()
  })

  it('renders a public encrypted wrapper without plaintext body content', async () => {
    const payload = await encryptMarkdown('private body should not leak', 'passphrase')
    const page = renderEncryptedArticle({
      title: 'Private Power Note',
      slug: 'private-power-note',
      payloadFile: 'private-power-note.json',
      payload,
      date: '2026-07-01'
    })

    expect(page).toContain('visibility: encrypted')
    expect(page).toContain('<EncryptedArticle')
    expect(page).not.toContain('private body should not leak')
  })

  it('copies encrypted payload json files into the built dist tree', async () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-encrypted-payloads-'))
    const sourceDir = path.join(temp, 'content', 'encrypted')
    const distDir = path.join(temp, 'dist')
    fs.mkdirSync(sourceDir, { recursive: true })
    fs.writeFileSync(path.join(sourceDir, 'demo.json'), '{"ciphertext":"safe"}', 'utf8')

    await copyEncryptedPayloadsToDist({
      sourceDir,
      distDir
    })

    expect(fs.readFileSync(path.join(distDir, 'content', 'encrypted', 'demo.json'), 'utf8')).toBe('{"ciphertext":"safe"}')
  })

  it('publishes a safe encrypted demo wrapper without leaking plaintext payload', () => {
    const wrapper = fs.readFileSync('content/encrypted/demo.md', 'utf8')
    const payload = fs.readFileSync('content/encrypted/demo.json', 'utf8')

    expect(wrapper).toContain('visibility: encrypted')
    expect(wrapper).toContain('comments: false')
    expect(wrapper).toContain('演示密码：demo-knowledge')
    expect(wrapper).toContain('<EncryptedArticle payload-url="/content/encrypted/demo.json" />')
    expect(payload).not.toContain('这是一篇无敏感信息的加密演示')
    expect(payload).not.toContain('demo-knowledge')
  })

  it('shows encrypted article input, success, and wrong-password states', () => {
    const component = fs.readFileSync('.vitepress/theme/components/EncryptedArticle.vue', 'utf8')

    expect(component).toContain('等待输入密码')
    expect(component).toContain('解密成功')
    expect(component).toContain('密码不正确')
    expect(component).toContain('window.crypto.subtle')
    expect(component).toContain('XMLHttpRequest')
    expect(component).not.toContain('window.fetch')
    expect(component).not.toContain('window.atob')
    expect(component).toContain('@noble/ciphers/aes.js')
    expect(component).toContain('@noble/hashes/pbkdf2.js')
  })
})
