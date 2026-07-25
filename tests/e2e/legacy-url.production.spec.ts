import fs from "node:fs";
import { expect, test } from "@playwright/test";

type RouteEntry = {
	path: string;
	kind: "astro" | "compatibility" | "removed";
	expectedStatus: number;
	finalUrl: string;
};

const manifest = JSON.parse(fs.readFileSync("reports/route-manifest.json", "utf8")) as { routes: RouteEntry[] };
const legacyPath = "/content/power/getting-started.html";
const legacyRoute = manifest.routes.find((route) => route.path === legacyPath);

test.describe("production legacy URL acceptance", () => {
	test("transfers an existing anchor to the final URL", async ({ page }) => {
		expect(legacyRoute).toMatchObject({ kind: "compatibility", expectedStatus: 200 });
		const validAnchor = encodeURIComponent("电源学习地图");

		const response = await page.goto(`${legacyPath}#${validAnchor}`);

		expect(response?.status()).toBe(legacyRoute?.expectedStatus);
		await expect(page).toHaveURL(`${legacyRoute?.finalUrl}#${validAnchor}`);
		await expect(page.locator('[id="电源学习地图"]')).toBeAttached();
	});

	test("lands safely when the transferred anchor does not exist", async ({ page }) => {
		expect(legacyRoute).toMatchObject({ kind: "compatibility", expectedStatus: 200 });
		const missingAnchor = "missing-legacy-anchor";

		await page.goto(`${legacyPath}#${missingAnchor}`);

		await expect(page).toHaveURL(`${legacyRoute?.finalUrl}#${missingAnchor}`);
		await expect(page.locator("main")).toBeVisible();
		await expect(page.locator(`#${missingAnchor}`)).toHaveCount(0);
	});

	test("keeps a clickable target when JavaScript is disabled", async ({ browser }) => {
		expect(legacyRoute).toMatchObject({ kind: "compatibility", expectedStatus: 200 });
		const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:4321" });
		const page = await context.newPage();
		await page.route(legacyPath, async (route) => {
			const response = await route.fetch();
			const body = (await response.text()).replace(/<meta http-equiv="refresh"[^>]*>/i, "");
			await route.fulfill({ response, body });
		});

		await page.goto(legacyPath);
		const fallback = page.locator(`a[href="${legacyRoute?.finalUrl}"]`);
		await expect(fallback).toBeVisible();
		await fallback.click();
		await expect(page).toHaveURL(legacyRoute?.finalUrl ?? "");

		await context.close();
	});
});
