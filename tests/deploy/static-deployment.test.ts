import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import YAML from 'yaml'

const read = (file: string) => fs.readFileSync(path.resolve(file), 'utf8')
const normalizePath = (file: string) => file.replaceAll('\\', '/')

const cloudflareDeploymentFilePattern = /^(?:wrangler\.(?:toml|jsonc?)|\.dev\.vars|worker(?:\.[^/]+)?|_(?:worker\.js|routes\.json)|\.env\.(?:cloudflare|worker|workers)\.example)$/

const findCloudflareDeploymentFiles = (root: string, trackedFiles: string[]) => [
  ...new Set([
    ...trackedFiles.map(normalizePath),
    ...fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name),
  ]),
].filter((file) => cloudflareDeploymentFilePattern.test(file))

const packageJson = JSON.parse(read('package.json'))
const astroConfig = read('astro.config.mjs')
const workflowSource = read('.github/workflows/deploy.yml')
const workflow = YAML.parse(workflowSource)
const gitignore = read('.gitignore')
const pnpmConfig = read('.npmrc')

const rootContractFiles = new Set([
  'astro.config.mjs',
  'package.json',
  'postcss.config.mjs',
  'svelte.config.js',
  'tsconfig.json',
])

const trackedContractFiles = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .map(normalizePath)
  .filter((file) =>
    rootContractFiles.has(file)
    || /^(?:src|scripts|\.github\/workflows)\/.+\.(?:astro|[cm]?[jt]sx?|svelte|vue|json|ya?ml|toml)$/.test(file),
  )
  .filter((file) => ![
    'src/content/',
    'tests/fixtures/',
    'docs/',
    'reports/',
  ].some((prefix) => file.startsWith(prefix)))

const contractSources = trackedContractFiles.map((file) => ({
  file,
  source: read(file),
}))

const forbiddenDirectDependencies = [
  '@chenglou/pretext',
  '@vfx-js/core',
  'animejs',
  'echarts',
  'gsap',
  'lunar-typescript',
  'marked',
  'mdast-util-find-and-replace',
  'photoswipe',
  'three',
  'unist-util-is',
]

const cloudflarePatterns = [
  /@astrojs\/cloudflare/i,
  /\bwrangler\b/i,
  /\b(?:cloudflare\s+)?worker(?:s)?\b/i,
  /\b(?:kv|vectorize|workers?\s+ai)\s+(?:binding|namespace|index)/i,
  /\b(?:CLOUDFLARE|CF_ACCOUNT|CF_API|KV_NAMESPACE|VECTORIZE|WORKERS_AI)[A-Z0-9_]*\b/,
]

const unexpectedCloudflareMatches = contractSources.flatMap(({ file, source }) =>
  cloudflarePatterns.flatMap((pattern) => pattern.test(source) ? [`${file}: ${pattern}`] : []),
)

const allowedStaticDataRoutes = new Set([
  'src/pages/api/allPostMeta.json.ts',
])

const apiRouteFiles = trackedContractFiles.filter((file) =>
  /^src\/pages\/api\//.test(file) && !allowedStaticDataRoutes.has(file),
)

const serverAdapterFiles = trackedContractFiles.filter((file) =>
  /(?:^|\/)(?:adapter|server|worker|wrangler)(?:[./-]|$)/i.test(file),
)

const cloudflareDeploymentFiles = findCloudflareDeploymentFiles(process.cwd(), trackedContractFiles)

describe('static deployment contract', () => {
  it.each([
    'wrangler.toml',
    'wrangler.json',
    'wrangler.jsonc',
    '.dev.vars',
    'worker.ts',
    '_worker.js',
    '_routes.json',
    '.env.cloudflare.example',
  ])('detects an existing untracked Cloudflare deployment file: %s', (file) => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'cloudflare-contract-'))
    fs.writeFileSync(path.join(fixtureRoot, file), '')

    try {
      expect(findCloudflareDeploymentFiles(fixtureRoot, [])).toContain(file)
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it.each([
    '_headers',
    '_redirects',
  ])('does not treat a common static host file as Cloudflare-specific: %s', (file) => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'cloudflare-contract-'))
    fs.writeFileSync(path.join(fixtureRoot, file), '')

    try {
      expect(findCloudflareDeploymentFiles(fixtureRoot, [])).toEqual([])
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('allows a project without Cloudflare deployment files', () => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'cloudflare-contract-'))

    try {
      expect(findCloudflareDeploymentFiles(fixtureRoot, [])).toEqual([])
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('configures Astro for static output without a server adapter or API routes', () => {
    expect(astroConfig).toMatch(/output:\s*["']static["']/)
    expect(serverAdapterFiles).toEqual([])
    expect(apiRouteFiles).toEqual([])
  })

  it('has no Cloudflare runtime, routing, bindings or environment variables in source and config', () => {
    expect(cloudflareDeploymentFiles).toEqual([])
    expect(unexpectedCloudflareMatches).toEqual([])
    expect(Object.keys(packageJson.scripts)).not.toEqual(expect.arrayContaining(['build-index', 'worker', 'deploy:worker']))
  })

  it('does not declare unused Firefly direct dependencies before their components import them', () => {
    const directDependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }
    expect(Object.keys(directDependencies)).not.toEqual(expect.arrayContaining(forbiddenDirectDependencies))
  })

  it('keeps local references, stores and caches under ignored env', () => {
    expect(gitignore.split(/\r?\n/)).toContain('env/')
    expect(pnpmConfig).toMatch(/store-dir=env\/pnpm-store/)
    expect(pnpmConfig).toMatch(/cache-dir=env\/pnpm-cache/)
    expect(pnpmConfig).toMatch(/state-dir=env\/pnpm-state/)
  })

  it('allows manual reruns but gates production build and deploy jobs to main', () => {
    expect(workflow.on.push.branches).toEqual(['main'])
    expect(workflow.on).toHaveProperty('workflow_dispatch')
    expect(workflow.jobs.build.if).toBe("github.ref == 'refs/heads/main'")
    expect(workflow.jobs.deploy.if).toBe("github.ref == 'refs/heads/main'")
    expect(workflow.jobs.deploy.environment.name).toBe('github-pages')
  })

  it('blocks production deployment until Chromium-backed home contracts pass', () => {
    const buildSteps = workflow.jobs.build.steps as Array<{ name?: string; run?: string; uses?: string; with?: Record<string, string> }>
    const browserCache = buildSteps.find(step => step.name === 'Cache Playwright Chromium')
    const installBrowser = buildSteps.find(step => step.name === 'Install Playwright Chromium')
    const homeE2e = buildSteps.find(step => step.name === 'Run home production contracts')
    const uploadReport = buildSteps.find(step => step.name === 'Upload Playwright report')

    expect(browserCache?.uses).toBe('actions/cache@v4')
    expect(browserCache?.with?.path).toBe('~/.cache/ms-playwright')
    expect(installBrowser?.run).toBe('pnpm exec playwright install --with-deps chromium')
    expect(homeE2e?.run).toBe('pnpm test:e2e:home')
    expect(uploadReport?.uses).toBe('actions/upload-artifact@v4')
    expect(uploadReport?.with?.path).toBe('env/playwright-report')
    expect(workflow.jobs.deploy.needs).toBe('build')
  })
})
