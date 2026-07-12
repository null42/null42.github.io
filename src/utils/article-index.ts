export type ArticleVisibility = {
	draft?: boolean;
	hidden?: boolean;
	visibility?: "public" | "private" | "hidden";
};

/** Keep index eligibility independent from rendering so later content models can reuse it. */
export function isPublicArticle(article: ArticleVisibility): boolean {
	return article.draft !== true && article.hidden !== true && article.visibility !== "private" && article.visibility !== "hidden";
}
