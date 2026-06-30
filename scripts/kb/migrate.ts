import fs from 'node:fs/promises'
import path from 'node:path'
import fg from 'fast-glob'
import { contentRoot } from './paths'

interface MigrationSource {
  name: string
  root: string
  target: string
}

const sources: MigrationSource[] = [
  {
    name: 'power',
    root: 'E:\\gitee_CodeStorage\\学习\\电源',
    target: path.join(contentRoot, 'power')
  },
  {
    name: 'motor',
    root: 'E:\\gitee_CodeStorage\\学习\\MotorControl-main\\motor-learning-web',
    target: path.join(contentRoot, 'motor')
  }
]

const apply = process.argv.includes('--apply')
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

for (const source of sources) {
  const files = await fg(includePatterns, {
    cwd: source.root,
    absolute: false,
    onlyFiles: true,
    ignore: ignorePatterns
  })

  console.log(`${apply ? 'migrating' : 'dry-run'} ${files.length} files from ${source.name}`)
  for (const file of files) {
    const from = path.join(source.root, file)
    const to = path.join(source.target, sanitizePath(file))
    if (!apply) {
      console.log(`[dry-run] ${from} -> ${to}`)
      continue
    }
    await fs.mkdir(path.dirname(to), { recursive: true })
    await fs.copyFile(from, to)
    console.log(`[copied] ${from} -> ${to}`)
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
