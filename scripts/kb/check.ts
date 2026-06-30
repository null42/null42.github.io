import { scanArticles } from './articles'

const result = await scanArticles()
for (const warning of result.warnings) {
  console.warn(`warning: ${warning}`)
}

const publicCount = result.articles.filter((article) => article.visibility === 'public').length
console.log(`checked ${result.articles.length} indexed articles (${publicCount} public)`)

const reviewWarnings = result.warnings.filter((warning) => warning.includes('E:\\') || warning.includes('visibility is private'))
if (reviewWarnings.length > 0) {
  console.warn(`review recommended for ${reviewWarnings.length} warnings`)
}
