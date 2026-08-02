import { visit } from "unist-util-visit";

/**
 * 为文章正文中的内部 /posts/ 链接添加 data-split-target 属性，
 * 供客户端脚本渲染"双开"按钮使用。
 *
 * 仅处理以 /posts/ 开头的 href，跳过外部链接、锚点和非文章链接。
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

			// 只处理 /posts/ 开头的内部文章链接
			if (!href.startsWith("/posts/")) return;

			// 跳过已带 data-split-target 的链接（幂等）
			if (node.properties.dataSplitTarget) return;

			// 提取目标 slug：去掉 /posts/ 前缀和尾部 /
			// 例：/posts/motor/algorithm/alg-01-foc-theory/ → motor/algorithm/alg-01-foc-theory
			let slug = href.slice("/posts/".length);
			if (slug.endsWith("/")) slug = slug.slice(0, -1);

			// 跳过空 slug
			if (!slug) return;

			node.properties.dataSplitTarget = slug;
		});
	};
}
