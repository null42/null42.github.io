import { expect, test } from '@playwright/test'

test.describe('article desktop reading progress', () => {
  test.skip(({ viewport }) => !viewport || viewport.width < 1024, 'desktop three-column contract')

  test('shows three columns at 1024/1280-class widths and resets across Swup visits', async ({ page }) => {
    for (const width of [1024, 1280]) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/posts/blog/hello/', { waitUntil: 'networkidle' })
      await expect(page.locator('.article-catalog-wrapper, .knowledge-sidebar-rail').first()).toBeVisible()
      await expect(page.locator('#article-toc-wrapper')).toBeVisible()
    }

    const progress = page.locator('[data-article-reading-progress]')
    await expect(progress).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await expect.poll(async () => Number(await progress.getAttribute('aria-valuenow'))).toBeGreaterThan(0)

    for (let round = 0; round < 3; round += 1) {
      await page.evaluate(() => window.swup.navigate('/list/'))
      await expect(page).toHaveURL(/\/list\/$/)
      expect(await page.evaluate(() => window.articleReadingProgressController)).toBeUndefined()
      await page.evaluate(() => window.swup.navigate('/posts/blog/hello/'))
      await expect(page).toHaveURL(/\/posts\/blog\/hello\/$/)
      await expect(page.locator('[data-article-reading-progress]')).toHaveCount(1)
      await expect.poll(() => page.evaluate(() => Boolean(window.articleReadingProgressController))).toBe(true)
    }
  })
})
