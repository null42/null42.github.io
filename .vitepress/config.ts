import { defineConfig } from 'vitepress'
import { generatedSidebar } from './generated/sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'lx的个人知识库',
  description: '电源控制、电机控制、仿真和工程学习记录',
  cleanUrls: false,
  lastUpdated: true,
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
