import { describe, expect, it } from 'vitest'
import { scanArticles } from '../../scripts/kb/articles'
import { buildPublishManifest, validatePublishManifest } from '../../scripts/kb/publish-manifest'

describe('publish manifest', () => {
  it('contains only publishable public articles and approved encrypted payloads', async () => {
    const { articles } = await scanArticles()
    const manifest = await buildPublishManifest(articles)
    const issues = validatePublishManifest(manifest)

    expect(issues).toEqual([])
    expect(manifest.articles.length).toBeGreaterThan(0)
    expect(manifest.articles.every((item) => item.visibility === 'public')).toBe(true)
    expect(manifest.encryptedPayloads.map((item) => item.path)).toContain('content/encrypted/demo.json')
    const publishablePaths = JSON.stringify({ articles: manifest.articles, encryptedPayloads: manifest.encryptedPayloads })
    expect(publishablePaths).not.toContain('content/power/lessons/')
    expect(publishablePaths).not.toContain('content/motor/simulations/')
  })

  it('reports stale forbidden chunks in publish assets', async () => {
    const manifest = await buildPublishManifest([])

    expect(manifest.forbiddenAssetPatterns).toContain('content_motor_simulations')
    expect(manifest.forbiddenAssetPatterns).toContain('content_power_lessons')
  })
})
