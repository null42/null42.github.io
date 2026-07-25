import { expect, test, type Page } from '@playwright/test'

declare global {
  interface Window {
    __initMobileDock?: () => void
    __mobileDockAbortController?: AbortController
  }
}

test.beforeEach(({ viewport }) => {
  test.skip(!viewport || viewport.width >= 768, 'Mobile Dock is only visible below 768px')
})

const navigateWithToolsSheet = async (page: Page, path: string) => {
  const toolsButton = page.locator('#mobile-dock-tools-btn')
  await toolsButton.click()
  await expect(toolsButton).toHaveAttribute('aria-expanded', 'true')
  await page.locator(`#mobile-dock-sheet a[href="${path}"]`).click()
  await page.waitForURL(url => url.pathname === path)
  await expect(page.locator(path === '/knowledge/' ? '[data-knowledge-map]' : '[data-article-index]')).toBeVisible()
}

test('replaces the Mobile Dock lifecycle across Swup navigation', async ({ page }) => {
  await page.goto('/list/', { waitUntil: 'networkidle' })
  const toolsButton = page.locator('#mobile-dock-tools-btn')
  const sheet = page.locator('#mobile-dock-sheet')
  const mainGrid = page.locator('#main-grid-wrapper')
  const floatingControls = page.locator('.floating-controls-container')
  await toolsButton.click()
  await expect(toolsButton).toHaveAttribute('aria-expanded', 'true')
  await expect(mainGrid).toHaveAttribute('inert', '')
  const previousController = await page.evaluateHandle(() => window.__mobileDockAbortController)
  await page.evaluate(() => window.__initMobileDock?.())
  expect(await page.evaluate(controller => controller?.signal.aborted, previousController)).toBe(true)
  await expect(toolsButton).toHaveAttribute('aria-expanded', 'false')
  await expect(sheet).toHaveAttribute('aria-hidden', 'true')
  await expect(mainGrid).not.toHaveAttribute('inert', '')
  await expect(floatingControls).not.toHaveAttribute('inert', '')
  await previousController.dispose()

  const activeController = await page.evaluateHandle(() => window.__mobileDockAbortController)
  for (const path of ['/knowledge/', '/list/']) {
    await navigateWithToolsSheet(page, path)
    expect(await page.evaluate(controller => controller === window.__mobileDockAbortController, activeController)).toBe(true)
    expect(await page.evaluate(controller => controller?.signal.aborted, activeController)).toBe(false)
  }

  await activeController.dispose()
})

test('runs real mobile actions and disables unavailable page actions', async ({ page }) => {
  await page.goto('/list/', { waitUntil: 'networkidle' })

  const tocButton = page.locator('#mobile-dock-toc-btn')
  const commentButton = page.locator('#mobile-dock-comment-btn')
  await expect(tocButton).toBeDisabled()
  await expect(tocButton).toHaveAttribute('aria-disabled', 'true')
  await expect(commentButton).toBeDisabled()
  await expect(commentButton).toHaveAttribute('aria-disabled', 'true')

  const themeButton = page.locator('#mobile-dock-theme-btn')
  const initialDarkMode = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  await themeButton.click()
  expect(await page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(!initialDarkMode)
  await expect(themeButton).toHaveAttribute('aria-pressed', String(!initialDarkMode))

  const dockClearance = await page.evaluate(() => {
    const dock = document.getElementById('mobile-dock')
    const mainGrid = document.getElementById('main-grid')
    if (!dock || !mainGrid) throw new Error('Mobile Dock geometry targets are missing')
    return {
      coveredHeight: window.innerHeight - dock.getBoundingClientRect().top,
      paddingBottom: Number.parseFloat(getComputedStyle(mainGrid).paddingBottom),
    }
  })
  expect(dockClearance.paddingBottom).toBeGreaterThan(dockClearance.coveredHeight)

  await page.locator('#mobile-dock-home-btn').click()
  await page.waitForURL(url => url.pathname === '/')

  await page.goto('/posts/blog/hello/', { waitUntil: 'networkidle' })
  const articleToolsButton = page.locator('#mobile-dock-tools-btn')
  await articleToolsButton.click()
  await expect(page.locator('#mobile-dock-toc-btn')).toBeEnabled()
  await expect(page.locator('#mobile-dock-comment-btn')).toBeDisabled()
  await page.locator('#mobile-dock-toc-btn').click()
  await expect(articleToolsButton).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#floating-toc-panel')).toHaveClass(/show/)
  await expect(page.locator('#floating-toc-panel')).not.toHaveClass(/hide/)
})

test('traps focus in the tools dialog and restores the trigger on close', async ({ page }) => {
  await page.goto('/list/', { waitUntil: 'networkidle' })
  const toolsButton = page.locator('#mobile-dock-tools-btn')
  const sheet = page.locator('#mobile-dock-sheet')
  const firstItem = page.locator('#mobile-dock-top-btn')
	const lastItem = sheet.locator(`a[href='/search/']`)
  const dock = page.locator('#mobile-dock')
  const mainGrid = page.locator('#main-grid-wrapper')
  const floatingControls = page.locator('.floating-controls-container')
  const backToHome = page.locator('#back-to-home-btn')

  await toolsButton.click()
  await expect(sheet).toHaveAttribute('role', 'dialog')
  await expect(sheet).toHaveAttribute('aria-modal', 'true')
  await expect(dock).toHaveAttribute('inert', '')
  await expect(mainGrid).toHaveAttribute('inert', '')
  await expect(floatingControls).toHaveAttribute('inert', '')
  await backToHome.focus()
  await expect(backToHome).not.toBeFocused()
  await expect(firstItem).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(lastItem).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(firstItem).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(toolsButton).toBeFocused()
  await expect(dock).not.toHaveAttribute('inert', '')
  await expect(mainGrid).not.toHaveAttribute('inert', '')
  await expect(floatingControls).not.toHaveAttribute('inert', '')

  await toolsButton.click()
  await page.locator('#mobile-dock-overlay').click({ position: { x: 1, y: 1 } })
  await expect(toolsButton).toBeFocused()
  await expect(dock).not.toHaveAttribute('inert', '')
  await expect(mainGrid).not.toHaveAttribute('inert', '')
  await expect(floatingControls).not.toHaveAttribute('inert', '')
})

test('closes the tools dialog and restores interaction at the desktop breakpoint', async ({ page }) => {
  await page.goto('/list/', { waitUntil: 'networkidle' })
  const toolsButton = page.locator('#mobile-dock-tools-btn')
  const sheet = page.locator('#mobile-dock-sheet')
  const dock = page.locator('#mobile-dock')
  const mainGrid = page.locator('#main-grid-wrapper')
  const floatingControls = page.locator('.floating-controls-container')

  await toolsButton.click()
  await expect(toolsButton).toHaveAttribute('aria-expanded', 'true')
  await expect(mainGrid).toHaveAttribute('inert', '')
  await expect(floatingControls).toHaveAttribute('inert', '')

  await page.setViewportSize({ width: 1024, height: 768 })

  await expect(toolsButton).toHaveAttribute('aria-expanded', 'false')
  await expect(sheet).toHaveAttribute('aria-hidden', 'true')
  await expect(dock).not.toHaveAttribute('inert', '')
  await expect(mainGrid).not.toHaveAttribute('inert', '')
  await expect(floatingControls).not.toHaveAttribute('inert', '')
})
