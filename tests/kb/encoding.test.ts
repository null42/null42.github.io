import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const userVisibleFiles = [
  '.vitepress/config.ts',
  '.vitepress/theme/components/ArchivePage.vue'
]

describe('source encoding', () => {
  it('keeps user-visible source text as readable UTF-8', () => {
    for (const file of userVisibleFiles) {
      const text = fs.readFileSync(file, 'utf8')
      expect(text, file).not.toMatch(/[鐢鍏鏂鎼绡]/)
    }

    expect(fs.readFileSync('.vitepress/config.ts', 'utf8')).toContain('lx的个人知识库')
    expect(fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')).toContain('关键词搜索')
  })
})
