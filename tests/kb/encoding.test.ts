import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const userVisibleFiles = [
  '.vitepress/config.ts',
  '.vitepress/theme/components/ArchivePage.vue',
  '.vitepress/theme/components/GiscusComments.vue',
  '.vitepress/theme/components/SearchPage.vue',
  'scripts/kb/cli.ts',
  'scripts/kb/search/build-index.ts',
  'content/motor/getting-started.md',
  'content/power/getting-started.md'
]

const mojibakePattern = /(鏂板缓|绠＄悊|瀵煎叆|閲嶆帓|鍔犲瘑|娓叉煋|鍙戝竷|鐭ヨ瘑|鍏抽敭|鐣欒█|锛|閻㈠灚|閹貉億闁汇垽|閸忔娊|缁旂姾|閺傚洨|鐢垫簮)/

describe('source encoding', () => {
  it('keeps user-visible source text as readable UTF-8', () => {
    for (const file of userVisibleFiles) {
      const text = fs.readFileSync(file, 'utf8')
      expect(text, file).not.toMatch(mojibakePattern)
      expect(text, file).not.toContain('\uFFFD')
    }

    expect(fs.readFileSync('.vitepress/config.ts', 'utf8')).toContain('lx的个人知识库')
    expect(fs.readFileSync('.vitepress/theme/components/ArchivePage.vue', 'utf8')).toContain('关键词搜索')
    expect(fs.readFileSync('.vitepress/theme/components/SearchPage.vue', 'utf8')).toContain('全文搜索')
    expect(fs.readFileSync('scripts/kb/search/build-index.ts', 'utf8')).toContain('章节命中')
    expect(fs.readFileSync('.vitepress/theme/components/GiscusComments.vue', 'utf8')).toContain('留言区会在配置 Giscus 后变成站内评论')
    expect(fs.readFileSync('scripts/kb/cli.ts', 'utf8')).toContain('知识库管理菜单')
  })
})
