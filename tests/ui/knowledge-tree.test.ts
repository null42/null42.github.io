// @vitest-environment happy-dom
import fs from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { initKnowledgeTree, installKnowledgeTreeLifecycle } from '../../src/utils/knowledge-tree-controller'

function mountTree() {
  document.body.innerHTML = `
    <nav data-knowledge-tree data-storage-key="knowledgeTree:test" data-current-section="motor" data-current-route="control" data-current-stage="algorithm" data-current-article="motor/algorithm/foc">
      <ul>
        <li data-tree-node="section:motor"><button data-tree-toggle aria-expanded="false" aria-controls="section-motor">Motor</button><ul id="section-motor" hidden>
          <li data-tree-node="route:motor:control"><button data-tree-toggle aria-expanded="false" aria-controls="route-control">Control</button><ul id="route-control" hidden>
            <li data-tree-node="stage:motor:control:algorithm"><button data-tree-toggle aria-expanded="false" aria-controls="stage-algorithm">Algorithm</button><ul id="stage-algorithm" hidden>
              <li><a data-tree-article="motor/algorithm/foc" href="/posts/motor/algorithm/foc/">FOC</a></li>
              <li><a data-tree-article="motor/algorithm/svpwm" href="/posts/motor/algorithm/svpwm/">SVPWM</a></li>
            </ul></li>
          </ul></li>
        </ul></li>
      </ul>
    </nav>`
}

beforeEach(() => { vi.restoreAllMocks(); localStorage.clear(); mountTree() })

