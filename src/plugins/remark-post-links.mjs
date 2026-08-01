// biome-ignore lint/suspicious/noShadowRestrictedNames: <remark plugin>
import path from "node:path";
import { visit } from "unist-util-visit";

/**
 * 修正文章正文里手写的 .md 相对链接，避免大小写不匹配导致 404。
 *
 * 背景：源文件名使用大写（如 ALG-01-FOC-Theory.md），Astro 生成的页面 URL 是小写
 * （/posts/motor/algorithm/alg-01-foc-theory/），但 markdown 里的相对链接 .md
 * 被 Astro 转换后会保留原始大小写，导致链接指向不存在的大写 URL。
 *
 * 本插件在 remark 阶段把指向 posts 内容的 .md 相对链接解析为小写的 /posts/ 绝对 URL，
 * 同时也处理已经被解析成 /posts/ 但保留大写的链接。anchor 和 query 保留原样。
 *
 * @returns {(tree: import("mdast").Root, vfile: import("vfile").VFile) => void} remark transformer
 */
export function remarkPostLinks() {
	// src/content/posts 是 content collection 的加载根目录
	const postsRoot = path.resolve(process.cwd(), "src/content/posts");

	return (tree, vfile) => {
		const currentPath = vfile?.path;
		// 没有当前文件路径时无法解析相对链接，仅做 /posts/ 链接的小写化
		const currentDir = currentPath ? path.dirname(currentPath) : "";

		visit(tree, "link", (node) => {
			const raw = node.url;
			if (typeof raw !== "string" || !raw) return;

			// 拆分 path / search / hash 三段，后续只小写化 path 部分
			let pathname = raw;
			let search = "";
			let hash = "";
			const hashIdx = pathname.indexOf("#");
			if (hashIdx >= 0) {
				hash = pathname.slice(hashIdx);
				pathname = pathname.slice(0, hashIdx);
			}
			const searchIdx = pathname.indexOf("?");
			if (searchIdx >= 0) {
				search = pathname.slice(searchIdx);
				pathname = pathname.slice(0, searchIdx);
			}

			// 情况一：已经是 /posts/ 开头的绝对链接（Astro 解析后的结果），仅小写化 path
			if (pathname.startsWith("/posts/")) {
				node.url = `${pathname.toLowerCase()}${search}${hash}`;
				return;
			}

			// 情况二：.md 相对链接（同目录或跨目录），解析成 /posts/ 小写 URL
			// 只处理以 .md 结尾的 path（不含协议、不以 / 开头）
			if (!pathname.endsWith(".md") || pathname.startsWith("/")) return;
			if (!currentDir) return;

			const targetAbs = path.resolve(currentDir, pathname);
			const rel = path.relative(postsRoot, targetAbs);
			// 目标不在 posts 内容目录内时不处理（避免误伤指向非文章 .md 的链接）
			if (rel.startsWith("..") || path.isAbsolute(rel)) return;

			const slug = rel.replace(/\.md$/i, "").toLowerCase();
			node.url = `/posts/${slug}/${search}${hash}`;
		});
	};
}
