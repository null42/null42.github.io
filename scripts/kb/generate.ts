import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatedRoot } from './paths'
import { scanArticles } from './articles'
import { buildSearchIndex } from './search/build-index'
import type { ArticleRecord } from './types'

if (isMainModule()) {
  await generateIndexes()
}

export async function generateIndexes(): Promise<void> {
  const result = await scanArticles()
  await fs.mkdir(generatedRoot, { recursive: true })

  const articles = result.articles.filter((article) => article.visibility === 'public')
  const categories = groupCounts(articles.map((article) => article.category))
  const tags = groupCounts(articles.flatMap((article) => article.tags))
  const archive = buildArchive(articles)
  const sidebar = buildSidebar(articles)
  const searchIndex = buildSearchIndex(articles)

  await fs.writeFile(path.join(generatedRoot, 'articles.json'), JSON.stringify(articles, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'tags.json'), JSON.stringify(tags, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'archive.json'), JSON.stringify(archive, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8')
  await fs.writeFile(path.join(generatedRoot, 'sidebar.ts'), sidebar, 'utf8')

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
  const withChapter = articles.filter((article) => article.chapter || article.chapterTitle)
  const withoutChapter = articles.filter((article) => !article.chapter && !article.chapterTitle)

  if (withChapter.length === 0) {
    return {
      text,
      collapsed: true,
      items: sortArticles(withoutChapter).map(articleLink)
    }
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

  return {
    text,
    collapsed: true,
    items: [...chapters, ...sortArticles(withoutChapter).map(articleLink)]
  }
}

function compareChapter(aItems: ArticleRecord[], bItems: ArticleRecord[]): number {
  const a = aItems[0]
  const b = bItems[0]
  return compareNumbers(a.chapterOrder, b.chapterOrder) || String(a.chapter || a.chapterTitle).localeCompare(String(b.chapter || b.chapterTitle))
}

function sortArticles(articles: ArticleRecord[]): ArticleRecord[] {
  return [...articles].sort((a, b) => compareNumbers(a.order, b.order) || b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

function compareNumbers(a: number | undefined, b: number | undefined): number {
  if (a === undefined && b === undefined) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  return a - b
}

function articleLink(article: ArticleRecord): { text: string; link: string } {
  return { text: article.title, link: article.url }
}

function isMainModule(): boolean {
  return process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false
}
