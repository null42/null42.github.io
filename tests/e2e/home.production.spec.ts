import { expect, test, type Page } from '@playwright/test'

type ResizeMetrics = {
  add: number
  remove: number
  active: number
}

const installObservability = async (page: Page) => {
  await page.addInitScript(() => {
    const originalAdd = EventTarget.prototype.addEventListener
    const originalRemove = EventTarget.prototype.removeEventListener
    const resizeListeners: Array<{ listener: EventListenerOrEventListenerObject | null; capture: boolean }> = []
    window.__homeResizeMetrics = { add: 0, remove: 0, active: 0 }
    window.__layoutShifts = []

    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (this === window && type === 'resize' && String(listener).includes('--home-viewport-height')) {
        const capture = typeof options === 'boolean' ? options : Boolean(options?.capture)
        if (!resizeListeners.some((entry) => entry.listener === listener && entry.capture === capture)) {
          resizeListeners.push({ listener, capture })
          window.__homeResizeMetrics.add += 1
          window.__homeResizeMetrics.active += 1
        }
      }
      return originalAdd.call(this, type, listener, options)
    }

    EventTarget.prototype.removeEventListener = function (type, listener, options) {
      if (this === window && type === 'resize' && String(listener).includes('--home-viewport-height')) {
        const capture = typeof options === 'boolean' ? options : Boolean(options?.capture)
        const index = resizeListeners.findIndex((entry) => entry.listener === listener && entry.capture === capture)
        if (index >= 0) {
          resizeListeners.splice(index, 1)
          window.__homeResizeMetrics.remove += 1
          window.__homeResizeMetrics.active -= 1
        }
      }
      return originalRemove.call(this, type, listener, options)
    }

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!shift.hadRecentInput) window.__layoutShifts.push(shift.value)
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
}

const collectImageFailures = (page: Page) => {
  const failures: string[] = []
  page.on('requestfailed', (request) => {
    if (request.resourceType() === 'image') failures.push(`requestfailed ${request.url()}`)
  })
  page.on('response', (response) => {
    if (response.request().resourceType() === 'image' && response.status() >= 400) {
      failures.push(`HTTP ${response.status()} ${response.url()}`)
    }
  })
  return failures
}

declare global {
  interface Window {
    __homeResizeMetrics: ResizeMetrics
    __layoutShifts: number[]
  }
}

test.describe('home production contracts', () => {
  test.beforeEach(async ({ page }) => {
    await installObservability(page)
  })

  test('loads measurable responsive images, accepts redirects, and records 4xx failures', async ({ page }) => {
    const imageFailures = collectImageFailures(page)
    const redirectChainStatuses: number[] = []
    page.on('response', (response) => {
      if (/\/(redirect-image|favicon\/favicon-light-32\.png)$/.test(response.url())) redirectChainStatuses.push(response.status())
    })
    await page.route('**/redirect-image', (route) => route.fulfill({ status: 302, headers: { location: 'http://127.0.0.1:4321/favicon/favicon-light-32.png' }, body: '' }))
    await page.route('**/missing-image', (route) => route.fulfill({ status: 404, contentType: 'image/svg+xml', body: '' }))
    await page.goto('/')
    await page.evaluate(async () => {
      const load = (source: string) => new Promise<HTMLImageElement>((resolve) => {
        const image = new Image()
        image.onload = image.onerror = () => resolve(image)
        image.src = source
        document.body.append(image)
      })
      const redirected = await load('/redirect-image')
      await load('/missing-image')
      redirected.dataset.redirectNaturalWidth = String(redirected.naturalWidth)
      redirected.dataset.redirectComplete = String(redirected.complete)
    })
    await page.waitForLoadState('networkidle')

    expect(redirectChainStatuses).toEqual([302, 200])
    const redirectedImage = page.locator('img[data-redirect-natural-width]')
    expect(await redirectedImage.getAttribute('data-redirect-complete')).toBe('true')
    expect(Number(await redirectedImage.getAttribute('data-redirect-natural-width'))).toBeGreaterThan(0)
    expect(imageFailures).toEqual(['HTTP 404 http://127.0.0.1:4321/missing-image'])
    imageFailures.length = 0

    const hero = page.locator('[data-home-section="hero"]')
    await expect(hero).toBeVisible()
    expect(await hero.boundingBox()).not.toBeNull()

    const images = page.locator('[data-home-page] img')
    expect(await images.count()).toBeGreaterThan(0)
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index)
      expect(await image.boundingBox()).not.toBeNull()
      const dimensions = await image.evaluate((element: HTMLImageElement) => ({
        width: element.getAttribute('width'),
        height: element.getAttribute('height'),
        naturalWidth: element.naturalWidth,
      }))
      expect(Number.isInteger(Number(dimensions.width)) && Number(dimensions.width) > 0).toBe(true)
      expect(Number.isInteger(Number(dimensions.height)) && Number(dimensions.height) > 0).toBe(true)
      expect(dimensions.naturalWidth).toBeGreaterThan(0)
    }

    const cls = await page.evaluate(() => window.__layoutShifts.reduce((sum, value) => sum + value, 0))
    expect(cls).toBeLessThanOrEqual(0.1)
    expect(imageFailures).toEqual([])
  })

  test('balances resize listeners through three real Swup rounds with one current controller', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
    await expect.poll(() => page.evaluate(() => typeof window.swup?.navigate)).toBe('function')
    expect(await page.evaluate(() => '__homeExperienceInstrument' in window)).toBe(false)

    const baseline = await page.evaluate(() => ({ ...window.__homeResizeMetrics }))
    const controllers: unknown[] = []
    controllers.push(await page.evaluateHandle(() => window.homeExperienceController))
    for (let round = 0; round < 3; round += 1) {
      await page.evaluate(() => window.swup.navigate('/about/'))
      await expect(page).toHaveURL(/\/about\/$/)
      await expect(page.locator('html')).not.toHaveAttribute('data-home-experience', 'ready')
      expect(await page.evaluate(() => window.homeExperienceController)).toBeUndefined()

      await page.evaluate(() => window.swup.navigate('/'))
      await expect(page).toHaveURL(/\/$/)
      await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
      controllers.push(await page.evaluateHandle(() => window.homeExperienceController))
    }

    for (let index = 1; index < controllers.length; index += 1) {
      expect(await controllers[index].evaluate((controller, previous) => controller !== previous, controllers[index - 1])).toBe(true)
    }
    const metrics = await page.evaluate(() => window.__homeResizeMetrics)
    expect(metrics.add - baseline.add).toBe(3)
    expect(metrics.remove - baseline.remove).toBe(3)
    expect(metrics.active).toBe(baseline.active)
    expect(metrics.add - metrics.remove).toBe(metrics.active)
    expect(await page.evaluate(() => Boolean(window.homeExperienceController))).toBe(true)
  })

  test('honors reduced motion without hiding primary content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const action = page.locator('.home-action').first()
    await expect(action).toBeVisible()
    expect(await action.evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s')
    expect(await page.locator('.home-rain').evaluate(element => getComputedStyle(element).animationName)).toBe('none')
  })
})
