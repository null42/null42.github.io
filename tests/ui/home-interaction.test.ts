// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  initHomeExperience,
  syncHomeExperience,
} from '../../src/utils/home-experience-controller'

afterEach(() => {
  window.homeExperienceController?.dispose()
  document.body.innerHTML = ''
  document.documentElement.style.removeProperty('--home-viewport-height')
  vi.restoreAllMocks()
})

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

  it('updates the dynamic viewport variable and removes its listener on dispose', () => {
    document.body.innerHTML = '<main data-home-page></main>'
    const addListener = vi.spyOn(window, 'addEventListener')
    const removeListener = vi.spyOn(window, 'removeEventListener')

    const controller = initHomeExperience()

    expect(document.documentElement.style.getPropertyValue('--home-viewport-height')).toBe(`${window.innerHeight}px`)
    expect(addListener).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })

    controller?.dispose()
    expect(removeListener).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(document.documentElement.style.getPropertyValue('--home-viewport-height')).toBe('')
  })

  it('disposes the home controller when Swup replaces home with another page', () => {
    document.body.innerHTML = '<main data-home-page></main>'
    const controller = syncHomeExperience()
    expect(controller).toBeDefined()

    document.body.innerHTML = '<main>文章页</main>'
    expect(syncHomeExperience()).toBeUndefined()
    expect(window.homeExperienceController).toBeUndefined()
  })

  it('does nothing outside the home page and never blocks static links', () => {
    document.body.innerHTML = '<main><a id="entry" href="/list/">文章入口</a></main>'
    expect(syncHomeExperience()).toBeUndefined()
    expect(document.querySelector<HTMLAnchorElement>('#entry')?.href).toContain('/list/')
  })
})
