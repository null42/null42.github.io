import { filterArticleIndexItems, normalizeArticleIndexFilters, parseArticleIndexFilters } from "./article-index";
import type { ArticleIndexFilters } from "./article-index";

export type ArticleIndexController = {
	dispose: () => void;
	revealNextBatch: () => void;
};

type SwupLike = { hooks: { on: (name: "content:replace", callback: () => void) => (() => void) | void } };

let activeLifecycle: { dispose: () => void } | undefined;

export function installArticleIndexLifecycle(swup?: SwupLike, root: ParentNode = document): { dispose: () => void } {
	activeLifecycle?.dispose();
	let controller = initArticleIndex(root);
	const refresh = () => {
		if (activeLifecycle !== lifecycle) return;
		controller?.dispose();
		controller = initArticleIndex(root);
	};
	const removeHook = swup?.hooks.on("content:replace", refresh);
	const lifecycle = {
		dispose() {
			if (activeLifecycle !== lifecycle) return;
			controller?.dispose();
			controller = undefined;
			removeHook?.();
			activeLifecycle = undefined;
		},
	};
	activeLifecycle = lifecycle;
	return lifecycle;
}

type ArticleView = "list" | "grid";
type ArticleTagLink = { label: string; url: string };
type VirtualArticle = {
	articleId: string;
	title: string;
	url: string;
	description: string;
	publishedIso: string;
	publishedText: string;
	imageUrl: string;
	imageAlt: string;
	pinned: boolean;
	encrypted: boolean;
	category: string;
	categoryUrl: string;
	tagLinks: ArticleTagLink[];
	sectionId?: string;
	routeId?: string;
	stageId?: string;
};
type DomArticle = { element: HTMLElement; sectionId?: string; routeId?: string; stageId?: string };
type ArticleIndexSourceItem = VirtualArticle | DomArticle;
const storageKey = "articleIndex.view";

function isView(value: string | null): value is ArticleView {
	return value === "list" || value === "grid";
}

function readStoredView(): ArticleView | null {
	try {
		const value = localStorage.getItem(storageKey);
		return isView(value) ? value : null;
	} catch {
		return null;
	}
}

function writeStoredView(view: ArticleView): void {
	try {
		localStorage.setItem(storageKey, view);
	} catch {
		// Storage is optional; the in-page view still updates.
	}
}

