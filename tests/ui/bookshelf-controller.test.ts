// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { applyBookshelfSearch, pickRandomBookshelfUrl } from "../../src/utils/bookshelf-controller";

afterEach(() => { document.body.innerHTML = ""; });

describe("bookshelf controller", () => {
	it("filters cards and empty categories", () => {
		document.body.innerHTML = `<section data-bookshelf-category><article data-bookshelf-card data-search-text="motor control"><a class="bookshelf-link" href="/bookshelf/motor/"></a></article><article data-bookshelf-card data-search-text="power electronics"><a class="bookshelf-link" href="/bookshelf/power/"></a></article></section>`;
		applyBookshelfSearch(document, "power");
		const cards = document.querySelectorAll<HTMLElement>("[data-bookshelf-card]");
		expect(cards[0]?.classList.contains("hidden-by-search")).toBe(true);
		expect(cards[1]?.classList.contains("hidden-by-search")).toBe(false);
		expect(document.querySelector("[data-bookshelf-category]")?.classList.contains("hidden-by-search")).toBe(false);
	});

	it("returns a real visible book URL", () => {
		document.body.innerHTML = `<article data-bookshelf-card class="hidden-by-search"><a class="bookshelf-link" href="/bookshelf/hidden/"></a></article><article data-bookshelf-card><a class="bookshelf-link" href="/bookshelf/visible/"></a></article>`;
		expect(pickRandomBookshelfUrl(document, () => 0)).toContain("/bookshelf/visible/");
	});

	it("combines category and search filters", () => {
		document.body.innerHTML = `<button class="active" data-bookshelf-filter="Control"></button><section data-bookshelf-category="Control"><article data-bookshelf-card data-search-text="motor control"><a class="bookshelf-link" href="/bookshelf/motor/"></a></article></section><section data-bookshelf-category="Power"><article data-bookshelf-card data-search-text="power electronics"><a class="bookshelf-link" href="/bookshelf/power/"></a></article></section>`;
		applyBookshelfSearch(document, "motor");
		const categories = document.querySelectorAll<HTMLElement>("[data-bookshelf-category]");
		expect(categories[0]?.classList.contains("hidden-by-filter")).toBe(false);
		expect(categories[1]?.classList.contains("hidden-by-filter")).toBe(true);
		expect(pickRandomBookshelfUrl(document, () => 0)).toContain("/bookshelf/motor/");
	});
});
