import fs from "node:fs";
import path from "node:path";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function rehypeSourcePageFallback() {
	return (tree, file) => {
		visit(tree, "element", (node, index, parent) => {
			if (node.tagName !== "img" || !parent || typeof index !== "number") return;
			const src = typeof node.properties?.src === "string" ? node.properties.src : "";
			if (!src.includes("page-snapshots/")) return;
			const sourcePath = resolveSourcePagePath(src, file?.path);
			if (sourcePath && fs.existsSync(sourcePath)) return;
			const page = src.match(/page-(\d+)\.png/i)?.[1] || "?";
			const alt = typeof node.properties?.alt === "string" ? node.properties.alt : `源页 p.${page}`;
			parent.children[index] = h("aside.source-page-fallback", { dataSourcePage: page }, [
				h("span.source-page-fallback__number", `P.${page}`),
				h("div", [
					h("strong", alt),
					h("p", "原教材页图未包含在仓库中，正文译文与页码锚点已保留。将原 PDF 放入本地源目录后可运行快照生成命令恢复真实页图。"),
				]),
			]);
		});
	};
}

export function resolveSourcePagePath(src, filePath) {
	if (!src || /^(?:data:|https?:)/i.test(src)) return null;
	let decoded = src;
	try { decoded = decodeURIComponent(src); } catch {}
	if (/^\/+content\//.test(decoded)) {
		return path.resolve("content", decoded.replace(/^\/+content\//, ""));
	}
	if (filePath) return path.resolve(path.dirname(filePath), decoded);
	return path.resolve("content", decoded.replace(/^\/+/, ""));
}
