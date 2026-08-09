import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = path.resolve('content/code-library')
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8')) as { schema: string; projects: Array<{ codeId: string; files: Array<{ path: string; originalSource: string; sha256: string; binary: boolean; lineRange: { start: number; end: number } | null }> }> }

describe('code library manifest', () => {
  it('uses stable unique code ids and repository-local paths', () => {
    expect(manifest.schema).toBe('code-library/v1')
    expect(manifest.projects.length).toBeGreaterThanOrEqual(4)
    expect(new Set(manifest.projects.map(project => project.codeId)).size).toBe(manifest.projects.length)
    for (const project of manifest.projects) for (const file of project.files) {
      expect(path.isAbsolute(file.path)).toBe(false)
      expect(file.path).not.toMatch(/^[A-Za-z]:[\\/]/)
      expect(file.originalSource).toMatch(/^(?:learning|repository)\//)
      expect(file.originalSource).not.toContain('E:')
    }
  })

  it('matches file hashes and line ranges', () => {
    for (const project of manifest.projects) for (const file of project.files) {
      const bytes = fs.readFileSync(path.join(root, file.path))
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256)
      if (file.binary) expect(file.lineRange).toBeNull()
      else expect(file.lineRange?.end).toBe(bytes.toString('utf8').replace(/\r\n/g, '\n').split('\n').length)
    }
  })
})
