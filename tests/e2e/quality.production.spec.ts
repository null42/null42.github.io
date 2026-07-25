import { expect, test, type Locator, type Page } from '@playwright/test'
import {
  QUALITY_PAGES,
  classifyRuntimeRequest,
} from '../../scripts/quality/production-quality-contract'
import { encryptMarkdown } from '../../scripts/kb/encrypt/encrypt'

if (process.env.ARTICLE_INDEX_E2E_BASE_URL) {
  test.use({ baseURL: process.env.ARTICLE_INDEX_E2E_BASE_URL })
}

const expectNoHorizontalOverflow = async (page: Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
}

const expectReducedMotion = async (page: Page, selector: string) => {
  const sample = page.locator(selector).first()
  await expect(sample).toBeAttached()
  const motion = await sample.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      animationDuration: style.animationDuration.split(',').map((value) => value.trim()),
      animationName: style.animationName.split(',').map((value) => value.trim()),
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      transitionDuration: style.transitionDuration.split(',').map((value) => value.trim()),
    }
  })
  expect(motion.animationDuration.every((value) => value === '0s') || motion.animationName.every((value) => value === 'none')).toBe(true)
  expect(motion.transitionDuration.every((value) => value === '0s')).toBe(true)
  expect(motion.scrollBehavior).toBe('auto')
}

const tabTo = async (page: Page, target: Locator, maximumTabs = 120) => {
  await target.scrollIntoViewIfNeeded()
  await page.evaluate(() => {
    document.body.tabIndex = -1
    document.body.focus()
    document.body.removeAttribute('tabindex')
    window.scrollTo(0, 0)
  })
  for (let tabCount = 0; tabCount < maximumTabs; tabCount += 1) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((element) => element === document.activeElement)) {
      await expect(target).toBeFocused()
      return
    }
  }
  throw new Error(`Unable to reach ${await target.evaluate((element) => element.outerHTML)} with Tab`)
}

const activateLinkWithKeyboard = async (page: Page, link: Locator) => {
  const href = await link.getAttribute('href')
  if (!href) throw new Error('Keyboard navigation target must have an href')
  const expectedUrl = new URL(href, page.url())
  await tabTo(page, link, 240)
  await page.keyboard.press('Enter')
  await page.waitForURL((url) => url.pathname === expectedUrl.pathname && url.search === expectedUrl.search)
  expect(new URL(page.url()).pathname).toBe(expectedUrl.pathname)
}

const restoreQualityPage = async (page: Page, path: string) => {
  const response = await page.goto(path, { waitUntil: 'load' })
  expect(response?.status()).toBeLessThan(400)
  if ((page.viewportSize()?.width ?? 0) < 768) {
    await expect(page.locator('#navbar')).toBeHidden()
    await expect(page.locator('.mobile-dock')).toBeVisible()
  } else {
    await expect(page.locator('#navbar')).toBeVisible()
    await expect(page.locator('.mobile-dock')).toBeHidden()
  }
}

