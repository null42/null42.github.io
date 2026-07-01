import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ArchivePage from './components/ArchivePage.vue'
import EncryptedArticle from './components/EncryptedArticle.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import SearchPage from './components/SearchPage.vue'
import SvgFigure from './components/SvgFigure.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ArchivePage', ArchivePage)
    app.component('EncryptedArticle', EncryptedArticle)
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('SearchPage', SearchPage)
    app.component('SvgFigure', SvgFigure)
  }
} satisfies Theme
