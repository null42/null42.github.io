import { expect, test } from '@playwright/test'

const expectInteractionRestored = async (page: import('@playwright/test').Page) => {
  await expect(page.locator('#nav-menu-panel')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('#mobile-dock-overlay')).toHaveAttribute('hidden', '')
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
}

test('navigation sidebar survives ten rapid Swup route changes', async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width >= 1024, 'The sidebar menu is used below the desktop navigation breakpoint')
  await page.goto('/list/', { waitUntil: 'networkidle' })

  for (let round = 0; round < 10; round += 1) {
    const menuButton = page.locator(viewport.width < 768 ? '#mobile-dock-menu' : '#nav-menu-switch')
    if (round === 0) await menuButton.click({ clickCount: 3, delay: 20 })
    else await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    if (round % 3 === 0) {
      await page.keyboard.press('Escape')
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      await menuButton.click()
    }

    const target = page.url().endsWith('/list/') ? '/knowledge/' : '/list/'
    const link = page.locator(`#nav-menu-panel a[href="${target}"]`)
    await expect(link).toBeVisible()
    await link.click()
    await page.waitForURL(url => url.pathname === target)
    await expectInteractionRestored(page)
  }

  await page.goBack()
  await expectInteractionRestored(page)
  const menuButton = page.locator(viewport.width < 768 ? '#mobile-dock-menu' : '#nav-menu-switch')
  await menuButton.click()
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expectInteractionRestored(page)
})

test('knowledge drawer clears overlays and scroll locks after repeated actions', async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width >= 1360, 'The knowledge drawer is only rendered below the wide rail breakpoint')
  await page.goto('/posts/foundations/simulation/c-simulation/code-examples/02-custom-speed-profile/readme/', { waitUntil: 'networkidle' })
  const openButton = page.locator('[data-drawer-open]')
  const panel = page.locator('[data-drawer-panel]')

  for (let round = 0; round < 10; round += 1) {
    await openButton.click()
    await expect(panel).toHaveAttribute('aria-hidden', 'false')
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
    if (round % 2 === 0) await page.keyboard.press('Escape')
    else await panel.locator('[data-drawer-close]').click()
    await expect(panel).toBeHidden()
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  }

  await page.goto('/list/')
  await page.goBack()
  await expect(openButton).toBeVisible()
  await openButton.click()
  await expect(panel).toHaveAttribute('aria-hidden', 'false')
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
})
