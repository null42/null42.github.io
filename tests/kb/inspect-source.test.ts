import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { inspectSourceRoot } from '../../scripts/kb/import/inspect-source'

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

    const report = await inspectSourceRoot(root)

    expect(report.totalFiles).toBe(4)
    expect(report.byExtension).toEqual({ '.html': 1, '.md': 1, '.svg': 1, '.vue': 1 })
  })
})
