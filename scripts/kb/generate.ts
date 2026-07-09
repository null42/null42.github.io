import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatedRoot } from './paths'
import { scanArticles } from './articles'
import { buildColumnFilterOptions, loadColumnRegistry } from './columns'
import { buildPublishManifest, writePublishManifest } from './publish-manifest'
import { assertSearchIndexWithinBudget, buildSearchIndex } from './search/build-index'
import type { ArticleRecord } from './types'

if (isMainModule()) {
  await generateIndexes()
}

export async function generateIndexes(): Promise<void> {
  const result = await scanArticles()
  const columnRegistry = await loadColumnRegistry()
  await fs.mkdir(generatedRoot, { recursive: true })

  const articles = result.articles.filter((article) => article.visibility === 'public')
  const categories = groupCounts(articles.map((article) => article.category))
  const tags = groupCounts(articles.flatMap((article) => article.tags))
  const archive = buildArchive(articles)
  const sidebar = buildSidebar(articles)
  const searchIndex = buildSearchIndex(articles)
  const columnOptions = buildColumnFilterOptions(columnRegistry, articles)
  const publishManifest = await buildPublishManifest(articles)
  assertSearchIndexWithinBudget(searchIndex)

  await fs.writeFile(path.join(generatedRoot, 'articles.json'), JSON.stringify(articles.map(toPublicArticleRecord), null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'tags.json'), JSON.stringify(tags, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'archive.json'), JSON.stringify(archive, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'columns.json'), JSON.stringify(columnOptions, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'sidebar.ts'), sidebar, 'utf8')
  await writePublishManifest(publishManifest, path.join(generatedRoot, 'publish-manifest.json'))

  console.log(`generated indexes for ${articles.length} public articles`)
}

export function groupCounts(values: string[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function buildArchive(articles: ArticleRecord[]): Array<{ month: string; count: number }> {
  return groupCounts(articles.map((article) => article.date.slice(0, 7))).map(({ name, count }) => ({
    month: name,
    count
  }))
}

export function buildSidebar(articles: ArticleRecord[]): string {
  const bySection = new Map<string, ArticleRecord[]>()
  for (const article of articles) {
    const key = article.section || article.category
    const list = bySection.get(key) || []
    list.push(article)
    bySection.set(key, list)
  }

  const sections = [...bySection.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([text, items]) => buildSection(text, items))

  return `export const generatedSidebar = ${JSON.stringify(sections, null, 2)}\n`
}

function buildSection(text: string, articles: ArticleRecord[]) {
  const withGroups = articles.filter((article) => article.navGroup)
  const withoutGroups = articles.filter((article) => !article.navGroup)

  if (withGroups.length > 0) {
    const byGroup = new Map<string, ArticleRecord[]>()
    for (const article of withGroups) {
      const key = article.navGroup || '未分组'
      const list = byGroup.get(key) || []
      list.push(article)
      byGroup.set(key, list)
    }

    const groups = [...byGroup.entries()]
      .sort(([, aItems], [, bItems]) => compareNavGroup(aItems, bItems))
      .map(([groupText, groupItems]) => ({
        text: groupText,
        collapsed: true,
        items: buildChapterItems(groupItems)
      }))

    return {
      text,
      collapsed: true,
      items: [...sortArticles(withoutGroups).map(articleLink), ...groups]
    }
  }

  return {
    text,
    collapsed: true,
    items: buildChapterItems(articles)
  }
}

function buildChapterItems(articles: ArticleRecord[]) {
  const withChapter = articles.filter((article) => article.chapter || article.chapterTitle)
  const withoutChapter = articles.filter((article) => !article.chapter && !article.chapterTitle)

  if (withChapter.length === 0) {
    return sortArticles(withoutChapter).map(articleLink)
  }

  const byChapter = new Map<string, ArticleRecord[]>()
  for (const article of withChapter) {
    const key = article.chapterTitle || article.chapter || '未分章'
    const list = byChapter.get(key) || []
    list.push(article)
    byChapter.set(key, list)
  }

  const chapters = [...byChapter.entries()]
    .sort(([, aItems], [, bItems]) => compareChapter(aItems, bItems))
    .map(([chapterText, chapterItems]) => ({
      text: chapterText,
      collapsed: true,
      items: sortArticles(chapterItems).map(articleLink)
    }))

  return [...sortArticles(withoutChapter).map(articleLink), ...chapters]
}

function compareNavGroup(aItems: ArticleRecord[], bItems: ArticleRecord[]): number {
  const a = aItems[0]
  const b = bItems[0]
  return compareNumbers(a.navGroupOrder, b.navGroupOrder) || String(a.navGroup).localeCompare(String(b.navGroup))
}

function compareChapter(aItems: ArticleRecord[], bItems: ArticleRecord[]): number {
  const a = aItems[0]
  const b = bItems[0]
  return compareNumbers(a.chapterOrder, b.chapterOrder) || String(a.chapter || a.chapterTitle).localeCompare(String(b.chapter || b.chapterTitle))
}

function sortArticles(articles: ArticleRecord[]): ArticleRecord[] {
  return [...articles].sort((a, b) =>
    compareNumbers(a.order, b.order)
    || comparePathSequence(a, b)
    || b.date.localeCompare(a.date)
    || a.title.localeCompare(b.title, 'zh-CN')
  )
}

function compareNumbers(a: number | undefined, b: number | undefined): number {
  if (a === undefined && b === undefined) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  return a - b
}

function comparePathSequence(a: ArticleRecord, b: ArticleRecord): number {
  const aKey = sequenceKey(a)
  const bKey = sequenceKey(b)
  if (!aKey && !bKey) return 0
  if (!aKey) return 1
  if (!bKey) return -1
  return compareNumbers(aKey.major, bKey.major)
    || compareNumbers(aKey.minor, bKey.minor)
    || aKey.kind - bKey.kind
    || a.path.localeCompare(b.path, 'zh-CN', { numeric: true, sensitivity: 'base' })
}

function sequenceKey(article: ArticleRecord): { major: number; minor: number; kind: number } | undefined {
  const filename = article.path.replace(/\\/g, '/').split('/').pop() || article.path
  if (/^(README|index)\.md$/i.test(filename)) return { major: -1, minor: 0, kind: 0 }
  const numbered = filename.match(/^(?:[A-Z]+(?:-[A-Z]+)?-)?(\d+)(?:[-_](\d+))?/i)
  if (!numbered) return undefined
  return {
    major: Number(numbered[1]),
    minor: numbered[2] ? Number(numbered[2]) : 0,
    kind: /(?:^|[-_])assessment(?:\.md)?$/i.test(filename) || /知识(?:检查|检验)/.test(article.title) ? 1 : 0
  }
}

function articleLink(article: ArticleRecord): { text: string; link: string } {
  return { text: article.title, link: article.url }
}

function toPublicArticleRecord(article: ArticleRecord): Omit<ArticleRecord, 'body'> {
  const { body: _body, ...publicRecord } = article
  return publicRecord
}

function isMainModule(): boolean {
  return process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false
}
