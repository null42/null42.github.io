import { expect, test } from '@playwright/test'

declare global {
  interface Window {
    __categoryBarResizeProbe: {
      calls: number
    }
    swup: {
      navigate: (url: string) => Promise<void> | void
      hooks: {
        registry: Map<string, Map<number, unknown>>
      }
    }
  }
}

test('keeps CategoryBar resize listeners and Swup hooks singular across round trips', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440')

  await page.addInitScript(() => {
    const originalAdd = EventTarget.prototype.addEventListener
    window.__categoryBarResizeProbe = { calls: 0 }

    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (
        this === window &&
        type === 'resize' &&
        typeof listener === 'function' &&
        '__categoryBarResizeListener' in listener
      ) {
        const wrapped = function (this: EventTarget, event: Event) {
          window.__categoryBarResizeProbe.calls += 1
          return listener.call(this, event)
        }
        return originalAdd.call(this, type, wrapped, options)
      }
      return originalAdd.call(this, type, listener, options)
    }
  })

  await page.goto('/list/', { waitUntil: 'networkidle' })
  await expect(page.locator('#category-bar')).toBeVisible()
  await expect.poll(() => page.evaluate(() => Boolean(window.swup?.hooks))).toBe(true)

  const readLifecycleCounts = () => page.evaluate(() => ({
    visitStart: window.swup.hooks.registry.get('visit:start')?.size ?? 0,
  }))
  const baseline = await readLifecycleCounts()
  const readCategoryBarResizeCalls = () => page.evaluate(() => {
    window.__categoryBarResizeProbe.calls = 0
    window.dispatchEvent(new Event('resize'))
    return window.__categoryBarResizeProbe.calls
  })
  expect(await readCategoryBarResizeCalls()).toBe(1)

  for (let round = 0; round < 3; round += 1) {
    for (const target of ['/posts/motor/readme/', '/list/']) {
      await page.evaluate((url) => window.swup.navigate(url), target)
      await page.waitForURL((url) => url.pathname === target)
      await page.waitForTimeout(250)
    }

    await expect.poll(readLifecycleCounts).toEqual(baseline)
    expect(await readCategoryBarResizeCalls()).toBe(1)
  }
})
