export interface RankableArticle {
  title: string
  date: string
  quality?: string
}

export function sortArticlesForLearning<T extends RankableArticle>(articles: T[]): T[] {
  return [...articles].sort((a, b) => qualityRank(b.quality) - qualityRank(a.quality) || b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
}

function qualityRank(quality?: string): number {
  if (quality === 'curated') return 30
  if (quality === 'imported') return 10
  if (quality === 'draft') return 0
  if (quality === 'needsRewrite') return -10
  return 5
}
