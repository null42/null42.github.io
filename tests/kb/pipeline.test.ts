import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('knowledge base pipeline', () => {
  it('defines one-command validation and sync scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const pipeline = fs.readFileSync('scripts/kb/pipeline.ts', 'utf8')

    expect(pkg.scripts['kb:all']).toContain('pipeline')
    expect(pipeline).toContain('scripts/kb/migrate.ts')
    expect(pipeline).toContain('--apply')
    expect(pkg.scripts['kb:sync']).toContain('sync-dist')
    expect(pkg.scripts['kb:inspect']).toContain('inspect-source')
    expect(pkg.scripts['kb:analyze']).toContain('suggest-tags')
    expect(pkg.scripts['kb:deploy']).toContain('deploy')
  })

  it('does not overwrite migrated articles during one-command sync', () => {
    const migrate = fs.readFileSync('scripts/kb/migrate.ts', 'utf8')

    expect(migrate).toContain('shouldWriteTarget')
    expect(migrate).toContain('fs.access(to)')
    expect(migrate).toContain('--overwrite')
  })

  it('documents Giscus setup for comments', () => {
    const text = fs.readFileSync('docs/kb/comments.md', 'utf8')

    expect(text).toContain('VITE_GISCUS_REPO')
    expect(text).toContain('Discussions')
    expect(text).toContain('comments: true')
  })

  it('documents frontmatter and folder conventions', () => {
    const text = fs.readFileSync('docs/kb/content-model.md', 'utf8')

    expect(text).toContain('chapterTitle')
    expect(text).toContain('suggestedTags')
    expect(text).toContain('content/private')
    expect(text).toContain('只补缺失字段')
  })
})
