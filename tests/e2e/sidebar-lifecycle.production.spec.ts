import { expect, test } from '@playwright/test'

const expectInteractionRestored = async (page: import('@playwright/test').Page) => {
  await expect(page.locator('#nav-menu-panel')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('#mobile-dock-overlay')).toHaveAttribute('hidden', '')
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
}

const expectOpaqueBackground = async (locator: import('@playwright/test').Locator) => {
  const background = await locator.evaluate(element => getComputedStyle(element).backgroundColor)
  const channels = background.match(/[\d.]+/g)?.map(Number) || []
  expect(channels.length).toBeGreaterThanOrEqual(3)
  expect(channels[3] ?? 1).toBe(1)
  await expect(locator).toHaveCSS('backdrop-filter', 'none')
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

test('navigation floating surfaces stay opaque', async ({ page, viewport }) => {
  await page.goto('/list/', { waitUntil: 'networkidle' })
  if (viewport && viewport.width >= 1024) {
    const dropdown = page.locator('[data-dropdown]:has(.float-panel):visible').first()
    await dropdown.hover()
    const panel = dropdown.locator('.float-panel')
    await expect(panel).toBeVisible()
    await expectOpaqueBackground(panel)
    return
  }

  if (viewport && viewport.width >= 768) {
    await page.locator('#nav-menu-switch').click()
    const panel = page.locator('#nav-menu-panel')
    await expect(panel).toBeVisible()
    await expectOpaqueBackground(panel)
    return
  }

  const dock = page.locator('.mobile-dock')
  await expectOpaqueBackground(dock)
  await page.locator('#mobile-dock-tools-btn').tap()
  const sheet = page.locator('#mobile-dock-sheet')
  await expect(sheet).toBeVisible()
  await expectOpaqueBackground(sheet)
})

test('mobile navigation responds to touch and releases its lock', async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width >= 768, 'Touch navigation is only rendered on mobile')
  await page.goto('/list/', { waitUntil: 'networkidle' })
  const menuButton = page.locator('#mobile-dock-menu')
  await menuButton.tap()
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await page.locator('#nav-menu-panel a').filter({ hasText: '知识' }).first().tap()
  await page.waitForURL(url => url.pathname === '/knowledge/')
  await expectInteractionRestored(page)
})
