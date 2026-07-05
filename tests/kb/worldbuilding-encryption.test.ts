import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { decryptMarkdownForTest } from '../../scripts/kb/encrypt/encrypt'

describe('encrypted worldbuilding column', () => {
  it('publishes one encrypted wrapper and payload for the worldbuilding documents', async () => {
    const wrapper = fs.readFileSync('content/encrypted/worldbuilding.md', 'utf8')
    const payloadText = fs.readFileSync('content/encrypted/worldbuilding.json', 'utf8')
    const payload = JSON.parse(payloadText)

    expect(wrapper).toContain('title: 世界塑造')
    expect(wrapper).toContain('visibility: encrypted')
    expect(wrapper).toContain('comments: false')
    expect(wrapper).toContain('<EncryptedArticle payload-url="/content/encrypted/worldbuilding.json" />')
    expect(wrapper).not.toContain('烬世余火')
    expect(wrapper).not.toContain('123456')
    expect(payloadText).not.toContain('烬世余火')
    expect(payloadText).not.toContain('核心设定')

    const decrypted = await decryptMarkdownForTest(payload, '123456')
    const emojiPattern = /(?:[\u{1F000}-\u{1FAFF}]|[\u2600-\u27BF]\uFE0F?|\uFE0F|\u200D)/gu
    expect(decrypted).toContain('# 世界塑造文档')
    expect(decrypted).toContain('## 核心设定')
    expect(decrypted).toContain('烬世余火')
    expect(decrypted.match(emojiPattern) || []).toEqual([])
  })

  it('keeps the worldbuilding column out of public article indexes', async () => {
    const { articles } = await scanArticles()
    const publicPayload = JSON.stringify(articles)

    expect(publicPayload).not.toContain('worldbuilding')
    expect(publicPayload).not.toContain('烬世余火')
  })

  it('links the encrypted worldbuilding column from the main navigation', () => {
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(config).toContain("text: '世界塑造'")
    expect(config).toContain("link: '/content/encrypted/worldbuilding.html'")
  })
})
