interface EncryptedPayloadData {
	algorithm: string;
	ciphertext: string;
	contentType: string;
	iterations: number;
	iv: string;
	kdf: string;
	salt: string;
}

type EncryptedPayloadWindow = Window & {
	encryptedPayloadLifecycle?: EncryptedPayloadLifecycle;
	mermaidInitialized?: boolean;
	plantumlInitialized?: boolean;
};

interface BindEncryptedPayloadOptions {
	crypto?: Crypto;
	document?: Document;
	fetch?: typeof fetch;
	mermaidRenderScript?: string;
	plantumlRenderScript?: string;
	window?: EncryptedPayloadWindow;
}

interface EncryptedPayloadLifecycleOptions extends BindEncryptedPayloadOptions {
	document?: Document;
	window?: EncryptedPayloadWindow;
}

export interface EncryptedPayloadLifecycle {
	dispose: () => void;
	sync: () => void;
}

declare global {
	interface Window {
		encryptedPayloadLifecycle?: EncryptedPayloadLifecycle;
	}
}

function fromBase64(value: string, windowRef: EncryptedPayloadWindow): ArrayBuffer {
	const binary = windowRef.atob(value);
	const buffer = new ArrayBuffer(binary.length);
	const bytes = new Uint8Array(buffer);
	for (let index = 0; index < binary.length; index += 1) {
		bytes[index] = binary.charCodeAt(index);
	}
	return buffer;
}

function injectTrustedRenderer(
	documentRef: Document,
	source: string | undefined,
	name: "mermaid" | "plantuml",
): void {
	if (!source || documentRef.querySelector(`script[data-encrypted-renderer="${name}"]`)) return;
	const script = documentRef.createElement("script");
	script.dataset.encryptedRenderer = name;
	script.textContent = source;
	documentRef.head.append(script);
}

function isSupportedPayload(payload: EncryptedPayloadData): boolean {
	return payload.algorithm === "AES-GCM"
		&& payload.kdf === "PBKDF2-SHA256"
		&& payload.contentType === "text/html";
}

export function bindEncryptedPayload(
	root: HTMLElement,
	{
		crypto: cryptoRef = crypto,
		document: documentRef = document,
		fetch: fetchImpl = fetch,
		mermaidRenderScript,
		plantumlRenderScript,
		window: windowRef = window as EncryptedPayloadWindow,
	}: BindEncryptedPayloadOptions = {},
): () => void {
	const form = root.querySelector<HTMLFormElement>(".encrypted-payload-form");
	const input = root.querySelector<HTMLInputElement>("input");
	const error = root.querySelector<HTMLElement>(".encrypted-payload-error");
	const status = root.querySelector<HTMLElement>(".encrypted-payload-status");
	const output = root.querySelector<HTMLElement>(".encrypted-payload-content");
	const payloadUrl = root.dataset.payloadUrl;
	if (!form || !input || !output || !payloadUrl) return () => {};

	const eventController = new AbortController();
	let requestController: AbortController | undefined;
	let operation = 0;
	let disposed = false;

	output.addEventListener("click", (event) => {
		const target = event.target instanceof Element
			? event.target.closest<HTMLAnchorElement>("a[data-encoded-email]")
			: null;
		const encodedEmail = target?.dataset.encodedEmail;
		if (!target || !encodedEmail) return;
		target.href = `mailto:${windowRef.atob(encodedEmail)}`;
		target.removeAttribute("data-encoded-email");
	}, { signal: eventController.signal });

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (!input.value || disposed) return;
		requestController?.abort();
		requestController = new AbortController();
		const currentOperation = ++operation;
		error?.classList.add("hidden");
		if (status) status.textContent = "";

		try {
			const response = await fetchImpl(payloadUrl, {
				credentials: "same-origin",
				signal: requestController.signal,
			});
			if (!response.ok) throw new Error("payload unavailable");
			const payload = await response.json() as EncryptedPayloadData;
			if (!isSupportedPayload(payload)) throw new Error("unsupported encrypted payload");
			const keyMaterial = await cryptoRef.subtle.importKey(
				"raw",
				new TextEncoder().encode(input.value),
				"PBKDF2",
				false,
				["deriveKey"],
			);
			const key = await cryptoRef.subtle.deriveKey({
				name: "PBKDF2",
				salt: fromBase64(payload.salt, windowRef),
				iterations: payload.iterations,
				hash: "SHA-256",
			}, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
			const plaintext = await cryptoRef.subtle.decrypt({
				name: "AES-GCM",
				iv: fromBase64(payload.iv, windowRef),
			}, key, fromBase64(payload.ciphertext, windowRef));

			if (disposed || currentOperation !== operation || !root.isConnected) return;
			output.innerHTML = new TextDecoder().decode(plaintext);
			if (output.querySelector(".mermaid-diagram-container") && !windowRef.mermaidInitialized) {
				injectTrustedRenderer(documentRef, mermaidRenderScript, "mermaid");
			}
			if (output.querySelector(".plantuml-diagram-container") && !windowRef.plantumlInitialized) {
				injectTrustedRenderer(documentRef, plantumlRenderScript, "plantuml");
			}
			output.classList.remove("hidden");
			form.classList.add("hidden");
			input.value = "";
			if (status) status.textContent = "解密成功，正文已显示。";
			output.focus();
			documentRef.dispatchEvent(new CustomEvent("password:decrypted"));
		} catch {
			if (disposed || requestController.signal.aborted || currentOperation !== operation) return;
			error?.classList.remove("hidden");
		}
	}, { signal: eventController.signal });

	return () => {
		if (disposed) return;
		disposed = true;
		operation += 1;
		requestController?.abort();
		eventController.abort();
	};
}

