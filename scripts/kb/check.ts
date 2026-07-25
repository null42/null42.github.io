import { scanArticles } from './articles'
import { loadColumnRegistry, validateColumnRegistry } from './columns'
import { normalizeMathDelimiters } from './markdown-rendering'
import { buildPublishManifest, validatePublishManifest } from './publish-manifest'
import { analyzeMarkdownRendering } from './render-health'
import fs from 'node:fs'
import path from 'node:path'
import { repoRoot } from './paths'

const result = await scanArticles()
for (const warning of result.warnings) {
  console.warn(`warning: ${warning}`)
}

const registry = await loadColumnRegistry()
const columnIssues = validateColumnRegistry(registry, result.articles)
const manifest = await buildPublishManifest(result.articles.filter((article) => article.visibility === 'public'))
const manifestIssues = validatePublishManifest(manifest)
const renderIssues = result.articles
  .filter((article) => article.visibility === 'public')
  .flatMap((article) => {
    const absolutePath = path.join(repoRoot, article.path)
    if (!fs.existsSync(absolutePath)) return []
    const report = analyzeMarkdownRendering(normalizeMathDelimiters(fs.readFileSync(absolutePath, 'utf8')), article.path)
    return report.issues.map((issue) => `${article.path}:${issue.line} ${issue.code}`)
  })

const publicCount = result.articles.filter((article) => article.visibility === 'public').length
console.log(`checked ${result.articles.length} indexed articles (${publicCount} public)`)
console.log(`checked ${registry.columns.length} column configs`)

const windowsAbsolutePath = /[a-z]:[\\/]/i
const reviewWarnings = result.warnings.filter((warning) => windowsAbsolutePath.test(warning) || warning.includes('visibility is private'))
if (reviewWarnings.length > 0) {
  console.warn(`review recommended for ${reviewWarnings.length} warnings`)
}

const blockingIssues = [
  ...columnIssues.map((issue) => `${issue.code}: ${issue.path || issue.columnId || issue.message}`),
  ...manifestIssues.map((issue) => `${issue.code}: ${issue.path || issue.message}`),
  ...renderIssues
]

if (blockingIssues.length > 0) {
  for (const issue of blockingIssues) console.error(`error: ${issue}`)
  process.exitCode = 1
}
