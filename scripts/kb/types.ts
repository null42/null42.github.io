export type Visibility = 'public' | 'hidden' | 'private' | string

export interface CategoryDefaults {
  section?: string
  chapter?: string
  chapterTitle?: string
  chapterOrder?: number
  category?: string
  source?: string
  defaultTags?: string[]
  tags?: string[]
  title?: string
  navTitle?: string
  visibility?: Visibility
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
