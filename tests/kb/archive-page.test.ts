import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('archive page filters', () => {
  it('exposes section, chapter, tag, month, status, and type filters', () => {
    const text = fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')

    for (const label of ['栏目', '章节', '标签', '时间', '状态', '类型']) {
      expect(text).toContain(`aria-label="${label}"`)
    }
  })
})
