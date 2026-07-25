export type Visibility = 'public' | 'hidden' | 'private' | 'encrypted'
export type ArticleQuality = 'curated' | 'draft' | 'imported' | 'needsRewrite' | string

export interface CategoryDefaults {
  section?: string
  sectionId?: string
  sectionTitle?: string
  chapter?: string
  chapterTitle?: string
  chapterOrder?: number
  navGroup?: string
  routeId?: string
  routeTitle?: string
  routeOrder?: number
  navGroupOrder?: number
  stage?: string
  stageId?: string
  stageTitle?: string
  stageOrder?: number
  category?: string
  source?: string
  defaultTags?: string[]
  tags?: string[]
  title?: string
  navTitle?: string
  visibility?: Visibility
  quality?: ArticleQuality
  order?: number
  explicitOrder?: boolean
  slug?: string
  description?: string
  aliases?: string[]
  exclude?: boolean
  [key: string]: unknown
}

export interface ArticleFrontmatter {
  title?: string
  date?: string
  updated?: string
  section?: string
  sectionId?: string
  sectionTitle?: string
  chapter?: string
  stage?: string
  stageId?: string
  stageTitle?: string
  articleId?: string
  chapterTitle?: string
  chapterOrder?: number
  navGroup?: string
  routeId?: string
  routeTitle?: string
  routeOrder?: number
  navGroupOrder?: number
  order?: number
  category?: string
  tags?: string[]
  source?: string
  sourcePath?: string
  type?: string
  difficulty?: string
  suggestedTags?: string[]
  status?: string
  visibility?: Visibility
  quality?: ArticleQuality
  summary?: string
  comments?: boolean
  [key: string]: unknown
}

export interface ArticleRecord {
  title: string
  date: string
  updated?: string
  sectionId?: string
  sectionTitle?: string
  stageId?: string
  stageTitle?: string
  stageOrder?: number
  articleId: string
  routeId?: string
  routeTitle?: string
  routeOrder?: number
  order: number
  explicitOrder: boolean
  category: string
  tags: string[]
  source: string
  sourcePath: string
  type?: string
  difficulty?: string
  suggestedTags?: string[]
  status: string
  visibility: Visibility
  quality?: ArticleQuality
  summary: string
  path: string
  url: string
  body: string
  slug: string
  publicSurface: 'full' | 'placeholder' | 'excluded'
}

export interface CompletionContext {
  body: string
  relativePath: string
  modifiedDate: string
}
