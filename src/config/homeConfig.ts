export interface HomeConfig {
	brand: string;
	eyebrow: string;
	title: string;
	description: string;
	ticker: readonly string[];
	links: readonly { label: string; href: string; description: string }[];
	heroHud: {
		dialogue: readonly { speaker: string; text: string }[];
	};
	display: {
		kicker: string;
		title: string;
		description: string;
		cards: readonly { code: string; title: string; text: string; href: string }[];
	};
	shutter: {
		eyebrow: string;
		title: string;
		description: string;
		items: readonly { label: string; href: string; image: string }[];
	};
	latest: { eyebrow: string; title: string; description: string; allLabel: string };
	labels: { heroActions: string; ticker: string; heroIndex: string; dataKicker: string; dataTitle: string };
	media: Record<"hero" | "data" | "display", { src: string; alt: string; width: number; height: number }>;
}

export const homeConfig = {
	brand: "null42",
	eyebrow: "ENGINEERING KNOWLEDGE BASE / 2026",
	title: "把复杂系统，拆成可验证的知识。",
	description: "面向嵌入式系统、电机控制、电源技术与工程实践的中文知识库。记录推导、实验、故障与可复用的方法。",
	ticker: ["确定性优先", "证据驱动", "持续校正", "面向真实工程"],
	links: [
		{ label: "进入文章", href: "/list/", description: "按时间与主题浏览全部公开笔记" },
		{ label: "探索知识地图", href: "/knowledge/", description: "沿栏目、路线与阶段建立学习路径" },
	],
	heroHud: {
		dialogue: [
			{ speaker: "null42", text: "欢迎来到工程知识库。这里不追求堆砌答案，而是把复杂系统拆成可验证的路径。" },
			{ speaker: "Firefly", text: "你可以从文章索引开始，也可以沿知识地图逐级查看栏目、路线、阶段与文章。" },
			{ speaker: "null42", text: "每个结论都尽量保留边界条件、测试证据和可复现过程。准备好后，我们继续向下。" },
		],
	},
	display: {
		kicker: "SYSTEMATIC LEARNING", title: "从现象到根因，从笔记到体系。",
		description: "每条路线都强调边界条件、测试证据与可追溯结论，让知识真正服务于设计、调试和交付。",
		cards: [
			{ code: "MOTOR", title: "电机控制", text: "从调制、采样和坐标变换走向可验证的控制系统。", href: "/categories/" },
			{ code: "POWER", title: "电源技术", text: "关注拓扑、环路、器件应力与真实测量之间的联系。", href: "/categories/" },
			{ code: "SYSTEM", title: "嵌入式系统", text: "以确定性、可靠性和软硬协同组织工程实践。", href: "/knowledge/" },
		],
	},
	shutter: {
		eyebrow: "KNOWLEDGE IN MOTION",
		title: "从一条问题线索，展开完整工程路径。",
		description: "每一扇视窗都连接真实站内内容；移动端自动降级为清晰、可点击的专题卡片。",
		items: [
			{ label: "知识地图", href: "/knowledge/", image: "/images/home/home-02.svg" },
			{ label: "文章索引", href: "/list/", image: "/images/home/home-03.svg" },
		],
	},
	latest: {
		eyebrow: "LATEST NOTES",
		title: "最近整理的公开内容",
		description: "从 content/ 的规范公开文章中构建，不维护第二份首页文章数据。",
		allLabel: "查看全部文章",
	},
	labels: { heroActions: "首页主要入口", ticker: "知识库原则", heroIndex: "00 — 01", dataKicker: "DATA / PRACTICE / TRACEABILITY", dataTitle: "用可检查的数据描述知识库" },
	media: {
		hero: { src: "/assets/images/firefly-v22/home-hero.webp", alt: "花树下的 Firefly 角色主视觉", width: 2560, height: 1724 },
		data: { src: "/images/home/home-02.svg", alt: "知识层级与工程数据视觉图", width: 1600, height: 900 },
		display: { src: "/images/home/home-03.svg", alt: "null42 系统化学习路线视觉图", width: 1600, height: 900 },
	},
} as const satisfies HomeConfig;
