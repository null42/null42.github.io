export type KnowledgeArticleLink = { articleId: string; title: string; slug?: string };
export type KnowledgeNavigationTree = Array<{ id: string; title?: string; routes: Array<{ id: string; title?: string; stages: Array<{ id: string; title?: string; articles: KnowledgeArticleLink[] }> }> }>;

export type ArticleHierarchy = {
	sectionId: string;
	routeId: string;
	stageId: string;
	articleId: string;
	sectionTitle?: string;
	routeTitle?: string;
	stageTitle?: string;
};

/**
 * 在 navigation tree 中根据 slug（entry.id 去扩展名）反查文章的层级信息。
 * 用于 frontmatter 未显式声明 sectionId/routeId/stageId/articleId 的迁移文章，
 * 使其也能获得知识树侧边栏、面包屑与上下篇导航。
 */
export function findArticleHierarchy(tree: KnowledgeNavigationTree, slug: string): ArticleHierarchy | undefined {
	for (const section of tree) {
		for (const route of section.routes) {
			for (const stage of route.stages) {
				for (const article of stage.articles) {
					if (article.slug === slug || article.articleId === slug) {
						return {
							sectionId: section.id,
							routeId: route.id,
							stageId: stage.id,
							articleId: article.articleId,
							sectionTitle: section.title,
							routeTitle: route.title,
							stageTitle: stage.title,
						};
					}
				}
			}
		}
	}
	return undefined;
}

export function getStagePostNavigation(tree: KnowledgeNavigationTree, sectionId: string, routeId: string, stageId: string, articleId: string) {
	const articles = tree.find((section) => section.id === sectionId)?.routes.find((route) => route.id === routeId)?.stages.find((stage) => stage.id === stageId)?.articles || [];
	const index = articles.findIndex((article) => article.articleId === articleId);
	return { previous: index > 0 ? articles[index - 1] : undefined, next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined };
}
