import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import rehypeSourcePageFallback, { resolveSourcePagePath } from "../../src/plugins/rehype-source-page-fallback.mjs";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

describe("source page fallback", () => {
	it("resolves snapshot paths relative to the Markdown source file", () => {
		const filePath = path.resolve("content/power/fundamentals-work/chunks/001-preface.md");
		expect(resolveSourcePagePath("../assets/page-snapshots/chapter-preface/page-7.png", filePath))
			.toBe(path.resolve("content/power/fundamentals-work/assets/page-snapshots/chapter-preface/page-7.png"));
	});

	it("replaces a missing snapshot image with an explicit fallback card", () => {
		const tree: any = {
			type: "root",
			children: [{ type: "element", tagName: "img", properties: { src: "../assets/page-snapshots/chapter/page-42.png", alt: "source page" }, children: [] }],
		};
		rehypeSourcePageFallback()(tree, { path: path.resolve("content/power/fundamentals-work/chunks/example.md") });
		expect(tree.children[0].tagName).toBe("aside");
		expect(tree.children[0].properties.dataSourcePage).toBe("42");
	});

	it("keeps a snapshot image when the source file exists", () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "source-page-"));
		temporaryDirectories.push(directory);
		const articlePath = path.join(directory, "chunks", "article.md");
		const imagePath = path.join(directory, "assets", "page-snapshots", "chapter", "page-1.png");
		fs.mkdirSync(path.dirname(imagePath), { recursive: true });
		fs.mkdirSync(path.dirname(articlePath), { recursive: true });
		fs.writeFileSync(imagePath, "png");
		const tree: any = {
			type: "root",
			children: [{ type: "element", tagName: "img", properties: { src: "../assets/page-snapshots/chapter/page-1.png" }, children: [] }],
		};
		rehypeSourcePageFallback()(tree, { path: articlePath });
		expect(tree.children[0].tagName).toBe("img");
	});
});
