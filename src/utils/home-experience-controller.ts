export interface HomeExperienceController {
	dispose: () => void;
}

declare global {
	interface Window {
		homeExperienceController?: HomeExperienceController;
	}
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
	document.documentElement.dataset.homeExperience = "ready";

	const controller: HomeExperienceController = {
		dispose() {
			window.removeEventListener("resize", updateViewportHeight);
			document.documentElement.style.removeProperty("--home-viewport-height");
			delete document.documentElement.dataset.homeExperience;
			if (window.homeExperienceController === controller) delete window.homeExperienceController;
		},
	};
	window.homeExperienceController = controller;
	return controller;
}

export function syncHomeExperience(): HomeExperienceController | undefined {
	return initHomeExperience();
}
