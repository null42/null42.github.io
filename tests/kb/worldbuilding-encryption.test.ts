import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { decryptMarkdownForTest } from '../../scripts/kb/encrypt/encrypt'

describe('encrypted worldbuilding column', () => {
  it('publishes a wrapper and payload without a committed password', async () => {
    const wrapper = fs.readFileSync('content/encrypted/worldbuilding.md', 'utf8')
    const payloadText = fs.readFileSync('content/encrypted/worldbuilding.json', 'utf8')
    const payload = JSON.parse(payloadText)
    const generator = fs.readFileSync('scripts/kb/encrypt/worldbuilding.ts', 'utf8')

    expect(wrapper).toContain('visibility: encrypted')
    expect(wrapper).toContain('comments: false')
    expect(wrapper).toContain('<EncryptedArticle payload-url="/content/encrypted/worldbuilding.json" />')
    expect(payload.contentType).toBe('text/html')
    expect(generator).not.toContain("defaultPassword = '123456'")
    expect(generator).toContain('KB_WORLDBUILDING_PASSWORD')
    await expect(decryptMarkdownForTest(payload, '123456')).rejects.toThrow()
  })

  it('keeps the worldbuilding column out of public article indexes', async () => {
    const { articles } = await scanArticles()
    const publicPayload = JSON.stringify(articles)
    expect(publicPayload).not.toContain('worldbuilding')
  })

  it('links the encrypted worldbuilding column from the legacy navigation', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')
    expect(config).toContain("link: '/content/encrypted/worldbuilding.html'")
  })
})
