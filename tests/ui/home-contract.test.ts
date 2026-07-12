import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const read = (file: string) => fs.readFileSync(file, 'utf8')
const index = read('src/pages/index.astro')
const config = read('src/config/homeConfig.ts')
const components = [
  'HomeHero.astro',
  'HomeTicker.astro',
  'HomeDataLayer.astro',
  'HomeDisplayLayer.astro',
].map(file => read(path.join('src/components/layout', file)))
const homeCss = read('src/styles/home.css')

function mediaBlock(css: string, query: RegExp): string {
  const match = query.exec(css)
  if (!match) return ''
  let depth = 1
  for (let cursor = match.index + match[0].length; cursor < css.length; cursor += 1) {
    if (css[cursor] === '{') depth += 1
    if (css[cursor] === '}') depth -= 1
    if (depth === 0) return css.slice(match.index + match[0].length, cursor)
  }
  return ''
}

describe('branded home page contract', () => {
  it('composes four semantic visual chapters inside the existing application shell', () => {
    expect(index).toContain('<MainGridLayout>')
    for (const component of ['HomeHero', 'HomeTicker', 'HomeDataLayer', 'HomeDisplayLayer']) {
      expect(index).toMatch(new RegExp(`<${component}\\s*/>`))
    }
    expect(components.map(source => source.match(/data-home-section="([^"]+)"/)?.[1])).toEqual([
      'hero', 'ticker', 'data', 'display',
    ])
    expect(index).not.toContain('PostPage')
  })

  it('drives all visible copy, metrics, links and media from a complete typed config', () => {
    for (const source of components) expect(source).toContain('homeConfig')
    expect(config).toMatch(/export interface HomeConfig/)
    expect(config).toMatch(/satisfies HomeConfig/)
    expect(config).toMatch(/brand:\s*"null42"/)
    expect(config).toMatch(/metrics:\s*\[/)
    expect(config).toMatch(/links:\s*\[/)
    expect(config).toMatch(/media:\s*\{/)
    expect(config).toMatch(/labels:\s*\{/)
    expect(components.join('\n')).not.toMatch(/https?:\/\//)
    expect(components.join('\n')).not.toMatch(/DATA \/ PRACTICE|用可检查的数据|首页主要入口|知识库原则|00 — 01/)
  })

  it('contains no reference-author identity or private resource residue', () => {
    const source = [index, config, ...components, homeCss].join('\n')
    expect(source).not.toMatch(/MmzMing|fqzlr|20447289|co\.tsh520\.cn/i)
    expect(source).not.toMatch(/(?:qq|bilibili|github)\.com\/(?:MmzMing|fqzlr)/i)
  })

  it('defines intrinsic dimensions and explicit loading semantics for every image', () => {
    const images = components.join('\n').match(/<img[\s\S]*?>/g) ?? []
    expect(images.length).toBeGreaterThan(1)
    expect(images.filter(image => /loading="eager"/.test(image))).toHaveLength(1)
    expect(images.filter(image => /loading="lazy"/.test(image)).length).toBeGreaterThanOrEqual(1)
    expect(images.filter(image => /loading="eager"/.test(image))[0]).toMatch(/fetchpriority="high"/)
    for (const image of images) {
      expect(image).toMatch(/width=\{homeConfig\.media\.[a-z]+\.width\}/)
      expect(image).toMatch(/height=\{homeConfig\.media\.[a-z]+\.height\}/)
      expect(image).toMatch(/alt=\{homeConfig\.media\.[a-z]+\.alt\}/)
      expect(image).toMatch(/loading="(?:eager|lazy)"/)
    }
  })

  it('disables expensive effects at 390px and all nonessential motion for reduced motion', () => {
    const mobile = mediaBlock(homeCss, /@media\s*\(max-width:\s*767px\)\s*\{/)
    expect(mobile).toMatch(/\.home-rain[\s\S]*display:\s*none/)
    expect(mobile).toMatch(/\.home-shutter[\s\S]*display:\s*none/)
    expect(mobile).toMatch(/\.home-background-video[\s\S]*display:\s*none/)

    const reduced = mediaBlock(homeCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/)
    expect(reduced).toMatch(/animation:\s*none\s*!important/)
    expect(reduced).toMatch(/scroll-behavior:\s*auto\s*!important/)
    expect(reduced).toMatch(/transform:\s*none\s*!important/)
  })

  it('exposes resilient content and delegates lifecycle ownership to the global layout', () => {
    const layout = read('src/layouts/Layout.astro')
    expect(config).toMatch(/href:\s*"\/list\/"/)
    expect(config).toMatch(/href:\s*"\/knowledge\/"/)
    expect(index).not.toMatch(/client:(?:only|load)/)
    expect(index).not.toContain('initHomeExperience')
    expect(layout).toContain('syncHomeExperience')
    expect(layout).toMatch(/hooks\.on\("content:replace"/)
  })

  it('uses one h1 and a JS-backed dynamic viewport fallback', () => {
    expect(components.join('\n').match(/<h1\b/g)).toHaveLength(1)
    expect(homeCss).toMatch(/min-height:\s*var\(--home-viewport-height,\s*100dvh\)/)
  })
})
