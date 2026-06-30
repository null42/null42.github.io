import { describe, expect, it } from 'vitest'
import {
  completeArticleData,
  extractTitleFromMarkdown,
  parseMarkdown,
  serializeMarkdown
} from '../../scripts/kb/frontmatter'

describe('frontmatter helpers', () => {
  it('parses YAML frontmatter without rendering it as body text', () => {
    const parsed = parseMarkdown(`---
title: Existing
tags:
  - PWM
---

# Body Title

Body text.`)

    expect(parsed.data.title).toBe('Existing')
    expect(parsed.body.trim()).toBe('# Body Title\n\nBody text.')
  })

  it('extracts title from first heading when frontmatter has no title', () => {
    expect(extractTitleFromMarkdown('# Buck 变换器\n\nContent')).toBe('Buck 变换器')
  })

  it('fills only missing fields and preserves user-authored metadata', () => {
    const completed = completeArticleData(
      {
        title: '手写标题',
        category: '自定义分类',
        tags: ['Manual'],
        source: 'manual'
      },
      {
        title: '目录标题',
        category: '电源控制',
        tags: ['power-electronics'],
        source: 'power',
        visibility: 'public'
      },
      {
        body: '# Fallback',
        relativePath: 'content/power/a.md',
        modifiedDate: '2026-06-30'
      }
    )

    expect(completed.title).toBe('手写标题')
    expect(completed.category).toBe('自定义分类')
    expect(completed.tags).toEqual(['Manual'])
    expect(completed.source).toBe('manual')
    expect(completed.visibility).toBe('public')
    expect(completed.date).toBe('2026-06-30')
  })

  it('falls back to uncategorized when no category exists', () => {
    const completed = completeArticleData(
      {},
      {},
      {
        body: '# Untitled',
        relativePath: 'content/random/a.md',
        modifiedDate: '2026-06-30'
      }
    )

    expect(completed.category).toBe('未分类')
    expect(completed.source).toBe('random')
  })

  it('serializes completed metadata above the original body', () => {
    const output = serializeMarkdown(
      {
        title: 'Buck',
        date: '2026-06-30',
        category: '电源控制',
        tags: ['Buck'],
        source: 'power',
        status: 'learning',
        visibility: 'public',
        summary: 'Buck note'
      },
      '# Buck\n'
    )

    expect(output).toContain('title: Buck')
    expect(output).toContain('category: 电源控制')
    expect(output.endsWith('# Buck\n')).toBe(true)
  })

  it('normalizes Date values to YYYY-MM-DD strings', () => {
    const completed = completeArticleData(
      {
        title: 'Date Note',
        date: new Date('2026-06-30T00:00:00.000Z') as unknown as string
      },
      {},
      {
        body: '# Date Note',
        relativePath: 'content/blog/date.md',
        modifiedDate: '2026-07-01'
      }
    )

    expect(completed.date).toBe('2026-06-30')
  })
})
