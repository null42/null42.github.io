export interface HomeLink {
	label: string;
	href: string;
	description: string;
}

export interface HomeMetric {
	value: string;
	label: string;
	detail: string;
}

export const homeConfig = {
	brand: "null42",
	eyebrow: "ENGINEERING KNOWLEDGE BASE / 2026",
	title: "把复杂系统，拆成可验证的知识。",
	description:
		"面向嵌入式系统、电机控制、电源技术与工程实践的中文知识库。记录推导、实验、故障与可复用的方法。",
	ticker: ["确定性优先", "证据驱动", "持续校正", "面向真实工程"],
	links: [
		{ label: "进入文章", href: "/list/", description: "按时间与主题浏览全部公开笔记" },
		{ label: "探索知识地图", href: "/knowledge/", description: "沿栏目、路线与阶段建立学习路径" },
	],
	metrics: [
		{ value: "04", label: "核心方向", detail: "嵌入式 · 电机 · 电源 · 工程实践" },
		{ value: "100%", label: "静态交付", detail: "Astro SSG 与可复现构建" },
		{ value: "4-L", label: "知识层级", detail: "栏目 → 路线 → 阶段 → 文章" },
	],
	display: {
		kicker: "SYSTEMATIC LEARNING",
		title: "从现象到根因，从笔记到体系。",
		description: "每条路线都强调边界条件、测试证据与可追溯结论，让知识真正服务于设计、调试和交付。",
		cards: [
			{ code: "MOTOR", title: "电机控制", text: "从调制、采样和坐标变换走向可验证的控制系统。", href: "/categories/" },
			{ code: "POWER", title: "电源技术", text: "关注拓扑、环路、器件应力与真实测量之间的联系。", href: "/categories/" },
			{ code: "SYSTEM", title: "嵌入式系统", text: "以确定性、可靠性和软硬协同组织工程实践。", href: "/knowledge/" },
		],
	},
	media: {
		hero: "/images/home/home-01.webp",
		data: "/images/home/home-02.svg",
		display: "/images/home/home-03.svg",
	},
} as const;