export function initArticleIndex(root: ParentNode = document): ArticleIndexController | undefined {
	const index = root.querySelector<HTMLElement>("[data-article-index]");
	if (!index) return;
	const results = index.querySelector<HTMLElement>("[data-article-results]");
	const viewButtons = [...index.querySelectorAll<HTMLButtonElement>("[data-article-view]")];
	const items = [...index.querySelectorAll<HTMLElement>("[data-article-item]")];
	const virtualPayload = parseVirtualArticles(index.querySelector<HTMLElement>("[data-article-data]")?.textContent);
	if (virtualPayload.present && (!virtualPayload.valid || !results)) return;
	const virtualArticles = virtualPayload.articles;
	const usesVirtualData = virtualPayload.present;
	const scopeSelect = index.querySelector<HTMLSelectElement>("[data-article-scope]");
	const sectionSelect = index.querySelector<HTMLSelectElement>("[data-article-section]");
	const routeSelect = index.querySelector<HTMLSelectElement>("[data-article-route]");
	const stageSelect = index.querySelector<HTMLSelectElement>("[data-article-stage]");
	const sentinel = index.querySelector<HTMLElement>("[data-article-sentinel]");
	const loadMore = index.querySelector<HTMLButtonElement>("[data-article-load-more]");
	const status = index.querySelector<HTMLElement>("[data-article-status]");
	const batchSize = Math.max(1, Number(index.dataset.batchSize) || 48);
	const sourceItems: ArticleIndexSourceItem[] = usesVirtualData
		? virtualArticles
		: items.map((element) => ({ element, sectionId: element.dataset.sectionId, routeId: element.dataset.routeId, stageId: element.dataset.stageId }));
	let visibleCount = Math.min(batchSize, sourceItems.length);
	let observer: IntersectionObserver | undefined;
	const lifecycleAbortController = new AbortController();
	const { signal: lifecycleSignal } = lifecycleAbortController;
	let filteredItems: ArticleIndexSourceItem[] = sourceItems;
	const hierarchy = sourceItems.map((item) => ({ sectionId: item.sectionId, routeId: item.routeId, stageId: item.stageId }));
	let filters = normalizeArticleIndexFilters(parseArticleIndexFilters(location.search), hierarchy);

	const renderProgressiveArticles = (reset = false) => {
		if (!usesVirtualData || !results) return;
		const targetItems = (filteredItems as VirtualArticle[]).slice(0, visibleCount);
		const renderedItems = [...results.querySelectorAll<HTMLElement>("[data-article-item]")];
		const prefixMatches = renderedItems.length <= targetItems.length && renderedItems.every((item, itemIndex) => item.dataset.articleId === targetItems[itemIndex]?.articleId);
		if (reset || !prefixMatches) {
			results.textContent = "";
			results.append(...targetItems.map((post, itemIndex) => renderVirtualArticle(post, itemIndex === 0)));
		} else if (renderedItems.length < targetItems.length) {
			results.append(...targetItems.slice(renderedItems.length).map((post) => renderVirtualArticle(post)));
		}
		results.dataset.articleProgressiveList = "true";
	};
	const reveal = (resetVirtual = false) => {
		if (usesVirtualData && results) {
			renderProgressiveArticles(resetVirtual);
		} else {
			const filteredElements = filteredItems as Array<{ element: HTMLElement }>;
			const filteredSet = new Set(filteredElements.map((item) => item.element));
			items.forEach((item) => {
				const itemIndex = filteredElements.findIndex((entry) => entry.element === item);
				item.hidden = !filteredSet.has(item) || itemIndex >= visibleCount;
			});
		}
		const complete = visibleCount >= filteredItems.length;
		if (sentinel) sentinel.hidden = complete;
		if (loadMore) loadMore.hidden = complete;
		if (status) status.textContent = `当前显示 ${Math.min(visibleCount, filteredItems.length)}，共 ${filteredItems.length}`;
	};
	const updateOptions = () => {
		for (const option of [...(routeSelect?.options || [])]) option.hidden = Boolean(option.value && filters.sectionId && option.dataset.sectionId !== filters.sectionId);
		for (const option of [...(stageSelect?.options || [])]) option.hidden = Boolean(option.value && ((filters.sectionId && option.dataset.sectionId !== filters.sectionId) || (filters.routeId && option.dataset.routeId !== filters.routeId)));
	};
	const syncControls = () => {
		if (scopeSelect) scopeSelect.value = filters.scope || "all";
		if (sectionSelect) sectionSelect.value = filters.sectionId || "";
		if (routeSelect) routeSelect.value = filters.routeId || "";
		if (stageSelect) stageSelect.value = filters.stageId || "";
		const disabled = filters.scope === "other";
		if (sectionSelect) sectionSelect.disabled = disabled;
		if (routeSelect) routeSelect.disabled = disabled || !filters.sectionId;
		if (stageSelect) stageSelect.disabled = disabled || !filters.routeId;
		updateOptions();
	};
	const syncUrl = () => {
		const params = new URLSearchParams();
		if (filters.scope && filters.scope !== "all") params.set("scope", filters.scope);
		if (filters.sectionId) params.set("section", filters.sectionId);
		if (filters.routeId) params.set("route", filters.routeId);
		if (filters.stageId) params.set("stage", filters.stageId);
		const query = params.toString();
		history.replaceState(history.state, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
	};
	const applyFilters = (persist = true) => {
		filters = normalizeArticleIndexFilters(filters, hierarchy);
		filteredItems = filterArticleIndexItems(sourceItems, filters);
		visibleCount = Math.min(batchSize, filteredItems.length);
		syncControls();
		if (persist) syncUrl();
		reveal(true);
	};
	const filterControls = [scopeSelect, sectionSelect, routeSelect, stageSelect].filter(Boolean) as HTMLSelectElement[];
	const changeFilters = () => {
		filters = {
			scope: (scopeSelect?.value || "all") as ArticleIndexFilters["scope"],
			...(sectionSelect?.value ? { sectionId: sectionSelect.value } : {}),
			...(routeSelect?.value ? { routeId: routeSelect.value } : {}),
			...(stageSelect?.value ? { stageId: stageSelect.value } : {}),
		};
		applyFilters();
	};
	filterControls.forEach((control) => control.addEventListener("change", changeFilters));
	const setView = (view: ArticleView, persist = true) => {
		results?.setAttribute("data-view", view);
		viewButtons.forEach((button) => {
			const selected = button.dataset.articleView === view;
			button.setAttribute("aria-pressed", String(selected));
		});
		if (persist) writeStoredView(view);
	};
	const clickHandlers = viewButtons.map((button) => {
		const handler = () => setView(button.dataset.articleView as ArticleView);
		button.addEventListener("click", handler);
		return handler;
	});
	const keydown = (event: KeyboardEvent) => {
		const current = viewButtons.indexOf(event.target as HTMLButtonElement);
		if (current < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		const next = event.key === "Home" ? 0 : event.key === "End" ? viewButtons.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + viewButtons.length) % viewButtons.length;
		const button = viewButtons[next];
		setView(button.dataset.articleView as ArticleView);
		button.focus();
	};
	index.addEventListener("keydown", keydown);
	const saved = readStoredView();
	setView(saved || (index.dataset.defaultView === "grid" ? "grid" : "list"), false);
	applyFilters(false);
	const revealNextBatch = () => {
		const previousVisibleCount = visibleCount;
		const shouldMoveFocus = document.activeElement === loadMore;
		if (usesVirtualData) {
			visibleCount = Math.min(filteredItems.length, visibleCount + batchSize);
			reveal();
		} else {
			visibleCount = Math.min(filteredItems.length, visibleCount + batchSize);
			reveal();
		}
		if (shouldMoveFocus && loadMore?.hidden) {
			const firstNewItem = usesVirtualData
				? results?.querySelectorAll<HTMLElement>("[data-article-item]")[previousVisibleCount]
				: (filteredItems[previousVisibleCount] as DomArticle | undefined)?.element;
			firstNewItem?.querySelector<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])")?.focus();
		}
	};
	loadMore?.addEventListener("click", revealNextBatch, { signal: lifecycleSignal });
	if (usesVirtualData) {
		if (sentinel && typeof window.IntersectionObserver === "function") {
			observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) revealNextBatch(); });
			observer.observe(sentinel);
		}
	} else if (sentinel && typeof window.IntersectionObserver === "function") {
		observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) revealNextBatch(); });
		observer.observe(sentinel);
	} else {
		visibleCount = sourceItems.length;
		reveal();
	}
	index.dataset.enhanced = "true";
	const controller: ArticleIndexController = {
		revealNextBatch,
		dispose() {
			lifecycleAbortController.abort();
			observer?.disconnect();
			loadMore?.removeEventListener("click", revealNextBatch);
			index.removeEventListener("keydown", keydown);
			viewButtons.forEach((button, buttonIndex) => button.removeEventListener("click", clickHandlers[buttonIndex]));
			filterControls.forEach((control) => control.removeEventListener("change", changeFilters));
		delete index.dataset.enhanced;
	},
	};
	return controller;
}

