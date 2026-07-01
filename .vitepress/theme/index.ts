import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ArchivePage from './components/ArchivePage.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import SvgFigure from './components/SvgFigure.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ArchivePage', ArchivePage)
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('SvgFigure', SvgFigure)
  }
} satisfies Theme
