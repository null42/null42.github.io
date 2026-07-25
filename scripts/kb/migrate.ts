import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import { contentRoot } from './paths'
import { convertHtmlFile } from './import/html-to-markdown'

export interface MigrationSource {
  name: string
  label: string
  root: string
  target: string
  patterns?: string[]
  extraCopies?: Array<{ from: string; to: string }>
}

const includePatterns = ['**/*.{md,html,png,jpg,jpeg,gif,svg,yaml,yml,json,c,h,hpp,cpp,rst}']
const ignorePatterns = [
  '**/.git/**',
  '**/node_modules/**',
  '**/venv/**',
  '**/.venv/**',
  '**/dist/**',
  '**/build/**',
  '**/static/assets/**',
  '**/_annotations/**',
      '**/_proofs/**',
      '**/datasets/**',
      '**/reports/**',
      '**/schemas/**',
      '**/CONTRIBUTING.md',
      '**/HANDOVER.md',
      '**/TEMPLATE-*.md',
      '**/verification-checklist.md',
      '**/workflow-closed-loop.md',
      '**/*release-checklist.md',
      '**/*.slxc',
      '**/*.exe',
      '**/*.zip'
]

export function resolveMigrationSources(
  argv: string[] = process.argv.slice(2),
  env: Record<string, string | undefined> = process.env
): MigrationSource[] {
  const powerRoot = readOption(argv, '--power-root') || env.KB_POWER_SOURCE_ROOT
  const motorRoot = readOption(argv, '--motor-root') || env.KB_MOTOR_SOURCE_ROOT
  const motorSlidesRoot = readOption(argv, '--motor-slides-root') || env.KB_MOTOR_SLIDES_ROOT
  const sources: MigrationSource[] = []

  if (powerRoot) {
    sources.push({
      name: 'power',
      label: 'power',
      root: powerRoot,
      target: path.join(contentRoot, 'power'),
      patterns: [
        'archive/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'debug-records/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'docs/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'fz/**/*.{png,jpg,jpeg,gif,svg}',
        'projects/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'reference/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'roadmap/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'simulations/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'weekly-reviews/**/*.{md,html,png,jpg,jpeg,gif,svg}',
        'MISSION.md',
        'NOTES.md',
        'RESOURCES.md',
        'USAGE.md',
        'control-delay-timing.svg'
      ]
    })
  }

  if (motorRoot) {
    sources.push({
      name: 'motor',
      label: 'motor-control-knowledge-base',
      root: motorRoot,
      target: path.join(contentRoot, 'motor'),
      patterns: includePatterns,
      extraCopies: motorSlidesRoot
        ? [{
            from: motorSlidesRoot,
            to: path.join(contentRoot, 'motor', 'controllers-evolution', 'assets', 'servo-motor-controllers-slides')
          }]
        : undefined
    })
  }

  return sources
}

async function main(argv: string[] = process.argv.slice(2), env = process.env): Promise<void> {
  const apply = argv.includes('--apply')
  const overwrite = argv.includes('--overwrite')
  const sourceFilter = readOption(argv, '--source')
  const limit = Number(readOption(argv, '--limit') || '0')
  const sources = resolveMigrationSources(argv, env)
  const selectedSources = sourceFilter ? sources.filter((source) => source.name === sourceFilter) : sources

  if (sourceFilter && !['power', 'motor'].includes(sourceFilter)) {
    throw new Error(`Unknown migration source: ${sourceFilter}`)
  }
  if (sourceFilter && selectedSources.length === 0) {
    throw new Error(`Migration source ${sourceFilter} is not configured`)
  }
  if (selectedSources.length === 0) {
    console.warn('no migration sources configured; set source root CLI options or KB_*_SOURCE_ROOT environment variables')
    return
  }

  for (const source of selectedSources) {
    const files = (await fg(source.patterns || includePatterns, {
      cwd: source.root,
      absolute: false,
      onlyFiles: true,
      ignore: ignorePatterns
    })).slice(0, limit > 0 ? limit : undefined)

    console.log(`${apply ? 'migrating' : 'dry-run'} ${files.length} files from ${source.label}`)
    for (const file of files) {
      const from = path.join(source.root, file)
      const to = targetPath(source, file)
      if (!apply) {
        console.log(`[${file.endsWith('.html') ? 'convert-html' : 'dry-run'}] ${file} -> ${path.relative(contentRoot, to)}`)
        continue
      }
      if (!(await shouldWriteTarget(to, overwrite))) {
        console.log(`[skip-existing] ${path.relative(contentRoot, to)}`)
        continue
      }
      await migrateFile(from, to, source, file)
      console.log(`[${conversionLabel(file)}] ${file} -> ${path.relative(contentRoot, to)}`)
    }

    for (const extraCopy of source.extraCopies || []) {
      if (!apply) {
        console.log(`[dry-run-extra] ${source.name}:servo-motor-controllers-slides`)
        continue
      }
      await copyDirectory(extraCopy.from, extraCopy.to, overwrite)
      console.log(`[copied-extra] ${source.name}:servo-motor-controllers-slides`)
    }
  }

  if (!apply) {
    console.log('dry-run only; rerun with npm run kb:migrate -- --apply to copy files; add --overwrite to replace existing targets')
  }
}

