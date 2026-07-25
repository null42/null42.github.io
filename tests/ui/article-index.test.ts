// @vitest-environment happy-dom
import fs from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { initArticleIndex, installArticleIndexLifecycle } from '../../src/utils/article-index-controller'
import { filterArticleIndexItems, normalizeArticleIndexFilters, parseArticleIndexFilters, getArticleIndexPresentation, isPublicArticle } from '../../src/utils/article-index'

function mountIndex() {
  document.body.innerHTML = `
    <section data-article-index data-default-view="list" data-batch-size="2">
      <div role="group" aria-label="文章视图">
        <button id="view-list" aria-controls="article-results" aria-pressed="true" data-article-view="list">列表</button>
        <button id="view-grid" aria-controls="article-results" aria-pressed="false" data-article-view="grid">网格</button>
      </div>
      <form data-article-filters>
        <select data-article-scope><option value="all">全部</option><option value="knowledge">知识文章</option><option value="other">其他文章</option></select>
        <select data-article-section><option value="">全部栏目</option><option value="motor">电机控制</option><option value="power">电源控制</option></select>
        <select data-article-route><option value="">全部路线</option><option value="control" data-section-id="motor">控制</option><option value="hardware" data-section-id="motor">硬件</option><option value="project" data-section-id="power">项目</option></select>
        <select data-article-stage><option value="">全部阶段</option><option value="algorithm" data-section-id="motor" data-route-id="control">算法</option><option value="power-path" data-section-id="motor" data-route-id="hardware">功率链路</option><option value="projects" data-section-id="power" data-route-id="project">项目</option></select>
      </form>
      <div id="article-results" data-article-results data-view="list">
        <article data-article-item data-section-id="motor" data-route-id="control" data-stage-id="algorithm"><a href="/posts/a/">A</a></article>
        <article data-article-item data-section-id="motor" data-route-id="hardware" data-stage-id="power-path"><a href="/posts/b/">B</a></article>
        <article data-article-item data-section-id="power" data-route-id="project" data-stage-id="projects"><a href="/posts/c/">C</a></article>
        <article data-article-item><a href="/posts/d/">D</a></article>
      </div>
      <p data-article-status aria-live="polite"></p>
      <button type="button" data-article-load-more>加载更多</button>
      <div data-article-sentinel></div>
    </section>`
}

beforeEach(() => {
  localStorage.clear()
  history.replaceState({}, '', '/list/')
  mountIndex()
})

