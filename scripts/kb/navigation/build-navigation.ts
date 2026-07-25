import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanArticles } from '../articles'
import { loadColumnRegistry } from '../columns'
import type { CanonicalArticleRecord } from '../domain/article-record'
import { buildNavigationTree } from '../domain/navigation'
import type { NavigationSection, NavigationSectionConfig } from '../domain/navigation'
import { repoRoot } from '../paths'

export interface NavigationCoverage {
  counts: { sections: number; routes: number; stages: number; articles: number }
  relationships: { sections: Array<{ id: string }>; routes: Array<{ id: string; sectionId: string }>; stages: Array<{ id: string; sectionId: string; routeId: string }>; articles: Array<{ id: string; sectionId: string; routeId: string; stageId: string }> }
  mappedArticleIds: string[]
  baseline: { expected: number; mapped: number; missing: string[]; unexpected: string[] }
  issues: { orphan: string[]; duplicate: string[]; unknown: string[]; crossParent: string[]; empty: string[] }
}

interface BaselineArticle {
  articleId: string
  sectionId?: string
  visibility: string
}

export function createNavigationArtifacts(sections: NavigationSectionConfig[], records: CanonicalArticleRecord[], baselineArticleIds: string[]) {
  const navigation = buildNavigationTree(sections, records)
  const mappedArticleIds = navigation.flatMap((section) => section.routes.flatMap((route) => route.stages.flatMap((stage) => stage.articles.map((item) => item.articleId))))
  const expected = [...new Set(baselineArticleIds)].sort()
  const mapped = [...new Set(mappedArticleIds)].sort()
  const coverage: NavigationCoverage = {
    counts: countTree(navigation), relationships: relationships(navigation), mappedArticleIds,
    baseline: { expected: expected.length, mapped: mapped.length, missing: expected.filter((id) => !mapped.includes(id)), unexpected: mapped.filter((id) => !expected.includes(id)) },
    issues: { orphan: [], duplicate: duplicates(mappedArticleIds), unknown: [], crossParent: [], empty: [] },
  }
  return { navigation, coverage }
}

export function validateNavigationCoverage(coverage: NavigationCoverage): string[] {
  const issues: string[] = []
  if (coverage.baseline.missing.length) issues.push(`Missing mappings: ${coverage.baseline.missing.join(', ')}`)
  if (coverage.baseline.unexpected.length) issues.push(`Unexpected mappings: ${coverage.baseline.unexpected.join(', ')}`)
  const duplicateMappings = duplicates(coverage.mappedArticleIds)
  if (duplicateMappings.length) issues.push(`Duplicate mappings: ${duplicateMappings.join(', ')}`)
  return issues
}

export function selectExpectedArticleIds(articles: BaselineArticle[], sectionIds: Set<string>): string[] {
  return articles
    .filter((article) => article.visibility === 'public' && article.sectionId !== undefined && sectionIds.has(article.sectionId))
    .map((article) => article.articleId)
}

export async function generateNavigationArtifacts(): Promise<NavigationCoverage> {
  const registry = await loadColumnRegistry()
  const { articles } = await scanArticles({ includeHidden: true })
  const sections: NavigationSectionConfig[] = registry.columns
    .filter((column) => column.layout === 'map' && column.visibility === 'public')
    .map((column) => ({
      id: column.id,
      title: column.section || column.title,
      order: column.order,
      routes: column.routes,
      stages: column.stages,
    }))
  const knowledgeArticles = articles.filter((article) => article.sectionId || article.routeId || article.stageId) as CanonicalArticleRecord[]
  const baseline = JSON.parse(await fs.readFile(path.join(repoRoot, 'reports/migration-baseline.json'), 'utf8')) as {
    articles: BaselineArticle[]
  }
  const sectionIds = new Set(sections.map((section) => section.id))
  const expectedArticleIds = selectExpectedArticleIds(baseline.articles, sectionIds)
  const artifacts = createNavigationArtifacts(sections, knowledgeArticles, expectedArticleIds)
  const issues = validateNavigationCoverage(artifacts.coverage)
  if (issues.length) throw new Error(issues.join('\n'))
  await fs.mkdir(path.join(repoRoot, 'src/generated'), { recursive: true })
  await fs.writeFile(path.join(repoRoot, 'src/generated/knowledge-navigation.json'), `${JSON.stringify(artifacts.navigation, null, 2)}\n`)
  await fs.writeFile(path.join(repoRoot, 'reports/knowledge-navigation-coverage.json'), `${JSON.stringify(artifacts.coverage, null, 2)}\n`)
  return artifacts.coverage
}

function countTree(tree: NavigationSection[]) { return { sections: tree.length, routes: tree.reduce((n, s) => n + s.routes.length, 0), stages: tree.reduce((n, s) => n + s.routes.reduce((m, r) => m + r.stages.length, 0), 0), articles: tree.reduce((n, s) => n + s.routes.reduce((m, r) => m + r.stages.reduce((k, t) => k + t.articles.length, 0), 0), 0) } }
function relationships(tree: NavigationSection[]): NavigationCoverage['relationships'] { return { sections: tree.map((s) => ({ id: s.id })), routes: tree.flatMap((s) => s.routes.map((r) => ({ id: r.id, sectionId: s.id }))), stages: tree.flatMap((s) => s.routes.flatMap((r) => r.stages.map((t) => ({ id: t.id, sectionId: s.id, routeId: r.id })))), articles: tree.flatMap((s) => s.routes.flatMap((r) => r.stages.flatMap((t) => t.articles.map((a) => ({ id: a.articleId, sectionId: s.id, routeId: r.id, stageId: t.id }))))) } }
function duplicates(values: string[]): string[] { const seen = new Set<string>(); return [...new Set(values.filter((value) => seen.has(value) || !seen.add(value)))].sort() }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateNavigationArtifacts()
    .then((coverage) => console.log(`generated navigation coverage for ${coverage.counts.articles} articles`))
    .catch((error) => {
      console.error((error as Error).message)
      process.exitCode = 1
    })
}
