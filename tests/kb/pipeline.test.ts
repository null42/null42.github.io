import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'

describe('knowledge base pipeline', () => {
  it('defines one-command validation and sync scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const pipeline = fs.readFileSync('scripts/kb/pipeline.ts', 'utf8')

    expect(pkg.scripts['kb:all']).toContain('pipeline')
    expect(pkg.scripts.build).toContain('kb:clean')
    expect(pkg.scripts['kb:clean']).toContain('clean-dist')
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

  it('documents and exposes article feedback comments', () => {
    const text = fs.readFileSync('docs/kb/comments.md', 'utf8')
    const component = fs.readFileSync('.vitepress/theme/components/GiscusComments.vue', 'utf8')

    expect(text).toContain('VITE_GISCUS_REPO')
    expect(text).toContain('Discussions')
    expect(text).toContain('comments: true')
    expect(component).toContain('const fallbackIssueUrl = computed(')
    expect(component).toContain('encodeURIComponent(term)')
    expect(component).toContain('留言')
  })

  it('documents frontmatter and folder conventions', () => {
    const text = fs.readFileSync('docs/kb/content-model.md', 'utf8')

    expect(text).toContain('chapterTitle')
    expect(text).toContain('suggestedTags')
    expect(text).toContain('content/private')
    expect(text).toContain('只补缺失字段')
  })

  it('runs sync-dist when invoked through tsx on Windows paths', async () => {
    const syncModule = await import('../../scripts/kb/sync-dist')
    const scriptPath = path.resolve('scripts/kb/sync-dist.ts')
    const syncSource = fs.readFileSync('scripts/kb/sync-dist.ts', 'utf8')

    expect(syncModule.isMainModule(pathToFileURL(scriptPath).href, scriptPath)).toBe(true)
    expect(syncSource).toContain('syncHtmlFiles')
    expect(syncSource).not.toContain('createLowercaseHtmlAliases')
  })
})
