import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import navigation from '../../src/generated/knowledge-navigation.json'

describe('knowledge map', () => {
  it('renders encrypted placeholders as text instead of undefined post links', () => {
    const component = fs.readFileSync('src/components/knowledge/KnowledgeMap.astro', 'utf8')
    expect(component).toContain('article.slug ?')
    expect(component).toContain('<strong>{article.title}</strong>')
    expect(component).toContain(': <strong data-knowledge-article-placeholder={article.articleId}>{article.title}</strong>')
    expect(component).not.toMatch(/^\s*<a href=\{`\/posts\/\$\{article\.slug\}\/`\}/m)
  })
  it('renders sections, routes, stages, counts, metadata, and canonical links', () => {
    const component = fs.readFileSync('src/components/knowledge/KnowledgeMap.astro', 'utf8')
    const page = fs.readFileSync('src/pages/knowledge.astro', 'utf8')
    expect(page).toContain('<KnowledgeMap')
    expect(component).toContain('section.routes')
    expect(component).toContain('route.stages')
    expect(component).toContain('stage.articles.length')
    expect(component).toContain('article.difficulty')
    expect(component).toContain('article.tags')
    expect(component).toContain('article.quality')
    expect(component).toContain('/list/?scope=knowledge&section=')
    expect(component).toContain('href={`/posts/${article.slug.toLowerCase()}/`}')
  })

  it('contains only public knowledge articles and no encrypted payload metadata', () => {
    const serialized = JSON.stringify(navigation)
    expect(serialized).not.toContain('encryptedPayload')
    expect(serialized).not.toContain('password')
    expect(serialized).not.toContain('content/encrypted')
    const count = navigation.flatMap(section => section.routes.flatMap(route => route.stages.flatMap(stage => stage.articles))).length
    expect(count).toBe(558)
  })
})
