import { spawn, spawnSync, type ChildProcess } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { dirname, resolve } from 'node:path'
import { platform } from 'node:os'
import { pathToFileURL } from 'node:url'
import lighthouse from 'lighthouse'
import lighthousePackage from 'lighthouse/package.json' with { type: 'json' }
import * as chromeLauncher from 'chrome-launcher'
import { LIGHTHOUSE_FORM_FACTOR, QUALITY_PAGES, analyzeLighthouseMetric, getPreviewCommand, shouldEnforceLighthouseCategory } from './production-quality-contract'

const chromePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
const reportPath = resolve(process.env.LIGHTHOUSE_REPORT_PATH ?? 'reports/production-quality.json')
const chromeProfilePath = resolve('env/verification/lighthouse-profile')
const thresholds = { performance: 75, accessibility: 90, 'best-practices': 90, seo: 90 } as const

type CategoryName = keyof typeof thresholds
type AuditResult = { run: number; scores: Record<CategoryName, number>; lowScoringAudits: string[] }
type PageResult = { kind: string; path: string; runs: AuditResult[]; analysis?: Record<CategoryName, ReturnType<typeof analyzeLighthouseMetric>> }
type FetchImplementation = (input: string | URL | Request, init?: RequestInit) => Promise<Response>
type KillProcess = (pid: number, signal: NodeJS.Signals) => void