const activateNavbar = async (page: Page, currentPath: string) => {
  if ((page.viewportSize()?.width ?? 0) < 768) {
    const menuButton = page.locator('#mobile-dock-menu')
    await expect(menuButton).toBeVisible()
    await tabTo(page, menuButton)
    await page.keyboard.press('Enter')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    const menuLinks = page.locator('#nav-menu-panel a[href]')
    for (let tabCount = 0; tabCount < await menuLinks.count(); tabCount += 1) {
      const activeHref = await page.evaluate(() => document.activeElement instanceof HTMLAnchorElement ? document.activeElement.href : '')
      if (activeHref) {
        const targetUrl = new URL(activeHref)
        if (targetUrl.pathname !== currentPath) {
          await page.keyboard.press('Enter')
          await page.waitForURL((url) => url.pathname === targetUrl.pathname && url.search === targetUrl.search)
          expect(new URL(page.url()).pathname).toBe(targetUrl.pathname)
          return
        }
      }
      await page.keyboard.press('Tab')
    }
    throw new Error('Mobile navigation menu must expose a visible link to another route')
  }

  const navbar = page.locator('#navbar')
  const anchors = navbar.locator('a[href]')
  let target: Locator | undefined
  for (let index = 0; index < await anchors.count(); index += 1) {
    const candidate = anchors.nth(index)
    const href = await candidate.getAttribute('href')
    if (href && new URL(href, page.url()).pathname !== currentPath && await candidate.isVisible()) {
      target = candidate
      break
    }
  }

  if (!target) {
    const menuButton = navbar.locator('#nav-menu-switch')
    await expect(menuButton).toBeVisible()
    await tabTo(page, menuButton)
    await page.keyboard.press('Enter')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    const menuLinks = page.locator('#nav-menu-panel a[href]')
    for (let index = 0; index < await menuLinks.count(); index += 1) {
      const candidate = menuLinks.nth(index)
      const href = await candidate.getAttribute('href')
      if (href && new URL(href, page.url()).pathname !== currentPath && await candidate.isVisible()) {
        target = candidate
        break
      }
    }
  }

  if (!target) throw new Error('Navbar must expose a visible link to another route')
  await activateLinkWithKeyboard(page, target)
}

const motionSelectors = {
  home: '[data-home-page] [data-home-section="hero"]',
  list: '[data-article-index] .article-index__card',
  'knowledge-map': '[data-knowledge-map] .knowledge-map__route',
  article: '#post-container .markdown-content',
  'knowledge-article': '#post-container .markdown-content',
  'encrypted-article': '#post-container .encrypted-payload',
  search: 'main input[type="text"]',
} satisfies Record<(typeof QUALITY_PAGES)[number]['kind'], string>

