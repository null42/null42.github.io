import { describe, expect, it } from 'vitest'
import { assertSearchIndexWithinBudget, buildSearchIndex, searchRecords } from '../../scripts/kb/search/build-index'
import { makeSnippet } from '../../scripts/kb/search/snippets'
import { tokenize } from '../../scripts/kb/search/tokenize'
import type { ArticleRecord } from '../../scripts/kb/types'

describe('knowledge search', () => {
  it('indexes public article body text and excludes non-public content', () => {
    const records = buildSearchIndex([
      article({
        title: 'PFC Current Loop',
        section: 'Power',
        chapter: '02-PFC',
        tags: ['PFC'],
        body: '# PFC Current Loop\n\nThe body mentions inner current tracking and ADC sampling.'
      }),
      article({
        title: 'Private Debug Log',
        visibility: 'private',
        body: 'secret calibration note'
      }),
      article({
        title: 'Encrypted Note',
        visibility: 'encrypted',
        body: 'password protected project detail'
      })
    ])

    expect(records).toHaveLength(1)
    expect(records[0].body).toContain('inner current tracking')
    expect(JSON.stringify(records)).not.toContain('secret calibration')
    expect(JSON.stringify(records)).not.toContain('password protected')
  })

  it('ranks title and tag matches above body-only matches, with snippet support', () => {
    const records = buildSearchIndex([
      article({ title: 'Body Only', body: 'This note explains SVPWM zero vector selection in the middle paragraph.' }),
      article({ title: 'SVPWM Overview', tags: ['motor'], body: 'Short overview.' }),
      article({ title: 'Motor Notes', tags: ['SVPWM'], body: 'Tag match.' })
    ])

    const results = searchRecords(records, 'SVPWM')

    expect(results.map((entry) => entry.record.title)).toEqual(['SVPWM Overview', 'Motor Notes', 'Body Only'])
    expect(makeSnippet(records[0], 'SVPWM')).toContain('<mark>SVPWM</mark>')
  })

  it('filters by section, chapter, tag, and month', () => {
    const records = buildSearchIndex([
      article({ title: 'Power ADC', section: 'Power', chapter: '01-Lessons', tags: ['ADC'], date: '2026-07-01' }),
      article({ title: 'Motor ADC', section: 'Motor', chapter: '02-Simulations', tags: ['ADC'], date: '2026-06-01' })
    ])

    const results = searchRecords(records, 'ADC', {
      section: 'Power',
      chapter: '01-Lessons',
      tag: 'ADC',
      month: '2026-07'
    })

    expect(results).toHaveLength(1)
    expect(results[0].record.title).toBe('Power ADC')
  })

  it('tokenizes mixed Chinese and English technical text', () => {
    const tokens = tokenize('Boost 电流环 current-loop PWM 采样')

    expect(tokens).toContain('boost')
    expect(tokens).toContain('current-loop')
    expect(tokens).toContain('pwm')
    expect(tokens).toContain('电流环')
    expect(tokens).toContain('采样')
  })

  it('enforces a configurable search index size guardrail', () => {
    const records = buildSearchIndex([article({ title: 'Large', body: 'x'.repeat(200) })])

    expect(() => assertSearchIndexWithinBudget(records, 50)).toThrow(/search index is too large/)
    expect(() => assertSearchIndexWithinBudget(records, 10_000)).not.toThrow()
  })

  it('allows a full personal knowledge base index by default', () => {
    const records = buildSearchIndex(
      Array.from({ length: 260 }, (_, index) =>
        article({
          title: `Knowledge ${index}`,
          body: `Boost PFC SVPWM ${'content '.repeat(3600)}`
        })
      )
    )

    expect(() => assertSearchIndexWithinBudget(records)).not.toThrow()
  })
})

function article(overrides: Partial<ArticleRecord>): ArticleRecord {
  return {
    title: 'Article',
    date: '2026-07-01',
    category: 'General',
    tags: [],
    source: 'test',
    status: 'learning',
    visibility: 'public',
    summary: 'Summary',
    path: 'content/article.md',
    url: '/content/article.html',
    body: 'Body',
    ...overrides
  }
}
