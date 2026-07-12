import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const layout = fs.readFileSync('src/layouts/MainGridLayout.astro', 'utf8')
const mainCss = fs.readFileSync('src/styles/main.css', 'utf8')
const variables = fs.readFileSync('src/styles/variables.styl', 'utf8')
const transitionCss = fs.readFileSync('src/styles/transition.css', 'utf8')
const responsiveLayout = fs.readFileSync('src/utils/responsive-utils.ts', 'utf8')
const globalCss = `${mainCss}\n${variables}\n${transitionCss}`

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

  it('disables non-essential motion when reduced motion is preferred', () => {
    expect(globalCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    expect(globalCss).toMatch(/scroll-behavior:\s*auto/)
    expect(globalCss).toMatch(/animation-duration:\s*0\.01ms/)
  })

  it('does not depend on reference-author private remote resources', () => {
    expect(globalCss).not.toMatch(/https?:\/\//)
    expect(globalCss).not.toMatch(/url\(\s*['"]?\/\//)
  })
})
