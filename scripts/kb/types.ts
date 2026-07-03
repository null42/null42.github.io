export type Visibility = 'public' | 'hidden' | 'private' | string
export type ArticleQuality = 'curated' | 'draft' | 'imported' | 'needsRewrite' | string

export interface CategoryDefaults {
  section?: string
  chapter?: string
  chapterTitle?: string
  chapterOrder?: number
  navGroup?: string
  navGroupOrder?: number
  category?: string
  source?: string
  defaultTags?: string[]
  tags?: string[]
  title?: string
  navTitle?: string
  visibility?: Visibility
  quality?: ArticleQuality
  order?: number
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
  chapter?: string
  chapterTitle?: string
  chapterOrder?: number
  navGroup?: string
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
  section?: string
  chapter?: string
  chapterTitle?: string
  chapterOrder?: number
  navGroup?: string
  navGroupOrder?: number
  order?: number
  category: string
  tags: string[]
  source: string
  sourcePath?: string
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
}

export interface CompletionContext {
  body: string
  relativePath: string
  modifiedDate: string
}
