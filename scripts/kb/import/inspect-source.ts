import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'

export interface SourceInspectionReport {
  root: string
  totalFiles: number
  byExtension: Record<string, number>
  sampleFiles: string[]
}

const ignore = [
  '**/.git/**',
  '**/node_modules/**',
  '**/venv/**',
  '**/.venv/**',
  '**/dist/**',
  '**/build/**',
  '**/.vitepress/**'
]

export async function inspectSourceRoot(root: string): Promise<SourceInspectionReport> {
  const files = await fg('**/*', {
    cwd: root,
    onlyFiles: true,
    absolute: false,
    ignore
  })
  const byExtension: Record<string, number> = {}
  for (const file of files) {
    const ext = path.extname(file).toLowerCase() || '(none)'
    byExtension[ext] = (byExtension[ext] || 0) + 1
  }

  return {
    root,
    totalFiles: files.length,
    byExtension: Object.fromEntries(Object.entries(byExtension).sort(([a], [b]) => a.localeCompare(b))),
    sampleFiles: files.sort().slice(0, 20)
  }
}

export async function inspectConfiguredSources(): Promise<SourceInspectionReport[]> {
  const roots = [
    'E:\\gitee_CodeStorage\\学习\\电源',
    'E:\\gitee_CodeStorage\\学习\\MotorControl-main\\motor-learning-web'
  ]
  const reports: SourceInspectionReport[] = []
  for (const root of roots) {
    try {
      await fs.access(root)
      reports.push(await inspectSourceRoot(root))
    } catch {
      reports.push({ root, totalFiles: 0, byExtension: {}, sampleFiles: [] })
    }
  }
  return reports
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  const reports = await inspectConfiguredSources()
  await fs.mkdir('.vitepress/generated', { recursive: true })
  await fs.writeFile('.vitepress/generated/source-inspection.json', JSON.stringify(reports, null, 2), 'utf8')
  for (const report of reports) {
    console.log(`${report.root}: ${report.totalFiles} files`)
    console.log(JSON.stringify(report.byExtension))
  }
}
