import type { ColumnConfig } from '../columns'
import type { ArticleFrontmatter, Visibility } from '../types'
import type { CanonicalArticleRecord, PublicSurface } from './article-record'

export interface ArticleNormalizationContext {
  sourcePath: string
  slug: string
  orderWasExplicit?: boolean
  column?: Pick<ColumnConfig, 'id' | 'title' | 'section' | 'layout' | 'routes' | 'stages'>
}

export interface VisibilityDecision {
  readonly html: boolean
  readonly pagefind: boolean
  readonly sitemap: boolean
  readonly navigation: boolean
  readonly summary: boolean
  readonly attachments: boolean
  readonly encryptedPayload: boolean
  readonly jsonLd: boolean
  readonly publicSurface: PublicSurface
}

const visibilityDecisions: Readonly<Record<Visibility, Readonly<VisibilityDecision>>> = Object.freeze({
  public: Object.freeze({
    html: true, pagefind: true, sitemap: true, navigation: true,
    summary: true, attachments: true, encryptedPayload: false, jsonLd: true,
    publicSurface: 'full',
  }),
  hidden: Object.freeze({
    html: true, pagefind: false, sitemap: false, navigation: false,
    summary: false, attachments: true, encryptedPayload: false, jsonLd: false,
    publicSurface: 'excluded',
  }),
  private: Object.freeze({
    html: false, pagefind: false, sitemap: false, navigation: false,
    summary: false, attachments: false, encryptedPayload: false, jsonLd: false,
    publicSurface: 'excluded',
  }),
  encrypted: Object.freeze({
    html: true, pagefind: false, sitemap: false, navigation: true,
    summary: false, attachments: false, encryptedPayload: true, jsonLd: false,
    publicSurface: 'placeholder',
  }),
})

export function decideVisibility(visibility: Visibility): Readonly<VisibilityDecision> {
  return visibilityDecisions[visibility] || visibilityDecisions.private
}

export function normalizeArticle(input: ArticleFrontmatter, context: ArticleNormalizationContext): CanonicalArticleRecord {
  const visibility = normalizeVisibility(input.visibility)
  const column = context.column
  const explicitSectionId = text(input.sectionId)
  if (column?.layout === 'map' && explicitSectionId && explicitSectionId !== column.id) throw new Error('sectionId conflicts with mapped column')
  const legacySection = text(input.section)
  if (!column && explicitSectionId && legacySection && explicitSectionId !== legacySection) throw new Error('sectionId conflicts with section')
  if (column?.layout === 'map' && legacySection && ![column.id, column.title, column.section].filter(Boolean).includes(legacySection)) {
    throw new Error('sectionId conflicts with section')
  }
  const hasHierarchy = column?.layout === 'map' || Boolean(
    text(input.sectionId) || text(input.routeId) || text(input.stageId)
    || (!column && (text(input.section) || text(input.navGroup) || text(input.stage) || text(input.chapter)))
  )
  const sectionId = hasHierarchy ? text(input.sectionId) || (column?.layout === 'map' ? column.id : undefined) || (!column ? text(input.section) : undefined) : undefined
  const sectionTitle = hasHierarchy ? text(input.sectionTitle) || (column?.layout === 'map' ? text(input.section) || column.section || column.title : undefined) || (!column ? text(input.section) : undefined) : undefined
  const explicitRouteId = text(input.routeId)
  const legacyRoute = text(input.navGroup)
  const routeById = column?.routes.find((route) => route.id === explicitRouteId)
  const routeByLegacy = column?.routes.find((route) => route.title === legacyRoute || route.id === legacyRoute)
  if (!column && explicitRouteId && legacyRoute && explicitRouteId !== legacyRoute) throw new Error('routeId conflicts with navGroup')
  if (explicitRouteId && column && !routeById) throw new Error('unknown routeId: ' + explicitRouteId)
  if (legacyRoute && column?.layout === 'map' && !routeByLegacy) throw new Error('unknown navGroup: ' + legacyRoute)
  if (routeById && routeByLegacy && routeById.id !== routeByLegacy.id) throw new Error('routeId conflicts with navGroup')

  const explicitStageId = text(input.stageId)
  const stageById = column?.stages.find((stage) => stage.id === explicitStageId)
  if (explicitStageId && column?.layout === 'map' && !stageById) throw new Error('unknown stageId: ' + explicitStageId)
  const stageInput = text(input.stage)
  const chapterInput = text(input.chapter)
  if (!column && explicitStageId && stageInput && explicitStageId !== stageInput) throw new Error('stageId conflicts with stage')
  if (!column && explicitStageId && chapterInput && explicitStageId !== chapterInput) throw new Error('stageId conflicts with chapter')
  const shouldResolveHierarchy = column?.layout === 'map'
  const stageCandidates = shouldResolveHierarchy && (stageInput || chapterInput)
    ? column?.stages.filter((stage) =>
        (stageInput ? stage.id === stageInput || stage.title === stageInput : true) &&
        (chapterInput ? stage.chapter === chapterInput || stage.id === chapterInput || stage.title === chapterInput : true)
      ) || []
    : []
  if (shouldResolveHierarchy && (stageInput || chapterInput) && stageCandidates.length !== 1) throw new Error('stage/chapter must resolve uniquely; ambiguous mapping')
  if (stageById && stageCandidates[0] && stageById.id !== stageCandidates[0].id) {
    throw new Error(`stageId conflicts with ${stageInput ? 'stage' : 'chapter'}`)
  }
  const stage = stageById || stageCandidates[0]
  const route = routeById || routeByLegacy || column?.routes.find((item) => item.id === stage?.routeId)
  if (stage && route && stage.routeId !== route.id) throw new Error('stage conflicts with routeId/navGroup')

  const knowledgeArticle = column?.layout === 'map'
  const parsedOrder = number(input.order)
  const explicitOrder = context.orderWasExplicit ?? parsedOrder !== undefined
  if (visibility === 'public' && knowledgeArticle) {
    if (!sectionId) throw new Error('public knowledge article missing sectionId')
    if (!route) throw new Error('public knowledge article missing routeId')
    if (!stage) throw new Error('public knowledge article missing stageId')
  }

  return {
    sectionId,
    sectionTitle,
    routeId: route?.id || text(input.routeId) || (!column ? text(input.navGroup) : undefined),
    routeTitle: route?.title || text(input.routeTitle) || (!column ? text(input.navGroup) : undefined),
    routeOrder: route?.order ?? number(input.routeOrder) ?? number(input.navGroupOrder),
    stageId: stage?.id || text(input.stageId) || (!column ? text(input.stage) || text(input.chapter) : undefined),
    stageTitle: stage?.title || text(input.stageTitle) || (!column ? text(input.chapterTitle) : undefined),
    stageOrder: stage?.order ?? number(input.stageOrder) ?? number(input.chapterOrder),
    articleId: text(input.articleId) || context.slug,
    title: text(input.title) || context.slug,
    sourcePath: context.sourcePath,
    slug: context.slug,
    order: explicitOrder && parsedOrder !== undefined ? parsedOrder : Number.MAX_SAFE_INTEGER,
    explicitOrder,
    difficulty: text(input.difficulty),
    quality: text(input.quality),
    visibility,
    publicSurface: decideVisibility(visibility).publicSurface,
  }
}

function normalizeVisibility(value: unknown): Visibility {
  const visibility = text(value) || 'public'
  if (visibility === 'public' || visibility === 'hidden' || visibility === 'private' || visibility === 'encrypted') return visibility
  throw new Error('unknown visibility: ' + visibility)
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function number(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value)
  return undefined
}
