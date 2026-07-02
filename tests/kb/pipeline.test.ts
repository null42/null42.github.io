import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('knowledge base pipeline', () => {
  it('defines one-command validation and sync scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

    expect(pkg.scripts['kb:all']).toContain('kb:check')
    expect(pkg.scripts['kb:all']).toContain('npm test')
    expect(pkg.scripts['kb:sync']).toContain('sync-dist')
    expect(pkg.scripts['kb:inspect']).toContain('inspect-source')
    expect(pkg.scripts['kb:analyze']).toContain('suggest-tags')
  })

  it('documents Giscus setup for comments', () => {
    const text = fs.readFileSync('docs/kb/comments.md', 'utf8')

    expect(text).toContain('VITE_GISCUS_REPO')
    expect(text).toContain('Discussions')
    expect(text).toContain('comments: true')
  })
})