export function initEncryptedPayloadLifecycle({
	crypto: cryptoRef = crypto,
	document: documentRef = document,
	fetch: fetchImpl = fetch,
	mermaidRenderScript,
	plantumlRenderScript,
	window: windowRef = window as EncryptedPayloadWindow,
}: EncryptedPayloadLifecycleOptions = {}): EncryptedPayloadLifecycle {
	if (windowRef.encryptedPayloadLifecycle) return windowRef.encryptedPayloadLifecycle;

	const bindings = new Map<HTMLElement, () => void>();
	const lifecycleController = new AbortController();
	let hookAttached = false;
	let removeHook: (() => void) | undefined;

	const sync = () => {
		for (const [root, dispose] of bindings) {
			if (root.isConnected) continue;
			dispose();
			bindings.delete(root);
		}
		documentRef.querySelectorAll<HTMLElement>("[data-encrypted-payload]").forEach((root) => {
			if (bindings.has(root)) return;
			bindings.set(root, bindEncryptedPayload(root, {
				crypto: cryptoRef,
				document: documentRef,
				fetch: fetchImpl,
				mermaidRenderScript,
				plantumlRenderScript,
				window: windowRef,
			}));
		});
	};

	const attachSwupHook = () => {
		if (hookAttached) return;
		const hooks = windowRef.swup?.hooks;
		if (!hooks) return;
		const remove = hooks.on("content:replace", sync);
		if (typeof remove === "function") removeHook = remove;
		hookAttached = true;
	};

	sync();
	attachSwupHook();
	if (!hookAttached) {
		documentRef.addEventListener("swup:enable", attachSwupHook, {
			once: true,
			signal: lifecycleController.signal,
		});
	}

	const lifecycle: EncryptedPayloadLifecycle = {
		sync,
		dispose() {
			lifecycleController.abort();
			removeHook?.();
			for (const dispose of bindings.values()) dispose();
			bindings.clear();
			if (windowRef.encryptedPayloadLifecycle === lifecycle) {
				delete windowRef.encryptedPayloadLifecycle;
			}
		},
	};
	windowRef.encryptedPayloadLifecycle = lifecycle;
	return lifecycle;
}
