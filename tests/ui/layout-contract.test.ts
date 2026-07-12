import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const sourceTextExtensions = new Set(['.css', '.styl', '.astro', '.svelte', '.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.mdx'])
const privateReferenceResource = /(?:https?:)?\/\/[^\s"')]*(?:fqzlr|mmzming|20447289|co\.tsh520\.cn)/i

function isTextFile(file: string): boolean {
  return !fs.readFileSync(file).subarray(0, 8192).includes(0)
}

function collectPrivateResourceSources(root: string): Array<{ file: string; content: string }> {
  const scanRoot = (directory: string, publicFiles: boolean): Array<{ file: string; content: string }> => {
    if (!fs.existsSync(directory)) return []
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        const relativeDirectory = path.relative(root, file).replaceAll('\\', '/')
        if (
          ['env', 'dist', 'node_modules', 'vendor'].includes(entry.name)
          || relativeDirectory === 'src/content/posts'
          || relativeDirectory === 'public/content'
          || relativeDirectory.includes('/encrypted')
        ) return []
        return scanRoot(file, publicFiles)
      }
      if ((!publicFiles && !sourceTextExtensions.has(path.extname(entry.name))) || !isTextFile(file)) return []
      const content = fs.readFileSync(file, 'utf8')
      return privateReferenceResource.test(content) ? [{ file, content }] : []
    })
  }

  return [...scanRoot(path.join(root, 'src'), false), ...scanRoot(path.join(root, 'public'), true)]
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

interface CssRule { selectors: string[]; body: string }

function findRules(css: string): CssRule[] {
  const rules: CssRule[] = []
  let ruleStart = 0
  for (let index = 0; index < css.length; index += 1) {
    if (css[index] !== '{') continue
    const selectorText = css.slice(ruleStart, index).trim()
    let depth = 1
    let end = index + 1
    for (; end < css.length && depth > 0; end += 1) {
      if (css[end] === '{') depth += 1
      else if (css[end] === '}') depth -= 1
    }
    if (depth !== 0) break
    rules.push({ selectors: selectorText.split(',').map(selector => selector.trim()), body: css.slice(index + 1, end - 1) })
    ruleStart = end
    index = end - 1
  }
  return rules
}

function reducedMotionViolations(css: string): string[] {
  const block = findReducedMotionBlock(css)
  if (!block) return ['missing reduced-motion media block']
  const rules = findRules(block)
  const body = rules.find(rule => rule.selectors.includes('.onload-animation'))?.body
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
  const swupRules = rules.filter(rule => rule.selectors.some(selector => selector.includes('html.is-animating')))
  if (swupRules.some((rule) => {
    const hasMotionDowngrade = /transition\s*:\s*none\s*!important\s*;/.test(rule.body)
      || /transition-duration\s*:\s*0(?:ms|s)?\s*!important\s*;/.test(rule.body)
    return !/opacity\s*:\s*1\s*!important\s*;/.test(rule.body)
      || !/transform\s*:\s*none\s*!important\s*;/.test(rule.body)
      || !hasMotionDowngrade
  })) {
    violations.push('Swup motion is not reset in every rule')
  }
  return violations
}

const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
const variables = fs.readFileSync('src/styles/variables.styl', 'utf8')
const transitionCss = fs.readFileSync('src/styles/transition.css', 'utf8')
const responsiveLayout = fs.readFileSync('src/utils/responsive-utils.ts', 'utf8')
const privateResourceSources = collectPrivateResourceSources(process.cwd())

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

  it('recursively scans source and public text assets for private reference resources', () => {
    expect(privateResourceSources.map(({ file }) => file)).toEqual([])
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

  it('detects private resources in supported src and public text files while excluding generated and test inputs', () => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'layout-contract-'))
    const files = [
      'src/theme.css',
      'src/theme.styl',
      'src/page.astro',
      'src/widget.svelte',
      'src/theme.ts',
      'src/widget.tsx',
      'src/client.js',
      'src/runtime.mjs',
      'src/data.json',
      'src/guide.md',
      'src/page.mdx',
      'public/robots.txt',
    ]
    for (const file of files) {
      fs.mkdirSync(path.dirname(path.join(fixtureRoot, file)), { recursive: true })
      fs.writeFileSync(path.join(fixtureRoot, file), 'https://fqzlr.example/private.webp')
    }
    fs.mkdirSync(path.join(fixtureRoot, 'src/content/posts'), { recursive: true })
    fs.writeFileSync(path.join(fixtureRoot, 'src/content/posts/generated.md'), 'https://fqzlr.example/generated.webp')
    fs.mkdirSync(path.join(fixtureRoot, 'tests'), { recursive: true })
    fs.writeFileSync(path.join(fixtureRoot, 'tests/report.ts'), 'https://fqzlr.example/report.webp')
    for (const excludedFile of [
      'public/content/generated.html',
      'public/gallery/encrypted-test/urls.txt',
      'public/vendor/library.js',
      'public/dist/bundle.js',
    ]) {
      fs.mkdirSync(path.dirname(path.join(fixtureRoot, excludedFile)), { recursive: true })
      fs.writeFileSync(path.join(fixtureRoot, excludedFile), 'https://fqzlr.example/excluded.webp')
    }
    fs.writeFileSync(path.join(fixtureRoot, 'public/image.png'), Buffer.from([0, 1, 2, 3]))

    try {
      expect(collectPrivateResourceSources(fixtureRoot).map(({ file }) => path.relative(fixtureRoot, file).replaceAll('\\', '/')).sort()).toEqual([...files].sort())
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('rejects Swup declarations split across different rule bodies', () => {
    const fixture = '@media (prefers-reduced-motion: reduce) { html.is-animating .transition-main { opacity: 1 !important; } html.is-animating .transition-swup-fade { transform: none !important; } .onload-animation { animation: none !important; opacity: 1; transform: none; } }'
    expect(reducedMotionViolations(fixture)).toContain('Swup motion is not reset in every rule')
  })

  it('rejects a Swup target rule without a transition downgrade', () => {
    const fixture = '@media (prefers-reduced-motion: reduce) { html.is-animating .transition-main { opacity: 1 !important; transform: none !important; } .onload-animation { animation: none !important; opacity: 1; transform: none; } }'
    expect(reducedMotionViolations(fixture)).toContain('Swup motion is not reset in every rule')
  })

  it.each([
    '.foo.onload-animation',
    'body .onload-animation',
  ])('rejects a non-independent onload selector: %s', (selector) => {
    const fixture = `@media (prefers-reduced-motion: reduce) { ${selector} { animation: none !important; opacity: 1; transform: none; } }`
    expect(reducedMotionViolations(fixture)).toContain('missing .onload-animation override')
  })

  it('accepts an exact onload selector in a comma-separated selector list', () => {
    const fixture = '@media (prefers-reduced-motion: reduce) { .other, .onload-animation { animation: none !important; opacity: 1; transform: none; } }'
    expect(reducedMotionViolations(fixture)).not.toContain('missing .onload-animation override')
  })
})
