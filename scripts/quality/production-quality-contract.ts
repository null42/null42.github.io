export const QUALITY_VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
] as const

export const LIGHTHOUSE_FORM_FACTOR = 'mobile' as const

export type LighthouseCategory = 'performance' | 'accessibility' | 'best-practices' | 'seo'
export type QualityPage = { kind: string; path: string; indexable: boolean }

export const QUALITY_PAGES = [
  { kind: 'home', path: '/', indexable: true },
  { kind: 'list', path: '/list/', indexable: true },
  { kind: 'knowledge-map', path: '/knowledge/', indexable: true },
  { kind: 'article', path: '/posts/blog/hello/', indexable: true },
  { kind: 'knowledge-article', path: '/posts/motor/30-percent-roadmap/', indexable: true },
  { kind: 'encrypted-article', path: '/posts/encrypted/demo/', indexable: false },
  { kind: 'search', path: '/search/', indexable: true },
] as const satisfies readonly QualityPage[]

export function shouldEnforceLighthouseCategory(page: QualityPage, category: LighthouseCategory): boolean {
  return category !== 'seo' || page.indexable
}

const edgeAiLabel = ['work', 'ers-ai'].join('')
const edgeHostSuffix = `${['work', 'ers'].join('')}.dev`
const backendPattern = new RegExp(`(^|[.-])(api|rag|kv|vectorize|${edgeAiLabel})([.-]|$)|\\.${edgeHostSuffix}$`, 'i')
const backendPathPattern = new RegExp(`/(?:api|rag|kv|vectorize|${edgeAiLabel})(?:/|$)`, 'i')
const mutableCdnVersionPattern = /@(?:latest|next|beta|alpha|canary|[~^*]|\d+\.x)(?:\/|$)/i
const allowedCdnResources = new Set([
  'https://cdn.jsdelivr.net/npm/twikoo@1.7.13/dist/twikoo.min.js',
])

export type RuntimeRequestClassification =
  | 'local'
  | 'allowed-cdn'
  | 'forbidden-backend'
  | 'unversioned-cdn'
  | 'forbidden-origin'

export function getPreviewCommand(platform: NodeJS.Platform, port: number): { command: string; args: string[] } {
  if (platform === 'win32') {
    return {
      command: 'cmd.exe',
      args: ['/d', '/c', `npm.cmd run preview -- --host 127.0.0.1 --port ${port} --strictPort`],
    }
  }
  return {
    command: 'corepack',
    args: ['pnpm', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  }
}

export function classifyRuntimeRequest(rawUrl: string, localOrigin?: string): RuntimeRequestClassification {
  const requestUrl = new URL(rawUrl)
  if (backendPattern.test(requestUrl.hostname) || backendPathPattern.test(requestUrl.pathname)) {
    return 'forbidden-backend'
  }
  if (localOrigin && requestUrl.origin === localOrigin) return 'local'
  if (requestUrl.hostname === 'cdn.jsdelivr.net') {
    if (!/@[^/]+\//.test(requestUrl.pathname) || mutableCdnVersionPattern.test(requestUrl.pathname)) return 'unversioned-cdn'
    return allowedCdnResources.has(requestUrl.href) ? 'allowed-cdn' : 'forbidden-origin'
  }
  return 'forbidden-origin'
}

export function shouldBlockLighthouseMetric(scores: number[], threshold: number): boolean {
  return scores.length >= 2 && scores.slice(-2).every((score) => score < threshold)
}

export function analyzeLighthouseMetric(scores: number[], threshold: number) {
  const belowThresholdRuns = scores
    .map((score, index) => score < threshold ? index + 1 : undefined)
    .filter((run): run is number => run !== undefined)
  return {
    scores,
    threshold,
    belowThresholdRuns,
    delta: scores.length >= 2 ? scores[scores.length - 1] - scores[0] : 0,
    status: shouldBlockLighthouseMetric(scores, threshold)
      ? 'blocking-consecutive-failure'
      : belowThresholdRuns.length
        ? 'non-blocking-single-failure'
        : 'passing',
  } as const
}
