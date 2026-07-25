export type KnowledgeTreeController = { dispose: () => void };
type SwupLike = { hooks: { on: (name: "content:replace", callback: () => void) => (() => void) | void } };

let activeLifecycle: { dispose: () => void } | undefined;

export function installKnowledgeTreeLifecycle(swup?: SwupLike, root: ParentNode = document): { dispose: () => void } {
	activeLifecycle?.dispose();
	let controller = initKnowledgeTree(root);
	const refresh = () => { if (activeLifecycle !== lifecycle) return; controller?.dispose(); controller = initKnowledgeTree(root); };
	const removeHook = swup?.hooks.on("content:replace", refresh);
	const lifecycle = { dispose() { if (activeLifecycle !== lifecycle) return; controller?.dispose(); controller = undefined; removeHook?.(); activeLifecycle = undefined; } };
	activeLifecycle = lifecycle;
	return lifecycle;
}

export function initKnowledgeTree(root: ParentNode = document): KnowledgeTreeController | undefined {
	const trees = [...root.querySelectorAll<HTMLElement>("[data-knowledge-tree]")];
	if (!trees.length) return;
	const controllers = trees.map(initSingleKnowledgeTree);
	return { dispose() { controllers.forEach((controller) => controller.dispose()); } };
}

function initSingleKnowledgeTree(tree: HTMLElement): KnowledgeTreeController {
	tree.dataset.enhanced = "true";
	const storageKey = tree.dataset.storageKey || "knowledgeTree:default";
	const toggles = [...tree.querySelectorAll<HTMLButtonElement>("[data-tree-toggle]")];
	const articles = [...tree.querySelectorAll<HTMLAnchorElement>("[data-tree-article]")];
	let saved: Record<string, boolean> = {};
	try {
		const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
			saved = Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, boolean] => typeof entry[1] === "boolean"));
		}
	} catch { saved = {}; }
	const setExpanded = (toggle: HTMLButtonElement, expanded: boolean, persist = true) => {
		toggle.setAttribute("aria-expanded", String(expanded));
		const panel = document.getElementById(toggle.getAttribute("aria-controls") || "");
		if (panel) panel.hidden = !expanded;
		const nodeKey = toggle.closest<HTMLElement>("[data-tree-node]")?.dataset.treeNode;
		if (persist && nodeKey) {
			saved[nodeKey] = expanded;
			try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { /* Storage can be unavailable or full. */ }
		}
	};
	const currentKeys = [
		tree.dataset.currentSection && `section:${tree.dataset.currentSection}`,
		tree.dataset.currentSection && tree.dataset.currentRoute && `route:${tree.dataset.currentSection}:${tree.dataset.currentRoute}`,
		tree.dataset.currentSection && tree.dataset.currentRoute && tree.dataset.currentStage && `stage:${tree.dataset.currentSection}:${tree.dataset.currentRoute}:${tree.dataset.currentStage}`,
	].filter(Boolean);
	for (const toggle of toggles) {
		const nodeKey = toggle.closest<HTMLElement>("[data-tree-node]")?.dataset.treeNode;
		const expanded = nodeKey && currentKeys.includes(nodeKey) ? true : (nodeKey && nodeKey in saved ? saved[nodeKey] : toggle.getAttribute("aria-expanded") === "true");
		setExpanded(toggle, expanded, false);
	}
	const current = articles.find((article) => article.dataset.treeArticle === tree.dataset.currentArticle);
	if (current) { current.setAttribute("aria-current", "page"); current.scrollIntoView({ block: "nearest" }); }
	const clickHandlers = toggles.map((toggle) => { const handler = () => setExpanded(toggle, toggle.getAttribute("aria-expanded") !== "true"); toggle.addEventListener("click", handler); return handler; });
	const focusables = () => [...tree.querySelectorAll<HTMLElement>("[data-tree-toggle], [data-tree-article]")].filter((element) => !element.closest("[hidden]"));
	const keydown = (event: KeyboardEvent) => {
		const target = event.target as HTMLElement;
		const list = focusables();
		const index = list.indexOf(target);
		if (index < 0) return;
		if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); list[Math.max(0, Math.min(list.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)))]?.focus(); }
		if (target.matches("[data-tree-toggle]") && (event.key === "ArrowRight" || event.key === "ArrowLeft")) { event.preventDefault(); setExpanded(target as HTMLButtonElement, event.key === "ArrowRight"); }
	};
	tree.addEventListener("keydown", keydown);
	return { dispose() { tree.removeEventListener("keydown", keydown); toggles.forEach((toggle, index) => toggle.removeEventListener("click", clickHandlers[index])); delete tree.dataset.enhanced; } };
}
