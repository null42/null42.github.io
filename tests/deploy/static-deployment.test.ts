import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import YAML from 'yaml'
import { encryptWorldbuildingColumn } from '../../scripts/kb/encrypt/worldbuilding'

const read = (file: string) => fs.readFileSync(path.resolve(file), 'utf8')
const require = createRequire(import.meta.url)
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

const trackedContractFiles = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' })
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
  source: fs.existsSync(path.resolve(file)) ? read(file) : '',
})).filter(({ source }) => source)

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

const apiRouteFiles = trackedContractFiles.filter((file) =>
  /^src\/pages\/api\//.test(file) && fs.existsSync(path.resolve(file)),
)

const serverAdapterFiles = trackedContractFiles.filter((file) =>
  /(?:^|\/)(?:adapter|server|worker|wrangler)(?:[./-]|$)/i.test(file),
)

const cloudflareDeploymentFiles = findCloudflareDeploymentFiles(process.cwd(), trackedContractFiles)

const jobPermissions = (jobName: string) => ({ ...workflow.permissions, ...workflow.jobs[jobName]?.permissions })

describe('static deployment contract', () => {
  it('requires the worldbuilding source directory through an option or environment variable', async () => {
    const previousSource = process.env.KB_WORLDBUILDING_SOURCE
    delete process.env.KB_WORLDBUILDING_SOURCE
    try {
      await expect(encryptWorldbuildingColumn({ password: 'test-only-password' })).rejects.toThrow(/KB_WORLDBUILDING_SOURCE is required/)
      expect(read('scripts/kb/encrypt/worldbuilding.ts')).not.toMatch(/[A-Za-z]:[\\/]gitee_CodeStorage/)
    }
    finally {
      if (previousSource === undefined) delete process.env.KB_WORLDBUILDING_SOURCE
      else process.env.KB_WORLDBUILDING_SOURCE = previousSource
    }
  })

  it('creates new posts only under the authoritative content/blog source', () => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'new-post-contract-'))
    const script = path.resolve('scripts/new-post.js')
    try {
      execFileSync(process.execPath, [script, 'nested/demo'], { cwd: fixtureRoot, stdio: 'pipe' })
      expect(fs.existsSync(path.join(fixtureRoot, 'content/blog/nested/demo.md'))).toBe(true)
      expect(fs.existsSync(path.join(fixtureRoot, 'src/content/posts/nested/demo.md'))).toBe(false)
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('rejects new-post filenames that escape content/blog', () => {
    const fixtureRoot = fs.mkdtempSync(path.join(process.cwd(), 'env', 'new-post-contract-'))
    const script = path.resolve('scripts/new-post.js')
    try {
      const result = spawnSync(process.execPath, [script, '../escape'], { cwd: fixtureRoot, encoding: 'utf8' })
      expect(result.status).not.toBe(0)
      expect(fs.existsSync(path.join(fixtureRoot, 'content/escape.md'))).toBe(false)
    }
    finally {
      fs.rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('scans untracked source files before they are committed', () => {
    expect(trackedContractFiles).toContain('scripts/quality/production-quality-contract.ts')
  })
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

  it.each(['_headers', '_redirects'])('does not treat a common static host file as Cloudflare-specific: %s', (file) => {
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
    expect(trackedContractFiles).toContain('src/pages/data/allPostMeta.json.ts')
  })

  it('has no Cloudflare runtime, routing, bindings or environment variables in source and config', () => {
    expect(cloudflareDeploymentFiles).toEqual([])
    expect(unexpectedCloudflareMatches).toEqual([])
    expect(Object.keys(packageJson.scripts)).not.toEqual(expect.arrayContaining(['build-index', 'worker', 'deploy:worker']))
  })

  it('does not declare unused Firefly direct dependencies before their components import them', () => {
    const directDependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
    expect(Object.keys(directDependencies)).not.toEqual(expect.arrayContaining(forbiddenDirectDependencies))
  })

  it('keeps local references, stores and caches under ignored env', () => {
    expect(gitignore.split(/\r?\n/)).toContain('env/')
    expect(gitignore.split(/\r?\n/)).toContain('reports/production-quality.json')
    expect(pnpmConfig).toMatch(/store-dir=env\/pnpm-store/)
    expect(pnpmConfig).toMatch(/cache-dir=env\/pnpm-cache/)
    expect(pnpmConfig).toMatch(/state-dir=env\/pnpm-state/)
  })

  it('runs quality for pull requests and migration branch pushes while production stays on main', () => {
    expect(workflow.on.pull_request).toBeDefined()
    expect(workflow.on.push.branches).toEqual(['main', 'codex/firefly-mod-knowledge-migration'])
    expect(workflow.jobs.quality.if).toBeUndefined()
    expect(workflow.jobs.build.if).toBe("github.ref == 'refs/heads/main'")
    expect(workflow.jobs.deploy.if).toBe("github.ref == 'refs/heads/main'")
    expect(workflow.jobs.deploy.environment.name).toBe('github-pages')
  })

  it('checks out complete history so the pinned migration baseline commit is available', () => {
    const checkout = workflow.jobs.quality.steps.find((step: { name?: string }) => step.name === 'Checkout')
    expect(checkout.with['fetch-depth']).toBe(0)
  })

  it('provides the protected fingerprint key from GitHub Actions secrets', () => {
    expect(workflow.jobs.quality.env.MIGRATION_PROTECTED_FINGERPRINT_KEY).toBe('${{ secrets.MIGRATION_PROTECTED_FINGERPRINT_KEY }}')
  })

  it('normalizes repository text files to LF across Windows and Linux checkouts', () => {
    expect(read('.gitattributes').split(/\r?\n/)).toContain('* text=auto eol=lf')
  })

  it('grants Pages and OIDC write permissions only to deploy', () => {
    expect(workflow.permissions).toEqual({ contents: 'read' })
    expect(jobPermissions('quality')).toEqual({ contents: 'read' })
    expect(jobPermissions('build')).toEqual({ contents: 'read' })
    expect(jobPermissions('deploy')).toEqual({ contents: 'read', pages: 'write', 'id-token': 'write' })
  })

  it('runs the full gate and complete Chromium E2E in quality with cached browser and one retry maximum', () => {
    const steps = workflow.jobs.quality.steps as Array<{ name?: string; run?: string; uses?: string; with?: Record<string, string> }>
    expect(steps.find(step => step.name === 'Run full static quality gate')?.run).toBe('pnpm quality:full')
    expect(steps.find(step => step.name === 'Cache Playwright Chromium')?.uses).toBe('actions/cache@v4')
    expect(steps.find(step => step.name === 'Install Playwright Chromium')?.run).toBe('pnpm exec playwright install --with-deps chromium')
    expect(steps.find(step => step.name === 'Run complete E2E')?.run).toBe('pnpm test:e2e')
    expect(steps.find(step => step.name === 'Upload Playwright report')?.uses).toBe('actions/upload-artifact@v4')
    expect(packageJson.scripts['test:e2e']).toBe('playwright test')
    expect(read('playwright.config.ts')).toMatch(/retries:\s*process\.env\.CI\s*\?\s*1\s*:\s*0/)
    expect(read('playwright.config.ts')).toMatch(/reuseExistingServer:\s*false/)
  })

  it('blocks production deployment until both quality and build succeed', () => {
    expect(workflow.jobs.deploy.needs).toEqual(expect.arrayContaining(['quality', 'build']))
  })

  it('runs the full static quality gate and Lighthouse before branch artifacts', () => {
    const qualitySteps = workflow.jobs.quality.steps
    const fullGate = qualitySteps.find((step: { name?: string }) => step.name === 'Run full static quality gate')
    const browserPath = qualitySteps.find((step: { name?: string }) => step.name === 'Expose Playwright Chromium path')
    const lighthouse = qualitySteps.find((step: { name?: string }) => step.name === 'Run Lighthouse quality gate')
    expect(fullGate.run).toBe('pnpm quality:full')
    expect(browserPath.run).toMatch(/^pnpm exec node --input-type=module -e '/)
    expect(browserPath.run).toContain('from "@playwright/test"')
    expect(packageJson.devDependencies['@playwright/test']).toBeTruthy()
    expect(() => require.resolve('@playwright/test')).not.toThrow()
    expect(browserPath.run).toContain('fs.appendFileSync(process.env.GITHUB_ENV')
    expect(browserPath.run).toContain('chromium.executablePath()')
    expect(lighthouse.run).toBe('pnpm quality:lighthouse')
    const reportUpload = qualitySteps.find((step: { name?: string }) => step.name === 'Upload production quality report')
    expect(reportUpload.if).toBe('always()')
    expect(reportUpload.uses).toBe('actions/upload-artifact@v4')
    expect(reportUpload.with.path).toBe('reports/production-quality.json')
  })

  it('uploads a SHA-addressed dist artifact on the migration branch without using Pages', () => {
    const artifact = workflow.jobs.migration_artifact
    expect(artifact.if).toBe("github.ref == 'refs/heads/codex/firefly-mod-knowledge-migration'")
    expect(artifact.environment).toBeUndefined()
    expect(jobPermissions('migration_artifact')).toEqual({ contents: 'read' })
    expect(artifact.needs).toEqual(['quality'])
    const upload = artifact.steps.find((step: { name?: string }) => step.name === 'Upload migration dist')
    expect(upload.uses).toBe('actions/upload-artifact@v4')
    expect(upload.with.name).toBe('dist-${{ github.sha }}')
    expect(upload.with.path).toBe('dist')
    expect(upload.with['retention-days']).toBe(7)
  })

  it('exposes the stage seven quality-gate command aliases', () => {
    expect(packageJson.scripts.test).toBe('vitest run --exclude "tests/e2e/**" --minWorkers=1 --maxWorkers=4')
    expect(packageJson.scripts['knowledge:coverage']).toBe('corepack pnpm kb:navigation:check')
    expect(packageJson.scripts['routes:verify']).toBe('corepack pnpm migration:verify-built')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm test')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm check')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm build')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm migration:baseline:check')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm migration:comparison:check')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm knowledge:coverage')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm routes:verify')
    expect(packageJson.scripts['quality:full']).toContain('corepack pnpm security:scan')
    expect(packageJson.scripts['quality:full'].indexOf('corepack pnpm build')).toBeLessThan(
      packageJson.scripts['quality:full'].indexOf('corepack pnpm test'),
    )
  })
})
