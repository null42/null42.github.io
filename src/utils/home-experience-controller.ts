export interface HomeExperienceController {
	dispose: () => void;
}

export interface HomeExperienceInstrument {
	create: number;
	dispose: number;
	sync: number;
	resizeAdd: number;
	resizeRemove: number;
}

declare global {
	interface Window {
		homeExperienceController?: HomeExperienceController;
		__homeExperienceInstrument?: HomeExperienceInstrument;
	}
}

function observe(event: keyof HomeExperienceInstrument): void {
	if (window.__homeExperienceInstrument) window.__homeExperienceInstrument[event] += 1;
}

export function initHomeExperience(): HomeExperienceController | undefined {
	const home = document.querySelector<HTMLElement>("[data-home-page]");
	if (!home) {
		window.homeExperienceController?.dispose();
		return undefined;
	}
	if (window.homeExperienceController) return window.homeExperienceController;

	const updateViewportHeight = () => {
		document.documentElement.style.setProperty("--home-viewport-height", `${window.innerHeight}px`);
	};
	updateViewportHeight();
	window.addEventListener("resize", updateViewportHeight, { passive: true });
	observe("resizeAdd");
	observe("create");
	document.documentElement.dataset.homeExperience = "ready";

	const controller: HomeExperienceController = {
		dispose() {
			window.removeEventListener("resize", updateViewportHeight);
			observe("resizeRemove");
			observe("dispose");
			document.documentElement.style.removeProperty("--home-viewport-height");
			delete document.documentElement.dataset.homeExperience;
			if (window.homeExperienceController === controller) delete window.homeExperienceController;
		},
	};
	window.homeExperienceController = controller;
	return controller;
}

export function syncHomeExperience(): HomeExperienceController | undefined {
	observe("sync");
	return initHomeExperience();
}
