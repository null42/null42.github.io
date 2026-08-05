import { expect, test } from '@playwright/test'

test.describe('reader production experience', () => {
  test.setTimeout(120_000)

  test('bookshelf random action opens a real PDF route', async ({ page }) => {
    await page.goto('/bookshelf/')
    await page.locator('[data-bookshelf-random]').click()
    await expect(page).toHaveURL(/\/bookshelf\/[^/]+\/$/)
  })

  test('PDF reader renders pages and all primary controls work', async ({ page }) => {
    await page.goto('/bookshelf/depth-foundation-enhancement-part2/')
    const reader = page.locator('[data-pdfjs-reader]')
    await expect(reader).toBeVisible()
    await expect(reader.locator('[data-pdf-total]')).toHaveText(/^\d+$/, { timeout: 60_000 })
    await expect.poll(() => reader.locator('canvas').evaluate((canvas) => (canvas as HTMLCanvasElement).width)).toBeGreaterThan(0)

    const total = Number(await reader.locator('[data-pdf-total]').textContent())
    expect(total).toBeGreaterThan(1)
    await reader.locator('[data-pdf-next]').click()
    await expect(reader.locator('[data-pdf-page]')).toHaveValue('2')
    await reader.locator('[data-pdf-page]').fill('3')
    await reader.locator('[data-pdf-page]').press('Enter')
    await expect(reader.locator('[data-pdf-page]')).toHaveValue('3')
    await reader.locator('[data-pdf-scale]').selectOption('1.25')
    await expect(reader.locator('[data-pdf-scale]')).toHaveValue('1.25')

    if (await page.evaluate(() => Boolean(document.fullscreenEnabled))) {
      await reader.locator('[data-pdf-fullscreen]').click()
      await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true)
      await page.keyboard.press('Escape')
    }
  })

  test('HTML document executes isolated CSS and JavaScript', async ({ page }) => {
    await page.goto('/html/interactive-reading-demo/')
    const frame = page.frameLocator('[data-html-iframe]')
    await expect(frame.locator('h1')).toHaveText(/HTML .* Static/)
    await expect.poll(() => frame.locator('html').evaluate(() => document.readyState)).toBe('complete')
    await page.waitForTimeout(250)
    await frame.locator('#demo').click()
    await expect(frame.locator('#result')).toContainText('JavaScript OK')
  })

  test('textbook missing source pages render explicit fallback cards', async ({ page }) => {
    await page.goto('/posts/power/fundamentals-work/chunks/001-preface/')
    const fallback = page.locator('.source-page-fallback').first()
    await expect(fallback).toBeVisible()
    await expect(fallback).toContainText('P.7')
    await expect(fallback.locator('.source-page-fallback__number')).toHaveText('P.7')
    await expect(page.locator('img[src*="page-snapshots"]')).toHaveCount(0)
  })

  test('article and code workspace synchronize heading line ranges', async ({ page }) => {
    await page.goto('/posts/foundations/simulation/c-simulation/code-examples/02-custom-speed-profile/readme/')
    const workspace = page.locator('[data-code-workspace]')
    await expect(workspace.locator('[data-code-open]')).toBeVisible()
    if (await workspace.locator('[data-code-panel]').getAttribute('aria-hidden') === 'true') {
      await workspace.locator('[data-code-open]').click()
    }
    await expect(workspace.locator('[data-code-panel]')).toHaveAttribute('aria-hidden', 'false')
    await page.locator('[id="\u4fee\u6539\u65b9\u6848"]').evaluate((heading) => heading.scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(250)
    await expect(workspace.locator('[data-code-line="8"]')).toHaveClass(/highlighted/)
    await expect(workspace.locator('[data-code-line="21"]')).toHaveClass(/highlighted/)
  })

  test('removed social pages stay absent and private reader rejects a wrong gate password', async ({ page, request }) => {
    for (const route of ['/friends/', '/guestbook/', '/sponsor/']) {
      expect((await request.get(route)).status()).toBe(404)
    }
    await page.goto('/private-reader/')
    const gateInput = page.locator('[data-gate-input]')
    await gateInput.fill('definitely-wrong-password')
    await page.locator('[data-gate-submit]').click()
    await expect(page.locator('[data-gate-error]')).toBeVisible({ timeout: 30_000 })
    await expect(gateInput).toBeEditable()
  })
})