export async function fetchPreviewHealth(
  baseUrl: string,
  timeoutMs = 2_000,
  fetchImpl: FetchImplementation = fetch,
): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetchImpl(baseUrl, { signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

export function normalizeExternalBaseUrl(value: string): string {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error('QUALITY_BASE_URL must be a valid http/https origin')
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('QUALITY_BASE_URL must use http or https')
  }
  if (url.username || url.password || url.search || url.hash || !/^\/*$/.test(url.pathname)) {
    throw new Error('QUALITY_BASE_URL must contain only an origin without credentials, path, query, or hash')
  }
  return url.origin
}

export function getCommitSha(
  githubSha = process.env.GITHUB_SHA,
  resolveGitSha: () => string | null | undefined = () => {
    const result = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true })
    return result.status === 0 ? result.stdout : null
  },
): string | null {
  const ciSha = githubSha?.trim()
  if (ciSha) return ciSha
  try {
    return resolveGitSha()?.trim() || null
  } catch {
    return null
  }
}

export async function stopPosixProcessGroup(
  pid: number,
  killProcess: KillProcess = process.kill,
  gracePeriodMs = 5_000,
): Promise<void> {
  try { killProcess(-pid, 'SIGTERM') } catch {}
  await new Promise((resolveWait) => setTimeout(resolveWait, gracePeriodMs))
  try { killProcess(-pid, 'SIGKILL') } catch {}
}

async function findAvailablePort(): Promise<number> {
  return await new Promise((resolvePort, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close()
        reject(new Error('Unable to allocate a Lighthouse preview port'))
        return
      }
      server.close((error) => error ? reject(error) : resolvePort(address.port))
    })
  })
}

export async function waitForPreview(
  baseUrl: string,
  preview: Pick<ChildProcess, 'exitCode'>,
  attempts = 60,
  retryDelayMs = 500,
  fetchHealth: (baseUrl: string) => Promise<Response> = fetchPreviewHealth,
): Promise<void> {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (preview.exitCode !== null) throw new Error(`Preview exited before becoming ready at ${baseUrl}`)
    try {
      const response = await fetchHealth(baseUrl)
      if (response.ok) return
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, retryDelayMs))
  }
  throw new Error(`Preview did not become ready at ${baseUrl}`)
}

async function startLocalPreview(): Promise<{ baseUrl: string; preview: ChildProcess }> {
  let lastError: unknown
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const previewPort = await findAvailablePort()
    const baseUrl = `http://127.0.0.1:${previewPort}`
    const previewCommand = getPreviewCommand(process.platform, previewPort)
    const preview = spawn(previewCommand.command, previewCommand.args, {
      cwd: process.cwd(),
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
      stdio: 'inherit',
      windowsHide: true,
      detached: process.platform !== 'win32',
    })
    try {
      await waitForPreview(baseUrl, preview)
      return { baseUrl, preview }
    } catch (error) {
      lastError = error
      await stopPreview(preview)
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to start Lighthouse preview')
}

async function stopPreview(preview?: ChildProcess): Promise<void> {
  if (!preview?.pid) return
  if (process.platform === 'win32' && preview.pid) {
    if (preview.exitCode !== null) return
    spawnSync('taskkill.exe', ['/pid', String(preview.pid), '/t', '/f'], { stdio: 'ignore', windowsHide: true })
  } else {
    await stopPosixProcessGroup(preview.pid)
    return
  }
  await Promise.race([
    new Promise<void>((resolveClose) => preview.once('close', () => resolveClose())),
    new Promise<void>((resolveWait) => setTimeout(resolveWait, 5000)),
  ])
}

async function withTimeout<T>(operation: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs) }),
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export async function main(): Promise<void> {
  const externalBaseUrl = process.env.QUALITY_BASE_URL
    ? normalizeExternalBaseUrl(process.env.QUALITY_BASE_URL)
    : undefined
  const commitSha = getCommitSha()
  let preview: ChildProcess | undefined
  let baseUrl = externalBaseUrl ?? ''
  let chrome: chromeLauncher.LaunchedChrome | undefined
  const pages: PageResult[] = []
  const blockingFailures: string[] = []
  let executionError: string | null = null

  async function writeReport(): Promise<void> {
    const report = {
      generatedAt: new Date().toISOString(),
      commitSha,
      platform: platform(),
      lighthouseVersion: lighthousePackage.version,
      baseUrl,
      formFactor: LIGHTHOUSE_FORM_FACTOR,
      thresholds,
      consecutiveFailureRule: 2,
      pages,
      blockingFailures,
      executionError,
    }
    await mkdir(dirname(reportPath), { recursive: true })
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  }

  try {
    if (!externalBaseUrl) {
      const localPreview = await startLocalPreview()
      baseUrl = localPreview.baseUrl
      preview = localPreview.preview
    }
  await rm(chromeProfilePath, { recursive: true, force: true, maxRetries: 5 })
  await mkdir(chromeProfilePath, { recursive: true })
  chrome = await chromeLauncher.launch({
    chromePath,
    userDataDir: chromeProfilePath,
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
  })

  for (const qualityPage of QUALITY_PAGES) {
    const runs: AuditResult[] = []
    const pageResult: PageResult = { ...qualityPage, runs }
    pages.push(pageResult)
    for (let run = 1; run <= 2; run += 1) {
      const result = await withTimeout(lighthouse(`${baseUrl}${qualityPage.path}`, {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        formFactor: LIGHTHOUSE_FORM_FACTOR,
        onlyCategories: Object.keys(thresholds),
      }), 120_000, `Lighthouse ${qualityPage.path} run ${run}`)
      if (!result) throw new Error(`Lighthouse returned no result for ${qualityPage.path}`)
      const scores = Object.fromEntries(
        Object.keys(thresholds).map((category) => [
          category,
          (result.lhr.categories[category]?.score ?? 0) * 100,
        ]),
      ) as Record<CategoryName, number>
      const lowScoringAudits = Object.values(result.lhr.audits)
        .filter((audit) => audit.scoreDisplayMode !== 'notApplicable' && typeof audit.score === 'number' && audit.score < 0.9)
        .sort((left, right) => (left.score ?? 0) - (right.score ?? 0))
        .slice(0, 5)
        .map((audit) => `${audit.id}: ${audit.title}`)
      runs.push({ run, scores, lowScoringAudits })
    }

    const analysis = {} as Record<CategoryName, ReturnType<typeof analyzeLighthouseMetric>>
    for (const [category, threshold] of Object.entries(thresholds) as [CategoryName, number][]) {
      const scores = runs.map(({ scores: runScores }) => runScores[category])
      analysis[category] = analyzeLighthouseMetric(scores, threshold)
      if (analysis[category].status === 'blocking-consecutive-failure' && shouldEnforceLighthouseCategory(qualityPage, category)) {
        blockingFailures.push(`${qualityPage.path} ${category}: ${scores.join(', ')} < ${threshold}`)
      }
    }
    pageResult.analysis = analysis
    await writeReport()
  }

    await writeReport()
    if (blockingFailures.length) throw new Error(`Lighthouse thresholds failed:\n${blockingFailures.join('\n')}`)
    console.log(JSON.stringify({ reportPath, pages: pages.length, blockingFailures }, null, 2))
  } catch (error) {
    executionError = error instanceof Error ? error.message : String(error)
    await writeReport()
    throw error
  } finally {
    try {
      await chrome?.kill()
    } catch (error) {
      console.warn(`Chrome cleanup warning: ${error instanceof Error ? error.message : String(error)}`)
    }
    try {
      await rm(chromeProfilePath, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 })
    } catch (error) {
      console.warn(`Chrome profile cleanup warning: ${error instanceof Error ? error.message : String(error)}`)
    }
    await stopPreview(preview)
  }
}

const entrypoint = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ''
if (import.meta.url === entrypoint) await main()
