import fs from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { chromium } from '@playwright/test'
import { FailureCollector } from './verification-lifecycle'

const rootDir = process.cwd()
const fixturePath = path.join(rootDir, 'content', 'blog', '_hidden-production-contract.md')
const generatedPath = path.join(rootDir, 'src', 'content', 'posts', 'blog', '_hidden-production-contract.md')
const publicFixturePath = path.join(rootDir, 'content', 'blog', '_public-production-contract.md')
const publicGeneratedPath = path.join(rootDir, 'src', 'content', 'posts', 'blog', '_public-production-contract.md')
const privateFixturePath = path.join(rootDir, 'content', 'private', '_private-production-contract.md')
const privateGeneratedPath = path.join(rootDir, 'src', 'content', 'posts', 'private', '_private-production-contract.md')
const outputDir = path.join(rootDir, 'env', 'hidden-production-contract')
const exporterCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs')
const exporterScript = path.join(rootDir, 'scripts', 'astro', 'export-content.ts')
const astroCli = path.join(rootDir, 'node_modules', 'astro', 'bin', 'astro.mjs')
const pagefindCli = path.join(rootDir, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs')
const title = 'Hidden Production Contract'
const body = 'HIDDEN_PRODUCTION_BODY_SENTINEL'
const hiddenSearchTerm = 'hiddenproductionsearchcanary'
const publicTitle = 'Public Production Contract'
const publicBody = 'PUBLIC_PRODUCTION_SEARCH_SENTINEL'
const publicSearchTerm = 'publicproductionsearchcanary'
const privateTitle = 'Private Production Contract'
const privateBody = 'PRIVATE_PRODUCTION_BODY_SENTINEL'
const privateSearchTerm = 'privateproductionsearchcanary'

function runNode(args: string[], label: string): void {
  const result = spawnSync(process.execPath, args, {
    cwd: rootDir,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  })
  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join('\n').slice(-12000)
    throw new Error(label + ' failed' + (detail ? ':\n' + detail : ''))
  }
}

function read(relativePath: string): string {
  return fs.readFileSync(path.join(outputDir, relativePath), 'utf8')
}

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message)
}

function removeFile(target: string): void {
  if (fs.existsSync(target)) fs.unlinkSync(target)
  assert(!fs.existsSync(target), 'Failed to remove fixture file: ' + target)
}

function removeDirectory(target: string): void {
  if (!fs.existsSync(target)) return
  if (process.platform === 'win32') {
    const escaped = target.replaceAll("'", "''")
    const result = spawnSync('powershell.exe', ['-NoProfile', '-Command', "$target='" + escaped + "'; Remove-Item -LiteralPath $target -Recurse -Force; if(Test-Path -LiteralPath $target){exit 1}"], { encoding: 'utf8' })
    if (result.status !== 0) throw new Error('Failed to remove directory: ' + target)
  } else {
    fs.rmSync(target, { recursive: true, maxRetries: 8, retryDelay: 250 })
  }
  assert(!fs.existsSync(target), 'Failed to remove directory: ' + target)
}

function cleanup(): void {
  const failures = new FailureCollector()
  failures.capture(() => removeFile(fixturePath))
  failures.capture(() => removeFile(publicFixturePath))
  failures.capture(() => removeFile(privateFixturePath))
  failures.capture(() => runNode([exporterCli, exporterScript], 'content cleanup export'))
  failures.capture(() => removeFile(fixturePath))
  failures.capture(() => removeFile(publicFixturePath))
  failures.capture(() => removeFile(privateFixturePath))
  failures.capture(() => removeFile(generatedPath))
  failures.capture(() => removeFile(publicGeneratedPath))
  failures.capture(() => removeFile(privateGeneratedPath))
  failures.capture(() => removeDirectory(outputDir))
  failures.capture(() => assert(!fs.existsSync(outputDir), 'Failed to remove hidden production output'))
  failures.throwIfAny('Production visibility cleanup failed')
}

function outputContains(term: string): boolean {
  const pending = [path.join(outputDir, 'pagefind')]
  const needle = Buffer.from(term)
  while (pending.length) {
    const current = pending.pop()!
    if (!fs.existsSync(current)) continue
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name)
      if (entry.isDirectory()) pending.push(target)
      else if (fs.readFileSync(target).includes(needle)) return true
    }
  }
  return false
}

function responseType(target: string): string {
  if (target.endsWith('.html')) return 'text/html; charset=utf-8'
  if (target.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (target.endsWith('.json')) return 'application/json; charset=utf-8'
  if (target.endsWith('.wasm') || target.endsWith('.pagefind')) return 'application/wasm'
  return 'application/octet-stream'
}

async function queryPagefind(terms: string[]): Promise<Record<string, string[]>> {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://127.0.0.1').pathname)
    const relativePath = pathname.endsWith('/') ? pathname.slice(1) + 'index.html' : pathname.slice(1)
    const target = path.resolve(outputDir, relativePath)
    if (target !== outputDir && !target.startsWith(outputDir + path.sep)) {
      response.writeHead(403).end()
      return
    }
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      response.writeHead(404).end()
      return
    }
    response.setHeader('Content-Type', responseType(target))
    fs.createReadStream(target).pipe(response)
  })
  const failures = new FailureCollector()
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined
  let matches: Record<string, string[]> | undefined
  try {
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject)
      server.listen(0, '127.0.0.1', resolve)
    })
    const address = server.address()
    assert(address && typeof address !== 'string', 'Failed to start Pagefind verification server')
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:' + address.port + '/list/', { waitUntil: 'domcontentloaded' })
    matches = await page.evaluate(async (searchTerms) => {
      const loadPagefind = new Function('return import("/pagefind/pagefind.js")') as () => Promise<{ search: (term: string) => Promise<{ results: Array<{ data: () => Promise<unknown> }> }> }>
      const pagefind = await loadPagefind()
      const matches: Record<string, string[]> = {}
      for (const term of searchTerms) {
        const search = await pagefind.search(term)
        matches[term] = await Promise.all(search.results.map(async (result) => JSON.stringify(await result.data())))
      }
      return matches
    }, terms)
  } catch (error) {
    failures.add(error)
  } finally {
    if (browser) await failures.captureAsync(() => browser.close())
    if (server.listening) await failures.captureAsync(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())))
  }
  failures.throwIfAny('Pagefind production query failed')
  assert(matches, 'Pagefind production query returned no result map')
  return matches
}

