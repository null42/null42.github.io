export type KnowledgeDrawerController = { dispose: () => void };
type SwupLike = { hooks: { on: (name: "content:replace", callback: () => void) => (() => void) | void } };
let activeLifecycle: { dispose: () => void } | undefined;

export function installKnowledgeDrawerLifecycle(swup?: SwupLike, root: ParentNode = document): { dispose: () => void } {
	activeLifecycle?.dispose();
	let controller = initKnowledgeDrawer(root);
	const refresh = () => { if (activeLifecycle !== lifecycle) return; controller?.dispose(); controller = initKnowledgeDrawer(root); };
	const removeHook = swup?.hooks.on("content:replace", refresh);
	const lifecycle = { dispose() { if (activeLifecycle !== lifecycle) return; controller?.dispose(); controller = undefined; removeHook?.(); activeLifecycle = undefined; } };
	activeLifecycle = lifecycle;
	return lifecycle;
}

export function initKnowledgeDrawer(root: ParentNode = document): KnowledgeDrawerController | undefined {
	const drawer = root.querySelector<HTMLElement>("[data-knowledge-drawer]");
	if (!drawer) return;
	const openButton = drawer.querySelector<HTMLButtonElement>("[data-drawer-open]");
	const closeButton = drawer.querySelector<HTMLButtonElement>("[data-drawer-close]");
	const panel = drawer.querySelector<HTMLDialogElement>("[data-drawer-panel]");
	const backdrop = drawer.querySelector<HTMLElement>("[data-drawer-backdrop]");
	if (!openButton || !closeButton || !panel || !backdrop) return;
	const previousOverflow = document.body.style.overflow;
	const focusables = () => [...panel.querySelectorAll<HTMLElement>('button, a[href], select, input, [tabindex]:not([tabindex="-1"])')];
	const close = () => { if (panel.open && typeof panel.close === "function") panel.close(); panel.hidden = true; panel.setAttribute("aria-hidden", "true"); backdrop.hidden = true; openButton.setAttribute("aria-expanded", "false"); document.body.style.overflow = previousOverflow; openButton.focus(); };
	const open = () => { panel.hidden = false; if (typeof panel.showModal === "function" && !panel.open) panel.showModal(); panel.setAttribute("aria-hidden", "false"); backdrop.hidden = false; openButton.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; focusables()[0]?.focus(); };
	const keydown = (event: KeyboardEvent) => {
		if (panel.hidden) return;
		if (event.key === "Escape") { event.preventDefault(); close(); return; }
		if (event.key !== "Tab") return;
		const items = focusables(); if (!items.length) return;
		const first = items[0]; const last = items[items.length - 1];
		if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
		if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
	};
	const articleClick = (event: Event) => { if ((event.target as Element).closest("[data-tree-article]")) close(); };
	openButton.addEventListener("click", open); closeButton.addEventListener("click", close); backdrop.addEventListener("click", close); panel.addEventListener("click", articleClick); document.addEventListener("keydown", keydown);
	return { dispose() { openButton.removeEventListener("click", open); closeButton.removeEventListener("click", close); backdrop.removeEventListener("click", close); panel.removeEventListener("click", articleClick); document.removeEventListener("keydown", keydown); document.body.style.overflow = previousOverflow; } };
}