for (const qualityPage of QUALITY_PAGES) {
  test(`${qualityPage.kind} respects responsive, interaction, motion, and network boundaries`, async ({ page }) => {
    test.setTimeout(60_000)
    const viewport = page.viewportSize()
    if (!viewport) throw new Error('Quality checks require a configured viewport')
    const forbiddenRequests: string[] = []
    page.on('request', (request) => {
      const classification = classifyRuntimeRequest(request.url(), 'http://127.0.0.1:4321')
      if (!['local', 'allowed-cdn'].includes(classification)) {
        forbiddenRequests.push(`${classification}: ${request.url()}`)
      }
    })

    await page.emulateMedia({ reducedMotion: 'reduce' })
    const response = await page.goto(qualityPage.path)
    expect(response?.status()).toBeLessThan(400)
    await page.waitForLoadState('networkidle')

    if (viewport.width < 768) {
      await expect(page.locator('#navbar')).toBeHidden()
      await expect(page.locator('.mobile-dock')).toBeVisible()
    } else {
      await expect(page.locator('#navbar')).toBeVisible()
    }
    await activateNavbar(page, qualityPage.path)
    await restoreQualityPage(page, qualityPage.path)

    const mobileDock = page.locator('.mobile-dock')
    if (viewport.width < 768) {
      await expect(mobileDock).toBeVisible()
      const toolsButton = mobileDock.locator('#mobile-dock-tools-btn')
      await tabTo(page, toolsButton)
      await page.keyboard.press('Enter')
      await expect(toolsButton).toHaveAttribute('aria-expanded', 'true')
      const dockLink = page.locator(`#mobile-dock-sheet a[href="${qualityPage.path === '/knowledge/' ? '/list/' : '/knowledge/'}"]`)
      await expect(dockLink).toBeVisible()
      await activateLinkWithKeyboard(page, dockLink)
      await restoreQualityPage(page, qualityPage.path)
    } else {
      await expect(mobileDock).toBeHidden()
    }

    if (qualityPage.kind === 'knowledge-map') {
      const knowledgeMap = page.locator('[data-knowledge-map]')
      const articleLink = knowledgeMap.locator('.knowledge-map__stage li a[href^="/posts/"]').first()
      await expect(knowledgeMap).toBeVisible()
      await expect(articleLink).toBeVisible()
      await activateLinkWithKeyboard(page, articleLink)
      await expect(page.locator('#post-container .markdown-content')).toBeVisible()
      await restoreQualityPage(page, qualityPage.path)
    }

    if (qualityPage.kind === 'list') {
      const firstCard = page.locator('[data-article-index] .article-index__card').first()
      await expect(firstCard).toBeVisible()
      const cardPresentation = await firstCard.evaluate((card) => {
        const link = card.querySelector('a')
        const cover = card.querySelector('.article-index__cover')
        if (!(link instanceof HTMLAnchorElement)) throw new Error('Article card must contain a link')
        if (!(cover instanceof HTMLImageElement)) throw new Error('Article card must contain a cover image')
        const cardStyle = getComputedStyle(card)
        const linkStyle = getComputedStyle(link)
        const coverStyle = getComputedStyle(cover)
        return {
          borderRadius: Number.parseFloat(cardStyle.borderRadius),
          linkDisplay: linkStyle.display,
          linkPaddingTop: Number.parseFloat(linkStyle.paddingTop),
          coverRadius: Number.parseFloat(coverStyle.borderRadius),
          coverFit: coverStyle.objectFit,
        }
      })
      expect(cardPresentation.borderRadius).toBeGreaterThan(0)
      expect(cardPresentation.linkDisplay).toBe('flex')
      expect(cardPresentation.linkPaddingTop).toBeGreaterThan(0)
      expect(cardPresentation.coverRadius).toBeGreaterThan(0)
      expect(cardPresentation.coverFit).toBe('cover')
      await expect(firstCard.locator('footer a').first()).toBeVisible()
    }

    if (qualityPage.kind === 'knowledge-article') {
      const trees = page.locator('[data-knowledge-tree]')
      await expect(trees.first()).toBeAttached()
      await expect(trees.locator('[aria-current="page"]').first()).toBeAttached()

      const desktopTree = page.locator('.knowledge-sidebar-rail [data-knowledge-tree]')
      if (!await desktopTree.isVisible()) {
        const openDrawer = page.locator('[data-drawer-open]')
        const drawerPanel = page.locator('[data-drawer-panel]')
        await expect(desktopTree).toBeHidden()
        await expect(openDrawer).toBeVisible()
        await openDrawer.click()
        await expect(openDrawer).toHaveAttribute('aria-expanded', 'true')
        await expect(drawerPanel).toBeVisible()
        await expect(drawerPanel).toHaveAttribute('aria-hidden', 'false')
        await expect(drawerPanel.locator('[aria-current="page"]')).toBeVisible()
        await expect(drawerPanel.locator('[data-drawer-close]')).toBeFocused()
        await page.keyboard.press('Escape')
        await expect(openDrawer).toHaveAttribute('aria-expanded', 'false')
        await expect(drawerPanel).toBeHidden()
        await expect(openDrawer).toBeFocused()
      } else {
        await expect(desktopTree).toBeVisible()
        const toggle = desktopTree.locator('[data-tree-toggle]').first()
        const controlledId = await toggle.getAttribute('aria-controls')
        if (!controlledId) throw new Error('Knowledge tree toggle must control a panel')
        const panel = page.locator(`#${controlledId}`)
        await toggle.focus()
        await page.keyboard.press('ArrowLeft')
        await expect(toggle).toHaveAttribute('aria-expanded', 'false')
        await expect(panel).toBeHidden()
        await page.keyboard.press('ArrowRight')
        await expect(toggle).toHaveAttribute('aria-expanded', 'true')
        await expect(panel).toBeVisible()
      }
    }

    if (['article', 'knowledge-article'].includes(qualityPage.kind)) {
      const articleBody = page.locator('#post-container .markdown-content')
      await expect(articleBody).toBeVisible()
      await expect(articleBody).not.toBeEmpty()
      await expect.poll(() => page.locator('#article-toc-content .toc-item, #sidebar-toc-content .toc-item, #floating-toc-content .toc-item').count()).toBeGreaterThan(0)
      const articleTocRail = page.locator('#article-toc-wrapper')
      const sidebarToc = page.locator('#sidebar-toc')
      if (await articleTocRail.isVisible()) {
        await expect(articleTocRail.locator('.toc-item').first()).toBeVisible()
      } else if (await sidebarToc.isVisible()) {
        await expect(sidebarToc.locator('.toc-item').first()).toBeVisible()
      } else {
        const floatingTocButton = page.locator('#floating-toc-btn')
        const floatingTocPanel = page.locator('#floating-toc-panel')
        await expect(floatingTocButton).toBeVisible()
        await floatingTocButton.click()
        await expect(floatingTocPanel).toBeVisible()
        await expect(floatingTocPanel.locator('.toc-item').first()).toBeVisible()
        await floatingTocButton.click()
        await expect(floatingTocPanel).toBeHidden()
      }
    }

    if (qualityPage.kind === 'encrypted-article') {
      const postContainer = page.locator('#post-container')
      const encryptedUi = postContainer.locator('.encrypted-payload')
      const encryptedForm = encryptedUi.locator('.encrypted-payload-form')
      const decryptedContent = encryptedUi.locator('.encrypted-payload-content')
      const e2ePassword = `quality-${Date.now()}-${Math.random()}`
      const e2ePayload = await encryptMarkdown([
        '# Encrypted E2E Fixture',
        '',
        '- first rendered item',
        '- second rendered item',
        '- third rendered item',
      ].join('\n'), e2ePassword)
      await page.route('**/content/encrypted/demo.json', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(e2ePayload),
      }))
      await expect(encryptedUi).toBeVisible()
      await expect(encryptedUi).toHaveAttribute('data-pagefind-ignore', 'all')
      await expect(encryptedForm).toBeVisible()
      await expect(encryptedForm.locator('input[type="password"]')).toBeVisible()
      await expect(decryptedContent).toBeHidden()
      await expect(decryptedContent).toBeEmpty()
      await expect(postContainer.locator('[data-pagefind-body]')).toHaveCount(0)
      await expect(postContainer.locator('.markdown-content:not(.encrypted-payload-content)')).toHaveCount(0)

      await encryptedForm.locator('input[type=password]').fill(e2ePassword)
      await encryptedForm.locator('button[type=submit]').click()

      await expect(encryptedForm).toBeHidden()
      await expect(decryptedContent).toBeVisible()
      const decryptedHeading = decryptedContent.locator('h1')
      await expect(decryptedHeading).toContainText('Encrypted E2E Fixture')
      await expect(decryptedHeading.locator('a.anchor')).toHaveAttribute('href', '#encrypted-e2e-fixture')
      await expect(decryptedContent.locator('li')).toHaveCount(3)
      await expect(decryptedContent).not.toContainText('passwordHint:')
    }

    if (qualityPage.kind === 'home') {
      await expect(page.locator('.home-background-video')).toHaveCount(0)
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await expect.poll(() => page.evaluate(() => window.scrollY > 0)).toBe(true)
      await page.waitForLoadState('networkidle')
    }

    if (qualityPage.kind === 'search') {
      const input = page.locator('main input[type="text"]')
      await expect(input).toBeVisible()
      await input.fill('\u7535\u6e90\u63a7\u5236\u5165\u53e3')
      await expect(page.locator('main a[href="/posts/power/getting-started/"]')).toBeVisible()
    }

    await expectReducedMotion(page, motionSelectors[qualityPage.kind])
    await expectNoHorizontalOverflow(page)
    await page.waitForLoadState('networkidle')
    expect(forbiddenRequests).toEqual([])
  })
}
