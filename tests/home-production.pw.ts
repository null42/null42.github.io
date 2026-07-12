import { expect, test } from '@playwright/test'

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]

for (const viewport of viewports) {
  test(`home production contract at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('[data-home-page]')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
    expect(await page.locator('[data-home-page] img').evaluateAll(images => images.every(image => image.width > 0 && image.height > 0 && image.hasAttribute('alt') && image.hasAttribute('loading')))).toBe(true)
    expect(await page.locator('.home-hero').evaluate(element => Math.abs(element.getBoundingClientRect().height - window.innerHeight) < 2)).toBe(true)
  })
}

test('reduced motion and Swup lifecycle remain functional', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' })
  await expect(page.locator('.home-ticker__track')).toHaveCSS('animation-name', 'none')
  await page.locator('a[href="/about/"]').first().evaluate((link: HTMLAnchorElement) => link.click())
  await page.waitForURL(/\/about\//)
  await expect(page.locator('[data-home-page]')).toHaveCount(0)
  await expect(page.locator('html')).not.toHaveAttribute('data-home-experience', 'ready')
  await page.goBack({ waitUntil: 'networkidle' })
  await expect(page.locator('[data-home-page]')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-home-experience', 'ready')
})
