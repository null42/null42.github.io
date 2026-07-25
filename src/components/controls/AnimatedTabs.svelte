<script lang="ts">
export let activeTab: "list" | "grid" = "list";
</script>

<div class="article-index__tabs" role="group" aria-label="文章视图">
	<span class="article-index__tab-indicator" aria-hidden="true"></span>
	<button type="button" aria-pressed={activeTab === "list"} aria-controls="article-results" data-article-view="list">列表</button>
	<button type="button" aria-pressed={activeTab === "grid"} aria-controls="article-results" data-article-view="grid">网格</button>
</div>

<style>
	.article-index__tabs { position: relative; display: inline-grid; grid-template-columns: repeat(2, minmax(4.5rem, 1fr)); padding: .25rem; border-radius: 999px; background: var(--card-bg); box-shadow: var(--shadow-sm); isolation: isolate; }
	.article-index__tab-indicator { position: absolute; z-index: -1; inset: .25rem auto .25rem .25rem; width: calc((100% - .5rem) / 2); border-radius: 999px; background: var(--primary); box-shadow: 0 .2rem .65rem color-mix(in srgb, var(--primary) 28%, transparent); transform: translateX(0); transition: transform .24s cubic-bezier(.2, .8, .2, 1); }
	.article-index__tabs:has(button[data-article-view="grid"][aria-pressed="true"]) .article-index__tab-indicator { transform: translateX(100%); }
	button { position: relative; min-width: 4.5rem; padding: .55rem 1rem; border-radius: 999px; color: var(--text-color); background: transparent; cursor: pointer; transition: color .18s ease; }
	button[aria-pressed="true"] { color: white; }
	button:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }
	@media (prefers-reduced-motion: reduce) { .article-index__tab-indicator, button { transition: none; } }
</style>
