import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const userVisibleFiles = [
  '.vitepress/config.ts',
  '.vitepress/theme/components/ArchivePage.vue',
  '.vitepress/theme/components/GiscusComments.vue',
  'content/motor/getting-started.md',
  'content/power/getting-started.md'
]

describe('source encoding', () => {
  it('keeps user-visible source text as readable UTF-8', () => {
    for (const file of userVisibleFiles) {
      const text = fs.readFileSync(file, 'utf8')
      expect(text, file).not.toMatch(/(閻㈠灚|閹貉億闁汇垽|閸忔娊|缁旂姾|閺傚洨|鐢垫簮|鍏抽敭璇|鐣欒█)/)
      expect(text, file).not.toContain('\uFFFD')
    }

    expect(fs.readFileSync('.vitepress/config.ts', 'utf8')).toContain('lx的个人知识库')
    expect(fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')).toContain('关键词搜索')
    expect(fs.readFileSync('.vitepress/theme/components/GiscusComments.vue', 'utf8')).toContain('留言区会在配置 Giscus 后变成站内评论')
  })
})
