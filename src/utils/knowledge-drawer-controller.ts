import { acquireBodyScrollLock } from "./document-interaction-lock";

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
	let releaseScrollLock: (() => void) | undefined;
	const focusables = () => [...panel.querySelectorAll<HTMLElement>('button, a[href], select, input, [tabindex]:not([tabindex="-1"])')];
	const releaseBodyLock = () => { releaseScrollLock?.(); releaseScrollLock = undefined; };
	const close = (restoreFocus = true) => { if (panel.open && typeof panel.close === "function") panel.close(); panel.hidden = true; panel.setAttribute("aria-hidden", "true"); backdrop.hidden = true; openButton.setAttribute("aria-expanded", "false"); releaseBodyLock(); if (restoreFocus && openButton.isConnected) openButton.focus(); };
	const open = () => { window.navigationMenuController?.close(); window.dispatchEvent(new CustomEvent("firefly:overlay-open", { detail: { source: "knowledge-drawer" } })); releaseScrollLock ??= acquireBodyScrollLock(); panel.hidden = false; if (typeof panel.showModal === "function" && !panel.open) panel.showModal(); panel.setAttribute("aria-hidden", "false"); backdrop.hidden = false; openButton.setAttribute("aria-expanded", "true"); focusables()[0]?.focus(); };
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
	const panelPointerDown = (event: PointerEvent) => { if (event.target !== panel) return; const rect = panel.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); };
	const cancel = (event: Event) => { event.preventDefault(); close(); };
	const overlayOpen = (event: Event) => { if ((event as CustomEvent<{ source?: string }>).detail?.source !== "knowledge-drawer") close(false); };
	const closeFromControl = () => close();
	openButton.addEventListener("click", open); closeButton.addEventListener("click", closeFromControl); backdrop.addEventListener("click", closeFromControl); panel.addEventListener("click", articleClick); panel.addEventListener("pointerdown", panelPointerDown); panel.addEventListener("cancel", cancel); document.addEventListener("keydown", keydown); window.addEventListener("firefly:overlay-open", overlayOpen);
	return { dispose() { openButton.removeEventListener("click", open); closeButton.removeEventListener("click", closeFromControl); backdrop.removeEventListener("click", closeFromControl); panel.removeEventListener("click", articleClick); panel.removeEventListener("pointerdown", panelPointerDown); panel.removeEventListener("cancel", cancel); document.removeEventListener("keydown", keydown); window.removeEventListener("firefly:overlay-open", overlayOpen); close(false); } };
}
