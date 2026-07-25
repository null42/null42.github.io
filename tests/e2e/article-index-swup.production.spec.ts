import { expect, test, type Page } from '@playwright/test'

type ArticleIndexProbe = {
  activeArticleObservers: number
  documentToken: string
  viewWrites: number
}

declare global {
  interface Window {
    __articleIndexProbe: ArticleIndexProbe
  }
}

if (process.env.ARTICLE_INDEX_E2E_BASE_URL) {
  test.use({ baseURL: process.env.ARTICLE_INDEX_E2E_BASE_URL })
}

const expectSingleArticleIndexLifecycle = async (page: Page) => {
  await expect(page.locator('[data-article-index]')).toHaveAttribute('data-enhanced', 'true')
  expect(await page.evaluate(() => window.__articleIndexProbe.activeArticleObservers)).toBe(1)
}

const expectReferenceCardContract = async (page: Page) => {
  const index = page.locator('[data-article-index]')
  const firstCard = index.locator('[data-article-results] .article-index__card').first()
  await expect(firstCard).toBeVisible()
  await expect(firstCard.locator('.article-index__cover')).toBeVisible()
  await expect(firstCard.locator('.article-index__cover')).toHaveAttribute('src', /^\/(?:_astro|images)\//)
  await expect(firstCard).toHaveAttribute('data-pinned', /^(?:true|false)$/)
  await expect(firstCard).toHaveAttribute('data-encrypted', /^(?:true|false)$/)
  await expect(index.locator('[data-article-results] .article-index__card footer a[href*="category="]').first()).toBeVisible()
  await expect(index.locator('[data-article-results] .article-index__card [data-article-tag][href*="tag="]').first()).toBeVisible()
  await expect(index.locator('[data-article-no-js]')).toBeHidden()
}

const revealEncryptedArticle = async (page: Page) => {
  const index = page.locator('[data-article-index]')
  const results = index.locator('[data-article-results]')
  const encryptedBadge = results.locator('.article-index__card[data-encrypted="true"] [data-article-encrypted]')
  const loadMore = index.locator('[data-article-load-more]')
  const total = Number((await index.locator('[data-article-status]').textContent())?.match(/共\s*(\d+)/)?.[1])

  while (await encryptedBadge.count() === 0) {
    const visible = await results.locator('[data-article-item]').count()
    expect(visible).toBeLessThan(total)
    await loadMore.evaluate((button) => (button as HTMLButtonElement).click())
    await expect(results.locator('[data-article-item]')).not.toHaveCount(visible)
  }
  await expect(encryptedBadge.first()).toBeVisible()
}

const useViewControlsOnce = async (page: Page) => {
  const list = page.locator('[data-article-view="list"]')
  const grid = page.locator('[data-article-view="grid"]')
  const indicator = page.locator('.article-index__tab-indicator')
  const listIndicatorBox = await indicator.boundingBox()
  expect(listIndicatorBox).not.toBeNull()
  await page.evaluate(() => { window.__articleIndexProbe.viewWrites = 0 })
  await grid.click()
  await expect(grid).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(async () => (await indicator.boundingBox())?.x).not.toBe(listIndicatorBox!.x)
  await grid.press('ArrowLeft')
  await expect(list).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(async () => Math.round((await indicator.boundingBox())?.x ?? -1)).toBe(Math.round(listIndicatorBox!.x))
  expect(await page.evaluate(() => window.__articleIndexProbe.viewWrites)).toBe(2)
}

const revealArticlesWithoutLosingFocus = async (page: Page) => {
  const results = page.locator('[data-article-results]')
  const status = page.locator('[data-article-status]')
  const loadMore = page.locator('[data-article-load-more]')
  const firstLink = results.locator('[data-article-item] a').first()
  const initialCount = await results.locator('[data-article-item]').count()
  const total = Number((await status.textContent())?.match(/共\s*(\d+)/)?.[1])
  expect(initialCount).toBeGreaterThan(0)
  expect(initialCount).toBeLessThan(total)
  await firstLink.focus()
  await loadMore.evaluate(button => (button as HTMLButtonElement).click())
  const revealedCount = Math.min(initialCount * 2, total)
  await expect(results.locator('[data-article-item]')).toHaveCount(revealedCount)
  await expect(firstLink).toBeFocused()
  await expect(status).toHaveText(`当前显示 ${revealedCount}，共 ${total}`)
}

const followVisibleNavbarLink = async (page: Page, href: string) => {
  const mobileTools = page.locator('#mobile-dock-tools-btn')
  if (await mobileTools.isVisible()) {
    await mobileTools.click()
    await expect(mobileTools).toHaveAttribute('aria-expanded', 'true')
    const link = page.locator(`#mobile-dock-sheet a[href="${href}"]`)
    await expect(link).toBeVisible()
    await link.click()
  } else if (await page.locator('[data-navbar-nav] [data-dropdown]:visible').count() > 0) {
    const directLink = page.locator(`[data-navbar-nav] > [data-dropdown] > a[href="${href}"]`)
    if (await directLink.isVisible()) {
      await directLink.click()
    } else {
      const dropdown = page.locator('[data-navbar-nav] [data-dropdown]').filter({ has: page.locator(`a[href="${href}"]`) })
      await dropdown.hover()
      const link = dropdown.locator(`a[href="${href}"]`)
      await expect(link).toBeVisible()
      await link.click()
    }
  } else {
    const menuButton = page.locator('#nav-menu-switch')
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    const panel = page.locator('#nav-menu-panel')
    const link = panel.locator(`a[href="${href}"]`)
    const dropdown = panel.locator('[data-mobile-dropdown]').filter({ has: link })
    if (await dropdown.count() === 1) {
      const trigger = dropdown.locator('[data-mobile-dropdown-trigger]')
      if (await trigger.getAttribute('aria-expanded') !== 'true') await trigger.click()
    }
    await expect(link).toBeVisible()
    await link.click()
  }
  await page.waitForURL(url => url.pathname === href)
}

test('article index lifecycle stays singular across real Swup round trips', async ({ page }) => {
  await page.addInitScript(() => {
    const probe: ArticleIndexProbe = { activeArticleObservers: 0, documentToken: crypto.randomUUID(), viewWrites: 0 }
    window.__articleIndexProbe = probe

    const NativeIntersectionObserver = window.IntersectionObserver
    window.IntersectionObserver = class extends NativeIntersectionObserver {
      private observesArticleSentinel = false

      override observe(target: Element) {
        if (!this.observesArticleSentinel && target.matches('[data-article-sentinel]')) {
          this.observesArticleSentinel = true
          probe.activeArticleObservers += 1
        }
        super.observe(target)
      }

      override disconnect() {
        if (this.observesArticleSentinel) {
          this.observesArticleSentinel = false
          probe.activeArticleObservers -= 1
        }
        super.disconnect()
      }
    }

    const nativeSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === 'articleIndex.view') probe.viewWrites += 1
      nativeSetItem.call(this, key, value)
    }
  })

  await page.goto('/list/', { waitUntil: 'networkidle' })
  const documentToken = await page.evaluate(() => window.__articleIndexProbe.documentToken)
  await expectSingleArticleIndexLifecycle(page)
  await expectReferenceCardContract(page)
  await revealArticlesWithoutLosingFocus(page)
  await useViewControlsOnce(page)
  await revealEncryptedArticle(page)

  for (let roundTrip = 0; roundTrip < 2; roundTrip += 1) {
    await followVisibleNavbarLink(page, '/knowledge/')
    expect(await page.evaluate(() => window.__articleIndexProbe.documentToken)).toBe(documentToken)
    await expect(page.locator('[data-article-index]')).toHaveCount(0)
    expect(await page.evaluate(() => window.__articleIndexProbe.activeArticleObservers)).toBe(0)

    await followVisibleNavbarLink(page, '/list/')
    expect(await page.evaluate(() => window.__articleIndexProbe.documentToken)).toBe(documentToken)
    await expectSingleArticleIndexLifecycle(page)
    await useViewControlsOnce(page)
  }
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('article index exposes every public article as a static link', async ({ page }) => {
    const response = await page.goto('/list/', { waitUntil: 'load' })
    expect(response?.status()).toBeLessThan(400)
    const total = Number(await page.locator('[data-article-index] .article-index__tools strong').textContent())
    const fallbackLinks = page.locator('[data-article-no-js] a[href^="/posts/"]')
    expect(total).toBeGreaterThan(48)
    await expect(fallbackLinks).toHaveCount(total)
    await expect(fallbackLinks.first()).toBeVisible()
    await expect(page.locator('[data-article-no-js] .article-index__fallback-link').first()).toBeVisible()
    await expect(page.locator('[data-article-no-js] [data-encrypted="true"] small').first()).toHaveText('加密')
    await expect(page.locator('[data-article-no-js] img')).toHaveCount(0)
    const allPostLinks = page.locator('[data-article-index] a[href^="/posts/"]')
    const hrefs = await allPostLinks.evaluateAll(links => links.map(link => link.getAttribute('href')))
    expect(new Set(hrefs).size).toBe(total)
    await expect(page.locator('[data-article-view]:visible')).toHaveCount(0)
  })
})
