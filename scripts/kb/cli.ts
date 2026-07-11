import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { fileURLToPath } from 'node:url'
import { scanArticles } from './articles'
import { buildColumnFilterOptions, loadColumnRegistry, validateColumnRegistry } from './columns'
import { normalizeMathDelimiters } from './markdown-rendering'
import { buildPublishManifest, validatePublishManifest } from './publish-manifest'
import { analyzeMarkdownRendering, type RenderHealthIssue } from './render-health'
import { repoRoot } from './paths'

export interface CliMenuItem {
  key: string
  label: string
  command: string
}

export interface CliResult {
  code: number
  dryRun?: boolean
  messages: string[]
  issues?: string[]
}

const menu: CliMenuItem[] = [
  { key: '1', label: '新建文章', command: 'new' },
  { key: '2', label: '管理栏目', command: 'columns' },
  { key: '3', label: '导入内容', command: 'import' },
  { key: '4', label: '重排路线', command: 'reorder' },
  { key: '5', label: '加密文章', command: 'encrypt' },
  { key: '6', label: '渲染体检', command: 'render:check' },
  { key: '7', label: '发布上线', command: 'publish --dry-run' }
]

export function getCliMenu(): CliMenuItem[] {
  return menu
}

export async function runCliCommand(args: string[]): Promise<CliResult> {
  const [command, ...rest] = args
  if (!command) return showMenuResult()
  if (command === 'validate') return validateCommand(rest.includes('--ci'))
  if (command === 'render:check') return renderCheckCommand()
  if (command === 'content:audit') return contentAuditCommand()
  if (command === 'publish') return publishCommand(rest.includes('--dry-run'))
  if (['new', 'columns', 'import', 'reorder', 'encrypt'].includes(command)) {
    return {
      code: 0,
      dryRun: true,
      messages: [`${command} 当前以 dry-run 方式开放；请先通过交互菜单确认目标，再执行具体脚本。`]
    }
  }
  return { code: 1, messages: [`未知命令：${command}`] }
}

async function validateCommand(ci: boolean): Promise<CliResult> {
  const messages: string[] = []
  const issues: string[] = []
  const registry = await loadColumnRegistry()
  const { articles, warnings } = await scanArticles()
  const columnIssues = validateColumnRegistry(registry, articles)
  const manifest = await buildPublishManifest(articles.filter((article) => article.visibility === 'public'))
  const manifestIssues = validatePublishManifest(manifest)
  const renderIssues = collectRenderIssues(articles)

  issues.push(...columnIssues.map((issue) => `${issue.code}: ${issue.path || issue.columnId || issue.message}`))
  issues.push(...manifestIssues.map((issue) => `${issue.code}: ${issue.path || issue.message}`))
  issues.push(...renderIssues.map((issue) => `${issue.path}:${issue.issue.line} ${issue.issue.code}`))

  messages.push(`文章：${articles.length}`)
  messages.push(`栏目：${registry.columns.length}`)
  messages.push(`筛选项：${buildColumnFilterOptions(registry, articles).sections.length} 个栏目`)
  if (!ci && warnings.length > 0) messages.push(`提示：${warnings.length} 条普通警告`)

  return {
    code: issues.length === 0 ? 0 : 1,
    messages,
    issues
  }
}

async function renderCheckCommand(): Promise<CliResult> {
  const { articles } = await scanArticles()
  const issues = collectRenderIssues(articles).map((item) => `${item.path}:${item.issue.line} ${item.issue.code}`)
  return {
    code: issues.length === 0 ? 0 : 1,
    messages: [`检查 ${articles.length} 篇公开文章的 Markdown 渲染健康。`],
    issues
  }
}

async function contentAuditCommand(): Promise<CliResult> {
  const registry = await loadColumnRegistry()
  const { articles } = await scanArticles()
  const quality = countBy(articles.map((article) => String(article.quality || 'unknown')))
  const sections = buildColumnFilterOptions(registry, articles).sections
  return {
    code: 0,
    messages: [
      `公开文章：${articles.length}`,
      `公开栏目：${sections.map((item) => `${item.label} ${item.count}`).join(' / ')}`,
      `质量分布：${[...quality.entries()].map(([name, count]) => `${name} ${count}`).join(' / ')}`
    ]
  }
}

async function publishCommand(dryRun: boolean): Promise<CliResult> {
  const validation = await validateCommand(true)
  if (validation.code !== 0) return { ...validation, dryRun }
  if (dryRun) {
    return {
      code: 0,
      dryRun: true,
      messages: ['dry-run：将执行 Astro 生产构建，当前校验未发现阻断项。']
    }
  }

  const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
  execFileSync(command, ['build'], { cwd: repoRoot, stdio: 'inherit' })
  return {
    code: 0,
    dryRun: false,
    messages: ['Astro 生产构建完成。请检查 dist 和 git status，确认后手动提交并推送。']
  }
}

function collectRenderIssues(articles: Awaited<ReturnType<typeof scanArticles>>['articles']): Array<{ path: string; issue: RenderHealthIssue }> {
  const issues: Array<{ path: string; issue: RenderHealthIssue }> = []
  for (const article of articles.filter((item) => item.visibility === 'public')) {
    if (!fs.existsSync(path.join(repoRoot, article.path))) continue
    const markdown = fs.readFileSync(path.join(repoRoot, article.path), 'utf8')
    const report = analyzeMarkdownRendering(normalizeMathDelimiters(markdown), article.path)
    issues.push(...report.issues.map((issue) => ({ path: article.path, issue })))
  }
  return issues
}

function countBy(values: string[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1)
  return counts
}

function showMenuResult(): CliResult {
  return {
    code: 0,
    messages: [
      '知识库管理菜单',
      ...menu.map((item) => `${item.key}. ${item.label} -> ${item.command}`)
    ]
  }
}

async function runInteractiveMenu(): Promise<CliResult> {
  const rl = readline.createInterface({ input, output })
  try {
    console.log('知识库管理菜单')
    for (const item of menu) console.log(`${item.key}. ${item.label}`)
    const choice = await rl.question('请选择操作编号：')
    const item = menu.find((entry) => entry.key === choice.trim())
    if (!item) return { code: 1, messages: ['未识别的菜单项。'] }
    return runCliCommand(item.command.split(/\s+/))
  } finally {
    rl.close()
  }
}

function isMainModule(): boolean {
  return process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false
}

async function main(): Promise<void> {
  const result = process.argv.length > 2
    ? await runCliCommand(process.argv.slice(2))
    : await runInteractiveMenu()
  for (const message of result.messages) console.log(message)
  for (const issue of result.issues || []) console.error(issue)
  if (result.code !== 0) process.exitCode = result.code
}

if (isMainModule()) {
  void main()
}
