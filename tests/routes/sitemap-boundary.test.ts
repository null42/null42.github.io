import fs, { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildNonIndexablePostPaths } from "../../scripts/astro/visibility-routes";

const read = (path: string) => readFileSync(path, "utf8");

describe("Sitemap visibility boundary", () => {
	it("derives hidden and encrypted exclusions from content visibility regardless of directory", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-visibility-"));
		fs.mkdirSync(path.join(root, "content", "mixed"), { recursive: true });
		fs.writeFileSync(path.join(root, "content", "mixed", "hidden.md"), "---\ntitle: Hidden\nvisibility: hidden\nslug: custom-hidden\n---\n");
		fs.writeFileSync(path.join(root, "content", "mixed", "secret.md"), "---\ntitle: Secret\nvisibility: encrypted\n---\n");
		fs.writeFileSync(path.join(root, "content", "mixed", "private.md"), "---\ntitle: Private\nvisibility: private\n---\n");
		fs.writeFileSync(path.join(root, "content", "mixed", "public.md"), "---\ntitle: Public\nvisibility: public\n---\n");
		expect([...(await buildNonIndexablePostPaths(root))].sort()).toEqual(["/posts/mixed/hidden/", "/posts/mixed/private/", "/posts/mixed/secret/"]);
	});

	it("fails closed when content declares an unknown visibility", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-invalid-visibility-"));
		fs.mkdirSync(path.join(root, "content", "mixed"), { recursive: true });
		fs.writeFileSync(path.join(root, "content", "mixed", "invalid.md"), "---\ntitle: Invalid\nvisibility: internal\n---\n");

		await expect(buildNonIndexablePostPaths(root)).rejects.toThrow(/unknown visibility: internal/);
	});

	it("uses inherited canonical visibility from the content adapter", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-inherited-visibility-"));
		fs.mkdirSync(path.join(root, "content", "mixed"), { recursive: true });
		fs.writeFileSync(path.join(root, "content", "mixed", ".category.yml"), "visibility: hidden\n");
		fs.writeFileSync(path.join(root, "content", "mixed", "inherited.md"), "---\ntitle: Inherited Hidden\nslug: inherited-hidden\n---\n");

		expect(await buildNonIndexablePostPaths(root)).toContain("/posts/mixed/inherited/");
	});

	it("uses the visibility-derived exclusion set in Astro sitemap config", () => {
		const config = read("astro.config.mjs");
		expect(config).toContain("buildNonIndexablePostPaths");
		expect(config).toMatch(/nonIndexablePostPaths\.has\(pathname\)/);
	});

	it("keeps encrypted wrapper routes out of the production sitemap", () => {
		const sitemap = read("dist/sitemap-0.xml");
		const rss = read("dist/rss.xml");
		expect(sitemap).not.toContain("/posts/encrypted/demo/");
		expect(sitemap).not.toContain("/posts/encrypted/worldbuilding/");
		expect(rss).not.toContain("加密演示文章");
		expect(rss).not.toContain("世界塑造");
	});

	it("marks encrypted wrappers noindex and omits article structured data", () => {
		const encryptedHtml = read("dist/posts/encrypted/demo/index.html");

		expect(encryptedHtml).toContain('<meta name="robots" content="noindex, nofollow">');
		expect(encryptedHtml).toContain('data-pagefind-ignore="all"');
		expect(encryptedHtml).not.toContain("data-pagefind-body");
		expect(encryptedHtml).not.toContain('"@type":"BlogPosting"');
		expect(encryptedHtml).not.toContain("2026-07-03");
	});

	it("keeps public knowledge surfaces discoverable", () => {
		const sitemap = read("dist/sitemap-0.xml");
		const publicHtml = read("dist/posts/power/getting-started/index.html");
		expect(sitemap).toContain("/knowledge/");
		expect(sitemap).toContain("/posts/power/getting-started/");
		expect(publicHtml).toContain("data-pagefind-body");
		expect(publicHtml).toContain('"@type":"BlogPosting"');
		expect(publicHtml).not.toContain('content="noindex, nofollow"');
		expect(fs.existsSync("dist/posts/private/index.html")).toBe(false);
	});
});
