import fs from 'node:fs'
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

  it('groups large knowledge bases by learning path before chapters', () => {
    const articles = [
      article({
        title: 'FOC',
        url: '/foc.html',
        section: '电机控制',
        navGroup: '控制与算法',
        navGroupOrder: 30,
        chapter: 'algorithm',
        chapterTitle: '控制算法',
        chapterOrder: 20
      }),
      article({
        title: 'Electronics',
        url: '/ee.html',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'electronics-basics',
        chapterTitle: '电力电子基础',
        chapterOrder: 5
      })
    ]

    const sidebar = buildSidebar(articles)

    expect(sidebar.indexOf('"text": "基础与硬件"')).toBeLessThan(sidebar.indexOf('"text": "控制与算法"'))
    expect(sidebar.indexOf('"text": "电力电子基础"')).toBeGreaterThan(sidebar.indexOf('"text": "基础与硬件"'))
    expect(sidebar.indexOf('"text": "控制算法"')).toBeGreaterThan(sidebar.indexOf('"text": "控制与算法"'))
  })

  it('exposes learning-map routes on the home and motor entry pages', () => {
    const home = fs.readFileSync('index.md', 'utf8')
    const motorEntry = fs.readFileSync('content/motor/getting-started.md', 'utf8')
    const tools = fs.readFileSync('tools.md', 'utf8')
    const config = fs.readFileSync('.vitepress/config.ts', 'utf8')

    expect(home).toContain('kb-home-map')
    expect(home).toContain('## 推荐路线')
    expect(home).toContain('/content/motor/getting-started.html')
    expect(home).toContain('/content/power/getting-started.html')
    expect(home).toContain('/content/encrypted/demo.html')
    expect(tools).toContain('/content/encrypted/demo.html')
    expect(config).toContain("link: '/tools.html'")
    expect(config).not.toContain('location.replace(path.toLowerCase()')
    expect(config).toContain("'content/**/*.html'")
    expect(motorEntry).toContain('## 电机学习地图')
    expect(motorEntry).toContain('/content/motor/electronics-basics/')
    expect(motorEntry).toContain('/content/motor/algorithm/')
    expect(motorEntry).toContain('/content/motor/simulation/')
    expect(motorEntry).not.toContain('/content/motor/simulations/')
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
