import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  inspectConfiguredSources,
  inspectSourceRoot,
  resolveInspectionSources
} from '../../scripts/kb/import/inspect-source'

describe('source inspection', () => {
  it('counts source files by extension while ignoring build and dependency folders', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-inspect-'))
    await fs.mkdir(path.join(root, 'lessons'), { recursive: true })
    await fs.mkdir(path.join(root, 'node_modules', 'pkg'), { recursive: true })
    await fs.mkdir(path.join(root, 'dist'), { recursive: true })
    await fs.writeFile(path.join(root, 'lessons', 'boost.html'), '<h1>Boost</h1>')
    await fs.writeFile(path.join(root, 'lessons', 'note.md'), '# Note')
    await fs.writeFile(path.join(root, 'lessons', 'sim.vue'), '<template />')
    await fs.writeFile(path.join(root, 'lessons', 'wave.svg'), '<svg />')
    await fs.writeFile(path.join(root, 'node_modules', 'pkg', 'ignored.md'), '# Ignored')
    await fs.writeFile(path.join(root, 'dist', 'ignored.html'), '<h1>Ignored</h1>')

    const report = await inspectSourceRoot({ id: 'power', label: 'Power knowledge base', root })

    expect(report.sourceId).toBe('power')
    expect(report.label).toBe('Power knowledge base')
    expect(report.totalFiles).toBe(4)
    expect(report.byExtension).toEqual({ '.html': 1, '.md': 1, '.svg': 1, '.vue': 1 })
    expect(report.sampleFiles).toEqual([
      'lessons/boost.html',
      'lessons/note.md',
      'lessons/sim.vue',
      'lessons/wave.svg'
    ])
    expect(JSON.stringify(report)).not.toContain(root)
  })

  it('consumes explicit environment configuration with motor knowledge-base semantics', async () => {
    const powerRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-power-'))
    const motorRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'motor-control-knowledge-base-'))
    await fs.writeFile(path.join(motorRoot, 'motor.md'), '# Motor')

    const sources = resolveInspectionSources([], {
      KB_POWER_SOURCE_ROOT: powerRoot,
      KB_MOTOR_SOURCE_ROOT: motorRoot
    })
    const reports = await inspectConfiguredSources(sources)

    expect(sources.map((source) => source.id)).toEqual(['power', 'motor'])
    expect(reports.map((report) => report.sourceId)).toEqual(['power', 'motor'])
    expect(reports.find((report) => report.sourceId === 'motor')?.label).toContain('motor-control-knowledge-base')
    expect(JSON.stringify(reports)).not.toContain(powerRoot)
    expect(JSON.stringify(reports)).not.toContain(motorRoot)
    expect(JSON.stringify(reports)).not.toContain('motor-learning-web')
  })

  it('lets explicit CLI roots override environment roots', () => {
    const sources = resolveInspectionSources(
      ['--power-root', 'cli-power', '--motor-root', 'cli-motor'],
      { KB_POWER_SOURCE_ROOT: 'env-power', KB_MOTOR_SOURCE_ROOT: 'env-motor' }
    )

    expect(sources.map((source) => source.root)).toEqual(['cli-power', 'cli-motor'])
  })

  it('returns no configured sources when roots are missing', async () => {
    const sources = resolveInspectionSources([], {})
    const reports = await inspectConfiguredSources(sources)

    expect(sources).toEqual([])
    expect(reports).toEqual([])
  })
})
