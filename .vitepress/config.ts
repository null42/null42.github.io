import { defineConfig } from 'vitepress'
import { generatedSidebar } from './generated/sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'lx的个人知识库',
  description: '电源控制、电机控制、仿真和工程学习记录',
  cleanUrls: false,
  lastUpdated: true,
  markdown: {
    config(md) {
      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info.trim()
        if (info === 'mermaid') {
          const encoded = encodeURIComponent(token.content)
          return `<MermaidDiagram code="${encoded}" />`
        }
        return defaultFence ? defaultFence(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options)
      }
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '电源控制', link: '/content/power/getting-started.html' },
      { text: '电机控制', link: '/content/motor/getting-started.html' },
      { text: '文章库', link: '/archive.html' },
      { text: '关于我', link: '/about.html' }
    ],
    sidebar: generatedSidebar,
    outline: {
      level: [2, 3],
      label: '目录'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/null42' }],
    footer: {
      message: 'Powered by VitePress. Written offline, published with care.',
      copyright: 'Copyright © 2026 lx'
    }
  }
})
