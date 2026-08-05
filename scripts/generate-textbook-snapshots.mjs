import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const sourcePdf = process.env.TEXTBOOK_PDF || path.join(root, "env", "sources", "Fundamentals of Power Electronics 3rd Edition.pdf");
const chunksDir = path.join(root, "content", "power", "fundamentals-work", "chunks");
const assetRoot = path.join(root, "content", "power", "fundamentals-work", "assets", "page-snapshots");

if (!fs.existsSync(sourcePdf)) {
	console.error(`Textbook PDF not found: ${sourcePdf}`);
	console.error("Set TEXTBOOK_PDF to the local Fundamentals of Power Electronics 3rd Edition PDF path.");
	process.exit(1);
}

const references = new Map();
for (const file of fs.readdirSync(chunksDir).filter((name) => name.endsWith(".md"))) {
	const body = fs.readFileSync(path.join(chunksDir, file), "utf8");
	for (const match of body.matchAll(/\.\.\/assets\/page-snapshots\/([^/]+)\/page-(\d+)\.png/g)) {
		references.set(Number(match[2]), path.join(assetRoot, match[1], `page-${match[2]}.png`));
	}
}

const pages = [...references.keys()].sort((a, b) => a - b);
if (pages.length === 0) process.exit(0);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "null42-textbook-"));
try {
	const prefix = path.join(tempDir, "page");
	execFileSync("pdftoppm", ["-f", String(pages[0]), "-l", String(pages.at(-1)), "-r", "120", "-png", sourcePdf, prefix], { stdio: "inherit" });
	for (const page of pages) {
		const generated = `${prefix}-${page}.png`;
		const destination = references.get(page);
		if (!fs.existsSync(generated)) throw new Error(`Missing rendered page ${page}`);
		fs.mkdirSync(path.dirname(destination), { recursive: true });
		fs.copyFileSync(generated, destination);
	}
	console.log(`Generated ${pages.length} textbook page snapshots.`);
} finally {
	fs.rmSync(tempDir, { recursive: true, force: true });
}