function sanitizePath(value: string): string {
  return value
    .replace(/\\/g, '/')
    .split('/')
    .filter((part) => part && part !== '..')
    .join(path.sep)
}

function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name)
  return index >= 0 ? argv[index + 1] : undefined
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

function targetPath(source: MigrationSource, file: string): string {
  const sanitized = sanitizePath(file)
  if (file.endsWith('.html')) {
    return path.join(source.target, sanitized.replace(/\.html$/i, '.md'))
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
  await fs.copyFile(from, to)
}

async function shouldWriteTarget(to: string, overwrite: boolean): Promise<boolean> {
  if (overwrite) return true
  try {
    await fs.access(to)
    return false
  } catch {
    return true
  }
}

async function copyDirectory(from: string, to: string, overwrite: boolean): Promise<void> {
  const files = await fg('**/*', { cwd: from, absolute: false, onlyFiles: true })
  for (const file of files) {
    const target = path.join(to, sanitizePath(file))
    if (!(await shouldWriteTarget(target, overwrite))) continue
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.copyFile(path.join(from, file), target)
  }
}

function withFrontmatter(title: string, body: string, sourceName: string, sourcePath: string): string {
  const source = sourceName === 'motor' ? 'motor' : 'power'
  const section = source === 'motor' ? '电机控制' : '电源控制'
  const chapter = inferChapter(sourcePath)
  const chapterTitle = chapterTitleFromPath(source, sourcePath)
  const chapterBlock = chapter ? `chapter: ${chapter}\nchapterTitle: ${chapterTitle}\n` : ''
  const normalizedSourcePath = sourcePath.replace(/\\/g, '/')
  return `---\ntitle: ${title}\ndate: ${new Date().toISOString().slice(0, 10)}\nsection: ${section}\n${chapterBlock}category: ${section}\ntags:\n  - imported\nsource: ${source}\nsourcePath: ${normalizedSourcePath}\nstatus: learning\nvisibility: public\nsummary: Imported from ${normalizedSourcePath}\n---\n\n${body.trim()}\n`
}

function conversionLabel(file: string): string {
  if (file.endsWith('.html')) return 'converted'
  return 'copied'
}

function inferChapter(sourcePath: string): string | undefined {
  const normalized = sourcePath.replace(/\\/g, '/')
  const first = normalized.split('/')[0]
  return first && !first.includes('.') ? first : undefined
}

function chapterTitleFromPath(source: string, sourcePath: string): string {
  const chapter = inferChapter(sourcePath)
  if (!chapter) return source === 'motor' ? '电机控制' : '电源控制'
  const titles: Record<string, string> = {
    advanced: '进阶专题',
    algorithm: '控制算法',
    communication: '通信与协议',
    COMPARISON: '方案对比',
    'control-theory': '控制理论',
    'controllers-evolution': '控制器演进',
    'cross-reference': '交叉索引',
    'electronics-basics': '电力电子基础',
    hardware: '硬件与驱动',
    'learning-workspace': '学习工作区',
    mechanical: '机械与编码器',
    'motion-control': '运动控制',
    ODrive: 'ODrive',
    'pfc-motor-integration': 'PFC 与电机系统',
    'power-path': '功率链路',
    practice: '工程实践',
    simulation: '仿真与调试',
    VESC: 'VESC',
    archive: '历史记录',
    'debug-records': '调试记录',
    docs: '文档',
    fz: '辅助资料',
    projects: '项目实践',
    reference: '参考资料',
    roadmap: '路线图',
    simulations: '仿真结果',
    'weekly-reviews': '周复盘'
  }
  return titles[chapter] || chapter.replace(/[-_]+/g, ' ')
}

if (isMainModule(import.meta.url)) {
  await main()
}
