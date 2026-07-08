import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getCliMenu, runCliCommand } from '../../scripts/kb/cli'

describe('knowledge base CLI', () => {
  it('is exposed as npm run kb and shows the fixed management menu', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const labels = getCliMenu().map((item) => item.label)

    expect(packageJson.scripts.kb).toBe('tsx scripts/kb/cli.ts')
    expect(labels).toEqual(['新建文章', '管理栏目', '导入内容', '重排路线', '加密文章', '渲染体检', '发布上线'])
  })

  it('supports CI validation and dry-run publish commands', async () => {
    await expect(runCliCommand(['validate', '--ci'])).resolves.toMatchObject({ code: 0 })
    await expect(runCliCommand(['publish', '--dry-run'])).resolves.toMatchObject({ code: 0, dryRun: true })
  })
})
