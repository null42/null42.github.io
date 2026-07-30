/**
 * 私密阅读器浏览器端控制器（v2 三层解密架构）
 *
 * 职责：
 * - 持有每本书的不可导出 CryptoKey（extractable: false）
 * - 维护段缓存 Map<segmentIndex, string>（最多 3 段，LRU 淘汰）
 * - 提供 deriveGateKey / deriveShelfKey / deriveBookKey / verifyGate / decryptShelfField / decryptSegment 公共 API
 * - 与 Swup content:replace 同步生命周期；离开路由时 dispose 清空密钥与缓存
 *
 * 三层密钥：
 * - gateKey：进入书架的密码（共享 gateSalt，验证 token）
 * - shelfKey：解密书名/作者（共享 shelfSalt）
 * - bookKey：解密章节内容（每本书独立 bookSalt）
 *
 * 安全要点：
 * - CryptoKey.extractable === false，DevTools 无法导出原始密钥
 * - 段缓存不写入 localStorage / sessionStorage，仅驻留内存
 * - dispose 时显式置 null 并清空 Map
 */

/** Gate 验证 token 明文（与加密端保持一致） */
export const GATE_VERIFY_TOKEN = 'PRIVATE_READER_GATE_V2'

export interface PrivateReaderLifecycle {
	/** 同步绑定：扫描 DOM 中的 [data-private-reader] 节点 */
	sync: () => void
	/** 释放所有密钥与段缓存；离开路由时调用 */
	dispose: () => void
	/** 派生 Gate 密钥（用于验证进入书架的权限） */
	deriveGateKey: (password: string, gateSaltBase64: string) => Promise<CryptoKey>
	/** 派生 Shelf 密钥（用于解密所有书名/作者） */
	deriveShelfKey: (password: string, shelfSaltBase64: string) => Promise<CryptoKey>
	/** 派生 Book 密钥（用于解密具体书的内容） */
	deriveBookKey: (slug: string, password: string, bookSaltBase64: string) => Promise<CryptoKey>
	/** 验证 Gate 密码是否正确（解密 gateToken 并比对固定字符串） */
	verifyGate: (gateTokenBase64: string, key: CryptoKey) => Promise<boolean>
	/** 解密 Shelf 字段（title/author，用 shelfKey） */
	decryptShelfField: (encryptedBase64: string, key: CryptoKey) => Promise<string>
	/** 解密 Book 字段（toc title，用 bookKey） */
	decryptBookField: (encryptedBase64: string, key: CryptoKey) => Promise<string>
	/** 解密段密文；命中缓存直接返回 */
	decryptSegment: (slug: string, segmentIndex: number, ciphertextBase64: string, ivBase64: string, key: CryptoKey) => Promise<string>
	/** 解密图片资源密文，返回 ArrayBuffer（用于创建 Blob URL） */
	decryptAsset: (ciphertextBase64: string, ivBase64: string, key: CryptoKey) => Promise<ArrayBuffer>
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
 */
export function initPrivateReaderLifecycle(
	windowRef: PrivateReaderWindow = window as PrivateReaderWindow
): PrivateReaderLifecycle {
	if (windowRef.privateReaderLifecycle) return windowRef.privateReaderLifecycle

	const bindings = new Map<string, BookBinding>()
	// gateKey 和 shelfKey 全局共享（所有书使用同一组密码）
	let gateKeyCache: CryptoKey | null = null
	let shelfKeyCache: CryptoKey | null = null
	const lifecycleController = new AbortController()
	let hookAttached = false
	let removeHook: (() => void) | undefined

	const sync = () => {
		documentRef(windowRef).querySelectorAll<HTMLElement>("[data-private-reader]").forEach(() => {
			// DOM 节点存在性检查；实际事件绑定在组件中完成
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

	/**
	 * 通用 PBKDF2 密钥派生（内部函数）。
	 */
	const deriveKeyGeneric = async (
		password: string,
		saltBase64: string,
		windowRef: PrivateReaderWindow
	): Promise<CryptoKey> => {
		const cryptoRef = (windowRef as Window & typeof globalThis).crypto
		const keyMaterial = await cryptoRef.subtle.importKey(
			"raw",
			new TextEncoder().encode(password),
			"PBKDF2",
			false,
			["deriveKey"]
		)
		return cryptoRef.subtle.deriveKey(
			{
				name: "PBKDF2",
				salt: fromBase64(saltBase64, windowRef),
				iterations: ITERATIONS,
				hash: "SHA-256",
			},
			keyMaterial,
			{ name: "AES-GCM", length: 256 },
			false, // extractable: false
			["decrypt"]
		)
	}

	const lifecycle: PrivateReaderLifecycle = {
		sync,
		dispose() {
			lifecycleController.abort()
			removeHook?.()
			for (const binding of bindings.values()) {
				binding.segmentCache.clear()
			}
			bindings.clear()
			gateKeyCache = null
			shelfKeyCache = null
			if (windowRef.privateReaderLifecycle === lifecycle) {
				delete windowRef.privateReaderLifecycle
			}
		},
		async deriveGateKey(password, gateSaltBase64) {
			if (gateKeyCache) return gateKeyCache
			gateKeyCache = await deriveKeyGeneric(password, gateSaltBase64, windowRef)
			return gateKeyCache
		},
		async deriveShelfKey(password, shelfSaltBase64) {
			if (shelfKeyCache) return shelfKeyCache
			shelfKeyCache = await deriveKeyGeneric(password, shelfSaltBase64, windowRef)
			return shelfKeyCache
		},
		async deriveBookKey(slug, password, bookSaltBase64) {
			const existing = bindings.get(slug)
			if (existing) return existing.key
			const key = await deriveKeyGeneric(password, bookSaltBase64, windowRef)
			bindings.set(slug, { key, segmentCache: new Map() })
			return key
		},
		async verifyGate(gateTokenBase64, key) {
			try {
				const plaintext = await lifecycle.decryptShelfField(gateTokenBase64, key)
				return plaintext === GATE_VERIFY_TOKEN
			} catch {
				return false
			}
		},
		async decryptShelfField(encryptedBase64, key) {
			const cryptoRef = (windowRef as Window & typeof globalThis).crypto
			const raw = fromBase64(encryptedBase64, windowRef)
			const iv = raw.slice(0, IV_LEN)
			const combined = raw.slice(IV_LEN)
			const plaintext = await cryptoRef.subtle.decrypt({ name: "AES-GCM", iv }, key, combined)
			return new TextDecoder().decode(plaintext)
		},
		// decryptBookField 与 decryptShelfField 实现相同（都是解密短字段）
		async decryptBookField(encryptedBase64, key) {
			return lifecycle.decryptShelfField(encryptedBase64, key)
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
				if (binding.segmentCache.size >= MAX_CACHED_SEGMENTS) {
					const firstKey = binding.segmentCache.keys().next().value
					if (firstKey !== undefined) binding.segmentCache.delete(firstKey)
				}
				binding.segmentCache.set(segmentIndex, text)
			}
			return text
		},
		async decryptAsset(ciphertextBase64, ivBase64, key) {
			const cryptoRef = (windowRef as Window & typeof globalThis).crypto
			const ciphertext = fromBase64(ciphertextBase64, windowRef)
			const iv = fromBase64(ivBase64, windowRef)
			const plaintext = await cryptoRef.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext)
			return plaintext
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