describe('knowledge tree interactions', () => {
  it('expands the current path, highlights, and scrolls to the current article', () => {
    let scrolled = false
    document.querySelector<HTMLElement>('[data-tree-article="motor/algorithm/foc"]')!.scrollIntoView = () => { scrolled = true }
    initKnowledgeTree()
    expect([...document.querySelectorAll('[data-tree-toggle]')].every((button) => button.getAttribute('aria-expanded') === 'true')).toBe(true)
    expect(document.querySelector('[data-tree-article="motor/algorithm/foc"]')!.getAttribute('aria-current')).toBe('page')
    expect(scrolled).toBe(true)
  })

  it('persists namespaced collapse state and supports keyboard expansion and navigation', () => {
    initKnowledgeTree()
    const stage = document.querySelector<HTMLButtonElement>('[data-tree-node^="stage:"] [data-tree-toggle]')!
    stage.click()
    expect(JSON.parse(localStorage.getItem('knowledgeTree:test')!)).toMatchObject({ 'stage:motor:control:algorithm': false })
    stage.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(stage.getAttribute('aria-expanded')).toBe('true')
    stage.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(document.querySelector('[data-tree-article="motor/algorithm/foc"]'))
  })

  it.each(['null', '[]', '"invalid"', '{not-json'])('ignores invalid persisted state: %s', (persisted) => {
    localStorage.setItem('knowledgeTree:test', persisted)
    expect(() => initKnowledgeTree()).not.toThrow()
    const stage = document.querySelector<HTMLButtonElement>('[data-tree-node^="stage:"] [data-tree-toggle]')!
    expect(() => stage.click()).not.toThrow()
    expect(JSON.parse(localStorage.getItem('knowledgeTree:test')!)).toMatchObject({ 'stage:motor:control:algorithm': false })
  })

  it('survives SecurityError while reading persisted state', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage access denied', 'SecurityError')
    })
    expect(() => initKnowledgeTree()).not.toThrow()
    expect(document.querySelector('[data-knowledge-tree]')!.getAttribute('data-enhanced')).toBe('true')
  })

  it.each(['SecurityError', 'QuotaExceededError'])('survives %s while persisting state', (errorName) => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage write denied', errorName)
    })
    initKnowledgeTree()
    const stage = document.querySelector<HTMLButtonElement>('[data-tree-node^="stage:"] [data-tree-toggle]')!
    expect(() => stage.click()).not.toThrow()
    expect(stage.getAttribute('aria-expanded')).toBe('false')
  })

  it('rebinds on Swup replacement without accumulating hooks or controllers', () => {
    const callbacks = new Set<() => void>()
    const hooks = { on(_name: string, callback: () => void) { callbacks.add(callback); return () => callbacks.delete(callback) } }
    installKnowledgeTreeLifecycle({ hooks })
    const lifecycle = installKnowledgeTreeLifecycle({ hooks })
    expect(callbacks.size).toBe(1)
    callbacks.forEach(callback => callback())
    expect(document.querySelector('[data-knowledge-tree]')!.getAttribute('data-enhanced')).toBe('true')
    lifecycle.dispose()
    expect(callbacks.size).toBe(0)
  })

  it('ignores a stale Swup refresh after the entering tree reinstalls its lifecycle', () => {
    const callbacks = new Set<() => void>()
    let executeEnteringScript = false
    const hooks = { on(_name: string, callback: () => void) { callbacks.add(callback); return () => callbacks.delete(callback) } }
    callbacks.add(() => { if (executeEnteringScript) installKnowledgeTreeLifecycle({ hooks }) })
    installKnowledgeTreeLifecycle({ hooks })
    document.body.innerHTML = ''
    Array.from(callbacks).forEach(callback => callback())

    mountTree(); executeEnteringScript = true
    const toggle = document.querySelector<HTMLButtonElement>('[data-tree-toggle]')!
    const originalAdd = toggle.addEventListener.bind(toggle)
    const originalRemove = toggle.removeEventListener.bind(toggle)
    let activeToggleClicks = 0
    toggle.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (type === 'click') activeToggleClicks++
      originalAdd(type, listener, options)
    }) as typeof toggle.addEventListener
    toggle.removeEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
      if (type === 'click') activeToggleClicks--
      originalRemove(type, listener, options)
    }) as typeof toggle.removeEventListener
    Array.from(callbacks).forEach(callback => callback())
    expect(activeToggleClicks).toBe(1)
    document.body.innerHTML = ''; executeEnteringScript = false
    Array.from(callbacks).forEach(callback => callback())
    expect(activeToggleClicks).toBe(0)
  })

  it('enhances both desktop and drawer tree instances independently', () => {
    document.body.insertAdjacentHTML('beforeend', document.querySelector('[data-knowledge-tree]')!.outerHTML.replace('knowledgeTree:test', 'knowledgeTree:drawer'))
    initKnowledgeTree()
    expect(document.querySelectorAll('[data-knowledge-tree][data-enhanced="true"]')).toHaveLength(2)
    const toggles = document.querySelectorAll<HTMLButtonElement>('[data-tree-node^="stage:"] [data-tree-toggle]')
    toggles[1].click()
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true')
    expect(toggles[1].getAttribute('aria-expanded')).toBe('false')
  })
})

describe('knowledge tree template contract', () => {
  it('renders encrypted placeholders as non-clickable text when slug is absent', () => {
    const component = fs.readFileSync('src/components/knowledge/KnowledgeTree.astro', 'utf8')
    expect(component).toContain('article.slug ?')
    expect(component).toContain('data-tree-article-placeholder={article.articleId}')
    expect(component).not.toContain('{stage.articles.map((article) => <li><a data-tree-article={article.articleId} href={`/posts/${article.slug}/`}>{article.title}</a></li>)}')
  })

  it('renders all four canonical levels as static links and controls', () => {
    const component = fs.readFileSync('src/components/knowledge/KnowledgeTree.astro', 'utf8')
    expect(component).toContain('data-current-section')
    expect(component).toContain('data-current-route')
    expect(component).toContain('data-current-stage')
    expect(component).toContain('data-current-article')
    expect(component).toContain('data-tree-toggle')
    expect(component).toContain('data-tree-article={article.articleId}')
    expect(component).toContain('href={`/posts/${article.slug}/`}')
    expect(component).toContain('instanceId')
    expect(component).toContain('`${instanceId}-section-${section.id}`')
  })
})
