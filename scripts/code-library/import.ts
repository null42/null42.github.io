import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { CODE_PROJECT_SOURCES } from './catalog'

const OUTPUT_ROOT = path.resolve('content/code-library/projects')
const MANIFEST_PATH = path.resolve('content/code-library/manifest.json')
const LEARNING_ROOT = path.resolve('..')
const BINARY_EXTENSIONS = new Set(['.slx', '.mdl', '.mlx'])

function languageFor(file: string): string {
  const extension = path.extname(file).toLowerCase()
  return ({ '.c': 'c', '.h': 'c', '.cpp': 'cpp', '.hpp': 'cpp', '.py': 'python', '.m': 'matlab', '.js': 'javascript', '.ts': 'typescript', '.slx': 'simulink', '.mdl': 'simulink' } as Record<string, string>)[extension] || 'text'
}

async function main(): Promise<void> {
  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true })
  const projects = []
  for (const project of CODE_PROJECT_SOURCES) {
    const files = []
    for (const sourceRelative of project.files) {
      const sourceRoot = project.root === 'repository' ? path.resolve('.') : LEARNING_ROOT
      const sourcePath = path.resolve(sourceRoot, sourceRelative)
      const relativeToRoot = path.relative(sourceRoot, sourcePath)
      if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) throw new Error(`Source escaped learning root: ${sourceRelative}`)
      const bytes = await fs.readFile(sourcePath)
      const outputRelative = path.basename(sourcePath)
      const outputPath = path.join(OUTPUT_ROOT, project.codeId, outputRelative)
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, bytes)
      const binary = BINARY_EXTENSIONS.has(path.extname(sourcePath).toLowerCase())
      const lineCount = binary ? null : bytes.toString('utf8').replace(/\r\n/g, '\n').split('\n').length
      files.push({
        path: `projects/${project.codeId}/${outputRelative.replace(/\\/g, '/')}`,
        name: path.basename(sourcePath),
        language: languageFor(sourcePath),
        originalSource: `${project.root === 'repository' ? 'repository' : 'learning'}/${sourceRelative.replace(/\\/g, '/')}`,
        sha256: createHash('sha256').update(bytes).digest('hex'),
        bytes: bytes.length,
        binary,
        lineRange: lineCount ? { start: 1, end: lineCount } : null,
      })
    }
    projects.push({ codeId: project.codeId, title: project.title, description: project.description, files, articles: await findArticleReferences(project.codeId) })
  }
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify({ schema: 'code-library/v1', projects }, null, 2)}\n`, 'utf8')
  console.log(`Imported ${projects.length} projects and ${projects.reduce((sum, project) => sum + project.files.length, 0)} files.`)
}

async function findArticleReferences(codeId: string): Promise<Array<{ slug: string; title: string; references: Array<{ file: string; headingId: string; lines: string; label?: string }> }>> {
  const articles = []
  const markdownFiles = await fg(['**/*.md', '!assessments/**', '!private/**'], { cwd: path.resolve('content'), onlyFiles: true })
  for (const relativePath of markdownFiles) {
    const parsed = matter(await fs.readFile(path.resolve('content', relativePath), 'utf8'))
    const references = Array.isArray(parsed.data.codeRefs) ? parsed.data.codeRefs.filter((reference: { codeId?: string }) => reference?.codeId === codeId) : []
    if (!references.length) continue
    articles.push({
      slug: relativePath.replace(/\.md$/i, '').replace(/\\/g, '/').toLowerCase(),
      title: String(parsed.data.title || path.basename(relativePath, path.extname(relativePath))),
      references: references.map((reference: { file: string; headingId: string; lines: string; label?: string }) => ({ file: reference.file, headingId: reference.headingId, lines: reference.lines, ...(reference.label ? { label: reference.label } : {}) })),
    })
  }
  return articles
}

await main()
