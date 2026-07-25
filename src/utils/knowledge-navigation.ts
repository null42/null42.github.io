export type KnowledgeArticleLink = { articleId: string; title: string; slug?: string };
export type KnowledgeNavigationTree = Array<{ id: string; routes: Array<{ id: string; stages: Array<{ id: string; articles: KnowledgeArticleLink[] }> }> }>;

export function getStagePostNavigation(tree: KnowledgeNavigationTree, sectionId: string, routeId: string, stageId: string, articleId: string) {
	const articles = tree.find((section) => section.id === sectionId)?.routes.find((route) => route.id === routeId)?.stages.find((stage) => stage.id === stageId)?.articles || [];
	const index = articles.findIndex((article) => article.articleId === articleId);
	return { previous: index > 0 ? articles[index - 1] : undefined, next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined };
}
