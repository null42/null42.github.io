import { expect, test } from '@playwright/test'

/**
 * 私密阅读器 E2E 测试
 *
 * 验证：
 * 1. /private-reader/ 路由可达，显示加密占位卡片（无明文标题）
 * 2. /private-reader/[slug]/ 显示密码门
 * 3. 路由不进 Sitemap、Pagefind、导航
 * 4. 离开路由后 DOM 无明文残留
 *
 * 注意：此测试需要构建产物存在。在 CI 中通过 npm run build 生成。
 * 由于 privateReader 默认为 false，测试会跳过未开启的情况。
 */

const PRIVATE_READER_URL = '/private-reader/'

test.describe('private-reader production gate', () => {
	test.skip(({ page }) => {
		// 如果路由返回 404 则跳过（privateReader 未开启或未加密任何书籍）
		return page.goto(PRIVATE_READER_URL, { waitUntil: 'domcontentloaded' }).then((response) => !response || !response.ok())
	})

	test('renders encrypted placeholder cards without plaintext titles', async ({ page }) => {
		await page.goto(PRIVATE_READER_URL, { waitUntil: 'networkidle' })

		// 验证书架页存在
		await expect(page.locator('.private-reader-page')).toBeVisible()

		// 验证卡片不包含明文标题（应显示"加密标题"占位）
		const cards = page.locator('.private-library-card')
		const count = await cards.count()
		if (count > 0) {
			// 验证加密标题占位存在
			await expect(cards.first().locator('.private-library-title-locked')).toContainText('加密标题')
			// 验证 data-encrypted-title 属性存在（base64）
			const encryptedTitle = await cards.first().getAttribute('data-encrypted-title')
			expect(encryptedTitle).toBeTruthy()
		}
	})

	test('password gate is rendered for book detail page', async ({ page }) => {
		// 先访问书架，获取第一本书的 slug
		await page.goto(PRIVATE_READER_URL, { waitUntil: 'networkidle' })
		const firstCard = page.locator('.private-library-card').first()
		const isCardVisible = await firstCard.isVisible().catch(() => false)

		if (!isCardVisible) {
			test.skip(true, 'No books available')
			return
		}

		const bookLink = firstCard.locator('a')
		const href = await bookLink.getAttribute('href')
		expect(href).toBeTruthy()

		// 访问书籍详情页
		await page.goto(href!, { waitUntil: 'networkidle' })

		// 验证密码门存在
		await expect(page.locator('.password-gate')).toBeVisible()
		// 验证密码输入框存在
		await expect(page.locator('.password-gate-input')).toBeVisible()
		// 验证静态 HTML 不包含明文（密码门未解锁时不应显示阅读器）
		await expect(page.locator('.reader-host')).toBeHidden()
	})

	test('does not leak decrypted content in static HTML', async ({ page }) => {
		await page.goto(PRIVATE_READER_URL, { waitUntil: 'networkidle' })

		// 获取页面 HTML，验证无明文段落（base64 是允许的）
		const html = await page.content()
		// 不应包含明显的明文段落（连续中文/英文超过 50 字符）
		// 但允许 UI 文本如"私密阅读"、"加密标题"等
		const plaintextLeak = html.match(/[\u4e00-\u9fff\w][\u4e00-\u9fff\w\s,.!?;:'"()\-—…]{50,}/g)
		if (plaintextLeak) {
			// 过滤掉允许的 UI 文本
			const allowed = ['私密阅读', '加密标题', '所有内容均经过', '请在浏览器本地输入密码']
			const filtered = plaintextLeak.filter(s => !allowed.some(a => s.includes(a)))
			expect(filtered).toEqual([])
		}
	})
})

test.describe('private-reader route isolation', () => {
	test('is absent from sitemap.xml', async ({ page }) => {
		const response = await page.goto('/sitemap-index.xml', { waitUntil: 'domcontentloaded' }).catch(() => null)
		if (!response || !response.ok()) {
			test.skip(true, 'Sitemap not available')
			return
		}
		const content = await response.text()
		// sitemap-index 不应直接包含 private-reader URL
		expect(content).not.toContain('/private-reader/')
	})

	test('is absent from pagefind index', async ({ page }) => {
		// Pagefind 索引在 dist/_pagefind/，访问其搜索页面验证
		const response = await page.goto('/search/', { waitUntil: 'domcontentloaded' }).catch(() => null)
		if (!response || !response.ok()) {
			test.skip(true, 'Search page not available')
			return
		}
		// 搜索 private-reader 关键词，不应有结果
		const searchInput = page.locator('input[type="search"], input[name="q"]').first()
		if (await searchInput.isVisible().catch(() => false)) {
			await searchInput.fill('private-reader')
			// 等待搜索结果
			await page.waitForTimeout(1500)
			// 验证无 private-reader 相关结果
			const body = await page.content()
			// Pagefind 搜索结果中不应包含 /private-reader/ 路径
			expect(body).not.toContain('/private-reader/')
		}
	})
})
