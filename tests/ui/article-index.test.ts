// @vitest-environment happy-dom
import fs from 'node:fs'
import { beforeEach, describe, expect, it } from 'vitest'
import { initArticleIndex } from '../../src/utils/article-index-controller'
import { isPublicArticle } from '../../src/utils/article-index'

function mountIndex() {
  document.body.innerHTML = `
    <section data-article-index data-default-view="list" data-batch-size="2">
      <div role="tablist" aria-label="文章视图">
        <button role="tab" id="view-list" aria-controls="article-results" aria-selected="true" data-article-view="list">列表</button>
        <button role="tab" id="view-grid" aria-controls="article-results" aria-selected="false" tabindex="-1" data-article-view="grid">网格</button>
      </div>
      <div id="article-results" data-article-results data-view="list">
        <article data-article-item><a href="/posts/a/">A</a></article>
        <article data-article-item><a href="/posts/b/">B</a></article>
        <article data-article-item><a href="/posts/c/">C</a></article>
      </div>
      <div data-article-sentinel></div>
    </section>`
}

beforeEach(() => {
  localStorage.clear()
  mountIndex()
})

describe('article index interactions', () => {
  it('persists view selection and restores it on remount', () => {
    initArticleIndex()
    document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!.click()
    expect(localStorage.getItem('articleIndex.view')).toBe('grid')
    expect(document.querySelector('[data-article-results]')!.getAttribute('data-view')).toBe('grid')
    mountIndex()
    initArticleIndex()
    expect(document.querySelector('[data-article-results]')!.getAttribute('data-view')).toBe('grid')
  })

  it('supports arrow-key tab navigation with synchronized ARIA state', () => {
    initArticleIndex()
    const list = document.querySelector<HTMLButtonElement>('[data-article-view="list"]')!
    const grid = document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!
    list.focus()
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(document.activeElement).toBe(grid)
    expect(grid.getAttribute('aria-selected')).toBe('true')
    expect(list.getAttribute('aria-selected')).toBe('false')
  })

  it('progressively reveals items while retaining every static link in the DOM', () => {
    const controller = initArticleIndex()!
    expect(document.querySelectorAll('[data-article-item] a')).toHaveLength(3)
    expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(1)
    controller.revealNextBatch()
    expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(0)
  })
})

describe('article index contracts', () => {
  it('filters non-public content explicitly', () => {
    expect(isPublicArticle({ draft: false })).toBe(true)
    expect(isPublicArticle({ draft: true })).toBe(false)
    expect(isPublicArticle({ draft: false, hidden: true })).toBe(false)
    expect(isPublicArticle({ draft: false, visibility: 'private' })).toBe(false)
  })

  it('renders a complete no-JS fallback, empty state, and knowledge sidebar slot contract', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
    expect(page).toContain('data-article-item')
    expect(page).toContain('暂无公开文章')
    expect(page).not.toContain('client:only')
    expect(layout).toContain('knowledgeSidebar')
    expect(layout).toContain('<slot name="knowledge-sidebar"')
  })
})
