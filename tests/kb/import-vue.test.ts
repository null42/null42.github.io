import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { convertVueSimulation } from '../../scripts/kb/import/vue-simulation-to-markdown'

describe('Vue simulation import', () => {
  it('extracts educational headings and details from simulation components', () => {
    const source = fs.readFileSync('tests/fixtures/vue/simulation.vue', 'utf8')
    const result = convertVueSimulation(source, 'ClarkeParkSim.vue')

    expect(result.title).toBe('Clarke & Park 坐标变换仿真')
    expect(result.markdown).toContain('# Clarke & Park 坐标变换仿真')
    expect(result.markdown).toContain('## Clarke & Park 坐标变换原理')
    expect(result.markdown).toContain('**Clarke 变换：**abc 到 alpha/beta。')
    expect(result.markdown).toContain('**Park 变换：**alpha/beta 到 dq。')
  })
})
