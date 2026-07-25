import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import YAML from 'yaml'
import { repoRoot } from '../kb/paths'
import { galleryConfig } from '../../src/config/galleryConfig'
import { siteConfig } from '../../src/config/siteConfig'

export type RouteKind = 'astro' | 'compatibility' | 'removed'
export interface RouteEntry { path: string; kind: RouteKind; expectedStatus: number; finalUrl: string; target?: string }
export interface RouteManifest { schemaVersion: 2; routes: RouteEntry[] }
export interface SourceAstroRoutesInput {
  staticRoutes: string[]
  postFiles: string[]
  publishedPostFiles: string[]
  publicPostCount: number
  postsPerPage: number
  galleryAlbumIds: string[]
  generateOgImages: boolean
}

export function buildRouteManifest(input: { astroRoutes: string[]; redirects: Record<string, string>; removedRoutes: string[] }): RouteManifest {
  const routes: RouteEntry[] = [
    ...input.astroRoutes.map((route) => contractRoute(route, 'astro')),
    ...Object.entries(input.redirects).map(([route, target]) => {
      const normalizedTarget = normalizeRoute(target).replace(/\/index\/$/i, '/')
      return { ...contractRoute(route, 'compatibility', normalizedTarget), target: normalizedTarget }
    }),
    ...input.removedRoutes.map((route) => contractRoute(route, 'removed')),
  ]
  return { schemaVersion: 2, routes: routes.sort((left, right) => left.path.localeCompare(right.path) || left.kind.localeCompare(right.kind)) }
}

export function validateRouteManifest(manifest: RouteManifest): string[] {
  const issues: string[] = []
  const paths = new Map<string, RouteEntry[]>()
  for (const route of manifest.routes) {
    const entries = paths.get(route.path) || []
    entries.push(route); paths.set(route.path, entries)
    if (!Number.isInteger(route.expectedStatus) || route.expectedStatus < 100 || route.expectedStatus > 599) issues.push(`Invalid expected status: ${route.path}`)
    if (!route.finalUrl || !route.finalUrl.startsWith('/')) issues.push(`Invalid final URL: ${route.path}`)
    if (route.kind === 'compatibility' && route.path === route.target) issues.push(`Self redirect: ${route.path}`)
    if (route.kind === 'compatibility' && route.finalUrl !== route.target) issues.push(`Compatibility final URL mismatch: ${route.path}`)
    if (route.kind !== 'compatibility' && route.finalUrl !== route.path) issues.push(`Final URL mismatch: ${route.path}`)
  }
  for (const [routePath, entries] of paths) if (entries.length > 1) issues.push(`Route conflict: ${routePath}`)
  return issues
}

export function buildSourceAstroRoutes(input: SourceAstroRoutesInput): string[] {
  const postRoutes = input.postFiles.map((file) => `/posts/${postIdFromFile(file)}/`)
  const pageCount = Math.ceil(input.publicPostCount / input.postsPerPage)
  const paginationRoutes = Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => `/${index + 2}/`)
  const galleryRoutes = input.galleryAlbumIds.map((albumId) => `/gallery/${albumId}/`)
  const ogRoutes = input.generateOgImages
    ? input.publishedPostFiles.map((file) => `/og/${postIdFromFile(file)}.png`)
    : []
  return [...new Set([...input.staticRoutes, ...postRoutes, ...paginationRoutes, ...galleryRoutes, ...ogRoutes])]
}

export async function discoverSourceAstroRoutes(rootDir = repoRoot): Promise<string[]> {
  const pageFiles = await fg('**/*.{astro,ts}', { cwd: path.join(rootDir, 'src/pages'), onlyFiles: true })
  const staticRoutes = pageFiles.filter((file) => !file.includes('[') && !file.startsWith('api/') && !file.startsWith('og/')).map(routeFromPage)
  const postFiles = await fg('**/*.md', { cwd: path.join(rootDir, 'src/content/posts'), onlyFiles: true })
  const publishedPostFiles = await filterPublishedPostFiles(rootDir, postFiles)
  return buildSourceAstroRoutes({
    staticRoutes,
    postFiles,
    publishedPostFiles,
    publicPostCount: publishedPostFiles.length,
    postsPerPage: siteConfig.pagination.postsPerPage,
    galleryAlbumIds: siteConfig.pages.gallery ? galleryConfig.albums.map((album) => album.id) : [],
    generateOgImages: siteConfig.post.generateOgImages,
  })
}

export async function generateRouteManifest(): Promise<RouteManifest> {
  const redirects = JSON.parse(await fs.readFile(path.join(repoRoot, 'reports/old-url-manifest.json'), 'utf8')) as Record<string, string>
  const astroRoutes = await discoverSourceAstroRoutes(repoRoot)
  const manifest = buildRouteManifest({ astroRoutes, redirects, removedRoutes: ['/tools.html'] })
  const issues = validateRouteManifest(manifest)
  if (issues.length) throw new Error(issues.join('\n'))
  if (await exists(path.join(repoRoot, 'public/index.html'))) throw new Error('public/index.html is forbidden')
  await fs.writeFile(path.join(repoRoot, 'reports/route-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest
}

async function filterPublishedPostFiles(rootDir: string, postFiles: string[]): Promise<string[]> {
  const published: string[] = []
  for (const file of postFiles) {
    const source = await fs.readFile(path.join(rootDir, 'src/content/posts', file), 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
    const data = frontmatter ? YAML.parse(frontmatter) as { draft?: boolean } : {}
    if (data.draft !== true) published.push(file)
  }
  return published
}

function postIdFromFile(file: string): string {
  return file.replace(/\\/g, '/').replace(/\.md$/i, '').toLowerCase()
}

function routeFromPage(file: string): string {
  const normalized = file.replace(/\\/g, '/').replace(/\.(astro|ts)$/, '')
  if (normalized === 'index') return '/'
  if (normalized.endsWith('/index')) return `/${normalized.slice(0, -6)}/`
  if (path.posix.extname(normalized)) return `/${normalized}`
  return `/${normalized}/`
}
function contractRoute(route: string, kind: RouteKind, finalUrl?: string): RouteEntry {
  const normalizedRoute = normalizeRoute(route)
  const expectedStatus = normalizedRoute === '/404/' ? 404 : 200
  return { path: normalizedRoute, kind, expectedStatus, finalUrl: finalUrl ?? normalizedRoute }
}
function normalizeRoute(route: string): string { return route.startsWith('/') ? route : `/${route}` }
async function exists(file: string): Promise<boolean> { try { await fs.access(file); return true } catch { return false } }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateRouteManifest().then((manifest) => console.log(`generated route manifest with ${manifest.routes.length} routes`)).catch((error) => { console.error((error as Error).message); process.exitCode = 1 })
