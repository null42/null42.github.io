import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { contentRoot } from './paths'
import { convertHtmlFile } from './import/html-to-markdown'
import { convertVueSimulation } from './import/vue-simulation-to-markdown'

interface MigrationSource {
  name: string
  root: string
  target: string
  patterns?: string[]
}

const sources: MigrationSource[] = [
  {
    name: 'power',
    root: 'E:\\gitee_CodeStorage\\学习\\电源',
    target: path.join(contentRoot, 'power')
  },
  {
    name: 'power-concepts',
    root: 'E:\\gitee_CodeStorage\\学习\\电源\\concepts\\power-electronics',
    target: path.join(contentRoot, 'power', 'concepts'),
    patterns: ['**/*.md']
  },
  {
    name: 'power-lessons-html',
    root: 'E:\\gitee_CodeStorage\\学习\\电源\\lessons',
    target: path.join(contentRoot, 'power', 'lessons'),
    patterns: ['**/*.html']
  },
  {
    name: 'motor',
    root: 'E:\\gitee_CodeStorage\\学习\\MotorControl-main\\motor-learning-web',
    target: path.join(contentRoot, 'motor'),
    patterns: [
      'frontend/src/components/simulations/*Sim.vue'
    ]
  }
]

const apply = process.argv.includes('--apply')
const sourceFilter = readArg('--source')
const limit = Number(readArg('--limit') || '0')
const includePatterns = ['**/*.md', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
const ignorePatterns = [
  '**/.git/**',
  '**/node_modules/**',
  '**/venv/**',
  '**/.venv/**',
  '**/dist/**',
  '**/build/**',
  '**/static/assets/**',
  '**/*.slxc',
  '**/*.exe',
  '**/*.zip'
]

const selectedSources = sourceFilter ? sources.filter((source) => source.name === sourceFilter) : sources
if (selectedSources.length === 0) {
  throw new Error(`Unknown migration source: ${sourceFilter}`)
}

for (const source of selectedSources) {
  const files = (await fg(source.patterns || includePatterns, {
    cwd: source.root,
    absolute: false,
    onlyFiles: true,
    ignore: ignorePatterns
  })).slice(0, limit > 0 ? limit : undefined)

  console.log(`${apply ? 'migrating' : 'dry-run'} ${files.length} files from ${source.name}`)
  for (const file of files) {
    const from = path.join(source.root, file)
    const to = targetPath(source, file)
    if (!apply) {
      console.log(`[${file.endsWith('.html') ? 'convert-html' : 'dry-run'}] ${from} -> ${to}`)
      continue
    }
    await migrateFile(from, to, source, file)
    console.log(`[${conversionLabel(file)}] ${from} -> ${to}`)
  }
}

if (!apply) {
  console.log('dry-run only; rerun with npm run kb:migrate -- --apply to copy files')
}

function sanitizePath(value: string): string {
  return value
    .replace(/\\/g, '/')
    .split('/')
    .filter((part) => part && part !== '..')
    .join(path.sep)
}

function readArg(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function targetPath(source: MigrationSource, file: string): string {
  const sanitized = sanitizePath(file)
  if (file.endsWith('.html')) {
    return path.join(source.target, sanitized.replace(/\.html$/i, '.md'))
  }
  if (source.name === 'motor' && file.endsWith('.vue')) {
    return path.join(source.target, 'simulations', sanitized.replace(/^frontend[\\/]src[\\/]components[\\/]simulations[\\/]/, '').replace(/\.vue$/i, '.md'))
  }
  return path.join(source.target, sanitized)
}

async function migrateFile(from: string, to: string, source: MigrationSource, relativeFile: string): Promise<void> {
  await fs.mkdir(path.dirname(to), { recursive: true })
  if (from.endsWith('.html')) {
    const converted = await convertHtmlFile(from)
    await fs.writeFile(to, withFrontmatter(converted.title, converted.markdown, source.name, relativeFile), 'utf8')
    return
  }
  if (from.endsWith('.vue')) {
    const raw = await fs.readFile(from, 'utf8')
    const converted = convertVueSimulation(raw, from)
    const title = converted.title
    const body = converted.markdown
    await fs.writeFile(to, withFrontmatter(title, body, source.name, relativeFile), 'utf8')
    return
  }
  await fs.copyFile(from, to)
}

function withFrontmatter(title: string, body: string, sourceName: string, sourcePath: string): string {
  const source = sourceName === 'motor' ? 'motor' : 'power'
  const section = source === 'motor' ? '电机控制' : '电源控制'
  const chapter = source === 'motor' ? '02-Simulations' : '01-Lessons'
  const normalizedSourcePath = sourcePath.replace(/\\/g, '/')
  return `---\ntitle: ${title}\ndate: ${new Date().toISOString().slice(0, 10)}\nsection: ${section}\nchapter: ${chapter}\ncategory: ${section}\ntags:\n  - imported\nsource: ${source}\nsourcePath: ${normalizedSourcePath}\nstatus: learning\nvisibility: public\nsummary: Imported from ${normalizedSourcePath}\n---\n\n${body.trim()}\n`
}

function conversionLabel(file: string): string {
  if (file.endsWith('.html')) return 'converted'
  if (file.endsWith('.vue')) return 'converted-vue'
  return 'copied'
}
