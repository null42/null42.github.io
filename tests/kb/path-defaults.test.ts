import { describe, expect, it } from 'vitest'
import { inferPathDefaults } from '../../scripts/kb/path-defaults'

describe('path-based metadata defaults', () => {
  it('assigns natural motor chapters from folder names', () => {
    const defaults = inferPathDefaults('content/motor/algorithm/ALG-01-FOC-Theory.md')

    expect(defaults.section).toBe('电机控制')
    expect(defaults.category).toBe('控制算法')
    expect(defaults.chapter).toBe('algorithm')
    expect(defaults.chapterTitle).toBe('控制算法')
    expect(defaults.chapterOrder).toBe(20)
    expect(defaults.navGroup).toBe('控制与算法')
    expect(defaults.navGroupOrder).toBe(30)
    expect(defaults.source).toBe('motor')
  })

  it('places motor ecosystem notes into an ecosystem group', () => {
    const defaults = inferPathDefaults('content/motor/ODrive/OD-01-Architecture.md')

    expect(defaults.chapterTitle).toBe('ODrive')
    expect(defaults.navGroup).toBe('工程与生态')
    expect(defaults.navGroupOrder).toBe(50)
  })

  it('keeps blog posts outside knowledge-base chapters', () => {
    const defaults = inferPathDefaults('content/blog/hello.md')

    expect(defaults.section).toBeUndefined()
    expect(defaults.chapter).toBeUndefined()
  })
})
