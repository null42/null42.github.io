import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { sortArticlesForLearning } from '../../.vitepress/theme/article-ranking'

describe('archive page filters', () => {
  it('exposes configured section, route, stage, and tag filters', () => {
    const text = fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')

    for (const label of ['栏目', '学习路线', '阶段', '标签']) {
      expect(text).toContain(`aria-label="${label}"`)
    }
    expect(text).not.toContain('aria-label="时间"')
    expect(text).not.toContain('aria-label="状态"')
    expect(text).not.toContain('aria-label="类型"')
  })

  it('surfaces learning-map shortcuts before the detailed filters', () => {
    const text = fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')
    const generated = JSON.parse(fs.readFileSync('.vitepress/generated/articles.json', 'utf8')) as Array<{ navGroup?: string }>

    expect(text).toContain('aria-label="学习地图快捷入口"')
    expect(text).toContain('const learningPaths = computed(')
    expect(text).toContain('selectLearningPath(item)')
    expect(text).toContain('全部路线')
    expect(generated.some((article) => article.navGroup === '控制与算法')).toBe(true)
  })

  it('orders default article lists by curated quality before imported notes', () => {
    const sorted = sortArticlesForLearning([
      { title: 'Imported New', date: '2026-07-03', quality: 'imported' },
      { title: 'Curated Old', date: '2026-06-30', quality: 'curated' },
      { title: 'Needs Rewrite', date: '2026-07-04', quality: 'needsRewrite' }
    ])

    expect(sorted.map((article) => article.title)).toEqual(['Curated Old', 'Imported New', 'Needs Rewrite'])
  })
})