const failures = new FailureCollector()
if (process.argv.includes('--cleanup-only')) {
  cleanup()
  console.log(JSON.stringify({ hiddenProductionCleanup: 'passed' }))
  process.exit(0)
}
try {
  assert(!fs.existsSync(fixturePath), 'Hidden production fixture already exists')
  assert(!fs.existsSync(publicFixturePath), 'Public production fixture already exists')
  assert(!fs.existsSync(privateFixturePath), 'Private production fixture already exists')
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true })
  fs.mkdirSync(path.dirname(privateFixturePath), { recursive: true })
  fs.mkdirSync(path.dirname(outputDir), { recursive: true })
  removeDirectory(outputDir)
  fs.writeFileSync(fixturePath, [
    '---',
    'title: ' + title,
    'date: 2026-07-01',
    'visibility: hidden',
    '---',
    '',
    body,
    hiddenSearchTerm,
    '',
  ].join('\n'), 'utf8')
  fs.writeFileSync(publicFixturePath, [
    '---',
    'title: ' + publicTitle,
    'date: 2026-07-01',
    'visibility: public',
    '---',
    '',
    publicBody,
    publicSearchTerm,
    '',
  ].join('\n'), 'utf8')
  fs.writeFileSync(privateFixturePath, [
    '---',
    'title: ' + privateTitle,
    'date: 2026-07-01',
    'visibility: private',
    '---',
    '',
    privateBody,
    privateSearchTerm,
    '',
  ].join('\n'), 'utf8')

  runNode([exporterCli, exporterScript], 'content export')
  runNode([astroCli, 'build', '--root', rootDir, '--outDir', outputDir], 'Astro hidden production build')
  runNode([pagefindCli, '--site', outputDir], 'Pagefind hidden production index')
  const pagefindResults = await queryPagefind([publicSearchTerm, hiddenSearchTerm, privateSearchTerm])

  const html = read('posts/blog/_hidden-production-contract/index.html')
  assert(html.includes(body), 'Hidden direct-link HTML body is missing')
  assert(html.includes('content="noindex, nofollow"'), 'Hidden HTML is missing noindex')
  assert(html.includes('data-pagefind-ignore="all"'), 'Hidden HTML is missing Pagefind exclusion')
  assert(!html.includes('data-pagefind-body'), 'Hidden HTML still exposes a Pagefind body')
  assert(!html.includes('"@type":"BlogPosting"'), 'Hidden HTML exposes BlogPosting JSON-LD')
  assert(!read('rss.xml').includes(title), 'Hidden title leaked into RSS')
  assert(!read('sitemap-0.xml').includes('/posts/blog/_hidden-production-contract/'), 'Hidden route leaked into Sitemap')
  assert(!read('list/index.html').includes(title), 'Hidden title leaked into the article list')
  assert(!outputContains(title) && !outputContains(body), 'Hidden content leaked into Pagefind output')
  assert(pagefindResults[publicSearchTerm].some((result) => result.includes(publicSearchTerm) && result.includes('/posts/blog/_public-production-contract/')), 'Public Pagefind canary was not searchable')
  assert(pagefindResults[hiddenSearchTerm].every((result) => !result.includes(hiddenSearchTerm) && !result.includes('/posts/blog/_hidden-production-contract/')), 'Hidden content leaked into Pagefind search results')
  const privateRoute = path.join(outputDir, 'posts', 'private', '_private-production-contract', 'index.html')
  assert(!fs.existsSync(privateGeneratedPath), 'Private source generated normalized Markdown')
  assert(!fs.existsSync(privateRoute), 'Private source generated an HTML route')
  assert(!read('rss.xml').includes(privateTitle), 'Private title leaked into RSS')
  assert(!read('sitemap-0.xml').includes('/posts/private/_private-production-contract/'), 'Private route leaked into Sitemap')
  assert(!read('list/index.html').includes(privateTitle), 'Private title leaked into the article list')
  assert(!outputContains(privateTitle) && !outputContains(privateBody), 'Private content leaked into Pagefind output')
  assert(pagefindResults[privateSearchTerm].every((result) => !result.includes(privateSearchTerm) && !result.includes('/posts/private/_private-production-contract/')), 'Private content leaked into Pagefind search results')
} catch (error) {
  failures.add(error)
} finally {
  failures.capture(cleanup)
}

failures.throwIfAny('Production visibility contract failed')
console.log(JSON.stringify({ hiddenProductionContract: 'passed', privateProductionContract: 'passed' }))
