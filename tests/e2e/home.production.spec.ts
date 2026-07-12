import { expect, test } from '@playwright/test'

const localOrigin = 'http://127.0.0.1:4321'

test.describe('home production contracts', () => {
  test('loads responsive images without failed requests or layout shift', async ({ page }) => {
    const failedRequests: string[] = []
    page.on('requestfailed', request => {
      if (request.resourceType() === 'image') failedRequests.push(request.url())
    })

    await page.goto('/')
    const hero = page.locator('[data-home-section="hero"]')
    const heroImage = hero.locator('img')
    await expect(hero).toBeVisible()
    await expect(heroImage).toHaveAttribute('width', '1000')
    await expect(heroImage).toHaveAttribute('height', '750')
    await expect(heroImage).toHaveAttribute('loading', 'eager')
    await expect(heroImage).toHaveAttribute('fetchpriority', 'high')
    await expect(heroImage).toHaveJSProperty('complete', true)
    await page.waitForLoadState('networkidle')

    const first = await hero.boundingBox()
    await page.waitForTimeout(250)
    const second = await hero.boundingBox()
    expect(failedRequests.filter(url => url.startsWith(localOrigin))).toEqual([])
    expect(Math.abs((second?.height ?? 0) - (first?.height ?? 0))).toBeLessThanOrEqual(1)
    expect(Math.abs((second?.width ?? 0) - (first?.width ?? 0))).toBeLessThanOrEqual(1)
  })

  test('keeps one controller through repeated navigation lifecycle rounds', async ({ page }) => {
    await page.goto('/')
    for (let round = 0; round < 3; round += 1) {
      await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
      await page.goto('/list/')
      await expect(page).toHaveURL(/\/list\/$/)
      await expect(page.locator('html')).not.toHaveAttribute('data-home-experience', 'ready')
      await page.goto('/')
    }
    await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
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
