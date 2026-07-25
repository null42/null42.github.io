<script lang="ts">
import AnimatedTabs from "@/components/controls/AnimatedTabs.svelte";

export type ArticleVirtualListPost = {
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
	tagLinks: Array<{ label: string; url: string }>;
	sectionId?: string;
	routeId?: string;
	stageId?: string;
};

export type ArticleVirtualListSection = { id: string; title: string };
export type ArticleVirtualListRoute = ArticleVirtualListSection & { sectionId: string };
export type ArticleVirtualListStage = ArticleVirtualListSection & { sectionId: string; routeId: string };

export let posts: ArticleVirtualListPost[] = [];
export let sections: ArticleVirtualListSection[] = [];
export let routes: ArticleVirtualListRoute[] = [];
export let stages: ArticleVirtualListStage[] = [];
export let batchSize = 48;

$: initialPosts = posts.slice(0, batchSize);
const serializedPosts = JSON.stringify(posts).replace(/</g, "\\u003c");

</script>

<section class="article-index" data-article-index data-default-view="list" data-batch-size={batchSize} aria-labelledby="article-index-title">
	<header class="article-index__header">
		<div id="article-index-title"><p class="article-index__eyebrow">Article Index</p><h2>文章列表</h2></div>
		<div class="article-index__tools"><AnimatedTabs activeTab="list" /><p aria-live="polite">共 <strong>{posts.length}</strong> 篇公开文章</p></div>
	</header>

	<form class="article-index__filters" data-article-filters aria-label="文章分类筛选">
		<label>范围<select data-article-scope><option value="all">全部文章</option><option value="knowledge">知识文章</option><option value="other">其他文章</option></select></label>
		<label>栏目<select data-article-section><option value="">全部栏目</option>{#each sections as section}<option value={section.id}>{section.title}</option>{/each}</select></label>
		<label>路线<select data-article-route disabled><option value="">全部路线</option>{#each routes as route}<option value={route.id} data-section-id={route.sectionId}>{route.title}</option>{/each}</select></label>
		<label>阶段<select data-article-stage disabled><option value="">全部阶段</option>{#each stages as stage}<option value={stage.id} data-section-id={stage.sectionId} data-route-id={stage.routeId}>{stage.title}</option>{/each}</select></label>
	</form>

	{#if posts.length === 0}<p class="article-index__empty" role="status">暂无公开文章</p>{/if}
	<ol id="article-results" class="article-index__results" data-article-results data-article-progressive-list data-view="list">
		{#each initialPosts as post, index (post.articleId)}
			<li data-article-item data-article-id={post.articleId} data-section-id={post.sectionId} data-route-id={post.routeId} data-stage-id={post.stageId}>
				<article class="article-index__card" data-pinned={post.pinned} data-encrypted={post.encrypted}>
					<a class="article-index__main-link" href={post.url}>
						<img class="article-index__cover" src={post.imageUrl} alt={post.imageAlt} width="640" height="400" loading={index === 0 ? "eager" : "lazy"} fetchpriority={index === 0 ? "high" : "auto"} decoding="async" />
						<div class="article-index__body">
							<div class="article-index__badges">{#if post.pinned}<span data-article-pinned>置顶</span>{/if}{#if post.encrypted}<span data-article-encrypted>加密</span>{/if}</div>
							<h2>{post.title}</h2><p class="article-index__description">{post.description}</p>
						</div>
					</a>
					<footer><time datetime={post.publishedIso}>{post.publishedText}</time>{#if post.category}<a href={post.categoryUrl}>{post.category}</a>{/if}{#each post.tagLinks.slice(0, 3) as tag}<a href={tag.url} data-article-tag>#{tag.label}</a>{/each}</footer>
				</article>
			</li>
		{/each}
	</ol>
	<textarea hidden data-article-data aria-hidden="true">{serializedPosts}</textarea>
	<p class="article-index__status" data-article-status aria-live="polite">当前显示 {initialPosts.length}，共 {posts.length}</p>
	<button class="article-index__load-more" type="button" data-article-load-more>加载更多</button>
	<div class="article-index__sentinel" data-article-sentinel aria-hidden="true">继续加载</div>

	<ol class="article-index__fallback" data-article-no-js>
		{#each posts as post (post.articleId)}
			<li data-encrypted={post.encrypted}>
				<a class="article-index__fallback-link" href={post.url}>
					<span>{post.title}</span>
					<time datetime={post.publishedIso}>{post.publishedText}</time>
					{#if post.encrypted}<small>加密</small>{/if}
				</a>
			</li>
		{/each}
	</ol>
</section>

<style>
	.article-index { display: grid; gap: 1rem; }
	.article-index__header, .article-index__tools { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
	.article-index__filters { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .75rem; padding: 1rem; border-radius: var(--radius-large); background: var(--card-bg); box-shadow: var(--shadow-sm); }
	.article-index__filters label { display: grid; gap: .35rem; color: var(--meta-color); font-size: .82rem; }
	.article-index__filters select { width: 100%; min-height: 2.5rem; padding: .45rem .65rem; border: 1px solid var(--line-color); border-radius: var(--radius-medium); color: var(--text-color); background: var(--page-bg); }
	.article-index__results { display: grid; gap: .8rem; margin: 0; padding: 0; list-style: none; }
	.article-index__results[data-view="grid"] { grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); }
	:global(.article-index__card) { height: 100%; overflow: hidden; border: 1px solid color-mix(in srgb, var(--line-color) 72%, transparent); border-radius: var(--radius-large); background: var(--card-bg); box-shadow: var(--shadow-sm); transition: transform .2s ease, box-shadow .2s ease; }
	:global(.article-index__card:hover) { transform: translateY(-2px); box-shadow: var(--shadow-md); }
	:global(.article-index__main-link) { display: flex; min-height: 9.5rem; padding: 1.15rem; color: inherit; text-decoration: none; align-items: stretch; gap: 1rem; }
	:global(.article-index__cover) { width: min(28%, 12rem); min-width: 8.5rem; aspect-ratio: 8 / 5; object-fit: cover; border-radius: var(--radius-large); background: var(--line-color); }
	:global(.article-index__body) { min-width: 0; flex: 1; }
	:global(.article-index__badges) { display: flex; min-height: 1.5rem; gap: .45rem; align-items: center; }
	:global(.article-index__badges span) { padding: .16rem .5rem; border-radius: 999px; color: var(--primary); background: color-mix(in srgb, var(--primary) 12%, transparent); font-size: .72rem; font-weight: 700; }
	:global(.article-index__badges [data-article-encrypted]) { color: #b45309; background: color-mix(in srgb, #f59e0b 16%, transparent); }
	:global(.article-index__card h2) { margin: 0 0 .45rem; font-size: 1.1rem; }
	:global(.article-index__card p) { display: -webkit-box; margin: 0; overflow: hidden; color: var(--meta-color); -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
	:global(.article-index__card footer) { display: flex; padding: 0 1.15rem 1.15rem; gap: .65rem; flex-wrap: wrap; color: var(--meta-color); font-size: .82rem; }
	:global(.article-index__card footer a) { color: inherit; text-decoration: none; }
	:global(.article-index__card footer a:hover) { color: var(--primary); }
	:global(.article-index__results[data-view="grid"] .article-index__main-link) { flex-direction: column; }
	:global(.article-index__results[data-view="grid"] .article-index__cover) { width: 100%; min-width: 0; }
	.article-index__empty { padding: 3rem 1rem; text-align: center; border-radius: var(--radius-large); background: var(--card-bg); }
	.article-index__sentinel { min-height: 1px; text-align: center; color: transparent; }
	.article-index:not([data-enhanced]) :global(.article-index__tabs), .article-index:not([data-enhanced]) .article-index__filters { display: none; }
	.article-index__fallback { display: grid; gap: .8rem; margin: 0; padding: 0; list-style: none; }
	.article-index__fallback-link { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: .75rem; min-height: 2.75rem; padding: .65rem .85rem; border: 1px solid var(--line-color); border-radius: var(--radius-medium); color: inherit; background: var(--card-bg); text-decoration: none; }
	.article-index__fallback-link time, .article-index__fallback-link small { color: var(--meta-color); font-size: .78rem; }
	:global(html.js .article-index:not([data-enhanced]) > :not([data-article-no-js])) { display: none !important; }
	:global(html.js .article-index[data-enhanced] .article-index__fallback) { display: none; }
	:global(html:not(.js)) .article-index > :not([data-article-no-js]) { display: none !important; }
	@media (max-width: 48rem) { .article-index__filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } :global(.article-index__main-link) { flex-direction: column; } :global(.article-index__cover) { width: 100%; min-width: 0; } .article-index__fallback-link { grid-template-columns: minmax(0, 1fr) auto; } .article-index__fallback-link small { grid-column: 2; } }
	@media (prefers-reduced-motion: reduce) { :global(.article-index__card) { transition: none; } :global(.article-index__card:hover) { transform: none; } }
</style>
