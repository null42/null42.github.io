import { describe, expect, it } from 'vitest'
import { decryptMarkdownForTest, encryptMarkdown, renderEncryptedArticle } from '../../scripts/kb/encrypt/encrypt'

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
})
