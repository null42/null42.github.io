import type { ArticleQuality, Visibility } from '../types'

export type PublicSurface = 'full' | 'placeholder' | 'excluded'

export interface CanonicalArticleRecord {
  sectionId?: string
  sectionTitle?: string
  routeId?: string
  routeTitle?: string
  routeOrder?: number
  stageId?: string
  stageTitle?: string
  stageOrder?: number
  articleId: string
  title: string
  sourcePath: string
  slug: string
  order: number
  explicitOrder: boolean
  difficulty?: string
  tags?: string[]
  quality?: ArticleQuality
  visibility: Visibility
  publicSurface: PublicSurface
}
