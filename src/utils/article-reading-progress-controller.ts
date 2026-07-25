export interface ArticleReadingProgressController {
	dispose: () => void;
}

declare global {
	interface Window {
		articleReadingProgressController?: ArticleReadingProgressController;
	}
}

export function syncArticleReadingProgress(): ArticleReadingProgressController | undefined {
	window.articleReadingProgressController?.dispose();
	const progress = document.querySelector<HTMLElement>("[data-article-reading-progress]");
	const article = document.querySelector<HTMLElement>("#content-wrapper article, #content-wrapper .prose, #content-wrapper");
	if (!progress || !article) return undefined;

	const value = progress.querySelector<HTMLElement>("[data-article-reading-progress-value]");
	const bar = progress.querySelector<HTMLElement>("[data-article-reading-progress-bar]");
	let frame = 0;

	const update = () => {
		frame = 0;
		const rect = article.getBoundingClientRect();
		const start = window.scrollY + rect.top - 96;
		const distance = Math.max(1, article.offsetHeight - window.innerHeight + 96);
		const percent = Math.round(Math.min(1, Math.max(0, (window.scrollY - start) / distance)) * 100);
		progress.setAttribute("aria-valuenow", String(percent));
		if (value) value.textContent = `${percent}%`;
		if (bar) bar.style.transform = `scaleX(${percent / 100})`;
	};
	const schedule = () => {
		if (!frame) frame = window.requestAnimationFrame(update);
	};
	window.addEventListener("scroll", schedule, { passive: true });
	window.addEventListener("resize", schedule, { passive: true });
	update();

	const controller: ArticleReadingProgressController = {
		dispose() {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			if (frame) window.cancelAnimationFrame(frame);
			if (window.articleReadingProgressController === controller) delete window.articleReadingProgressController;
		},
	};
	window.articleReadingProgressController = controller;
	return controller;
}
