import { describe, expect, it } from 'vitest'
import { buildSidebar } from '../../scripts/kb/generate'
import type { ArticleRecord } from '../../scripts/kb/types'

describe('chaptered sidebar', () => {
  it('groups articles by section and chapter order', () => {
    const articles = [
      article({ title: 'Current Loop', url: '/current.html', section: 'Power', chapter: '02-PFC', chapterTitle: 'PFC', chapterOrder: 20, order: 2 }),
      article({ title: 'Basics', url: '/basics.html', section: 'Power', chapter: '01-Basics', chapterTitle: 'Basics', chapterOrder: 10, order: 1 }),
      article({ title: 'FOC', url: '/foc.html', section: 'Motor', chapter: '01-FOC', chapterTitle: 'FOC', chapterOrder: 10, order: 1 })
    ]

    const sidebar = buildSidebar(articles)

    expect(sidebar).toContain('"text": "Power"')
    expect(sidebar.indexOf('"text": "Basics"')).toBeLessThan(sidebar.indexOf('"text": "PFC"'))
    expect(sidebar).toContain('"text": "Motor"')
    expect(sidebar).toContain('"link": "/current.html"')
  })
})

function article(overrides: Partial<ArticleRecord>): ArticleRecord {
  return {
    title: 'Article',
    date: '2026-07-01',
    category: 'General',
    tags: [],
    source: 'test',
    status: 'learning',
    visibility: 'public',
    summary: '',
    path: 'article.md',
    url: '/article.html',
    body: '',
    ...overrides
  }
}
