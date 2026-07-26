import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { buildRouteManifest, buildSourceAstroRoutes, discoverSourceAstroRoutes, validateRouteManifest } from '../../scripts/routes/build-route-manifest'
import { redirectPage } from '../../scripts/astro/export-content'

describe('route manifest', () => {
  it('classifies Astro routes, compatibility routes, and removed routes', () => {
    const manifest = buildRouteManifest({
      astroRoutes: ['/', '/knowledge/', '/posts/a/'],
      redirects: { '/index.html': '/', '/content/a.html': '/posts/a/' },
      removedRoutes: ['/legacy/deleted.html'],
    })
    expect(manifest.routes).toEqual(expect.arrayContaining([
      { path: '/', kind: 'astro', expectedStatus: 200, finalUrl: '/' },
      { path: '/content/a.html', kind: 'compatibility', target: '/posts/a/', expectedStatus: 200, finalUrl: '/posts/a/' },
      { path: '/legacy/deleted.html', kind: 'removed', expectedStatus: 200, finalUrl: '/legacy/deleted.html' },
    ]))
    expect(validateRouteManifest(manifest)).toEqual([])
  })

  it('keeps static file endpoints as file routes', () => {
    const manifest = JSON.parse(fs.readFileSync('reports/route-manifest.json', 'utf8')) as {
      routes: Array<{ path: string; kind: string; expectedStatus?: number; finalUrl?: string }>
    }

    expect(manifest.routes).toEqual(expect.arrayContaining([
      {
        path: '/data/allPostMeta.json',
        kind: 'astro',
        expectedStatus: 200,
        finalUrl: '/data/allPostMeta.json',
      },
    ]))
    expect(manifest.routes.some((route) => route.path === '/data/allPostMeta.json/')).toBe(false)
  })

  it('includes lowercase post routes, pagination outputs, and configured gallery albums', () => {
    expect(buildSourceAstroRoutes({
      staticRoutes: ['/', '/gallery/'],
      postFiles: ['motor/FOC.md', 'blog/second.md', 'blog/third.md'],
      publishedPostFiles: ['motor/FOC.md', 'blog/second.md', 'blog/third.md'],
      publicPostCount: 3,
      postsPerPage: 2,
      galleryAlbumIds: ['firefly-2026', 'encrypted-test'],
      generateOgImages: true,
    })).toEqual(expect.arrayContaining([
      '/',
      '/2/',
      '/gallery/',
      '/gallery/firefly-2026/',
      '/gallery/encrypted-test/',
      '/og/motor/foc.png',
      '/posts/motor/foc/',
    ]))
  })

  it('discovers enabled repository outputs without disabled feature routes', async () => {
    const routes = await discoverSourceAstroRoutes()
    expect(routes).toEqual(expect.arrayContaining([
      '/2/',
      '/posts/power/getting-started/',
      '/friends/',
      '/gallery/',
      '/guestbook/',
      '/sponsor/',
    ]))
    for (const route of [
      '/anime/',
      '/bangumi/',
      '/gallery/firefly-2026/',
      '/gallery/encrypted-test/',
    ]) expect(routes).not.toContain(route)
  })

  it('does not ship page modules for disabled feature shells', () => {
    for (const file of [
      'src/pages/anime.astro',
      'src/pages/bangumi.astro',
      'src/pages/gallery/index.astro',
      'src/pages/gallery/[album].astro',
    ]) expect(fs.existsSync(file)).toBe(false)
    for (const file of [
      'public/gallery/encrypted-test/urls.txt',
      'public/gallery/firefly-2026/1.avif',
      'public/gallery/firefly-2026/cover.avif',
      'public/gallery/firefly-2026/urls.txt',
    ]) expect(fs.existsSync(file)).toBe(false)
  })

  it('records the custom not-found document with its real status', () => {
    const manifest = buildRouteManifest({ astroRoutes: ['/404/'], redirects: {}, removedRoutes: [] })

    expect(manifest.routes).toContainEqual({
      path: '/404/',
      kind: 'astro',
      expectedStatus: 404,
      finalUrl: '/404/',
    })
  })

  it('rejects incomplete or inconsistent route contracts', () => {
    expect(validateRouteManifest({
      schemaVersion: 2,
      routes: [{ path: '/missing-contract/', kind: 'astro' }],
    } as never)).toEqual(expect.arrayContaining([expect.stringMatching(/expected status/i), expect.stringMatching(/final url/i)]))

    expect(validateRouteManifest({
      schemaVersion: 2,
      routes: [{ path: '/old.html', kind: 'compatibility', target: '/new/', expectedStatus: 200, finalUrl: '/elsewhere/' }],
    })).toEqual(expect.arrayContaining([expect.stringMatching(/final url/i)]))
  })

  it('rejects self redirects, duplicate outputs, and route conflicts', () => {
    const self = buildRouteManifest({ astroRoutes: ['/'], redirects: { '/old.html': '/old.html' }, removedRoutes: [] })
    expect(validateRouteManifest(self)).toEqual(expect.arrayContaining([expect.stringMatching(/self redirect/i)]))
    const conflict = buildRouteManifest({ astroRoutes: ['/old.html'], redirects: { '/old.html': '/' }, removedRoutes: [] })
    expect(validateRouteManifest(conflict)).toEqual(expect.arrayContaining([expect.stringMatching(/conflict/i)]))
  })

  it('generates the real manifest and forbids public/index.html', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')) as { scripts: Record<string, string> }
    expect(pkg.scripts.build).toContain('routes:manifest')
    expect(fs.existsSync('public/index.html')).toBe(false)
  })

  it('classifies encrypted wrapper targets as real Astro routes', () => {
    const manifest = JSON.parse(fs.readFileSync('reports/route-manifest.json', 'utf8')) as {
      routes: Array<{ path: string; kind: string; expectedStatus: number; finalUrl: string }>
    }
    expect(manifest.routes).toEqual(expect.arrayContaining([
      { path: '/posts/encrypted/demo/', kind: 'astro', expectedStatus: 200, finalUrl: '/posts/encrypted/demo/' },
      { path: '/posts/encrypted/worldbuilding/', kind: 'astro', expectedStatus: 200, finalUrl: '/posts/encrypted/worldbuilding/' },
    ]))
  })

  it('renders explicitly removed root pages without redirecting to missing targets', () => {
    const html = fs.readFileSync('public/tools.html', 'utf8')
    expect(html).toContain('name="robots" content="noindex"')
    expect(html).not.toContain('url=/tools/')
    expect(html).not.toContain('href="/tools/"')
  })
})

describe('legacy compatibility page', () => {
  it('provides canonical, meta refresh, clickable fallback, and hash transfer', () => {
    const html = redirectPage('/posts/a/')
    expect(html).toContain('rel="canonical"')
    expect(html).toContain('http-equiv="refresh"')
    expect(html).toContain('<a href="/posts/a/"')
    expect(html).toContain('location.hash')
    expect(html).toContain('location.replace')
  })
})
