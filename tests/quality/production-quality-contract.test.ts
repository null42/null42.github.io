import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  QUALITY_PAGES,
  QUALITY_VIEWPORTS,
  LIGHTHOUSE_FORM_FACTOR,
  analyzeLighthouseMetric,
  classifyRuntimeRequest,
  getPreviewCommand,
  shouldEnforceLighthouseCategory,
  shouldBlockLighthouseMetric,
} from '../../scripts/quality/production-quality-contract'

describe('production quality contract', () => {
  it('covers every required page at every required viewport', () => {
    expect(QUALITY_VIEWPORTS.map(({ width }) => width)).toEqual([1440, 1024, 768, 390])
    expect(QUALITY_PAGES.map(({ kind }) => kind)).toEqual([
      'home',
      'list',
      'knowledge-map',
      'article',
      'knowledge-article',
      'encrypted-article',
      'search',
    ])
    expect(QUALITY_PAGES.every(({ path }) => path.startsWith('/'))).toBe(true)
    const playwrightConfig = readFileSync('playwright.config.ts', 'utf8')
    for (const width of [1440, 1024, 768, 390]) {
      expect(playwrightConfig).toContain(`width: ${width}`)
    }
  })

  it('rejects backend and unversioned CDN runtime requests', () => {
    expect(classifyRuntimeRequest('http://127.0.0.1:4321/list/', 'http://127.0.0.1:4321')).toBe('local')
    expect(classifyRuntimeRequest('http://127.0.0.1:4321/api/query', 'http://127.0.0.1:4321')).toBe('forbidden-backend')
    expect(classifyRuntimeRequest('http://127.0.0.1:8787/api/query', 'http://127.0.0.1:4321')).toBe('forbidden-backend')
    expect(classifyRuntimeRequest('https://api.example.com/search')).toBe('forbidden-backend')
    expect(classifyRuntimeRequest('https://demo.workers.dev/query')).toBe('forbidden-backend')
    expect(classifyRuntimeRequest('https://cdn.jsdelivr.net/npm/twikoo@1.7.13/dist/twikoo.min.js')).toBe('allowed-cdn')
    expect(classifyRuntimeRequest('https://cdn.jsdelivr.net/npm/pkg@1.2.3/file.js')).toBe('forbidden-origin')
    expect(classifyRuntimeRequest('https://cdn.jsdelivr.net/npm/twikoo@latest/dist/twikoo.min.js')).toBe('unversioned-cdn')
    expect(classifyRuntimeRequest('https://cdn.jsdelivr.net/npm/pkg/file.js')).toBe('unversioned-cdn')
    expect(classifyRuntimeRequest('https://unpkg.com/pkg@1.2.3/file.js')).toBe('forbidden-origin')
  })

  it('blocks a Lighthouse metric only after two consecutive failures', () => {
    expect(LIGHTHOUSE_FORM_FACTOR).toBe('mobile')
    expect(shouldBlockLighthouseMetric([74, 76], 75)).toBe(false)
    expect(shouldBlockLighthouseMetric([76, 74], 75)).toBe(false)
    expect(shouldBlockLighthouseMetric([74, 74], 75)).toBe(true)
    expect(shouldBlockLighthouseMetric([74.99, 74.5], 75)).toBe(true)
  })

  it('does not block SEO for intentionally noindex pages', () => {
    const encryptedPage = QUALITY_PAGES.find(({ kind }) => kind === 'encrypted-article')!
    expect(encryptedPage.indexable).toBe(false)
    expect(shouldEnforceLighthouseCategory(encryptedPage, 'seo')).toBe(false)
    expect(shouldEnforceLighthouseCategory(encryptedPage, 'accessibility')).toBe(true)
  })

  it('records single-run Lighthouse variance without blocking', () => {
    expect(analyzeLighthouseMetric([74, 80], 75)).toEqual({
      scores: [74, 80],
      threshold: 75,
      belowThresholdRuns: [1],
      delta: 6,
      status: 'non-blocking-single-failure',
    })
    expect(analyzeLighthouseMetric([74, 73], 75).status).toBe('blocking-consecutive-failure')
    expect(analyzeLighthouseMetric([80, 81], 75).status).toBe('passing')
  })

  it('starts the production preview on Windows and POSIX runners', () => {
    expect(getPreviewCommand('win32', 4567)).toEqual({
      command: 'cmd.exe',
      args: ['/d', '/c', 'npm.cmd run preview -- --host 127.0.0.1 --port 4567 --strictPort'],
    })
    expect(getPreviewCommand('linux', 4567)).toEqual({
      command: 'corepack',
      args: ['pnpm', 'preview', '--host', '127.0.0.1', '--port', '4567', '--strictPort'],
    })
  })

  it('exposes a reproducible Lighthouse quality command', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    expect(packageJson.scripts['test:e2e:quality']).toBe('playwright test tests/e2e/quality.production.spec.ts')
    expect(packageJson.scripts['quality:lighthouse']).toBe('tsx scripts/quality/run-lighthouse.ts')
  })

  it('does not serialize the local browser executable path into quality reports', () => {
    const runner = readFileSync('scripts/quality/run-lighthouse.ts', 'utf8')
    expect(runner).not.toContain('chromePath: chromePath ?? null')
  })

  it('evaluates Lighthouse thresholds before any display rounding', () => {
    const runner = readFileSync('scripts/quality/run-lighthouse.ts', 'utf8')
    expect(runner).not.toContain('Math.round((result.lhr.categories[category]?.score ?? 0) * 100)')
  })
})
