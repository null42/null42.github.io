import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('search page experience', () => {
  it('uses learning-map filters and anchored result URLs', () => {
    const text = fs.readFileSync('.vitepress/theme/components/SearchPage.vue', 'utf8')

    for (const label of ['栏目', '学习路线', '阶段', '标签']) {
      expect(text).toContain(`aria-label="${label}"`)
      expect(text).toContain(`<span class="kb-filter-label">${label}</span>`)
    }
    expect(text).not.toContain('aria-label="时间"')
    expect(text).toContain(':href="result.url"')
    expect(text).toContain('result.matchReason')
    expect(text).toContain('kb-search-map')
    expect(text).toContain('sectionId: selectedColumnId.value')
    expect(text).toContain('routeId: selectedRouteId.value')
    expect(text).toContain('result.record.stageTitle')
    expect(text).not.toMatch(/result\.record\.(?:section|navGroup|chapter)\b/)
    expect(text).toContain(':value="item.columnId || item.id"')
    expect(text).toContain(':value="item.routeId || item.id"')
    expect(text).toContain(':value="item.stageId || item.id"')
    expect(text).toContain('result.record.articleId')
    expect(text).not.toContain('result.record.url}-${result.anchor')
  })

  it('supports opening the page with an initial query from the URL', () => {
    const text = fs.readFileSync('.vitepress/theme/components/SearchPage.vue', 'utf8')

    expect(text).toContain("new URLSearchParams(window.location.search).get('q')")
    expect(text).toContain('onMounted')
    expect(text.indexOf("new URLSearchParams(window.location.search).get('q')")).toBeLessThan(text.indexOf("import('../../generated/search-index.json')"))
    expect(text).toContain('loading')
  })
})
