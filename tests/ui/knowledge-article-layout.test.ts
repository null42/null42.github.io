import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getStagePostNavigation } from '../../src/utils/knowledge-navigation'

const tree = [{ id: 'motor', title: 'Motor', routes: [{ id: 'control', title: 'Control', stages: [{ id: 'algorithm', title: 'Algorithm', articles: [
  { articleId: 'a', title: 'A', slug: 'a' }, { articleId: 'b', title: 'B', slug: 'b' },
] }, { id: 'advanced', title: 'Advanced', articles: [{ articleId: 'c', title: 'C', slug: 'c' }] }] }] }]

describe('knowledge article layout', () => {
  it('limits previous and next navigation to the current stage', () => {
    expect(getStagePostNavigation(tree, 'motor', 'control', 'algorithm', 'a')).toEqual({ previous: undefined, next: expect.objectContaining({ articleId: 'b' }) })
    expect(getStagePostNavigation(tree, 'motor', 'control', 'algorithm', 'b')).toEqual({ previous: expect.objectContaining({ articleId: 'a' }), next: undefined })
    expect(getStagePostNavigation(tree, 'motor', 'control', 'advanced', 'c')).toEqual({ previous: undefined, next: undefined })
  })

  it('integrates canonical breadcrumbs, tree slot, and stage navigation on real post pages', () => {
    const page = fs.readFileSync('src/pages/posts/[...slug].astro', 'utf8')
    expect(page).toContain('knowledgeSidebar={isKnowledgeArticle}')
    expect(page).toContain('<KnowledgeTree slot="knowledge-sidebar"')
    expect(page).toContain('<KnowledgeBreadcrumbs')
    expect(page).toContain('<StagePostNavigation')
    expect(page).toContain('entry.data.sectionId')
    expect(page).toContain('entry.data.routeId')
    expect(page).toContain('entry.data.stageId')
    expect(page).not.toMatch(/entry\.data\.(section|navGroup|chapter|stage)(?!Id|Title)/)
  })

  it('keeps the right TOC while replacing the left sidebar for knowledge articles', () => {
    const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
    expect(layout).toContain('knowledgeSidebar && Astro.slots.has("knowledge-sidebar")')
    expect(layout).toContain('<slot name="knowledge-sidebar"')
    expect(layout).toContain('id="article-toc-wrapper"')
  })
})
