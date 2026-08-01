import katex from "katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import rehypeComponents from "rehype-components";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkAdmonitionToBlockquoteCallout from "remark-admonition-to-blockquote-callout";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { plantumlConfig, siteConfig } from "../config";
import { GithubCardComponent } from "./rehype-component-github-card.mjs";
import rehypeEmailProtection from "./rehype-email-protection.mjs";
import rehypeExternalLinks from "./rehype-external-links.mjs";
import rehypeFigure from "./rehype-figure.mjs";
import { rehypeMermaid } from "./rehype-mermaid.mjs";
import { rehypePlantuml } from "./rehype-plantuml.mjs";
import { parseDirectiveNode } from "./remark-directive-rehype.js";
import { remarkExcerpt } from "./remark-excerpt.js";
import { remarkImageGrid } from "./remark-image-grid.js";
import { remarkMermaid } from "./remark-mermaid.js";
import { remarkPlantuml } from "./remark-plantuml.js";
import { remarkPostLinks } from "./remark-post-links.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export function createSiteMarkdownProcessorOptions(): { remarkPlugins: any[]; rehypePlugins: any[] } {
	return {
		remarkPlugins: [
			...(siteConfig.post.rehypeCallouts.enablePythonMarkdownAdmonitions !== false
				? [remarkAdmonitionToBlockquoteCallout]
				: []),
			remarkMath,
			remarkReadingTime,
			remarkImageGrid,
			remarkExcerpt,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
			remarkMermaid,
			[remarkPlantuml, plantumlConfig],
			// 修正文章正文里 .md 相对链接的大小写，避免 404（放在末尾，确保其他插件先处理）
			remarkPostLinks,
		],
		rehypePlugins: [
			[rehypeKatex, { katex }],
			[rehypeCallouts, { theme: siteConfig.post.rehypeCallouts.theme }],
			rehypeSlug,
			rehypeMermaid,
			rehypePlantuml,
			rehypeFigure,
			[rehypeExternalLinks, { siteUrl: siteConfig.site_url }],
			[rehypeEmailProtection, { method: "base64" }],
			[rehypeComponents, { components: { github: GithubCardComponent } }],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: { className: ["anchor"] },
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [{ type: "text", value: "#" }],
					},
				},
			],
		],
	};
}