type VirtualArticlePayload = { present: boolean; valid: boolean; articles: VirtualArticle[] };

function parseVirtualArticles(value: string | null | undefined): VirtualArticlePayload {
	if (value == null) return { present: false, valid: true, articles: [] };
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return { present: true, valid: false, articles: [] };
		const articles: VirtualArticle[] = [];
		for (const item of parsed) {
			const article = normalizeVirtualArticle(item);
			if (!article) return { present: true, valid: false, articles: [] };
			articles.push(article);
		}
		return { present: true, valid: true, articles };
	} catch {
		return { present: true, valid: false, articles: [] };
	}
}

function normalizeVirtualArticle(value: unknown): VirtualArticle | null {
	if (!value || typeof value !== "object") return null;
	const item = value as Record<string, unknown>;
	const articleId = requiredText(item.articleId);
	const title = requiredText(item.title);
	const url = safeUrl(item.url);
	if (!articleId || !title || !url) return null;
	const tags = Array.isArray(item.tagLinks)
		? item.tagLinks.map(normalizeTagLink).filter((tag): tag is ArticleTagLink => Boolean(tag))
		: Array.isArray(item.tags)
			? item.tags.filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim())).map((tag) => ({ label: tag.trim(), url: `/archive/?tag=${encodeURIComponent(tag.trim())}` }))
			: [];
	return {
		articleId,
		title,
		url,
		description: optionalText(item.description) || "阅读文章详情",
		publishedIso: optionalText(item.publishedIso),
		publishedText: optionalText(item.publishedText),
		imageUrl: safeUrl(item.imageUrl),
		imageAlt: optionalText(item.imageAlt),
		pinned: item.pinned === true,
		encrypted: item.encrypted === true,
		category: optionalText(item.category),
		categoryUrl: safeUrl(item.categoryUrl),
		tagLinks: tags,
		...(optionalText(item.sectionId) ? { sectionId: optionalText(item.sectionId) } : {}),
		...(optionalText(item.routeId) ? { routeId: optionalText(item.routeId) } : {}),
		...(optionalText(item.stageId) ? { stageId: optionalText(item.stageId) } : {}),
	};
}

