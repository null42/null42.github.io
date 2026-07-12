import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const sourceRoot = 'src'
const styleExtensions = new Set(['.css', '.styl', '.astro', '.svelte'])
const privateReferenceResource = /(?:https?:)?\/\/[^\s"')]*(?:fqzlr|mmzming|20447289|co\.tsh520\.cn)/i

function collectStyleSources(root: string): Array<{ file: string; content: string }> {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(root, entry.name)
    if (entry.isDirectory()) return collectStyleSources(file)
    if (!styleExtensions.has(path.extname(entry.name))) return []
    return [{ file, content: fs.readFileSync(file, 'utf8') }]
  })
}

function findReducedMotionBlock(css: string): string | undefined {
  const media = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g.exec(css)
  if (!media) return undefined

  let depth = 1
  for (let index = media.index + media[0].length; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1
    if (css[index] === '}') depth -= 1
    if (depth === 0) return css.slice(media.index + media[0].length, index)
  }
  return undefined
}

function findRuleBody(css: string, selector: string): string | undefined {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`).exec(css)?.[1]
}

function reducedMotionViolations(css: string): string[] {
  const block = findReducedMotionBlock(css)
  if (!block) return ['missing reduced-motion media block']
  const body = findRuleBody(block, '.onload-animation')
  if (!body) return ['missing .onload-animation override']

  const violations: string[] = []
  if (!/opacity\s*:\s*1(?:\s*!important)?\s*;/.test(body)) violations.push('onload opacity is not visible')
  if (!/transform\s*:\s*none(?:\s*!important)?\s*;/.test(body)) violations.push('onload transform is not reset')
  if (!/animation\s*:\s*none\s*!important\s*;/.test(body) && !/animation-duration\s*:\s*0(?:ms|s)?\s*!important\s*;/.test(body)) {
    violations.push('onload animation is not disabled')
  }
  if (!/animation-delay\s*:\s*0(?:ms|s)?\s*!important\s*;/.test(body) && !/animation\s*:\s*none\s*!important\s*;/.test(body)) {
    violations.push('onload animation delay is not disabled')
  }
  return violations
}

const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
const variables = fs.readFileSync('src/styles/variables.styl', 'utf8')
const transitionCss = fs.readFileSync('src/styles/transition.css', 'utf8')
const responsiveLayout = fs.readFileSync('src/utils/responsive-utils.ts', 'utf8')
const styleSources = collectStyleSources(sourceRoot)

describe('Firefly visual foundation layout contract', () => {
  it('keeps the page shell main content, both sidebar containers, and Swup container', () => {
    expect(layout).toContain('<main')
    expect(layout).toContain('id="swup-container"')
    expect(layout).toContain('id="content-wrapper"')
    expect(layout).toContain('id="left-sidebar-dynamic"')
    expect(layout).toContain('id="right-sidebar-dynamic"')
  })

  it('defines responsive layout breakpoints for compact, tablet, and desktop widths', () => {
    expect(variables).toContain('--breakpoint-md: 768px')
    expect(variables).toContain('--breakpoint-lg: 1024px')
    expect(variables).toContain('--breakpoint-xl: 1280px')
    expect(responsiveLayout).toContain('grid-cols-1')
    expect(responsiveLayout).toMatch(/md:grid-cols-/)
  })

  it('makes onload content immediately visible and removes Swup motion for reduced motion', () => {
    expect(reducedMotionViolations(transitionCss)).toEqual([])
    const block = findReducedMotionBlock(transitionCss)
    expect(block).toMatch(/scroll-behavior:\s*auto\s*!important/)
    expect(block).toMatch(/html\.is-animating[\s\S]*opacity:\s*1\s*!important/)
    expect(block).toMatch(/html\.is-animating[\s\S]*transform:\s*none\s*!important/)
  })

  it('recursively scans source styles and component assets for private reference resources', () => {
    const violations = styleSources.filter(({ content }) => privateReferenceResource.test(content))
    expect(violations.map(({ file }) => file)).toEqual([])
  })
})

describe('layout contract regression fixtures', () => {
  it('rejects an incorrect onload selector', () => {
    const fixture = '@media (prefers-reduced-motion: reduce) { .onload-animations { animation: none !important; opacity: 1; transform: none; } }'
    expect(reducedMotionViolations(fixture)).toContain('missing .onload-animation override')
  })

  it('rejects an onload override that leaves its delay active', () => {
    const fixture = '@media (prefers-reduced-motion: reduce) { .onload-animation { animation-duration: 0s !important; opacity: 1; transform: none; } }'
    expect(reducedMotionViolations(fixture)).toContain('onload animation delay is not disabled')
  })

  it('detects a private remote asset inside a component', () => {
    const fixture = '<style>.hero { background: url("https://fqzlr.example/private.webp"); }</style>'
    expect(privateReferenceResource.test(fixture)).toBe(true)
  })
})
