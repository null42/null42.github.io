export type ArticleVisibility = {
	draft?: boolean;
	hidden?: boolean;
	visibility?: "public" | "private" | "hidden" | "encrypted";
	encrypted?: boolean;
	password?: string;
	encryptedPayload?: string;
	description?: string;
};

export type ArticleIndexPresentation = "excluded" | "encrypted-placeholder" | "public-summary";

export function getArticleIndexPresentation(article: ArticleVisibility): ArticleIndexPresentation {
	if (article.draft === true || article.hidden === true || article.visibility === "private" || article.visibility === "hidden") return "excluded";
	if (article.visibility === "encrypted" || article.encrypted === true || Boolean(article.password) || Boolean(article.encryptedPayload)) return "encrypted-placeholder";
	return "public-summary";
}

export function isPublicArticle(article: ArticleVisibility): boolean {
	return getArticleIndexPresentation(article) !== "excluded";
}

export type ArticleHierarchyItem = { sectionId?: string; routeId?: string; stageId?: string };
export type ArticleIndexFilters = ArticleHierarchyItem & { scope?: "all" | "knowledge" | "other" };

export function filterArticleIndexItems<T extends ArticleHierarchyItem>(items: T[], filters: ArticleIndexFilters): T[] {
	return items.filter((item) => {
		const knowledge = Boolean(item.sectionId && item.routeId && item.stageId);
		if (filters.scope === "knowledge" && !knowledge) return false;
		if (filters.scope === "other" && knowledge) return false;
		if (filters.sectionId && item.sectionId !== filters.sectionId) return false;
		if (filters.routeId && item.routeId !== filters.routeId) return false;
		if (filters.stageId && item.stageId !== filters.stageId) return false;
		return true;
	});
}

export function normalizeArticleIndexFilters(filters: ArticleIndexFilters, hierarchy: ArticleHierarchyItem[]): ArticleIndexFilters {
	if (filters.scope === "other") return { scope: "other" };
	const normalized: ArticleIndexFilters = { scope: filters.scope || "all" };
	if (!filters.sectionId || !hierarchy.some((item) => item.sectionId === filters.sectionId)) return normalized;
	normalized.sectionId = filters.sectionId;
	if (!filters.routeId || !hierarchy.some((item) => item.sectionId === filters.sectionId && item.routeId === filters.routeId)) return normalized;
	normalized.routeId = filters.routeId;
	if (filters.stageId && hierarchy.some((item) => item.sectionId === filters.sectionId && item.routeId === filters.routeId && item.stageId === filters.stageId)) normalized.stageId = filters.stageId;
	return normalized;
}

export function parseArticleIndexFilters(search: string): ArticleIndexFilters {
	const params = new URLSearchParams(search);
	const scope = params.get("scope");
	if (scope === "other") return { scope: "other" };
	return { scope: scope === "knowledge" ? "knowledge" : "all", ...(params.get("section") ? { sectionId: params.get("section")! } : {}), ...(params.get("route") ? { routeId: params.get("route")! } : {}), ...(params.get("stage") ? { stageId: params.get("stage")! } : {}) };
}
