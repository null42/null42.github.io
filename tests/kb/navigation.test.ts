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

  it('keeps numbered chapter articles in path order when imported records share the same order', () => {
    const articles = [
      article({
        title: 'Power Path Overview',
        url: '/power-path.html',
        path: 'content/motor/power-path/README.md',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'power-path',
        chapterTitle: '功率链路',
        chapterOrder: 40,
        order: 20,
        date: '2026-07-02'
      }),
      article({
        title: 'PP-03: LLC',
        url: '/pp-03.html',
        path: 'content/motor/power-path/PP-03-LLC-Resonant-Converter.md',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'power-path',
        chapterTitle: '功率链路',
        chapterOrder: 40,
        order: 20,
        date: '2026-07-09'
      }),
      article({
        title: 'PP-01: Buck',
        url: '/pp-01.html',
        path: 'content/motor/power-path/PP-01-DCDC-Fundamental-Topologies.md',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'power-path',
        chapterTitle: '功率链路',
        chapterOrder: 40,
        order: 20,
        date: '2026-07-01'
      }),
      article({
        title: 'PP-01 知识检查',
        url: '/pp-01-check.html',
        path: 'content/motor/power-path/PP-01-assessment.md',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'power-path',
        chapterTitle: '功率链路',
        chapterOrder: 40,
        order: 20,
        date: '2026-07-10'
      }),
      article({
        title: 'PP-02: Flyback',
        url: '/pp-02.html',
        path: 'content/motor/power-path/PP-02-Isolated-DCDC-Flyback-Forward-PushPull.md',
        section: '电机控制',
        navGroup: '基础与硬件',
        navGroupOrder: 20,
        chapter: 'power-path',
        chapterTitle: '功率链路',
        chapterOrder: 40,
        order: 20,
        date: '2026-07-03'
      })
    ]

    const sidebar = buildSidebar(articles)

    expect(sidebar.indexOf('/power-path.html')).toBeLessThan(sidebar.indexOf('/pp-01.html'))
    expect(sidebar.indexOf('/pp-01.html')).toBeLessThan(sidebar.indexOf('/pp-01-check.html'))
    expect(sidebar.indexOf('/pp-01-check.html')).toBeLessThan(sidebar.indexOf('/pp-02.html'))
    expect(sidebar.indexOf('/pp-02.html')).toBeLessThan(sidebar.indexOf('/pp-03.html'))
  })

  it('keeps numbered learning workspace routes in file order', () => {
    const articles = [
      article({ title: '0003', url: '/0003.html', path: 'content/motor/learning-workspace/lessons/0003-hw.md', section: '电机控制', chapter: 'learning-workspace', chapterTitle: '学习工作区', order: 20, date: '2026-07-09' }),
      article({ title: '0001', url: '/0001.html', path: 'content/motor/learning-workspace/lessons/0001-ee.md', section: '电机控制', chapter: 'learning-workspace', chapterTitle: '学习工作区', order: 20, date: '2026-07-01' }),
      article({ title: '0002', url: '/0002.html', path: 'content/motor/learning-workspace/lessons/0002-ct.md', section: '电机控制', chapter: 'learning-workspace', chapterTitle: '学习工作区', order: 20, date: '2026-07-08' })
    ]

    const sidebar = buildSidebar(articles)

    expect(sidebar.indexOf('/0001.html')).toBeLessThan(sidebar.indexOf('/0002.html'))
    expect(sidebar.indexOf('/0002.html')).toBeLessThan(sidebar.indexOf('/0003.html'))
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
