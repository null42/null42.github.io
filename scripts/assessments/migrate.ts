import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'

const root = process.cwd()
const contentRoot = path.join(root, 'content')
const assessmentRoot = path.join(contentRoot, 'assessments', 'archive')
const incomingPaths = await fg('**/*assessment*.md', {
  cwd: contentRoot,
  onlyFiles: true,
  ignore: ['assessments/**'],
})

for (const relativePath of incomingPaths.sort()) {
  const sourcePath = path.join(contentRoot, ...relativePath.split('/'))
  const destinationPath = path.join(assessmentRoot, ...relativePath.split('/'))
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
  if (fs.existsSync(destinationPath)) {
    if (fs.readFileSync(destinationPath, 'utf8') !== fs.readFileSync(sourcePath, 'utf8')) throw new Error(`Assessment destination differs: ${relativePath}`)
    fs.unlinkSync(sourcePath)
  } else {
    fs.renameSync(sourcePath, destinationPath)
  }
}

const archivedPaths = await fg('**/*.md', { cwd: assessmentRoot, onlyFiles: true })
const entries = archivedPaths.sort().map(relativePath => {
  const source = fs.readFileSync(path.join(assessmentRoot, ...relativePath.split('/')), 'utf8')
  const parsed = matter(source)
  const basename = path.posix.basename(relativePath, '.md')
  const articlePrefix = basename.replace(/-assessment.*$/i, '')
  return {
    id: relativePath.replace(/\.md$/i, '').replace(/[^a-z0-9/._-]+/gi, '-').toLowerCase(),
    originalPath: relativePath,
    path: path.posix.join('assessments/archive', relativePath),
    title: String(parsed.data.title || articlePrefix),
    articlePrefix,
  }
})

const manifestPath = path.join(contentRoot, 'assessments', 'manifest.json')
fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
fs.writeFileSync(manifestPath, `${JSON.stringify({ version: 1, entries }, null, 2)}\n`, 'utf8')
console.log(`Migrated ${incomingPaths.length} new assessments; indexed ${entries.length} total.`)
