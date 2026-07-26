/**
 * 私密阅读器浏览器端控制器
 *
 * 职责：
 * - 持有每本书的不可导出 CryptoKey（extractable: false）
 * - 维护段缓存 Map<segmentIndex, string>（最多 3 段，LRU 淘汰）
 * - 提供 deriveReaderKey / decryptField / decryptSegment 公共 API
 * - 与 Swup content:replace 同步生命周期；离开路由时 dispose 清空密钥与缓存
 *
 * 安全要点：
 * - CryptoKey.extractable === false，DevTools 无法导出原始密钥
 * - 段缓存不写入 localStorage / sessionStorage，仅驻留内存
 * - dispose 时显式置 null 并清空 Map
 * - PBKDF2 在浏览器主线程外可通过后台线程执行（此处为简化实现，主线程派生）
 */

export interface PrivateReaderLifecycle {
	/** 同步绑定：扫描 DOM 中的 [data-private-reader] 节点 */
	sync: () => void
	/** 释放所有密钥与段缓存；离开路由时调用 */
	dispose: () => void
	/** 为指定 slug 派生密钥并缓存 */
	deriveKey: (slug: string, password: string, saltBase64: string) => Promise<CryptoKey>
	/** 解密短字段（title/author/toc title） */
	decryptField: (encryptedBase64: string, key: CryptoKey) => Promise<string>
	/** 解密段密文；命中缓存直接返回 */
	decryptSegment: (slug: string, segmentIndex: number, ciphertextBase64: string, ivBase64: string, key: CryptoKey) => Promise<string>
	/** 清除指定 slug 的段缓存（不释放密钥） */
	clearSegmentCache: (slug: string) => void
	/** 获取当前激活的 slug 列表（仅用于调试，不暴露密钥） */
	activeSlugs: () => string[]
}

type PrivateReaderWindow = Window & {
	privateReaderLifecycle?: PrivateReaderLifecycle
	swup?: { hooks: { on: (event: string, handler: () => void) => (() => void) | void } }
}

interface BookBinding {
	key: CryptoKey
	segmentCache: Map<number, string>
}

declare global {
	interface Window {
		privateReaderLifecycle?: PrivateReaderLifecycle
	}
}

const MAX_CACHED_SEGMENTS = 3
const ITERATIONS = 210_000
const IV_LEN = 12
const AUTH_TAG_LEN = 16

/**
 * 初始化私密阅读器生命周期。
 *
 * 镜像 encrypted-payload-controller.ts 的模式：
 * - sync() 扫描 DOM 节点并绑定
 * - 监听 swup content:replace 在页面切换时同步绑定
 * - dispose() 清空所有密钥与缓存
 */
export function initPrivateReaderLifecycle(
	windowRef: PrivateReaderWindow = window as PrivateReaderWindow
): PrivateReaderLifecycle {
	if (windowRef.privateReaderLifecycle) return windowRef.privateReaderLifecycle

	const bindings = new Map<string, BookBinding>()
	const lifecycleController = new AbortController()
	let hookAttached = false
	let removeHook: (() => void) | undefined

	const sync = () => {
		// 清理已断开连接的绑定
		// 注意：private-reader 路由离开后 bindings 仍保留密钥，需在 dispose 时清理
		// sync 主要用于 Swup 切换时重新绑定 DOM 事件
		documentRef(windowRef).querySelectorAll<HTMLElement>("[data-private-reader]").forEach(() => {
			// DOM 节点存在性检查；实际事件绑定在 Svelte 组件中完成
		})
	}

	const attachSwupHook = () => {
		if (hookAttached) return
		const hooks = windowRef.swup?.hooks
		if (!hooks) return
		const remove = hooks.on("content:replace", sync)
		if (typeof remove === "function") removeHook = remove
		hookAttached = true
	}

	sync()
	attachSwupHook()
	if (!hookAttached) {
		documentRef(windowRef).addEventListener("swup:enable", attachSwupHook, {
			once: true,
			signal: lifecycleController.signal,
		})
	}

	const lifecycle: PrivateReaderLifecycle = {
		sync,
		dispose() {
			lifecycleController.abort()
			removeHook?.()
			for (const binding of bindings.values()) {
				binding.segmentCache.clear()
				// CryptoKey 无法显式销毁，但解除引用后 GC 可回收
				// 关键是 bindings.clear() 后无法再访问到 key
			}
			bindings.clear()
			if (windowRef.privateReaderLifecycle === lifecycle) {
				delete windowRef.privateReaderLifecycle
			}
		},
		async deriveKey(slug, password, saltBase64) {
			const existing = bindings.get(slug)
			if (existing) return existing.key
			const cryptoRef = (windowRef as Window & typeof globalThis).crypto
			const keyMaterial = await cryptoRef.subtle.importKey(
				"raw",
				new TextEncoder().encode(password),
				"PBKDF2",
				false,
				["deriveKey"]
			)
			const key = await cryptoRef.subtle.deriveKey(
				{
					name: "PBKDF2",
					salt: fromBase64(saltBase64, windowRef),
					iterations: ITERATIONS,
					hash: "SHA-256",
				},
				keyMaterial,
				{ name: "AES-GCM", length: 256 },
				false, // extractable: false，DevTools 无法导出
				["decrypt"]
			)
			bindings.set(slug, { key, segmentCache: new Map() })
			return key
		},
		async decryptField(encryptedBase64, key) {
			const cryptoRef = (windowRef as Window & typeof globalThis).crypto
			const raw = fromBase64(encryptedBase64, windowRef)
			// 格式：iv(12) || ciphertext || authTag(16)
			const iv = raw.slice(0, IV_LEN)
			const combined = raw.slice(IV_LEN)
			const plaintext = await cryptoRef.subtle.decrypt({ name: "AES-GCM", iv }, key, combined)
			return new TextDecoder().decode(plaintext)
		},
		async decryptSegment(slug, segmentIndex, ciphertextBase64, ivBase64, key) {
			const binding = bindings.get(slug)
			if (binding) {
				const cached = binding.segmentCache.get(segmentIndex)
				if (cached !== undefined) return cached
			}
			const cryptoRef = (windowRef as Window & typeof globalThis).crypto
			const ciphertext = fromBase64(ciphertextBase64, windowRef)
			const iv = fromBase64(ivBase64, windowRef)
			const plaintext = await cryptoRef.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext)
			const text = new TextDecoder().decode(plaintext)
			if (binding) {
				// LRU 淘汰：超过 MAX_CACHED_SEGMENTS 时删除最早的
				if (binding.segmentCache.size >= MAX_CACHED_SEGMENTS) {
					const firstKey = binding.segmentCache.keys().next().value
					if (firstKey !== undefined) binding.segmentCache.delete(firstKey)
				}
				binding.segmentCache.set(segmentIndex, text)
			}
			return text
		},
		clearSegmentCache(slug) {
			bindings.get(slug)?.segmentCache.clear()
		},
		activeSlugs() {
			return [...bindings.keys()]
		},
	}

	windowRef.privateReaderLifecycle = lifecycle
	return lifecycle
}

// ---------- 辅助函数 ----------

function documentRef(windowRef: PrivateReaderWindow): Document {
	return (windowRef as Window & typeof globalThis).document
}

function fromBase64(value: string, windowRef: PrivateReaderWindow): ArrayBuffer {
	const binary = windowRef.atob(value)
	const buffer = new ArrayBuffer(binary.length)
	const bytes = new Uint8Array(buffer)
	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i)
	}
	return buffer
}

// 导出常量供测试使用
export { ITERATIONS, IV_LEN, AUTH_TAG_LEN, MAX_CACHED_SEGMENTS }
