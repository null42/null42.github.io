import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'

export interface SourceInspectionReport {
  sourceId: string
  label: string
  totalFiles: number
  byExtension: Record<string, number>
  sampleFiles: string[]
}

export interface InspectionSource {
  id: 'power' | 'motor'
  label: string
  root: string
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

export async function inspectSourceRoot(source: InspectionSource): Promise<SourceInspectionReport> {
  const files = await fg('**/*', {
    cwd: source.root,
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
    sourceId: source.id,
    label: source.label,
    totalFiles: files.length,
    byExtension: Object.fromEntries(Object.entries(byExtension).sort(([a], [b]) => a.localeCompare(b))),
    sampleFiles: files.sort().slice(0, 20)
  }
}

export function resolveInspectionSources(
  argv: string[] = process.argv.slice(2),
  env: Record<string, string | undefined> = process.env
): InspectionSource[] {
  const powerRoot = readOption(argv, '--power-root') || env.KB_POWER_SOURCE_ROOT
  const motorRoot = readOption(argv, '--motor-root') || env.KB_MOTOR_SOURCE_ROOT
  const sources: InspectionSource[] = []
  if (powerRoot) sources.push({ id: 'power', label: 'power', root: powerRoot })
  if (motorRoot) {
    sources.push({ id: 'motor', label: 'motor-control-knowledge-base', root: motorRoot })
  }
  return sources
}

export async function inspectConfiguredSources(
  sources: InspectionSource[] = resolveInspectionSources()
): Promise<SourceInspectionReport[]> {
  const reports: SourceInspectionReport[] = []
  for (const source of sources) {
    try {
      await fs.access(source.root)
      reports.push(await inspectSourceRoot(source))
    } catch {
      reports.push({ sourceId: source.id, label: source.label, totalFiles: 0, byExtension: {}, sampleFiles: [] })
    }
  }
  return reports
}

function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name)
  return index >= 0 ? argv[index + 1] : undefined
}

export function isMainModule(metaUrl: string, argvPath = process.argv[1]): boolean {
  return argvPath ? fileURLToPath(metaUrl) === path.resolve(argvPath) : false
}

if (isMainModule(import.meta.url)) {
  const reports = await inspectConfiguredSources()
  await fs.mkdir('.vitepress/generated', { recursive: true })
  await fs.writeFile('.vitepress/generated/source-inspection.json', JSON.stringify(reports, null, 2), 'utf8')
  for (const report of reports) {
    console.log(`${report.sourceId} (${report.label}): ${report.totalFiles} files`)
    console.log(JSON.stringify(report.byExtension))
  }
}
