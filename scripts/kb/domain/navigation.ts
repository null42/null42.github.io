import type { CanonicalArticleRecord } from './article-record'

export interface NavigationRouteConfig { id: string; title: string; order?: number; allowEmpty?: boolean }
export interface NavigationStageConfig { id: string; title: string; order?: number; routeId: string; allowEmpty?: boolean }
export interface NavigationSectionConfig { id: string; title: string; order?: number; allowEmpty?: boolean; routes: NavigationRouteConfig[]; stages: NavigationStageConfig[] }
export interface NavigationArticle { articleId: string; title: string; order?: number; placeholder: boolean; slug?: string; difficulty?: string; tags?: string[]; quality?: string }
export interface NavigationStage extends NavigationStageConfig { articles: NavigationArticle[] }
export interface NavigationRoute extends NavigationRouteConfig { stages: NavigationStage[] }
export interface NavigationSection extends Omit<NavigationSectionConfig, 'routes' | 'stages'> { routes: NavigationRoute[] }

export function buildNavigationTree(sections: NavigationSectionConfig[], records: CanonicalArticleRecord[]): NavigationSection[] {
  validateConfig(sections)
  const included = records.filter((record) => record.publicSurface !== 'excluded')
  const articleIds = new Set<string>()
  const articlesByStage = new Map<string, CanonicalArticleRecord[]>()
  for (const record of included) {
    if (articleIds.has(record.articleId)) throw new Error(`Duplicate articleId: ${record.articleId}`)
    articleIds.add(record.articleId)
    if (!record.sectionId || !record.routeId || !record.stageId) throw new Error(`Missing hierarchy for article: ${record.articleId}`)
    const section = sections.find((item) => item.id === record.sectionId)
    if (!section) throw new Error(`Unknown section ${record.sectionId}: ${record.articleId}`)
    const route = section.routes.find((item) => item.id === record.routeId)
    if (!route) throw new Error(`Unknown route ${record.routeId}: ${record.articleId}`)
    const stage = section.stages.find((item) => item.id === record.stageId)
    if (!stage) throw new Error(`Unknown stage ${record.stageId}: ${record.articleId}`)
    if (stage.routeId !== route.id) throw new Error(`Cross-parent hierarchy: ${record.articleId}`)
    const key = stageKey(section.id, route.id, stage.id)
    articlesByStage.set(key, [...(articlesByStage.get(key) || []), record])
  }
  return [...sections].sort(compareConfiguredNodes).map((section) => {
    const routes = [...section.routes].sort(compareConfiguredNodes).map((route) => {
      const stages = section.stages.filter((stage) => stage.routeId === route.id).sort(compareConfiguredNodes).map((stage) => {
        const recordsForStage = articlesByStage.get(stageKey(section.id, route.id, stage.id)) || []
        if (recordsForStage.length === 0 && !stage.allowEmpty) throw new Error(`Empty stage: ${section.id}/${route.id}/${stage.id}`)
        assertUniqueExplicitArticleOrders(recordsForStage, `article in ${section.id}/${route.id}/${stage.id}`)
        return { ...stage, articles: [...recordsForStage].sort(compareArticles).map(toNavigationArticle) }
      })
      if (stages.every((stage) => stage.articles.length === 0) && !route.allowEmpty) throw new Error(`Empty route: ${section.id}/${route.id}`)
      return { ...route, stages }
    })
    if (routes.every((route) => route.stages.every((stage) => stage.articles.length === 0)) && !section.allowEmpty) throw new Error(`Empty section: ${section.id}`)
    return { id: section.id, title: section.title, ...(isExplicitOrder(section.order) ? { order: section.order } : {}), allowEmpty: section.allowEmpty, routes }
  })
}

function validateConfig(sections: NavigationSectionConfig[]): void {
  assertUnique(sections, 'section')
  for (const section of sections) {
    assertUnique(section.routes, `route in ${section.id}`)
    assertUniqueIds(section.stages, `stage in ${section.id}`)
    for (const route of section.routes) assertUniqueOrders(section.stages.filter((stage) => stage.routeId === route.id), `stage in ${section.id}/${route.id}`)
    for (const stage of section.stages) if (!section.routes.some((route) => route.id === stage.routeId)) throw new Error(`Unknown route ${stage.routeId} for stage ${section.id}/${stage.id}`)
  }
  assertUniqueIds(sections.flatMap((section) => section.routes), 'route')
  assertUniqueIds(sections.flatMap((section) => section.stages), 'stage')
}

function assertUniqueIds(nodes: Array<{ id: string }>, label: string): void {
  const ids = new Set<string>()
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`Duplicate ${label} id: ${node.id}`)
    ids.add(node.id)
  }
}

function assertUniqueOrders(nodes: Array<{ order?: number }>, label: string): void {
  const orders = new Set<number>()
  for (const node of nodes) {
    if (!isExplicitOrder(node.order)) continue
    if (orders.has(node.order)) throw new Error(`Duplicate order for ${label}: ${node.order}`)
    orders.add(node.order)
  }
}

function assertUnique(nodes: Array<{ id: string; order?: number }>, label: string): void {
  const ids = new Set<string>()
  const orders = new Set<number>()
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`Duplicate ${label} id: ${node.id}`)
    if (isExplicitOrder(node.order) && orders.has(node.order)) throw new Error(`Duplicate order for ${label}: ${node.order}`)
    ids.add(node.id)
    if (isExplicitOrder(node.order)) orders.add(node.order)
  }
}

function compareConfiguredNodes(left: { id: string; order?: number }, right: { id: string; order?: number }): number { return configuredOrder(left.order) - configuredOrder(right.order) || compareCodePoints(left.id, right.id) }
function compareArticles(left: CanonicalArticleRecord, right: CanonicalArticleRecord): number {
  return left.order - right.order
    || filenamePrefix(left.sourcePath) - filenamePrefix(right.sourcePath)
    || compareCodePoints(left.title, right.title)
    || compareCodePoints(left.sourcePath, right.sourcePath)
}
function toNavigationArticle(record: CanonicalArticleRecord): NavigationArticle {
  const placeholder = record.publicSurface === 'placeholder' || record.visibility === 'encrypted'
  // Astro 对 index.md 生成目录路径 URL（不带 /index/），需要在 slug 中去掉 /index 后缀
  const urlSlug = record.slug.replace(/\/index$/, '')
  return { articleId: record.articleId, title: record.title, ...(record.explicitOrder ? { order: record.order } : {}), placeholder, ...(placeholder ? {} : { slug: urlSlug, difficulty: record.difficulty, tags: record.tags || [], quality: record.quality }) }
}
function assertUniqueExplicitArticleOrders(records: CanonicalArticleRecord[], label: string): void {
  const orders = new Set<number>()
  for (const record of records) {
    if (!record.explicitOrder) continue
    if (orders.has(record.order)) throw new Error(`Duplicate order for ${label}: ${record.order}`)
    orders.add(record.order)
  }
}
function filenamePrefix(sourcePath: string): number {
  const filename = sourcePath.replace(/\\/g, '/').split('/').pop() || ''
  const match = filename.match(/^(\d+)/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}
function compareCodePoints(left: string, right: string): number { return left < right ? -1 : left > right ? 1 : 0 }
function configuredOrder(order: number | undefined): number { return isExplicitOrder(order) ? order : Number.POSITIVE_INFINITY }
function isExplicitOrder(order: number | undefined): order is number { return typeof order === 'number' && Number.isFinite(order) }
function stageKey(sectionId: string, routeId: string, stageId: string): string { return `${sectionId}\u0000${routeId}\u0000${stageId}` }
