import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { buildSidebar } from '../../scripts/kb/generate'
import type { ArticleRecord } from '../../scripts/kb/types'

describe('chaptered sidebar', () => {
  it('groups canonical hierarchy records without legacy aliases', () => {
    const sidebar = buildSidebar([
      article({ sectionId: 'power', sectionTitle: 'Power', routeId: 'project', routeTitle: 'Projects', routeOrder: 20, stageId: 'build', stageTitle: 'Build', stageOrder: 10 }),
    ])

    expect(sidebar).toContain('"text": "Power"')
    expect(sidebar).toContain('"text": "Projects"')
    expect(sidebar).toContain('"text": "Build"')
  })
  it('keeps duplicate hierarchy titles separate by canonical IDs', () => {
    const source = buildSidebar([
      article({ sectionId: 'power-a', sectionTitle: 'Power', articleId: 'a' }),
      article({ sectionId: 'power-b', sectionTitle: 'Power', articleId: 'b' }),
    ])
    const sidebar = JSON.parse(source.replace(/^export const generatedSidebar = /, '')) as Array<{ text: string }>
    expect(sidebar).toHaveLength(2)
    expect(sidebar.map((item) => item.text)).toEqual(['Power', 'Power'])
  })
  it('groups articles by section and chapter order', () => {
    const articles = [
      article({ title: 'Current Loop', url: '/current.html', sectionId: 'power', sectionTitle: 'Power', stageId: '02-PFC', stageTitle: 'PFC', stageOrder: 20, order: 2 }),
      article({ title: 'Basics', url: '/basics.html', sectionId: 'power', sectionTitle: 'Power', stageId: '01-Basics', stageTitle: 'Basics', stageOrder: 10, order: 1 }),
      article({ title: 'FOC', url: '/foc.html', sectionId: 'motor', sectionTitle: 'Motor', stageId: '01-FOC', stageTitle: 'FOC', stageOrder: 10, order: 1 })
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
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'control', routeTitle: '控制与算法',
        routeOrder: 30,
        stageId: 'algorithm',
        stageTitle: '控制算法',
        stageOrder: 20
      }),
      article({
        title: 'Electronics',
        url: '/ee.html',
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'electronics-basics',
        stageTitle: '电力电子基础',
        stageOrder: 5
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
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'power-path',
        stageTitle: '功率链路',
        stageOrder: 40,
        order: 20,
        date: '2026-07-02'
      }),
      article({
        title: 'PP-03: LLC',
        url: '/pp-03.html',
        path: 'content/motor/power-path/PP-03-LLC-Resonant-Converter.md',
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'power-path',
        stageTitle: '功率链路',
        stageOrder: 40,
        order: 20,
        date: '2026-07-09'
      }),
      article({
        title: 'PP-01: Buck',
        url: '/pp-01.html',
        path: 'content/motor/power-path/PP-01-DCDC-Fundamental-Topologies.md',
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'power-path',
        stageTitle: '功率链路',
        stageOrder: 40,
        order: 20,
        date: '2026-07-01'
      }),
      article({
        title: 'PP-01 知识检查',
        url: '/pp-01-check.html',
        path: 'content/motor/power-path/PP-01-assessment.md',
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'power-path',
        stageTitle: '功率链路',
        stageOrder: 40,
        order: 20,
        date: '2026-07-10'
      }),
      article({
        title: 'PP-02: Flyback',
        url: '/pp-02.html',
        path: 'content/motor/power-path/PP-02-Isolated-DCDC-Flyback-Forward-PushPull.md',
        sectionId: 'motor', sectionTitle: '电机控制',
        routeId: 'hardware', routeTitle: '基础与硬件',
        routeOrder: 20,
        stageId: 'power-path',
        stageTitle: '功率链路',
        stageOrder: 40,
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
      article({ title: '0003', url: '/0003.html', path: 'content/motor/learning-workspace/lessons/0003-hw.md', sectionId: 'motor', sectionTitle: '电机控制', stageId: 'learning-workspace', stageTitle: '学习工作区', order: 20, date: '2026-07-09' }),
      article({ title: '0001', url: '/0001.html', path: 'content/motor/learning-workspace/lessons/0001-ee.md', sectionId: 'motor', sectionTitle: '电机控制', stageId: 'learning-workspace', stageTitle: '学习工作区', order: 20, date: '2026-07-01' }),
      article({ title: '0002', url: '/0002.html', path: 'content/motor/learning-workspace/lessons/0002-ct.md', sectionId: 'motor', sectionTitle: '电机控制', stageId: 'learning-workspace', stageTitle: '学习工作区', order: 20, date: '2026-07-08' })
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
    expect(home).toContain('/content/matlab-simulink/README.html')
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
  const record = {
    title: 'Article',
    date: '2026-07-01',
    category: 'General',
    tags: [],
    source: 'test',
    status: 'learning',
    visibility: 'public' as const,
    summary: '',
    path: 'article.md',
    url: '/article.html',
    body: '',
    ...overrides
  }
  return {
    ...record,
    articleId: record.articleId || 'article',
    sourcePath: record.sourcePath || 'content/article.md',
    slug: record.slug || 'article',
    order: record.order ?? Number.MAX_SAFE_INTEGER,
    explicitOrder: record.explicitOrder ?? false,
    publicSurface: record.publicSurface || 'full'
  }
}
