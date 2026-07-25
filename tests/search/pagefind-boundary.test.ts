import fs, { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { exportAstroContent } from "../../scripts/astro/export-content";
import { decideVisibility } from "../../scripts/kb/domain/normalize-article";

const read = (path: string) => readFileSync(path, "utf8");

describe("Pagefind visibility boundary", () => {
	it("keeps a production verifier for private Pagefind exclusion", () => {
		const verifier = read("scripts/security/verify-hidden-production.ts");

		expect(verifier).toContain("PRIVATE_PRODUCTION_BODY_SENTINEL");
		expect(verifier).toContain("Private source generated an HTML route");
		expect(verifier).toContain("Private content leaked into Pagefind output");
		expect(verifier).toContain("PUBLIC_PRODUCTION_SEARCH_SENTINEL");
		expect(verifier).toContain("pagefind.search");
		expect(verifier).toContain("new FailureCollector()");
	});

	it("excludes the entire encrypted article page from indexing", () => {
		const html = read("dist/posts/encrypted/demo/index.html");

		expect(html).toContain('data-pagefind-ignore="all"');
		expect(html).not.toContain("data-pagefind-body");
		expect(html).toContain('content="noindex, nofollow"');
		expect(html).not.toContain('"@type":"BlogPosting"');
	});

	it("excludes hidden direct-link articles from Pagefind without removing their route", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "pagefind-hidden-route-"));
		fs.mkdirSync(path.join(root, "content", "blog"), { recursive: true });
		fs.writeFileSync(path.join(root, "content", "blog", "hidden.md"), "---\ntitle: Hidden Contract\ndate: 2026-07-01\nvisibility: hidden\n---\n\nHIDDEN_DIRECT_BODY", "utf8");
		await exportAstroContent({ rootDir: root });
		const generated = read(path.join(root, "src", "content", "posts", "blog", "hidden.md"));
		const markdownComponent = read("src/components/common/Markdown.astro");
		const postTemplate = read("src/pages/posts/[...slug].astro");
		const hidden = decideVisibility("hidden");

		expect(generated).toContain("HIDDEN_DIRECT_BODY");
		expect(hidden).toMatchObject({ html: true, pagefind: false, sitemap: false, jsonLd: false, publicSurface: "excluded" });
		expect(markdownComponent).toContain("data-pagefind-body={pagefindBody ? true : undefined}");
		expect(postTemplate.match(/pagefindBody={!pagefindExcluded}/g)).toHaveLength(2);
	});
});
