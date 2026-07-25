import fs from 'node:fs/promises'
import path from 'node:path'
import { contentRoot as defaultContentRoot } from './paths'
import type { ArticleRecord, CategoryDefaults, Visibility } from './types'

export interface ColumnRoute {
  id: string
  title: string
  order?: number
  description?: string
  allowEmpty?: boolean
}

export interface ColumnStage {
  id: string
  title: string
  order?: number
  routeId: string
  pathPrefix?: string
  chapter?: string
  tags?: string[]
  allowEmpty?: boolean
}

export interface ColumnConfig {
  id: string
  title: string
  section?: string
  source?: string
  order?: number
  visibility: Visibility
  layout: 'map' | 'flat'
  searchable?: boolean
  allowFlat?: boolean
  description?: string
  defaultTags?: string[]
  routes: ColumnRoute[]
  stages: ColumnStage[]
}

export interface ColumnRegistry {
  contentRoot: string
  columns: ColumnConfig[]
}

export interface ColumnValidationIssue {
  code: 'missing-column-config' | 'missing-routes' | 'missing-stages' | 'unmapped-article'
  message: string
  path?: string
  columnId?: string
}

export interface ColumnFilterOption {
  id: string
  label: string
  count: number
  columnId?: string
  routeId?: string
  stageId?: string
}

export interface ColumnFilterOptions {
  sections: ColumnFilterOption[]
  routes: ColumnFilterOption[]
  stages: ColumnFilterOption[]
  tags: ColumnFilterOption[]
}

const CONFIG_NAME = 'column.config.json'

export async function loadColumnRegistry(options: { contentRoot?: string } = {}): Promise<ColumnRegistry> {
  const root = options.contentRoot || defaultContentRoot
  const columns: ColumnConfig[] = []
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(root, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { contentRoot: root, columns }
    throw error
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const configPath = path.join(root, entry.name, CONFIG_NAME)
    try {
      const raw = JSON.parse(await fs.readFile(configPath, 'utf8')) as Partial<ColumnConfig>
      columns.push(normalizeColumnConfig(raw, entry.name))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue
      throw new Error(`${configPath}: ${(error as Error).message}`)
    }
  }

  columns.sort(compareOrderId)
  return { contentRoot: root, columns }
}

export function columnDefaultsForPath(registry: ColumnRegistry, relativePath: string): CategoryDefaults {
  const columnId = columnIdFromPath(relativePath)
  const column = registry.columns.find((item) => item.id === columnId)
  if (!column) return {}

  const defaults: CategoryDefaults = {
    section: column.section || column.title,
    category: column.title,
    source: column.source || column.id,
    defaultTags: column.defaultTags || [column.title],
    visibility: column.visibility
  }

  const stage = findStageForPath(column, relativePath)
  if (!stage || column.layout === 'flat') return defaults

  const route = column.routes.find((item) => item.id === stage.routeId)
  return {
    ...defaults,
    sectionId: column.id,
    sectionTitle: column.section || column.title,
    navGroup: route?.title,
    routeId: route?.id,
    routeTitle: route?.title,
    navGroupOrder: route?.order,
    chapter: stage.chapter || stage.id,
    stage: stage.id,
    stageId: stage.id,
    stageTitle: stage.title,
    chapterTitle: stage.title,
    chapterOrder: stage.order,
    category: stage.title,
    defaultTags: stage.tags || column.defaultTags || [stage.title]
  }
}

export function validateColumnRegistry(registry: ColumnRegistry, articles: ArticleRecord[]): ColumnValidationIssue[] {
  const issues: ColumnValidationIssue[] = []
  const columnIds = new Set(registry.columns.map((column) => column.id))

  for (const article of articles.filter((item) => item.visibility === 'public')) {
    const columnId = article.sectionId || columnIdFromPath(article.path)
    if (!columnId || columnIds.has(columnId)) continue
    issues.push({
      code: 'missing-column-config',
      message: `Public article belongs to unconfigured column: ${columnId}`,
      path: article.path,
      columnId
    })
  }

  for (const column of registry.columns.filter((item) => item.visibility !== 'hidden' && item.layout !== 'flat')) {
    if (column.routes.length === 0) {
      issues.push({ code: 'missing-routes', message: `${column.id} has no learning routes`, columnId: column.id })
    }
    if (column.stages.length === 0) {
      issues.push({ code: 'missing-stages', message: `${column.id} has no learning stages`, columnId: column.id })
    }
  }

  return issues
}

