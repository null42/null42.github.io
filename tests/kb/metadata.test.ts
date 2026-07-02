import { describe, expect, it } from 'vitest'
import { buildTagSuggestionReport, suggestTagsForText } from '../../scripts/kb/metadata/suggest-tags'

describe('metadata suggestions', () => {
  it('keeps repeated technical terms and removes common filler words', () => {
    const suggestions = suggestTagsForText('这个系统可以使用 PFC current-loop 电流环 PWM 采样。PFC 电流环 PWM 采样需要稳定。')

    expect(suggestions).toContain('pfc')
    expect(suggestions).toContain('pwm')
    expect(suggestions).toContain('current-loop')
    expect(suggestions).toContain('电流环')
    expect(suggestions).not.toContain('这个')
    expect(suggestions).not.toContain('可以')
  })

  it('reports suggestedTags without overwriting manual tags', () => {
    const report = buildTagSuggestionReport([
      {
        relativePath: 'content/power/pfc.md',
        completed: { title: 'PFC', tags: ['manual-tag'] },
        body: 'PFC current-loop current-loop PWM PWM PWM 电流环 电流环'
      }
    ])

    expect(report[0].tags).toEqual(['manual-tag'])
    expect(report[0].suggestedTags).toContain('pwm')
    expect(report[0].suggestedTags).not.toContain('manual-tag')
  })
})