describe('article index interactions', () => {
  it('renders filtered articles that were outside the server-rendered window', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    index.dataset.batchSize = '2'
    const results = document.querySelector<HTMLElement>('[data-article-results]')!
    results.replaceChildren(...Array.from(results.children).slice(0, 2))
    const data = document.createElement('script')
    data.type = 'application/json'
    data.dataset.articleData = ''
    data.textContent = JSON.stringify([
      { articleId: 'a', title: 'A', url: '/posts/a/', description: 'A', publishedIso: '2026-01-01', publishedText: '2026/01/01', category: '', tags: [], sectionId: 'motor', routeId: 'control', stageId: 'algorithm' },
      { articleId: 'b', title: 'B', url: '/posts/b/', description: 'B', publishedIso: '2026-01-01', publishedText: '2026/01/01', category: '', tags: [], sectionId: 'motor', routeId: 'hardware', stageId: 'power-path' },
      { articleId: 'c', title: 'C', url: '/posts/c/', description: 'C', publishedIso: '2026-01-01', publishedText: '2026/01/01', category: '', tags: [], sectionId: 'power', routeId: 'project', stageId: 'projects' },
      { articleId: 'd', title: 'D', url: '/posts/d/', description: 'D', publishedIso: '2026-01-01', publishedText: '2026/01/01', category: '', tags: [] },
    ])
    index.append(data)

    initArticleIndex()
    const scope = document.querySelector<HTMLSelectElement>('[data-article-scope]')!
    const section = document.querySelector<HTMLSelectElement>('[data-article-section]')!
    scope.value = 'knowledge'; scope.dispatchEvent(new Event('change', { bubbles: true }))
    section.value = 'power'; section.dispatchEvent(new Event('change', { bubbles: true }))

    expect([...document.querySelectorAll('[data-article-item] h2')].map(heading => heading.textContent)).toEqual(['C'])
  })

  it('progressively appends virtual articles without replacing focused cards', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    index.dataset.batchSize = '2'
    const data = document.createElement('textarea')
    data.dataset.articleData = ''
    data.textContent = JSON.stringify(Array.from({ length: 120 }, (_, index) => ({
      articleId: `article-${index}`,
      title: `Article ${index}`,
      url: `/posts/${index}/`,
      description: 'description',
      publishedIso: '2026-01-01',
      publishedText: '2026/01/01',
      category: '',
      tags: [],
    })))
    index.append(data)

    const controller = initArticleIndex()!

    const results = document.querySelector<HTMLElement>('[data-article-results]')!
    const firstItem = results.querySelector<HTMLElement>('[data-article-item]')!
    const firstLink = firstItem.querySelector<HTMLAnchorElement>('a')!
    firstLink.focus()

    expect(results.querySelectorAll('[data-article-item]')).toHaveLength(2)
    expect(results.querySelector('[data-article-spacer-top]')).toBeNull()
    expect(results.querySelector('[data-article-spacer-bottom]')).toBeNull()

    controller.revealNextBatch()

    expect(results.querySelectorAll('[data-article-item]')).toHaveLength(4)
    expect(results.querySelector('[data-article-item]')).toBe(firstItem)
    expect(document.activeElement).toBe(firstLink)
    expect(document.querySelector('[data-article-status]')?.textContent).toBe('当前显示 4，共 120')
    expect(document.querySelector<HTMLButtonElement>('[data-article-load-more]')?.hidden).toBe(false)
  })

  it('cascades hierarchy filters, updates the URL, and exposes other articles', () => {
    initArticleIndex()
    const scope = document.querySelector<HTMLSelectElement>('[data-article-scope]')!
    const section = document.querySelector<HTMLSelectElement>('[data-article-section]')!
    const route = document.querySelector<HTMLSelectElement>('[data-article-route]')!
    const stage = document.querySelector<HTMLSelectElement>('[data-article-stage]')!
    scope.value = 'knowledge'; scope.dispatchEvent(new Event('change', { bubbles: true }))
    section.value = 'motor'; section.dispatchEvent(new Event('change', { bubbles: true }))
    expect([...route.options].find(option => option.value === 'project')!.hidden).toBe(true)
    route.value = 'control'; route.dispatchEvent(new Event('change', { bubbles: true }))
    expect([...stage.options].find(option => option.value === 'power-path')!.hidden).toBe(true)
    stage.value = 'algorithm'; stage.dispatchEvent(new Event('change', { bubbles: true }))
    expect(document.querySelectorAll('[data-article-item]:not([hidden])')).toHaveLength(1)
    expect(location.search).toContain('section=motor')
    expect(location.search).toContain('route=control')
    expect(location.search).toContain('stage=algorithm')
    scope.value = 'other'; scope.dispatchEvent(new Event('change', { bubbles: true }))
    expect(section.value).toBe('')
    expect(document.querySelectorAll('[data-article-item]:not([hidden])')).toHaveLength(1)
    expect(document.querySelector('[data-article-item]:not([hidden])')!.textContent).toContain('D')
  })

  it('restores valid hierarchy filters from the URL and removes listeners on dispose', () => {
    history.replaceState({}, '', '/list/?scope=knowledge&section=power&route=project&stage=projects')
    const controller = initArticleIndex()!
    expect(document.querySelector<HTMLSelectElement>('[data-article-section]')!.value).toBe('power')
    expect(document.querySelectorAll('[data-article-item]:not([hidden])')).toHaveLength(1)
    controller.dispose()
    const section = document.querySelector<HTMLSelectElement>('[data-article-section]')!
    section.value = 'motor'; section.dispatchEvent(new Event('change', { bubbles: true }))
    expect(location.search).toContain('section=power')
  })
  it('persists view selection and restores it on remount', () => {
    initArticleIndex()
    document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!.click()
    expect(localStorage.getItem('articleIndex.view')).toBe('grid')
    expect(document.querySelector('[data-article-results]')!.getAttribute('data-view')).toBe('grid')
    mountIndex()
    initArticleIndex()
    expect(document.querySelector('[data-article-results]')!.getAttribute('data-view')).toBe('grid')
  })

  it('uses pressed buttons and retains arrow-key navigation without tab semantics', () => {
    initArticleIndex()
    const list = document.querySelector<HTMLButtonElement>('[data-article-view="list"]')!
    const grid = document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!
    list.focus()
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(document.activeElement).toBe(grid)
    expect(grid.getAttribute('aria-pressed')).toBe('true')
    expect(list.getAttribute('aria-pressed')).toBe('false')
    expect(document.querySelector('[role="tablist"], [role="tab"], [aria-selected]')).toBeNull()
  })

  it('progressively reveals items while retaining every static link in the DOM', () => {
    const controller = initArticleIndex()!
    expect(document.querySelectorAll('[data-article-item] a')).toHaveLength(4)
    expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(2)
    controller.revealNextBatch()
    expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(0)
  })

  it('reveals everything when IntersectionObserver is unavailable', () => {
    const originalObserver = window.IntersectionObserver
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: undefined })
    try {
      initArticleIndex()
      expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(0)
      expect(document.querySelector('[data-article-status]')!.textContent).toBe('当前显示 4，共 4')
    } finally {
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: originalObserver })
    }
  })

  it('keeps load more operable and updates the live count', () => {
    initArticleIndex()
    expect(document.querySelector('[data-article-status]')!.textContent).toBe('当前显示 2，共 4')
    document.querySelector<HTMLButtonElement>('[data-article-load-more]')!.click()
    expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(0)
    expect(document.querySelector('[data-article-status]')!.textContent).toBe('当前显示 4，共 4')
    expect(document.querySelector<HTMLButtonElement>('[data-article-load-more]')!.hidden).toBe(true)
  })

  it('moves focus to the first newly revealed article when the final batch hides load more', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    const data = document.createElement('textarea')
    data.dataset.articleData = ''
    data.textContent = JSON.stringify(Array.from({ length: 4 }, (_, articleIndex) => ({
      articleId: `article-${articleIndex}`,
      title: `Article ${articleIndex}`,
      url: `/posts/${articleIndex}/`,
      description: 'description',
      publishedIso: '2026-01-01',
      publishedText: '2026/01/01',
      category: '',
      tags: [],
    })))
    index.append(data)

    initArticleIndex()
    const loadMore = document.querySelector<HTMLButtonElement>('[data-article-load-more]')!
    loadMore.focus()
    loadMore.click()

    expect(loadMore.hidden).toBe(true)
    expect(document.activeElement).toBe(document.querySelectorAll<HTMLAnchorElement>('[data-article-item] a')[2])
  })

  it('handles an observer callback fired during observer registration', () => {
    const originalObserver = window.IntersectionObserver
    class ImmediateIntersectionObserver {
      constructor(private readonly callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
      }
      disconnect() {}
      unobserve() {}
      takeRecords() { return [] }
      root = null
      rootMargin = ''
      thresholds = []
    }
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: ImmediateIntersectionObserver })

    try {
      expect(() => initArticleIndex()).not.toThrow()
      expect(document.querySelectorAll('[data-article-item][hidden]')).toHaveLength(0)
    } finally {
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: originalObserver })
    }
  })
})