export function buildColumnFilterOptions(registry: ColumnRegistry, articles: ArticleRecord[]): ColumnFilterOptions {
  const searchableColumns = registry.columns.filter((column) => column.visibility === 'public' && column.searchable !== false)
  const articlesByColumn = new Map<string, ArticleRecord[]>()
  for (const article of articles.filter((item) => item.visibility === 'public')) {
    const columnId = article.sectionId || columnIdFromPath(article.path)
    if (!columnId || !searchableColumns.some((column) => column.id === columnId)) continue
    const list = articlesByColumn.get(columnId) || []
    list.push(article)
    articlesByColumn.set(columnId, list)
  }

  const sections = searchableColumns
    .filter((column) => (articlesByColumn.get(column.id)?.length || 0) > 0)
    .map((column) => ({
      id: column.id,
      label: column.title,
      count: articlesByColumn.get(column.id)?.length || 0,
      columnId: column.id
    }))

  const routes: ColumnFilterOption[] = []
  const stages: ColumnFilterOption[] = []

  for (const column of searchableColumns) {
    const columnArticles = articlesByColumn.get(column.id) || []
    if (columnArticles.length === 0) continue

    for (const route of column.routes) {
      const routeStages = column.stages.filter((stage) => stage.routeId === route.id)
      const count = columnArticles.filter((article) => {
        return article.routeId === route.id || findStageForArticle(column, article)?.routeId === route.id
      }).length
      if (count > 0) {
        routes.push({ id: `${column.id}:${route.id}`, label: route.title, count, columnId: column.id, routeId: route.id })
      }
    }

    for (const stage of column.stages) {
      const count = columnArticles.filter((article) => findStageForArticle(column, article)?.id === stage.id).length
      if (count > 0) {
        stages.push({
          id: `${column.id}:${stage.id}`,
          label: stage.title,
          count,
          columnId: column.id,
          routeId: stage.routeId,
          stageId: stage.id
        })
      }
    }
  }

  return {
    sections,
    routes,
    stages,
    tags: buildTagOptions(articlesByColumn)
  }
}

export function columnIdFromPath(relativePath: string): string | undefined {
  const parts = relativePath.replace(/\\/g, '/').split('/')
  const contentIndex = parts.indexOf('content')
  return parts[contentIndex + 1]
}

function normalizeColumnConfig(raw: Partial<ColumnConfig>, folderName: string): ColumnConfig {
  const id = stringValue(raw.id) || folderName
  const title = stringValue(raw.title) || id
  const routes = Array.isArray(raw.routes) ? raw.routes.map(normalizeRoute).sort(compareOrderId) : []
  const stages = Array.isArray(raw.stages) ? raw.stages.map(normalizeStage).sort(compareOrderId) : []
  return {
    id,
    title,
    section: stringValue(raw.section) || title,
    source: stringValue(raw.source) || id,
    order: numberValue(raw.order),
    visibility: visibilityValue(raw.visibility),
    layout: raw.layout === 'flat' ? 'flat' : 'map',
    searchable: raw.searchable !== false,
    allowFlat: raw.allowFlat === true,
    description: stringValue(raw.description),
    defaultTags: Array.isArray(raw.defaultTags) ? raw.defaultTags.map(String) : undefined,
    routes,
    stages
  }
}

function normalizeRoute(raw: Partial<ColumnRoute>): ColumnRoute {
  return {
    id: stringValue(raw.id) || stringValue(raw.title) || 'route',
    title: stringValue(raw.title) || stringValue(raw.id) || '路线',
    order: numberValue(raw.order),
    description: stringValue(raw.description),
    allowEmpty: raw.allowEmpty === true
  }
}

function normalizeStage(raw: Partial<ColumnStage>): ColumnStage {
  return {
    id: stringValue(raw.id) || stringValue(raw.chapter) || stringValue(raw.title) || 'stage',
    title: stringValue(raw.title) || stringValue(raw.id) || '阶段',
    order: numberValue(raw.order),
    routeId: stringValue(raw.routeId) || 'default',
    pathPrefix: normalizePrefix(raw.pathPrefix),
    chapter: stringValue(raw.chapter),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : undefined,
    allowEmpty: raw.allowEmpty === true
  }
}

function findStageForArticle(column: ColumnConfig, article: ArticleRecord): ColumnStage | undefined {
  return column.stages.find((stage) => stage.id === article.stageId)
    || findStageForPath(column, article.path)
}

function findStageForPath(column: ColumnConfig, relativePath: string): ColumnStage | undefined {
  const normalized = relativePath.replace(/\\/g, '/').replace(/\.md$/i, '')
  return [...column.stages]
    .filter((stage) => stage.pathPrefix && (normalized === stage.pathPrefix || normalized.startsWith(`${stage.pathPrefix}/`)))
    .sort((a, b) => (b.pathPrefix?.length || 0) - (a.pathPrefix?.length || 0))[0]
}

function buildTagOptions(articlesByColumn: Map<string, ArticleRecord[]>): ColumnFilterOption[] {
  const counts = new Map<string, number>()
  for (const articles of articlesByColumn.values()) {
    for (const article of articles) {
      for (const tag of article.tags) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ id: label, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'))
}

function normalizePrefix(value: unknown): string | undefined {
  const text = stringValue(value)
  return text ? text.replace(/\\/g, '/').replace(/\/$/, '').replace(/\.md$/i, '') : undefined
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function compareOrderId<T extends { order?: number; id: string }>(a: T, b: T): number {
  const leftOrder = typeof a.order === 'number' && Number.isFinite(a.order) ? a.order : Number.POSITIVE_INFINITY
  const rightOrder = typeof b.order === 'number' && Number.isFinite(b.order) ? b.order : Number.POSITIVE_INFINITY
  return leftOrder - rightOrder || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
}

function visibilityValue(value: unknown): Visibility {
  const visibility = stringValue(value) || 'public'
  if (visibility === 'public' || visibility === 'hidden' || visibility === 'private' || visibility === 'encrypted') return visibility
  throw new Error('unknown column visibility: ' + visibility)
}
