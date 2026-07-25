import { createMarkdownProcessor } from '@astrojs/markdown-remark'
import matter from 'gray-matter'
import sanitizeHtml from 'sanitize-html'
import { createSiteMarkdownProcessorOptions } from '../../../src/plugins/site-markdown-pipeline'
import { normalizeVitePressContainers } from '../markdown-compat'

const safeColor = /^(?:#[0-9a-f]{3,8}|(?:rgb|hsl)a?\([\d\s.,%+-]+\)|var\(--[\w-]+\)|[a-z]+)$/i
const safeLength = /^(?:-?(?:\d+|\d*\.\d+)(?:px|em|rem|ex|ch|%|vh|vw)?|auto|none)$/i
const safeTransform = /^(?:none|(?:translate|translateX|translateY|scale|scaleX|scaleY|rotate)\([-\d\s.,%a-z]+\)(?:\s+|$))+$/i

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'annotation', 'center', 'circle', 'details', 'figcaption', 'figure', 'g', 'img', 'line', 'mark',
  'math', 'mfrac', 'mi', 'mn', 'mo', 'mover', 'mrow', 'mspace', 'msqrt', 'mstyle',
  'msub', 'msubsup', 'msup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover',
  'path', 'polygon', 'polyline', 'rect', 'section', 'semantics', 'summary', 'svg', 'use'
]

function sanitizeRenderedHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      '*': ['aria-*', 'class', 'data-*', 'dir', 'id', 'lang', 'role', 'style', 'tabindex', 'title'],
      a: ['href', 'name', 'rel', 'target'],
      annotation: ['encoding'],
      img: ['alt', 'decoding', 'height', 'loading', 'referrerpolicy', 'sizes', 'src', 'srcset', 'width'],
      math: ['display', 'xmlns'],
      svg: ['aria-hidden', 'fill', 'focusable', 'height', 'preserveAspectRatio', 'stroke', 'viewBox', 'width'],
      path: ['d', 'fill', 'stroke', 'stroke-linecap', 'stroke-linejoin', 'stroke-width'],
      circle: ['cx', 'cy', 'fill', 'r', 'stroke', 'stroke-width'],
      line: ['fill', 'stroke', 'stroke-width', 'x1', 'x2', 'y1', 'y2'],
      polygon: ['fill', 'points', 'stroke', 'stroke-width'],
      polyline: ['fill', 'points', 'stroke', 'stroke-width'],
      rect: ['fill', 'height', 'rx', 'ry', 'stroke', 'stroke-width', 'width', 'x', 'y'],
      use: ['href', 'x', 'y']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedStyles: {
      '*': {
        'background-color': [safeColor],
        bottom: [safeLength],
        color: [safeColor],
        height: [safeLength],
        left: [safeLength],
        'margin-bottom': [safeLength],
        'margin-left': [safeLength],
        'margin-right': [safeLength],
        'margin-top': [safeLength],
        'max-height': [safeLength],
        'max-width': [safeLength],
        'min-height': [safeLength],
        'min-width': [safeLength],
        opacity: [/^(?:0|1|0?\.\d+)$/],
        'padding-bottom': [safeLength],
        'padding-left': [safeLength],
        'padding-right': [safeLength],
        'padding-top': [safeLength],
        position: [/^(?:absolute|relative|static)$/],
        right: [safeLength],
        'text-align': [/^(?:center|end|justify|left|right|start)$/],
        top: [safeLength],
        transform: [safeTransform],
        'vertical-align': [safeLength, /^(?:baseline|bottom|middle|sub|super|text-bottom|text-top|top)$/],
        width: [safeLength]
      }
    }
  })
}

const processor = createMarkdownProcessor({
  syntaxHighlight: 'shiki',
  ...createSiteMarkdownProcessorOptions()
})

export async function renderEncryptedMarkdown(markdown: string): Promise<string> {
  const parsed = matter(markdown)
  const renderer = await processor
  const result = await renderer.render(normalizeVitePressContainers(parsed.content))
  return sanitizeRenderedHtml(result.code)
}