describe('article index lifecycle', () => {
  it('does not accumulate hooks, clicks, keydowns, observers, or controllers across Swup round trips', () => {
    const originalObserver = window.IntersectionObserver
    let activeObservers = 0
    class CountingObserver {
      constructor(_callback: IntersectionObserverCallback) { activeObservers += 1 }
      observe() {}
      disconnect() { activeObservers -= 1 }
    }
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: CountingObserver })
    const callbacks = new Set<() => void>()
    const hooks = {
      on(_name: string, callback: () => void) {
        callbacks.add(callback)
        return () => callbacks.delete(callback)
      },
    }
    const setItem = vi.spyOn(window.localStorage, 'setItem')
    let lifecycle = installArticleIndexLifecycle({ hooks })

    const replaceContent = (enterList: boolean) => {
      document.body.innerHTML = ''
      if (enterList) {
        mountIndex()
        lifecycle = installArticleIndexLifecycle({ hooks })
      }
      Array.from(callbacks).forEach(callback => callback())
    }

    try {
      expect(callbacks.size).toBe(1)
      expect(activeObservers).toBe(1)

      replaceContent(false)
      expect(callbacks.size).toBe(1)
      expect(activeObservers).toBe(0)

      replaceContent(true)
      expect(callbacks.size).toBe(1)
      expect(activeObservers).toBe(1)
      setItem.mockClear()
      document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!.click()
      document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!
        .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      expect(setItem).toHaveBeenCalledTimes(2)

      replaceContent(false)
      replaceContent(true)
      expect(callbacks.size).toBe(1)
      expect(activeObservers).toBe(1)
      setItem.mockClear()
      document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!.click()
      document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!
        .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      expect(setItem).toHaveBeenCalledTimes(2)
    } finally {
      lifecycle.dispose()
      setItem.mockRestore()
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: originalObserver })
    }

    expect(callbacks.size).toBe(0)
    expect(activeObservers).toBe(0)
  })

  it('ignores a stale Swup refresh after the entering page reinstalls the lifecycle', () => {
    const originalObserver = window.IntersectionObserver
    let activeObservers = 0
    class CountingObserver {
      constructor(_callback: IntersectionObserverCallback) { activeObservers++ }
      observe() {}
      disconnect() { activeObservers-- }
    }
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: CountingObserver })

    try {
      const callbacks = new Set<() => void>()
      let executeEnteringPageScript = false
      const hooks = {
        on(_name: string, callback: () => void) {
          callbacks.add(callback)
          return () => callbacks.delete(callback)
        },
      }
      callbacks.add(() => {
        if (executeEnteringPageScript) installArticleIndexLifecycle({ hooks })
      })

      const lifecycle = installArticleIndexLifecycle({ hooks })
      expect(activeObservers).toBe(1)

      document.body.innerHTML = ''
      Array.from(callbacks).forEach(callback => callback())
      expect(activeObservers).toBe(0)

      mountIndex()
      executeEnteringPageScript = true
      Array.from(callbacks).forEach(callback => callback())
      expect(activeObservers).toBe(1)

      executeEnteringPageScript = false
      document.body.innerHTML = ''
      Array.from(callbacks).forEach(callback => callback())
      expect(activeObservers).toBe(0)
      lifecycle.dispose()
    } finally {
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: originalObserver })
    }
  })

  it('keeps enhancement usable when localStorage is unavailable', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError') })
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError') })
    try {
      const controller = initArticleIndex()
      expect(controller).toBeDefined()
      expect(document.querySelector<HTMLElement>('[data-article-index]')?.dataset.enhanced).toBe('true')
      document.querySelector<HTMLButtonElement>('[data-article-view="grid"]')!.click()
      expect(document.querySelector<HTMLElement>('[data-article-results]')?.dataset.view).toBe('grid')
      controller?.dispose()
    } finally {
      getItem.mockRestore()
      setItem.mockRestore()
    }
  })

  it('only hides the complete static fallback after enhancement succeeds', () => {
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    expect(component).toContain(':global(html.js .article-index[data-enhanced] .article-index__fallback)')
    expect(component).not.toMatch(/:global\(html\.js\)\s+\.article-index__fallback(?:\s*,|\s*\{)/)
  })

  it('shows only the complete fallback while JavaScript enhancement is unavailable', () => {
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    expect(component).toContain(':global(html.js .article-index:not([data-enhanced]) > :not([data-article-no-js]))')
  })

  it('keeps the complete fallback visible when virtual article JSON is malformed', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    const fallback = document.createElement('ol')
    fallback.dataset.articleNoJs = ''
    fallback.innerHTML = '<li><a href="/posts/fallback/">Fallback</a></li>'
    const data = document.createElement('textarea')
    data.dataset.articleData = ''
    data.textContent = '[{"articleId":"broken"'
    index.append(data, fallback)

    expect(() => initArticleIndex()).not.toThrow()
    expect(index.hasAttribute('data-enhanced')).toBe(false)
    expect(fallback.hidden).toBe(false)
    expect(fallback.querySelector('a')?.getAttribute('href')).toBe('/posts/fallback/')
  })

  it('safely normalizes optional virtual article fields before rendering', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    const data = document.createElement('textarea')
    data.dataset.articleData = ''
    data.textContent = JSON.stringify([{ articleId: 'safe', title: 'Safe article', url: '/posts/safe/' }])
    index.append(data)

    expect(() => initArticleIndex()).not.toThrow()
    expect(index.dataset.enhanced).toBe('true')
    const card = document.querySelector<HTMLElement>('[data-article-id="safe"] .article-index__card')!
    expect(card.querySelector('.article-index__description')?.textContent).toBe('阅读文章详情')
    expect(card.querySelectorAll('[data-article-tag]')).toHaveLength(0)
  })

  it('rejects virtual article entries without safe core identity fields', () => {
    const index = document.querySelector<HTMLElement>('[data-article-index]')!
    const fallback = document.createElement('ol')
    fallback.dataset.articleNoJs = ''
    fallback.innerHTML = '<li><a href="/posts/fallback/">Fallback</a></li>'
    const data = document.createElement('textarea')
    data.dataset.articleData = ''
    data.textContent = JSON.stringify([{ articleId: '', title: 'Unsafe', url: 'javascript:alert(1)' }])
    index.append(data, fallback)

    expect(() => initArticleIndex()).not.toThrow()
    expect(index.hasAttribute('data-enhanced')).toBe(false)
    expect(fallback.querySelector('a')).not.toBeNull()
  })

  it('uses Swup hooks without accumulating hooks or controllers across round trips', () => {
    const callbacks = new Map<string, Set<() => void>>()
    const hooks = {
      on(name: string, callback: () => void) {
        const set = callbacks.get(name) ?? new Set()
        set.add(callback)
        callbacks.set(name, set)
        return () => set.delete(callback)
      },
    }
    const firstLifecycle = installArticleIndexLifecycle({ hooks })
    expect(callbacks.get('content:replace')?.size).toBe(1)
    const lifecycle = installArticleIndexLifecycle({ hooks })
    expect(callbacks.get('content:replace')?.size).toBe(1)
    callbacks.get('content:replace')!.forEach(callback => callback())
    mountIndex()
    callbacks.get('content:replace')!.forEach(callback => callback())
    expect(document.querySelector('[data-article-index]')!.getAttribute('data-enhanced')).toBe('true')
    expect(callbacks.get('content:replace')?.size).toBe(1)
    lifecycle.dispose()
    expect(callbacks.get('content:replace')?.size).toBe(0)
    expect(document.querySelector('[data-article-index]')!.hasAttribute('data-enhanced')).toBe(false)
    firstLifecycle.dispose()
  })

  it('initializes immediately without Swup', () => {
    const lifecycle = installArticleIndexLifecycle()
    expect(document.querySelector('[data-article-index]')!.getAttribute('data-enhanced')).toBe('true')
    lifecycle.dispose()
  })
})

