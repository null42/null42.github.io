import { expect, test } from "@playwright/test";

test.describe("production Pagefind boundaries", () => {
	test("searches public Chinese hierarchy terms without exposing encrypted wrappers", async ({ page }) => {
		await page.goto("/search/?q=%E7%94%B5%E6%BA%90%E6%8E%A7%E5%88%B6%E5%85%A5%E5%8F%A3");
		await expect(page.locator('a[href="/posts/power/getting-started/"]')).toBeVisible();

		const input = page.locator('input[type="text"]');
		await input.fill("路线与索引");
		await expect(page.locator('a[href="/posts/power/getting-started/"]')).toBeVisible();

		await input.fill("加密演示文章");
		await expect(page.locator('main a[href^="/posts/encrypted/"]')).toHaveCount(0);
	});
});
