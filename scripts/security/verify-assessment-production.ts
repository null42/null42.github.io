import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

const root = process.cwd()
const failures: string[] = []
const generatedAssessmentSources = await fg('src/content/posts/**/*assessment*.md', { cwd: root, onlyFiles: true, caseSensitiveMatch: false })
if (generatedAssessmentSources.length) failures.push(`Generated assessment posts: ${generatedAssessmentSources.join(', ')}`)

if (fs.existsSync(path.join(root, 'dist'))) {
  const standaloneRoutes = await fg('dist/posts/**/*assessment*/index.html', { cwd: root, onlyFiles: true, caseSensitiveMatch: false })
  if (standaloneRoutes.length) failures.push(`Standalone assessment routes: ${standaloneRoutes.join(', ')}`)
  const publicIndexes = ['dist/rss.xml', 'dist/sitemap-0.xml', 'dist/data/allPostMeta.json', 'dist/pagefind/pagefind-entry.json']
  for (const relativePath of publicIndexes) {
    const absolute = path.join(root, relativePath)
    if (!fs.existsSync(absolute)) continue
    const text = fs.readFileSync(absolute, 'utf8')
    if (/\/posts\/[^"'\s<]*assessment/i.test(text)) failures.push(`Assessment route leaked into ${relativePath}`)
  }
}

const generatedNavigation = path.join(root, 'src', 'generated', 'knowledge-navigation.json')
if (fs.existsSync(generatedNavigation) && /"(?:slug|articleId)"\s*:\s*"[^"]*assessment/i.test(fs.readFileSync(generatedNavigation, 'utf8'))) {
  failures.push('Assessment entries leaked into knowledge navigation')
}

if (failures.length) throw new Error(`Assessment production verification failed:\n${failures.join('\n')}`)
console.log('Assessment sources have no standalone routes, navigation, RSS, sitemap, or search route entries.')