describe('article index contracts', () => {
  it('filters by canonical section, route, and stage IDs', () => {
    const items = [
      { sectionId: 'motor', routeId: 'control', stageId: 'algorithm' },
      { sectionId: 'motor', routeId: 'hardware', stageId: 'power-path' },
      { sectionId: 'power', routeId: 'project', stageId: 'projects' },
      {},
    ]
    expect(filterArticleIndexItems(items, { sectionId: 'motor', routeId: 'control', stageId: 'algorithm', scope: 'knowledge' })).toEqual([items[0]])
    expect(filterArticleIndexItems(items, { scope: 'other' })).toEqual([items[3]])
  })

  it('clears invalid descendants when an ancestor changes', () => {
    const hierarchy = [
      { sectionId: 'motor', routeId: 'control', stageId: 'algorithm' },
      { sectionId: 'power', routeId: 'project', stageId: 'projects' },
    ]
    expect(normalizeArticleIndexFilters({ sectionId: 'power', routeId: 'control', stageId: 'algorithm', scope: 'knowledge' }, hierarchy)).toEqual({ sectionId: 'power', scope: 'knowledge' })
    expect(normalizeArticleIndexFilters({ sectionId: 'motor', routeId: 'control', stageId: 'projects', scope: 'knowledge' }, hierarchy)).toEqual({ sectionId: 'motor', routeId: 'control', scope: 'knowledge' })
  })

  it('restores canonical filters from URL query parameters', () => {
    expect(parseArticleIndexFilters('?scope=knowledge&section=motor&route=control&stage=algorithm')).toEqual({ scope: 'knowledge', sectionId: 'motor', routeId: 'control', stageId: 'algorithm' })
    expect(parseArticleIndexFilters('?scope=other&section=motor')).toEqual({ scope: 'other' })
  })

  it('uses a pressed button group in the real list template', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    const listComponent = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    const tabs = fs.readFileSync('src/components/controls/AnimatedTabs.svelte', 'utf8')
    expect(page).not.toContain('slot="tabs"')
    expect(listComponent).toContain('<AnimatedTabs activeTab="list" />')
    expect(tabs).toContain('role="group"')
    expect(tabs).toContain('aria-label="文章视图"')
    expect(tabs).toContain('aria-pressed={activeTab === "list"}')
    expect(tabs).toContain('aria-pressed={activeTab === "grid"}')
    expect(tabs).toContain('article-index__tab-indicator')
    expect(tabs).toMatch(/transition:\s*transform/)
    expect(tabs).toMatch(/:has\([^)]*aria-pressed="true"[^)]*\)[^{]*\.article-index__tab-indicator/)
    expect(page).not.toContain('role="tablist"')
    expect(page).not.toContain('role="tab"')
    expect(page).not.toContain('aria-selected=')
    expect(tabs).not.toContain('role="tablist"')
    expect(tabs).not.toContain('role="tab"')
    expect(tabs).not.toContain('aria-selected=')
    expect(page).not.toContain('astro:before-swap')
    expect(page).toContain('installArticleIndexLifecycle(window.swup)')
    expect(page).toContain('document.addEventListener("swup:enable"')
  })

  it('uses the Firefly virtual-list components with a complete no-JS fallback', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    expect(page).toContain('ArticleVirtualList')
    expect(fs.existsSync('src/components/pages/ArticleVirtualList.svelte')).toBe(true)
    expect(fs.existsSync('src/components/controls/AnimatedTabs.svelte')).toBe(true)
    expect(page).toContain('<ArticleVirtualList')
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    expect(component).toContain('data-article-data')
    expect(component).toContain('data-article-no-js')
    expect(component).not.toContain('<noscript>')
    expect(component).toContain(':global(html.js .article-index[data-enhanced] .article-index__fallback)')
    expect(component).toContain(':global(html:not(.js)) .article-index > :not([data-article-no-js])')
    expect(component).toContain('initialPosts')
    expect(component).toContain('posts.slice(0, batchSize)')
    expect(component).not.toContain('onMount')
    expect(component).not.toContain('mounted')
  })

  it('embeds the complete virtual-list dataset in the production page', () => {
    const html = fs.readFileSync('dist/list/index.html', 'utf8')
    const encodedPayload = html.match(/<textarea[^>]*data-article-data[^>]*>([\s\S]*?)<\/textarea>/i)?.[1]
    expect(encodedPayload).toBeTruthy()
    const decoder = document.createElement('textarea')
    decoder.innerHTML = encodedPayload!
    const payload = JSON.parse(decoder.value) as Array<{ articleId: string }>
    const renderedPage = document.createElement('div')
    renderedPage.innerHTML = html
    const renderedCount = Number(renderedPage.querySelector('[data-article-index] .article-index__tools strong')?.textContent)
    expect(payload).toHaveLength(renderedCount)
    expect(payload.every(article => typeof article.articleId === 'string' && article.articleId.length > 0)).toBe(true)
    expect((html.match(/data-article-item/g) || []).length).toBeLessThan(renderedCount)
  })

  it('renders canonical hierarchy filters and item data in the real list template', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    expect(component).toContain('data-article-scope')
    expect(component).toContain('data-article-section')
    expect(component).toContain('data-article-route')
    expect(component).toContain('data-article-stage')
    expect(component).toContain('data-section-id={post.sectionId}')
    expect(component).toContain('data-route-id={post.routeId}')
    expect(component).toContain('data-stage-id={post.stageId}')
    expect(component).toContain('articleId: string')
    expect(component).toContain('(post.articleId)')
    expect(page).toContain('articleId: post.data.articleId')
    expect(page).not.toContain('id: post.id')
    expect(page).toContain('sectionId: post.data.sectionId')
    expect(page).toContain('routeId: post.data.routeId')
    expect(page).toContain('stageId: post.data.stageId')
    expect(page).not.toMatch(/post\.data\.(section|navGroup|chapter|stage)(?!Id)/)
  })

  it('preserves cover, status, category, and tag information in progressive and fallback cards', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    const controller = fs.readFileSync('src/utils/article-index-controller.ts', 'utf8')
    expect(page).toContain('defaultArticleCover')
    expect(page).toContain('imageUrl: post.data.image || defaultArticleCover.src')
    expect(page).toContain('pinned: post.data.pinned')
    expect(page).toContain('encrypted: presentation === "encrypted-placeholder"')
    expect(page).toContain('categoryUrl: getCategoryUrl(post.data.category)')
    expect(page).toContain('tagLinks: post.data.tags.map')
    expect(component).toContain('class="article-index__cover"')
    expect(component).toContain('data-article-pinned')
    expect(component).toContain('data-article-encrypted')
    expect(component).toContain('href={post.categoryUrl}')
    expect(component).toContain('href={tag.url}')
    expect(component.match(/class="article-index__card"/g)?.length).toBeGreaterThanOrEqual(1)
    expect(controller).toContain('article-index__cover')
    expect(controller).toContain('data-article-tag')
    expect(controller).toContain('post.categoryUrl')
  })

  it('loads the first progressive cover eagerly for stable LCP', () => {
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    const controller = fs.readFileSync('src/utils/article-index-controller.ts', 'utf8')
    expect(component).toContain('{#each initialPosts as post, index (post.articleId)}')
    expect(component).toContain('loading={index === 0 ? "eager" : "lazy"}')
    expect(component).toContain('fetchpriority={index === 0 ? "high" : "auto"}')
    expect(controller).toContain('renderVirtualArticle(post, itemIndex === 0)')
    expect(controller).toContain('cover.loading = priority ? "eager" : "lazy"')
    expect(controller).toContain('cover.fetchPriority = priority ? "high" : "auto"')
  })

  it('keeps the no-JS fallback link-complete without duplicating full cards and images', () => {
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    const fallback = component.match(/<ol class="article-index__fallback"[\s\S]*?<\/ol>/)?.[0] ?? ''
    expect(fallback).toContain('class="article-index__fallback-link"')
    expect(fallback).not.toContain('class="article-index__card"')
    expect(fallback).not.toContain('<img')
  })

  it('classifies excluded, encrypted, and public index entries', () => {
    expect(getArticleIndexPresentation({ draft: true })).toBe('excluded')
    expect(getArticleIndexPresentation({ visibility: 'private' })).toBe('excluded')
    expect(getArticleIndexPresentation({ hidden: true })).toBe('excluded')
    expect(getArticleIndexPresentation({ visibility: 'encrypted' })).toBe('encrypted-placeholder')
    expect(getArticleIndexPresentation({ encrypted: true })).toBe('encrypted-placeholder')
    expect(getArticleIndexPresentation({ password: 'secret' })).toBe('encrypted-placeholder')
    expect(getArticleIndexPresentation({ encryptedPayload: '/payload' })).toBe('encrypted-placeholder')
    expect(getArticleIndexPresentation({ description: 'public' })).toBe('public-summary')
    expect(isPublicArticle({ visibility: 'encrypted' })).toBe(true)
  })

  it('uses a fixed safe encrypted summary instead of article descriptions', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    expect(page).toContain('该文章已加密，请打开后验证访问权限')
    expect(page).toMatch(/presentation\s*===\s*["']encrypted-placeholder["'][\s\S]*?该文章已加密，请打开后验证访问权限/)
  })

  it('renders a complete no-JS fallback, empty state, and knowledge sidebar slot contract', () => {
    const page = fs.readFileSync('src/pages/list.astro', 'utf8')
    const component = fs.readFileSync('src/components/pages/ArticleVirtualList.svelte', 'utf8')
    const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
    expect(component).toContain('data-article-item')
    expect(component).toContain('暂无公开文章')
    expect(component).toContain('data-article-no-js')
    expect(component).toContain('data-article-id={post.articleId}')
    const controller = fs.readFileSync('src/utils/article-index-controller.ts', 'utf8')
    expect(component).toContain('data-article-progressive-list')
    expect(component).not.toContain('data-article-spacer-top')
    expect(component).not.toContain('data-article-spacer-bottom')
    expect(controller).not.toContain('estimatedItemHeight')
    expect(controller).not.toContain('windowStart')
    expect(controller).not.toContain('replaceChildren(')
    expect(controller).not.toContain('addEventListener("scroll"')
    expect(fs.readFileSync('src/layouts/Layout.astro', 'utf8')).toContain('document.documentElement.classList.add("js")')
    expect(page).not.toContain('client:only')
    expect(layout).toContain('knowledgeSidebar')
    expect(layout).toContain('<slot name="knowledge-sidebar"')
  })
})
