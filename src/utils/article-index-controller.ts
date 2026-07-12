export type ArticleIndexController = {
	dispose: () => void;
	revealNextBatch: () => void;
};

type ArticleView = "list" | "grid";
const storageKey = "articleIndex.view";

function isView(value: string | null): value is ArticleView {
	return value === "list" || value === "grid";
}

export function initArticleIndex(root: ParentNode = document): ArticleIndexController | undefined {
	const index = root.querySelector<HTMLElement>("[data-article-index]");
	if (!index) return;
	index.dataset.enhanced = "true";
	const results = index.querySelector<HTMLElement>("[data-article-results]");
	const tabs = [...index.querySelectorAll<HTMLButtonElement>("[data-article-view]")];
	const items = [...index.querySelectorAll<HTMLElement>("[data-article-item]")];
	const sentinel = index.querySelector<HTMLElement>("[data-article-sentinel]");
	const batchSize = Math.max(1, Number(index.dataset.batchSize) || 48);
	let visibleCount = Math.min(batchSize, items.length);
	let observer: IntersectionObserver | undefined;

	const reveal = () => {
		items.forEach((item, itemIndex) => { item.hidden = itemIndex >= visibleCount; });
		if (sentinel) sentinel.hidden = visibleCount >= items.length;
	};
	const setView = (view: ArticleView, persist = true) => {
		results?.setAttribute("data-view", view);
		tabs.forEach((tab) => {
			const selected = tab.dataset.articleView === view;
			tab.setAttribute("aria-selected", String(selected));
			tab.tabIndex = selected ? 0 : -1;
		});
		if (persist) localStorage.setItem(storageKey, view);
	};
	const clickHandlers = tabs.map((tab) => {
		const handler = () => setView(tab.dataset.articleView as ArticleView);
		tab.addEventListener("click", handler);
		return handler;
	});
	const keydown = (event: KeyboardEvent) => {
		const current = tabs.indexOf(event.target as HTMLButtonElement);
		if (current < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
		const tab = tabs[next];
		setView(tab.dataset.articleView as ArticleView);
		tab.focus();
	};
	index.addEventListener("keydown", keydown);
	const saved = localStorage.getItem(storageKey);
	setView(isView(saved) ? saved : (index.dataset.defaultView === "grid" ? "grid" : "list"), false);
	reveal();
	if (sentinel && "IntersectionObserver" in window) {
		observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) controller.revealNextBatch(); });
		observer.observe(sentinel);
	}
	const controller: ArticleIndexController = {
		revealNextBatch() { visibleCount = Math.min(items.length, visibleCount + batchSize); reveal(); },
		dispose() {
		observer?.disconnect();
		index.removeEventListener("keydown", keydown);
		tabs.forEach((tab, tabIndex) => tab.removeEventListener("click", clickHandlers[tabIndex]));
		delete index.dataset.enhanced;
	},
	};
	return controller;
}
