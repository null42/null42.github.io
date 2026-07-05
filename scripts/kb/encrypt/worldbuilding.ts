import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { encryptMarkdown, renderEncryptedArticle } from './encrypt'

const defaultSourceDir = 'E:/gitee_CodeStorage/学习/旷世巨作的世界塑造'
const outputDir = 'content/encrypted'
const outputSlug = 'worldbuilding'
const defaultPassword = '123456'

const emojiPattern = /(?:[\u{1F000}-\u{1FAFF}]|[\u2600-\u27BF]\uFE0F?|\uFE0F|\u200D)/gu

export async function buildWorldbuildingMarkdown(sourceDir = defaultSourceDir): Promise<string> {
  const files = await listMarkdownFiles(sourceDir)
  const sections: string[] = [
    '# 世界塑造文档',
    '',
    '> 这些文档来自本地世界塑造资料夹。目录和正文均放在加密 payload 中，公开页面不暴露明文。',
    ''
  ]

  let currentGroup = ''
  for (const file of files) {
    const relativePath = toPosixPath(path.relative(sourceDir, file))
    const group = relativePath.split('/')[0] || '未分组'
    if (group !== currentGroup) {
      currentGroup = group
      sections.push(`## ${group}`, '')
    }

    const title = path.basename(file, path.extname(file))
    const raw = await fs.readFile(file, 'utf8')
    sections.push(`### ${title}`, '', `> 来源：${relativePath}`, '', stripEmoji(raw).trim(), '')
  }

  return sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

export async function encryptWorldbuildingColumn(options: { sourceDir?: string; password?: string; date?: string } = {}): Promise<string[]> {
  const sourceDir = options.sourceDir || process.env.KB_WORLDBUILDING_SOURCE || defaultSourceDir
  const password = options.password || process.env.KB_WORLDBUILDING_PASSWORD || defaultPassword
  const date = options.date || new Date().toISOString().slice(0, 10)
  const markdown = await buildWorldbuildingMarkdown(sourceDir)
  const payload = await encryptMarkdown(markdown, password)
  const payloadFile = `${outputSlug}.json`

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, payloadFile), JSON.stringify(payload, null, 2), 'utf8')
  await fs.writeFile(
    path.join(outputDir, `${outputSlug}.md`),
    renderEncryptedArticle({
      title: '世界塑造',
      slug: outputSlug,
      payloadFile,
      payload,
      date
    }),
    'utf8'
  )

  return [path.join(outputDir, `${outputSlug}.md`), path.join(outputDir, payloadFile)]
}

async function listMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files.sort((a, b) => toPosixPath(path.relative(root, a)).localeCompare(toPosixPath(path.relative(root, b)), 'zh-CN'))
}

function stripEmoji(value: string): string {
  return value.replace(emojiPattern, '')
}

function toPosixPath(value: string): string {
  return value.replace(/\\/g, '/')
}

function isCliEntrypoint(): boolean {
  return process.argv[1] ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) : false
}

if (isCliEntrypoint()) {
  encryptWorldbuildingColumn().then((written) => {
    console.log(`encrypted worldbuilding column: ${written.join(', ')}`)
  }).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
