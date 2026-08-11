type BookshelfWindow = Window & typeof globalThis & {
	bookshelfController?: { dispose: () => void };
};

export function applyBookshelfSearch(documentRef: Document, queryValue: string): void {
	const query = queryValue.trim().toLocaleLowerCase();
	const activeFilter = documentRef.querySelector<HTMLElement>("[data-bookshelf-filter].active")?.dataset.bookshelfFilter || "all";
	const cards = [...documentRef.querySelectorAll<HTMLElement>("[data-bookshelf-card]")];
	for (const card of cards) {
		const text = (card.dataset.searchText || "").toLocaleLowerCase();
		card.classList.toggle("hidden-by-search", Boolean(query) && !text.includes(query));
	}
	for (const category of documentRef.querySelectorAll<HTMLElement>("[data-bookshelf-category]")) {
		const categoryName = category.dataset.bookshelfCategory || "";
		const matchesFilter = activeFilter === "all" || activeFilter === categoryName;
		category.classList.toggle("hidden-by-filter", !matchesFilter);
		for (const card of category.querySelectorAll<HTMLElement>("[data-bookshelf-card]")) {
			card.classList.toggle("hidden-by-filter", !matchesFilter);
		}
		const hasVisibleCard = Boolean(category.querySelector("[data-bookshelf-card]:not(.hidden-by-search):not(.hidden-by-filter)"));
		category.classList.toggle("hidden-by-search", !hasVisibleCard);
	}
}

export function pickRandomBookshelfUrl(documentRef: Document, random = Math.random): string | undefined {
	const links = [...documentRef.querySelectorAll<HTMLAnchorElement>("[data-bookshelf-card]:not(.hidden-by-search):not(.hidden-by-filter) .bookshelf-link")]
		.filter((link) => link.href);
	if (links.length === 0) return undefined;
	const index = Math.min(links.length - 1, Math.floor(Math.max(0, random()) * links.length));
	return links[index]?.href;
}

export function initBookshelfController({
	document: documentRef = document,
	window: windowRef = window as BookshelfWindow,
}: { document?: Document; window?: BookshelfWindow } = {}): { dispose: () => void } {
	if (windowRef.bookshelfController) return windowRef.bookshelfController;
	const controller = new AbortController();
	documentRef.addEventListener("input", (event) => {
		const input = event.target instanceof HTMLInputElement ? event.target.closest<HTMLInputElement>("[data-bookshelf-search]") : null;
		if (input) applyBookshelfSearch(documentRef, input.value);
	}, { signal: controller.signal });
	documentRef.addEventListener("click", (event) => {
		const filter = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-bookshelf-filter]") : null;
		if (filter) {
			documentRef.querySelectorAll("[data-bookshelf-filter]").forEach((item) => item.classList.remove("active"));
			filter.classList.add("active");
			const query = documentRef.querySelector<HTMLInputElement>("[data-bookshelf-search]")?.value || "";
			applyBookshelfSearch(documentRef, query);
			return;
		}
		const target = event.target instanceof Element ? event.target.closest("[data-bookshelf-random]") : null;
		if (!target) return;
		const url = pickRandomBookshelfUrl(documentRef);
		if (url) windowRef.location.assign(url);
	}, { signal: controller.signal });
	const lifecycle = {
		dispose() {
			controller.abort();
			if (windowRef.bookshelfController === lifecycle) delete windowRef.bookshelfController;
		},
	};
	windowRef.bookshelfController = lifecycle;
	return lifecycle;
}
