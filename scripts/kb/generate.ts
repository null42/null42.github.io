import fs from 'node:fs/promises'
import path from 'node:path'
import { generatedRoot } from './paths'
import { scanArticles } from './articles'
import type { ArticleRecord } from './types'

const result = await scanArticles()
await fs.mkdir(generatedRoot, { recursive: true })

const articles = result.articles.filter((article) => article.visibility === 'public')
const categories = groupCounts(articles.map((article) => article.category))
const tags = groupCounts(articles.flatMap((article) => article.tags))
const archive = buildArchive(articles)
const sidebar = buildSidebar(articles)

await fs.writeFile(path.join(generatedRoot, 'articles.json'), JSON.stringify(articles, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'tags.json'), JSON.stringify(tags, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'archive.json'), JSON.stringify(archive, null, 2), 'utf8')
await fs.writeFile(path.join(generatedRoot, 'sidebar.ts'), sidebar, 'utf8')

console.log(`generated indexes for ${articles.length} public articles`)

function groupCounts(values: string[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

function buildArchive(articles: ArticleRecord[]): Array<{ month: string; count: number }> {
  return groupCounts(articles.map((article) => article.date.slice(0, 7))).map(({ name, count }) => ({
    month: name,
    count
  }))
}

function buildSidebar(articles: ArticleRecord[]): string {
  const byCategory = new Map<string, ArticleRecord[]>()
  for (const article of articles) {
    const list = byCategory.get(article.category) || []
    list.push(article)
    byCategory.set(article.category, list)
  }

  const sections = [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([text, items]) => ({
      text,
      collapsed: true,
      items: items.map((article) => ({ text: article.title, link: article.url }))
    }))

  return `export const generatedSidebar = ${JSON.stringify(sections, null, 2)}\n`
}