function normalizeTagLink(value: unknown): ArticleTagLink | null {
	if (!value || typeof value !== "object") return null;
	const item = value as Record<string, unknown>;
	const label = requiredText(item.label);
	const url = safeUrl(item.url);
	return label && url ? { label, url } : null;
}

function requiredText(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function safeUrl(value: unknown): string {
	if (typeof value !== "string") return "";
	const url = value.trim();
	return url.startsWith("/") || url.startsWith("https://") || url.startsWith("http://") ? url : "";
}

function renderVirtualArticle(post: VirtualArticle, priority = false): HTMLElement {
	const item = document.createElement("li");
	item.dataset.articleItem = "";
	if (post.sectionId) item.dataset.sectionId = post.sectionId;
	if (post.routeId) item.dataset.routeId = post.routeId;
	if (post.stageId) item.dataset.stageId = post.stageId;
	item.dataset.articleId = post.articleId;
	const article = document.createElement("article");
	article.className = "article-index__card";
	article.dataset.pinned = String(post.pinned);
	article.dataset.encrypted = String(post.encrypted);
	const link = document.createElement("a");
	link.className = "article-index__main-link";
	link.href = post.url;
	const cover = post.imageUrl ? document.createElement("img") : document.createElement("span");
	cover.className = "article-index__cover";
	if (cover instanceof HTMLImageElement) {
		cover.src = post.imageUrl;
		cover.alt = post.imageAlt;
		cover.width = 640;
		cover.height = 400;
		cover.loading = priority ? "eager" : "lazy";
		cover.fetchPriority = priority ? "high" : "auto";
		cover.decoding = "async";
	} else {
		cover.setAttribute("aria-hidden", "true");
	}
	const body = document.createElement("div");
	body.className = "article-index__body";
	const badges = document.createElement("div");
	badges.className = "article-index__badges";
	if (post.pinned) badges.append(createBadge("置顶", "data-article-pinned"));
	if (post.encrypted) badges.append(createBadge("加密", "data-article-encrypted"));
	const heading = document.createElement("h2");
	heading.textContent = post.title;
	const description = document.createElement("p");
	description.className = "article-index__description";
	description.textContent = post.description;
	body.append(badges, heading, description);
	const footer = document.createElement("footer");
	const time = document.createElement("time");
	time.dateTime = post.publishedIso;
	time.textContent = post.publishedText;
	footer.append(time);
	if (post.category && post.categoryUrl) footer.append(createMetaLink(post.category, post.categoryUrl));
	for (const tag of post.tagLinks.slice(0, 3)) {
		const tagLink = createMetaLink(`#${tag.label}`, tag.url);
		tagLink.setAttribute("data-article-tag", "");
		footer.append(tagLink);
	}
	link.append(cover, body);
	article.append(link, footer);
	item.append(article);
	return item;
}

function createBadge(value: string, attribute: string): HTMLSpanElement {
	const span = document.createElement("span");
	span.textContent = value;
	span.setAttribute(attribute, "");
	return span;
}

function createMetaLink(value: string, url: string): HTMLAnchorElement {
	const link = document.createElement("a");
	link.href = url;
	link.textContent = value;
	return link;
}
