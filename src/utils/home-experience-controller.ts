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

	document.documentElement.dataset.homeExperience = "ready";
	const controller: HomeExperienceController = {
		dispose() {
			delete document.documentElement.dataset.homeExperience;
			if (window.homeExperienceController === controller) delete window.homeExperienceController;
		},
	};
	window.homeExperienceController = controller;
	return controller;
}
