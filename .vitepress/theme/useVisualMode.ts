import { ref, onMounted, type Ref } from 'vue'
import { kbThemeConfig } from './kb-theme'

export type VisualMode = 'simple' | 'visual'

/** 从 localStorage 读取模式，不可用时回退到默认 */
function readStoredMode(): VisualMode {
  if (typeof window === 'undefined') return kbThemeConfig.visualMode.defaultMode
  try {
    const v = window.localStorage.getItem(kbThemeConfig.visualMode.storageKey)
    return v === 'visual' ? 'visual' : 'simple'
  } catch {
    return kbThemeConfig.visualMode.defaultMode
  }
}

/** 将模式写入 localStorage 并同步到根节点 dataset */
function applyMode(mode: VisualMode) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.visualMode = mode
  }
  try {
    window.localStorage.setItem(kbThemeConfig.visualMode.storageKey, mode)
  } catch {
    // localStorage 不可用时静默回退
  }
}

/**
 * 视觉模式状态管理。
 * SSR 安全：mounted 后才读取浏览器 API。
 * 多实例共享同一份 reactive 状态。
 */
const sharedMode: Ref<VisualMode> = ref(kbThemeConfig.visualMode.defaultMode)
let initialized = false

export function useVisualMode() {
  const mode = sharedMode

  function toggle() {
    const next: VisualMode = mode.value === 'visual' ? 'simple' : 'visual'
    setMode(next)
  }

  function setMode(next: VisualMode) {
    mode.value = next
    applyMode(next)
  }

  onMounted(() => {
    if (!initialized) {
      initialized = true
      sharedMode.value = readStoredMode()
      applyMode(sharedMode.value)
    }
  })

  return { mode, toggle, setMode }
}
