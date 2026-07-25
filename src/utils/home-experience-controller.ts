export interface HomeExperienceController {
	root: HTMLElement;
	dispose: () => void;
}

export interface HomeExperienceLifecycle {
	dispose: () => void;
}

declare global {
	interface Window {
		homeExperienceController?: HomeExperienceController;
		homeExperienceLifecycle?: HomeExperienceLifecycle;
	}
}

export function initHomeExperience(): HomeExperienceController | undefined {
	const home = document.querySelector<HTMLElement>("[data-home-page]");
	if (!home) {
		window.homeExperienceController?.dispose();
		return undefined;
	}
	if (window.homeExperienceController) {
		if (window.homeExperienceController.root === home && home.isConnected) return window.homeExperienceController;
		window.homeExperienceController.dispose();
	}

	const eventController = new AbortController();
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const sections = Array.from(home.querySelectorAll<HTMLElement>("[data-home-section]"));
	let activeSection = 0;
	let scrollFrame = 0;
	let autoTimer: number | undefined;
	let typewriterTimer: number | undefined;
	let dialogueIndex = 0;
	let dialogueComplete = true;
	const dialogue = home.querySelector<HTMLElement>("[data-home-dialogue]");
	const dialogueText = dialogue?.querySelector<HTMLElement>("[data-home-dialogue-text]");
	const dialogueSpeaker = dialogue?.querySelector<HTMLElement>("[data-home-dialogue-speaker]");
	const dialogueRestore = home.querySelector<HTMLButtonElement>("[data-home-dialogue-action=\"show\"]");
	const dialogueAuto = home.querySelector<HTMLButtonElement>("[data-home-dialogue-action=\"auto\"]");
	const dialogueLines = (() => {
		try {
			return JSON.parse(dialogue?.dataset.dialogueLines || "[]") as Array<{ speaker: string; text: string }>;
		} catch {
			return [];
		}
	})();

	const updateViewportHeight = () => {
		document.documentElement.style.setProperty("--home-viewport-height", `${window.innerHeight}px`);
	};
	const updateScrollProgress = () => {
		scrollFrame = 0;
		const rect = home.getBoundingClientRect();
		const distance = Math.max(1, home.offsetHeight - window.innerHeight);
		const progress = Math.min(1, Math.max(0, -rect.top / distance));
		home.style.setProperty("--home-scroll-progress", progress.toFixed(4));
	};
	const requestScrollProgress = () => {
		if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollProgress);
	};
	const stopAuto = () => {
		if (autoTimer !== undefined) window.clearInterval(autoTimer);
		autoTimer = undefined;
		dialogueAuto?.setAttribute("aria-pressed", "false");
	};
	const syncReducedMotionControls = () => {
		if (!dialogueAuto) return;
		dialogueAuto.disabled = reducedMotion.matches;
		dialogueAuto.setAttribute("aria-disabled", String(reducedMotion.matches));
		if (reducedMotion.matches) stopAuto();
	};
	const stopTypewriter = () => {
		if (typewriterTimer !== undefined) window.clearInterval(typewriterTimer);
		typewriterTimer = undefined;
	};
	const renderDialogue = (index: number, animate = true) => {
		if (!dialogue || !dialogueText || !dialogueSpeaker || dialogueLines.length === 0) return;
		dialogueIndex = (index + dialogueLines.length) % dialogueLines.length;
		const line = dialogueLines[dialogueIndex];
		dialogue.dataset.dialogueIndex = String(dialogueIndex);
		dialogueSpeaker.textContent = line.speaker;
		stopTypewriter();
		if (!animate || reducedMotion.matches) {
			dialogueText.textContent = line.text;
			dialogueComplete = true;
			return;
		}
		dialogueText.textContent = "";
		dialogueComplete = false;
		let characterIndex = 0;
		typewriterTimer = window.setInterval(() => {
			characterIndex += 1;
			dialogueText.textContent = line.text.slice(0, characterIndex);
			if (characterIndex >= line.text.length) {
				dialogueComplete = true;
				stopTypewriter();
			}
		}, 28);
	};
	const finishDialogueLine = () => {
		if (!dialogueText || dialogueLines.length === 0) return;
		stopTypewriter();
		dialogueText.textContent = dialogueLines[dialogueIndex].text;
		dialogueComplete = true;
	};
	const advanceDialogue = (animate = true) => renderDialogue(dialogueIndex + 1, animate);
	const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			const index = sections.indexOf(entry.target as HTMLElement);
			if (index >= 0) {
				activeSection = index;
				home.dataset.homeActiveSection = sections[activeSection]?.dataset.homeSection || String(activeSection);
			}
		}
	}, { threshold: 0.45 }) : undefined;
	sections.forEach(section => observer?.observe(section));
	renderDialogue(0);

	updateViewportHeight();
	updateScrollProgress();
	window.addEventListener("resize", updateViewportHeight, { passive: true });
	window.addEventListener("resize", requestScrollProgress, { passive: true, signal: eventController.signal });
	window.addEventListener("scroll", requestScrollProgress, { passive: true, signal: eventController.signal });
	const continueDialogue = () => {
		if (dialogueComplete) advanceDialogue();
		else finishDialogueLine();
	};
	home.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;
		const dialogueAction = target.closest<HTMLButtonElement>("[data-home-dialogue-action]");
		if (dialogueAction?.dataset.homeDialogueAction === "back") {
			renderDialogue(Math.max(0, dialogueIndex - 1), false);
			return;
		}
		if (dialogueAction?.dataset.homeDialogueAction === "hide") {
			dialogue?.setAttribute("hidden", "");
			if (dialogueRestore) dialogueRestore.hidden = false;
			stopAuto();
			return;
		}
		if (dialogueAction?.dataset.homeDialogueAction === "show") {
			dialogue?.removeAttribute("hidden");
			dialogueAction.hidden = true;
			return;
		}
		if (dialogueAction?.dataset.homeDialogueAction === "auto") {
			if (reducedMotion.matches) return;
			const enabled = dialogueAction.getAttribute("aria-pressed") !== "true";
			stopAuto();
			if (enabled) {
				dialogueAction.setAttribute("aria-pressed", "true");
				autoTimer = window.setInterval(() => advanceDialogue(false), 4200);
			}
			return;
		}
		if (target.closest("[data-home-dialogue]")) {
			continueDialogue();
			return;
		}
		const hudAction = target.closest<HTMLButtonElement>("[data-home-hud-action=\"toggle\"]");
		if (hudAction) {
			const visible = hudAction.getAttribute("aria-pressed") !== "false";
			hudAction.setAttribute("aria-pressed", String(!visible));
			home.toggleAttribute("data-home-hud-hidden", visible);
		}
	}, { signal: eventController.signal });
	home.addEventListener("keydown", (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		const target = event.target as HTMLElement;
		if (!target.closest("[data-home-dialogue-text]")) return;
		event.preventDefault();
		continueDialogue();
	}, { signal: eventController.signal });
	reducedMotion.addEventListener?.("change", syncReducedMotionControls);
	syncReducedMotionControls();
	document.documentElement.dataset.homeExperience = "ready";

	const controller: HomeExperienceController = {
		root: home,
		dispose() {
			window.removeEventListener("resize", updateViewportHeight);
			reducedMotion.removeEventListener?.("change", syncReducedMotionControls);
			eventController.abort();
			observer?.disconnect();
			stopAuto();
			stopTypewriter();
			if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
			document.documentElement.style.removeProperty("--home-viewport-height");
			home.style.removeProperty("--home-scroll-progress");
			delete home.dataset.homeActiveSection;
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

export function initHomeExperienceLifecycle(): HomeExperienceLifecycle {
	if (window.homeExperienceLifecycle) return window.homeExperienceLifecycle;

	const eventController = new AbortController();
	let removeHook: (() => void) | undefined;
	let hooksAttached = false;
	const sync = () => {
		try {
			syncHomeExperience();
		} catch (error) {
			console.warn("Home enhancement unavailable", error);
		}
	};
	const attachSwupHook = () => {
		if (hooksAttached || !window.swup?.hooks) return;
		hooksAttached = true;
		const remove = window.swup.hooks.on("content:replace", sync);
		if (typeof remove === "function") removeHook = remove;
	};

	sync();
	attachSwupHook();
	if (!hooksAttached) document.addEventListener("swup:enable", attachSwupHook, { once: true, signal: eventController.signal });

	const lifecycle: HomeExperienceLifecycle = {
		dispose: () => {
			eventController.abort();
			removeHook?.();
			removeHook = undefined;
			window.homeExperienceController?.dispose();
			if (window.homeExperienceLifecycle === lifecycle) delete window.homeExperienceLifecycle;
		},
	};
	window.homeExperienceLifecycle = lifecycle;
	return lifecycle;
}
