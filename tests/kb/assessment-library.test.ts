import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import { describe, expect, it } from 'vitest'
import manifest from '../../content/assessments/manifest.json'
import { loadAssessmentsForPost } from '../../src/utils/assessment-library'

describe('assessment library', () => {
  it('keeps every migrated assessment outside generated article sources', async () => {
    expect(manifest.entries).toHaveLength(104)
    expect(await fg('src/content/posts/**/*assessment*.md', { caseSensitiveMatch: false })).toEqual([])
    for (const entry of manifest.entries) expect(fs.existsSync(path.resolve('content', ...entry.path.split('/')))).toBe(true)
  })

  it('associates all archived assessments with an article and parses questions', async () => {
    const articleIds = (await fg(['content/**/*.md', '!content/assessments/**', '!content/private/**'])).map(file => file.replace(/^content\//, '').replace(/\.md$/i, ''))
    const assessments = articleIds.flatMap(loadAssessmentsForPost)
    expect(assessments).toHaveLength(manifest.entries.length)
    expect(assessments.every(assessment => assessment.questions.length > 0)).toBe(true)
    expect(new Set(assessments.flatMap(assessment => assessment.questions.map(question => question.type))).size).toBeGreaterThanOrEqual(4)
  })

  it('does not persist answers in component source', () => {
    const source = fs.readFileSync(path.resolve('src/components/assessments/AssessmentModal.astro'), 'utf8')
    expect(source).not.toMatch(/localStorage|sessionStorage|indexedDB/)
    expect(source).toContain('data-pagefind-ignore="all"')
  })
})
