import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('archive page filters', () => {
  it('exposes section, chapter, tag, month, status, and type filters', () => {
    const text = fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')

    for (const label of ['栏目', '学习路径', '章节', '标签', '时间', '状态', '类型']) {
      expect(text).toContain(`aria-label="${label}"`)
    }
  })

  it('surfaces learning-map shortcuts before the detailed filters', () => {
    const text = fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')
    const generated = JSON.parse(fs.readFileSync('.vitepress/generated/articles.json', 'utf8')) as Array<{ navGroup?: string }>

    expect(text).toContain('aria-label="学习地图快捷入口"')
    expect(text).toContain('const learningPaths = computed(')
    expect(text).toContain('selectLearningPath(item)')
    expect(text).toContain('全部路径')
    expect(generated.some((article) => article.navGroup === '控制与算法')).toBe(true)
  })
})
