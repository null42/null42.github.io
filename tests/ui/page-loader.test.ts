// @vitest-environment happy-dom
import fs from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createPageLoaderController,
  initPageLoaderLifecycle,
  waitForBrowserPageReady,
} from '../../src/utils/page-loader-controller'

const deferred = () => {
  let resolve!: () => void
  const promise = new Promise<void>((done) => { resolve = done })
  return { promise, resolve }
}

const mountLoader = () => {
  document.body.innerHTML = '<div id="page-loader" class="page-loader page-loader--hidden" hidden></div>'
  return document.querySelector<HTMLElement>('#page-loader')!
}

afterEach(() => {
  window.pageLoaderLifecycle?.dispose()
  document.body.innerHTML = ''
  document.body.removeAttribute('aria-busy')
  document.documentElement.classList.remove('is-page-loading')
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('page loader', () => {
  it('ships an accessible full-screen loader with a no-JS escape hatch', () => {
    const component = fs.readFileSync('src/components/features/PageLoader.astro', 'utf8')

    expect(component).toContain('id="page-loader"')
    expect(component).toContain('role="status"')
    expect(component).toContain('aria-live="polite"')
    expect(component).toContain('<noscript>')
    expect(component).toContain('initPageLoaderLifecycle')
  })

  it('uses the approved V2.2.2 character loader', () => {
    const component = fs.readFileSync('src/components/features/PageLoader.astro', 'utf8')
    const loaderAsset = fs.statSync('public/assets/images/firefly-v22/feibi-loading.webp')
    expect(component).toContain('/assets/images/firefly-v22/feibi-loading.webp')
    expect(component).not.toContain('avatar.avif')
    expect(component).not.toContain('FIREFLY MOD')
    expect(component).toContain('NULL42 KNOWLEDGE')
    expect(component).toContain('.page-loader__scene::after')
    expect(component).toContain('object-position:50% 0')
    expect(component).toContain('fetchpriority="low"')
    expect(loaderAsset.size).toBeLessThan(500_000)
  })

  it('waits for the high-priority LCP image and fonts without waiting for non-critical images', async () => {
    const priorityImage = document.createElement('img')
    priorityImage.setAttribute('fetchpriority', 'high')
    Object.defineProperty(priorityImage, 'complete', { value: false })
    const nonCriticalImage = document.createElement('img')
    Object.defineProperty(nonCriticalImage, 'complete', { value: false })
    const fontsReady = deferred()
    const documentRef = {
      readyState: 'complete',
      querySelectorAll: vi.fn().mockReturnValue([priorityImage, nonCriticalImage]),
      fonts: { ready: fontsReady.promise },
    } as unknown as Document

    const readiness = waitForBrowserPageReady(documentRef)
    let settled = false
    void readiness.then(() => { settled = true })
    await Promise.resolve()
    expect(settled).toBe(false)

    priorityImage.dispatchEvent(new Event('load'))
    fontsReady.resolve()
    await readiness
    expect(settled).toBe(true)
  })

  it('caps initial critical-resource readiness at 300ms by default', () => {
    const controller = fs.readFileSync('src/utils/page-loader-controller.ts', 'utf8')
    expect(controller).toContain('maxWait = 300')
  })

  it('sets aria-busy while visible and releases after readiness', async () => {
    const ready = deferred()
    const loader = mountLoader()
    const controller = createPageLoaderController({ document, fadeDuration: 0, waitForReady: () => ready.promise })

    controller.show('initial')
    const release = controller.hideWhenReady('initial')

    expect(loader.hidden).toBe(false)
    expect(loader.dataset.loaderMode).toBe('initial')
    expect(document.body.getAttribute('aria-busy')).toBe('true')
    ready.resolve()
    await release

    expect(loader.hidden).toBe(true)
    expect(document.body.hasAttribute('aria-busy')).toBe(false)
  })

  it('releases at max-wait even when page readiness never settles', async () => {
    vi.useFakeTimers()
    const loader = mountLoader()
    const controller = createPageLoaderController({
      document,
      fadeDuration: 0,
      maxWait: 80,
      waitForReady: () => new Promise<void>(() => {}),
    })

    controller.show('initial')
    const release = controller.hideWhenReady('initial')
    await vi.advanceTimersByTimeAsync(80)
    await release

    expect(loader.hidden).toBe(true)
  })

  it('marks reduced-motion mode and skips decorative hide delay', async () => {
    vi.useFakeTimers()
    const loader = mountLoader()
    const controller = createPageLoaderController({
      document,
      fadeDuration: 0,
      hideDelay: 400,
      reducedMotion: true,
      waitForReady: () => Promise.resolve(),
    })

    controller.show('transition')
    const release = controller.hideWhenReady('transition')
    await vi.advanceTimersByTimeAsync(0)
    await release

    expect(loader.dataset.reducedMotion).toBe('true')
    expect(loader.hidden).toBe(true)
  })

  it('uses readiness for initial load and a short self-contained Swup transition', async () => {
    vi.useFakeTimers()
    const initialReady = deferred()
    const loader = mountLoader()
    const waitForReady = vi.fn(({ reason }: { reason: 'initial' | 'transition' }) => (
      reason === 'initial' ? initialReady.promise : new Promise<void>(() => {})
    ))
    const controller = createPageLoaderController({
      document,
      fadeDuration: 0,
      hideDelay: 400,
      transitionHideDelay: 90,
      waitForReady,
    })

    controller.show('transition')
    const transitionRelease = controller.hideWhenReady('transition')
    expect(waitForReady).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(89)
    expect(loader.hidden).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    await transitionRelease
    expect(loader.hidden).toBe(true)

    controller.show('initial')
    const initialRelease = controller.hideWhenReady('initial')
    expect(waitForReady).toHaveBeenCalledOnce()
    initialReady.resolve()
    await vi.advanceTimersByTimeAsync(399)
    expect(loader.hidden).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    await initialRelease
    expect(loader.hidden).toBe(true)
  })

  it('does not let an old readiness task hide a newer transition', async () => {
    vi.useFakeTimers()
    const initial = deferred()
    const loader = mountLoader()
    const controller = createPageLoaderController({
      document,
      fadeDuration: 0,
      hideDelay: 0,
      transitionHideDelay: 90,
      waitForReady: () => initial.promise,
    })

    controller.show('initial')
    const oldRelease = controller.hideWhenReady('initial')
    controller.show('transition')
    const currentRelease = controller.hideWhenReady('transition')
    initial.resolve()
    await oldRelease
    expect(loader.hidden).toBe(false)

    await vi.advanceTimersByTimeAsync(90)
    await currentRelease
    expect(loader.hidden).toBe(true)
  })

  it('keeps the loader rendered until its fade-out completes', async () => {
    vi.useFakeTimers()
    const loader = mountLoader()
    const controller = createPageLoaderController({
      document,
      fadeDuration: 420,
      hideDelay: 0,
      waitForReady: () => Promise.resolve(),
    })

    controller.show('initial')
    const release = controller.hideWhenReady('initial')
    await vi.advanceTimersByTimeAsync(0)

    expect(loader.classList.contains('page-loader--hidden')).toBe(true)
    expect(loader.hidden).toBe(false)
    expect(document.documentElement.classList.contains('is-page-loading')).toBe(false)
    expect(document.body.hasAttribute('aria-busy')).toBe(false)

    await vi.advanceTimersByTimeAsync(419)
    expect(loader.hidden).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    await release
    expect(loader.hidden).toBe(true)
  })

  it('does not let an old fade-out hide a newly shown loader', async () => {
    vi.useFakeTimers()
    const loader = mountLoader()
    const controller = createPageLoaderController({
      document,
      fadeDuration: 420,
      hideDelay: 0,
      waitForReady: () => Promise.resolve(),
    })

    controller.show('initial')
    const oldRelease = controller.hideWhenReady('initial')
    await vi.advanceTimersByTimeAsync(0)
    controller.show('transition')

    await vi.advanceTimersByTimeAsync(420)
    await oldRelease
    expect(loader.hidden).toBe(false)
    expect(loader.classList.contains('page-loader--visible')).toBe(true)
  })

  it('installs Swup hooks once and disposes every hook', () => {
    mountLoader()
    const removals = [vi.fn(), vi.fn()]
    const hooks = { on: vi.fn().mockReturnValueOnce(removals[0]).mockReturnValueOnce(removals[1]) }
    const windowRef = Object.assign(window, { swup: { hooks } })

    const first = initPageLoaderLifecycle({ document, window: windowRef, waitForReady: () => Promise.resolve() })
    const second = initPageLoaderLifecycle({ document, window: windowRef, waitForReady: () => Promise.resolve() })

    expect(first).toBe(second)
    expect(hooks.on.mock.calls.map(([name]) => name)).toEqual(['visit:start', 'page:view'])
    first?.dispose()
    expect(removals[0]).toHaveBeenCalledOnce()
    expect(removals[1]).toHaveBeenCalledOnce()
    expect(window.pageLoaderLifecycle).toBeUndefined()
  })
})
