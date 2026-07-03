import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'
import { generatedSidebar } from './generated/sidebar'
import { nonPublicContentPatterns } from '../scripts/kb/content-exclusions'
import { copyEncryptedPayloadsToDist } from '../scripts/kb/encrypt/publish-payloads'

const knownFenceLanguages = new Set([
  'bash',
  'c',
  'cmd',
  'cpp',
  'css',
  'diff',
  'dockerfile',
  'go',
  'h',
  'html',
  'ini',
  'java',
  'js',
  'json',
  'jsx',
  'makefile',
  'markdown',
  'md',
  'mermaid',
  'powershell',
  'py',
  'python',
  'sh',
  'shell',
  'text',
  'ts',
  'tsx',
  'txt',
  'vue',
  'xml',
  'yaml',
  'yml'
])

export default defineConfig({
  lang: 'zh-CN',
  title: 'lx的个人知识库',
  description: '电源控制、电机控制、仿真和工程学习记录',
  cleanUrls: false,
  ignoreDeadLinks: [
    (link) => shouldIgnoreMigratedKnowledgeLink(link)
  ],
  srcExclude: nonPublicContentPatterns,
  vite: {
    plugins: [
      {
        name: 'kb-copy-encrypted-payloads',
        apply: 'build',
        async closeBundle() {
          await copyEncryptedPayloadsToDist()
        }
      }
    ]
  },
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(markdownItKatex, {
        throwOnError: false,
        strict: false
      })
      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = normalizeFenceInfo(token.info)
        token.info = info
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
      { text: '搜索', link: '/search.html' },
      { text: '工具', link: '/tools.html' },
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
      copyright: 'Copyright 2026 lx'
    }
  }
})

function shouldIgnoreMigratedKnowledgeLink(link: string): boolean {
  if (link.startsWith('/sims/')) return true
  if (!link.startsWith('./') && !link.startsWith('../')) return false

  const cleanLink = link.split('#')[0].split('?')[0]
  if (/\.(c|h|hpp|cpp|rst)$/i.test(cleanLink)) return true
  if (cleanLink.endsWith('/index') || cleanLink === './index' || cleanLink === '../index') return true

  const filename = cleanLink.split('/').pop() || ''
  return !/\.[a-z0-9]+$/i.test(filename)
}

function normalizeFenceInfo(info: string): string {
  const lang = info.trim().split(/\s+/)[0]?.toLowerCase()
  if (!lang) return 'text'
  if (knownFenceLanguages.has(lang)) return lang
  return 'text'
}
