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

  it('cleans markdown math delimiters from search snippets', () => {
    const records = buildSearchIndex([
      article({
        title: 'Math Note',
        summary: 'Summary',
        body: '# Math Note\n\n$$K_p=\\omega_c L_s$$\n\n电流环参数来自 $K_i=\\omega_c R_s$。'
      })
    ])

    const snippet = makeSnippet(records[0], '电流环')

    expect(snippet).toContain('<mark>电流环</mark>')
    expect(snippet).not.toContain('$$')
    expect(snippet).not.toContain('$K_i')
  })

  it('returns heading anchors and match reasons for body matches', () => {
    const records = buildSearchIndex([
      article({
        title: 'FOC Notes',
        body: '# FOC Notes\n\nIntro.\n\n## 电流环 PI 整定\n\n这里讨论电流环带宽和采样延迟。\n\n## 速度环\n\n速度外环。'
      })
    ])

    const [result] = searchRecords(records, '电流环')

    expect(result.url).toBe('/content/article.html#电流环-pi-整定')
    expect(result.anchor).toBe('电流环-pi-整定')
    expect(result.matchReason).toContain('章节')
  })

  it('uses the matching title heading as the anchor for title matches', () => {
    const records = buildSearchIndex([
      article({
        title: '电流环 PI 参数整定计算器',
        body: '# 电流环 PI 参数整定计算器\n\n参数计算正文。'
      })
    ])

    const [result] = searchRecords(records, '电流环')

    expect(result.url).toBe('/content/article.html#电流环-pi-参数整定计算器')
    expect(result.anchor).toBe('电流环-pi-参数整定计算器')
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
      Array.from({ length: 380 }, (_, index) =>
        article({
          title: `Knowledge ${index}`,
          body: `Boost PFC SVPWM ${'content '.repeat(3600)} rare-tail-${index}`
        })
      )
    )

    expect(() => assertSearchIndexWithinBudget(records)).not.toThrow()
    expect(searchRecords(records, 'rare-tail-88')[0].record.title).toBe('Knowledge 88')
    expect(records[0].body.length).toBeLessThan(5000)
  })

  it('keeps imported summaries out of public search records and marks quality', () => {
    const records = buildSearchIndex([
      article({
        title: 'Imported Power Note',
        source: 'power',
        sourcePath: 'roadmap/lesson.md',
        summary: 'Imported from roadmap/lesson.md'
      })
    ])

    expect(records[0].summary).not.toContain('Imported from')
    expect(records[0].quality).toBe('needsRewrite')
  })

  it('prioritizes curated records for default search results', () => {
    const records = buildSearchIndex([
      article({ title: 'Imported New', date: '2026-07-03', quality: 'imported' }),
      article({ title: 'Curated Old', date: '2026-06-30', quality: 'curated' }),
      article({ title: 'Needs Rewrite', date: '2026-07-04', quality: 'needsRewrite' })
    ])

    expect(searchRecords(records, '').map((entry) => entry.record.title)).toEqual(['Curated Old', 'Imported New', 'Needs Rewrite'])
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
