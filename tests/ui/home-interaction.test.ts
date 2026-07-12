// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest'
import { initHomeExperience } from '../../src/utils/home-experience-controller'

afterEach(() => window.homeExperienceController?.dispose())

describe('home experience lifecycle', () => {
  it('is repeatable without stacking listeners and can dispose cleanly', () => {
    document.body.innerHTML = '<main data-home-page><a href="/list/">文章入口</a></main>'
    const first = initHomeExperience()
    const second = initHomeExperience()
    expect(first).toBe(second)
    expect(document.documentElement.dataset.homeExperience).toBe('ready')

    second?.dispose()
    expect(window.homeExperienceController).toBeUndefined()
    expect(document.documentElement.dataset.homeExperience).toBeUndefined()
  })

  it('does nothing outside the home page and never blocks static links', () => {
    document.body.innerHTML = '<main><a id="entry" href="/list/">文章入口</a></main>'
    expect(initHomeExperience()).toBeUndefined()
    expect(document.querySelector<HTMLAnchorElement>('#entry')?.href).toContain('/list/')
  })
})
