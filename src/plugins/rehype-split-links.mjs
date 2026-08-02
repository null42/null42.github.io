import { visit } from "unist-util-visit";

/**
 * 为文章正文中的内部文章链接添加 data-split-target 属性，
 * 供客户端脚本渲染"双开"按钮使用。
 *
 * 支持两种链接格式：
 * 1. /posts/<slug>/        — 博客原生路由（小写 slug）
 * 2. /content/<path>.html  — 迁移文章使用的旧链接格式（会被重定向到 /posts/）
 *
 * 不改变链接本身的行为（普通点击仍然跳转），仅附加数据属性。
 *
 * @returns {Function} rehype transformer
 */
export default function rehypeSplitLinks() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "a") return;

			const href = node.properties?.href;
			if (typeof href !== "string") return;

			// 跳过已带 data-split-target 的链接（幂等）
			if (node.properties.dataSplitTarget) return;

			let slug = null;

			if (href.startsWith("/posts/")) {
				// /posts/<slug>/ → <slug>
				slug = href.slice("/posts/".length);
				if (slug.endsWith("/")) slug = slug.slice(0, -1);
			} else if (href.startsWith("/content/") && href.endsWith(".html")) {
				// /content/motor/README.html → motor/readme
				// 去掉 /content/ 前缀和 .html 后缀，转为小写（路由是小写的）
				slug = href.slice("/content/".length, -5).toLowerCase();
			}

			// 跳过空 slug
			if (!slug) return;

			node.properties.dataSplitTarget = slug;
		});
	};
}
