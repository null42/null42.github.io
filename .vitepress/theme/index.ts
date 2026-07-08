import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import mermaid from 'mermaid'
import Layout from './Layout.vue'
import ArchivePage from './components/ArchivePage.vue'
import EncryptedArticle from './components/EncryptedArticle.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import SearchPage from './components/SearchPage.vue'
import SvgFigure from './components/SvgFigure.vue'
import { normalizeMermaidSource } from '../../scripts/kb/markdown-rendering'
import 'katex/dist/katex.min.css'
import './style.css'

let mermaidFallbackId = 0

async function renderPendingMermaid(): Promise<void> {
  if (typeof document === 'undefined') return

  const blocks = Array.from(document.querySelectorAll<HTMLElement>('.kb-mermaid'))
    .filter((block) => !block.querySelector('svg') && !block.dataset.rendering)

  if (blocks.length === 0) return

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    flowchart: {
      htmlLabels: false,
      markdownAutoWrap: false
    },
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
  })

  for (const block of blocks) {
    const code = block.querySelector('code')?.textContent || ''
    if (!code.trim()) continue
    block.dataset.rendering = 'true'

    try {
      const id = `mermaid-fallback-${Date.now().toString(36)}-${mermaidFallbackId += 1}`
      const result = await mermaid.render(id, normalizeMermaidSource(code))
      block.innerHTML = `<div class="kb-mermaid-svg">${result.svg}</div>`
      block.dataset.rendered = 'true'
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      block.innerHTML = `<pre class="kb-mermaid-error"><code>${escapeHtml(message)}\n\n${escapeHtml(code)}</code></pre>`
    } finally {
      delete block.dataset.rendering
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('ArchivePage', ArchivePage)
    app.component('EncryptedArticle', EncryptedArticle)
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('SearchPage', SearchPage)
    app.component('SvgFigure', SvgFigure)

    if (typeof window !== 'undefined') {
      window.setTimeout(renderPendingMermaid, 0)
      router.onAfterRouteChanged = () => {
        window.setTimeout(renderPendingMermaid, 0)
      }
    }
  }
} satisfies Theme
