// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  initHomeExperience,
  initHomeExperienceLifecycle,
  syncHomeExperience,
} from '../../src/utils/home-experience-controller'

afterEach(() => {
  window.homeExperienceLifecycle?.dispose()
  window.homeExperienceController?.dispose()
  document.body.innerHTML = ''
  document.documentElement.style.removeProperty('--home-viewport-height')
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('home experience lifecycle', () => {
	it('runs a reversible dialogue sequence with typewriter, auto, hide, and restore controls', async () => {
		vi.useFakeTimers()
		document.body.innerHTML = [
			'<main data-home-page>',
			'<section data-home-section="hero">',
			'<section class="home-hero-dialogue" data-home-dialogue>',
			'<strong data-home-dialogue-speaker></strong>',
			'<p data-home-dialogue-text></p>',
			'<button data-home-dialogue-action="back">Back</button>',
			'<button data-home-dialogue-action="auto" aria-pressed="false">Auto</button>',
			'<button data-home-dialogue-action="hide">Hide</button>',
			'</section>',
			'<button data-home-dialogue-action="show" hidden>Show</button>',
			'</section>',
			'</main>',
		].join('')
		const dialogue = document.querySelector<HTMLElement>('[data-home-dialogue]')!
		dialogue.dataset.dialogueLines = JSON.stringify([
			{ speaker: 'null42', text: '先从问题出发。' },
			{ speaker: 'Firefly', text: '再用证据确认边界。' },
		])

		const controller = initHomeExperience()
		const text = document.querySelector<HTMLElement>('[data-home-dialogue-text]')!
		const speaker = document.querySelector<HTMLElement>('[data-home-dialogue-speaker]')!
		const back = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="back"]')!
		const auto = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="auto"]')!
		const hide = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="hide"]')!
		const show = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="show"]')!

		dialogue.click()
		expect(text.textContent).toBe('先从问题出发。')
		dialogue.click()
		await vi.advanceTimersByTimeAsync(1000)
		expect(speaker.textContent).toBe('Firefly')
		expect(text.textContent).toBe('再用证据确认边界。')
		back.click()
		expect(text.textContent).toBe('先从问题出发。')

		hide.click()
		expect(dialogue.hidden).toBe(true)
		expect(show.hidden).toBe(false)
		show.click()
		expect(dialogue.hidden).toBe(false)

		auto.click()
		expect(auto.getAttribute('aria-pressed')).toBe('true')
		await vi.advanceTimersByTimeAsync(5000)
		expect(text.textContent).toBe('再用证据确认边界。')
		controller?.dispose()
		expect(vi.getTimerCount()).toBe(0)
	})

  it('supports keyboard continuation and resets auto state when hidden', async () => {
    vi.useFakeTimers()
    document.body.innerHTML = '<main data-home-page><section data-home-dialogue data-dialogue-lines="[{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;第一句。&quot;},{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;第二句。&quot;}]"><strong data-home-dialogue-speaker></strong><p data-home-dialogue-text tabindex="0"></p><button data-home-dialogue-action="back">Back</button><button data-home-dialogue-action="auto" aria-pressed="false">Auto</button><button data-home-dialogue-action="hide">Hide</button></section><button data-home-dialogue-action="show" hidden>Show</button></main>'
    initHomeExperience()
    const text = document.querySelector<HTMLElement>('[data-home-dialogue-text]')!
    const auto = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="auto"]')!
    const hide = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="hide"]')!

    text.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    expect(text.textContent).toBe('第一句。')
    text.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
    await vi.advanceTimersByTimeAsync(1000)
    expect(text.textContent).toBe('第二句。')

    auto.click()
    expect(auto.getAttribute('aria-pressed')).toBe('true')
    hide.click()
    expect(auto.getAttribute('aria-pressed')).toBe('false')
    expect(vi.getTimerCount()).toBe(0)
  })

  it('disables dialogue Auto when reduced motion is requested', () => {
    vi.useFakeTimers()
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList)
    document.body.innerHTML = '<main data-home-page><section data-home-dialogue data-dialogue-lines="[{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;第一句。&quot;},{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;第二句。&quot;}]"><strong data-home-dialogue-speaker></strong><p data-home-dialogue-text></p><button data-home-dialogue-action="auto" aria-pressed="false">Auto</button></section></main>'

    initHomeExperience()
    const auto = document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="auto"]')!
    expect(auto.disabled).toBe(true)
    expect(auto.getAttribute('aria-disabled')).toBe('true')
    auto.click()
    expect(auto.getAttribute('aria-pressed')).toBe('false')
    expect(vi.getTimerCount()).toBe(0)
  })

  it('keeps Back on the first dialogue line instead of wrapping to the last', () => {
    document.body.innerHTML = '<main data-home-page><section data-home-dialogue data-dialogue-lines="[{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;第一句。&quot;},{&quot;speaker&quot;:&quot;null42&quot;,&quot;text&quot;:&quot;最后一句。&quot;}]"><strong data-home-dialogue-speaker></strong><p data-home-dialogue-text></p><button data-home-dialogue-action="back">Back</button></section></main>'
    initHomeExperience()
    document.querySelector<HTMLButtonElement>('[data-home-dialogue-action="back"]')!.click()
    expect(document.querySelector('[data-home-dialogue]')?.getAttribute('data-dialogue-index')).toBe('0')
    expect(document.querySelector('[data-home-dialogue-text]')?.textContent).toBe('第一句。')
  })

  it('rebinds to a replacement home root during a direct Home-to-Home Swup update', () => {
    document.body.innerHTML = '<main data-home-page id="first-home"></main>'
    const first = syncHomeExperience()
    document.body.innerHTML = '<main data-home-page id="second-home"></main>'
    const second = syncHomeExperience()

    expect(second).toBeDefined()
    expect(second).not.toBe(first)
    expect(second?.root.id).toBe('second-home')
  })

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

  it('survives repeated home-to-page-to-home lifecycle rounds without leaked listeners', () => {
    const addListener = vi.spyOn(window, 'addEventListener')
    const removeListener = vi.spyOn(window, 'removeEventListener')

    for (let round = 0; round < 3; round += 1) {
      document.body.innerHTML = '<main data-home-page></main>'
      expect(syncHomeExperience()).toBeDefined()
      document.body.innerHTML = '<main>文章页</main>'
      expect(syncHomeExperience()).toBeUndefined()
    }

    const isViewportListener = (listener: unknown) => String(listener).includes('--home-viewport-height')
    const resizeAdds = addListener.mock.calls.filter(([type, listener]) => type === 'resize' && isViewportListener(listener))
    const resizeRemovals = removeListener.mock.calls.filter(([type, listener]) => type === 'resize' && isViewportListener(listener))
    expect(resizeAdds).toHaveLength(3)
    expect(resizeRemovals).toHaveLength(3)
    expect(window.homeExperienceController).toBeUndefined()
  })

  it('installs one Swup content replacement hook across repeated layout script execution', () => {
    document.body.innerHTML = '<main data-home-page id="first-home"></main>'
    const removeHook = vi.fn()
    let contentReplace: (() => void) | undefined
    const hooks = {
      on: vi.fn((name: string, callback: () => void) => {
        expect(name).toBe('content:replace')
        contentReplace = callback
        return removeHook
      }),
    }
    Object.assign(window, { swup: { hooks } })

    const first = initHomeExperienceLifecycle()
    const second = initHomeExperienceLifecycle()
    expect(second).toBe(first)
    expect(hooks.on).toHaveBeenCalledOnce()

    document.body.innerHTML = '<main>文章页</main>'
    contentReplace?.()
    expect(window.homeExperienceController).toBeUndefined()

    document.body.innerHTML = '<main data-home-page id="second-home"></main>'
    contentReplace?.()
    expect(window.homeExperienceController?.root.id).toBe('second-home')
    expect(hooks.on).toHaveBeenCalledOnce()

    first?.dispose()
    expect(removeHook).toHaveBeenCalledOnce()
    expect(window.homeExperienceLifecycle).toBeUndefined()
    delete (window as Window & { swup?: unknown }).swup
  })

  it('does nothing outside the home page and never blocks static links', () => {
    document.body.innerHTML = '<main><a id="entry" href="/list/">文章入口</a></main>'
    expect(syncHomeExperience()).toBeUndefined()
    expect(document.querySelector<HTMLAnchorElement>('#entry')?.href).toContain('/list/')
  })
})
