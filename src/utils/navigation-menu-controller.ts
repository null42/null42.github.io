import { acquireBodyScrollLock } from "./document-interaction-lock";

export type NavigationCloseReason = 'default' | 'swup-replace'

export interface NavigationMenuController {
  dispose: () => void
  close: (options?: { restoreFocus?: boolean; reason?: NavigationCloseReason }) => void
}

const PANEL_ID = 'nav-menu-panel'
const TRIGGER_IDS = ['nav-menu-switch', 'mobile-dock-menu']
const HIDE_DELAY_MS = 300
const HIDE_TRANSITION_PROPERTIES = new Set(['opacity', 'transform'])
type SwupHookName = 'visit:start' | 'content:replace'
type SwupLike = { hooks: { on: (name: SwupHookName, callback: () => void) => (() => void) | void } }
let activeLifecycle: { dispose: () => void } | undefined

export function installNavigationMenuLifecycle(swup?: SwupLike): { dispose: () => void } {
  activeLifecycle?.dispose()
  let controller = initNavigationMenu()
  const lifecycleController = new AbortController()
  let lifecycle: { dispose: () => void }
  const closeForVisit = () => controller?.close({ reason: 'swup-replace' })
  const refresh = () => {
    if (activeLifecycle !== lifecycle) return
    controller?.dispose()
    controller = initNavigationMenu()
  }
  const removeVisitHook = swup?.hooks.on('visit:start', closeForVisit)
  const removeReplaceHook = swup?.hooks.on('content:replace', refresh)
  lifecycle = {
    dispose: () => {
      if (activeLifecycle !== lifecycle) return
      lifecycleController.abort()
      controller?.dispose()
      controller = undefined
      removeVisitHook?.()
      removeReplaceHook?.()
      activeLifecycle = undefined
    },
  }
  activeLifecycle = lifecycle
  if (!swup) {
    document.addEventListener('swup:enable', () => installNavigationMenuLifecycle(window.swup), {
      once: true,
      signal: lifecycleController.signal,
    })
  }
  return lifecycle
}

export function initNavigationMenu(): NavigationMenuController | undefined {
  window.navigationMenuController?.dispose()

  const panel = document.getElementById(PANEL_ID)
  const triggers = TRIGGER_IDS
    .map(id => document.getElementById(id))
    .filter((element): element is HTMLButtonElement => element?.tagName === 'BUTTON')
  if (!panel || triggers.length === 0) return undefined

  const abortController = new AbortController()
  const { signal } = abortController
  let activeTrigger: HTMLButtonElement | undefined
  let hideTimer: ReturnType<typeof setTimeout> | undefined
  let closeGeneration = 0
  let disposed = false
  let releaseScrollLock: (() => void) | undefined

  const isOpen = () => !panel.classList.contains('float-panel-closed')
  const syncTriggers = (open: boolean) => {
    triggers.forEach(trigger => trigger.setAttribute('aria-expanded', String(open)))
  }
  const clearHideTimer = () => {
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = undefined
  }
  const releaseBodyLock = () => {
    releaseScrollLock?.()
    releaseScrollLock = undefined
  }
  const finishHiding = (generation: number) => {
    if (!disposed && generation === closeGeneration && !isOpen()) panel.hidden = true
  }
  const tryFocus = (target: HTMLElement | undefined | null) => {
    if (!target?.isConnected) return false
    target.focus()
    return document.activeElement === target
  }
  const focusBeforeInert = (reason: NavigationCloseReason, restoreFocus: boolean) => {
    if (!panel.contains(document.activeElement)) return
    if (reason === 'swup-replace') {
      const stableTarget = document.querySelector<HTMLElement>('#swup-container')
      if (tryFocus(stableTarget)) return
    }
    if ((restoreFocus || activeTrigger) && activeTrigger && !activeTrigger.disabled && tryFocus(activeTrigger)) return
    ;(document.activeElement as HTMLElement | null)?.blur()
  }
  const close = ({ restoreFocus = false, reason = 'default' }: { restoreFocus?: boolean; reason?: NavigationCloseReason } = {}) => {
    if (!isOpen()) {
      releaseBodyLock()
      syncTriggers(false)
      return
    }
    clearHideTimer()
    const generation = ++closeGeneration
    focusBeforeInert(reason, restoreFocus)
    panel.classList.add('float-panel-closed')
    panel.setAttribute('aria-hidden', 'true')
    panel.setAttribute('inert', '')
    syncTriggers(false)
    releaseBodyLock()
    hideTimer = setTimeout(() => finishHiding(generation), HIDE_DELAY_MS)
  }
  const open = (trigger: HTMLButtonElement) => {
    clearHideTimer()
    closeGeneration++
    activeTrigger = trigger
    window.dispatchEvent(new CustomEvent('firefly:overlay-open', { detail: { source: 'navigation-menu' } }))
    releaseScrollLock ??= acquireBodyScrollLock()
    panel.hidden = false
    panel.removeAttribute('inert')
    panel.setAttribute('aria-hidden', 'false')
    panel.classList.remove('float-panel-closed')
    syncTriggers(true)
    panel.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus()
  }
  const focusableItems = () => [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(item => !item.closest('[inert]'))
  const setSubmenuExpanded = (dropdown: Element, expanded: boolean) => {
    const trigger = dropdown.querySelector<HTMLElement>('[data-mobile-dropdown-trigger]')
    const submenu = dropdown.querySelector<HTMLElement>('[data-mobile-submenu]')
    dropdown.setAttribute('data-expanded', String(expanded))
    trigger?.setAttribute('aria-expanded', String(expanded))
    submenu?.setAttribute('aria-hidden', String(!expanded))
    submenu?.toggleAttribute('inert', !expanded)
  }

  panel.addEventListener('transitionend', event => {
    if (event.target !== panel || !HIDE_TRANSITION_PROPERTIES.has(event.propertyName)) return
    clearHideTimer()
    finishHiding(closeGeneration)
  }, { signal })
  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.stopPropagation()
      isOpen() ? close() : open(trigger)
    }, { signal })
  })
  const closeFromOutside = (event: Event) => {
    if (!isOpen() || !(event.target instanceof Node) || panel.contains(event.target)) return
    if (triggers.some(trigger => trigger.contains(event.target as Node))) return
    close()
  }
  document.addEventListener('pointerdown', closeFromOutside, { signal })
  document.addEventListener('click', closeFromOutside, { signal })
  document.addEventListener('keydown', event => {
    if (!isOpen()) return
    if (event.key === 'Escape') {
      event.preventDefault()
      close({ restoreFocus: true })
      return
    }
    if (event.key !== 'Tab') return
    const items = focusableItems()
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }, { signal })
  panel.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a[href]')) close()
  }, { signal })
  window.addEventListener('firefly:overlay-open', event => {
    const source = (event as CustomEvent<{ source?: string }>).detail?.source
    if (source !== 'navigation-menu') close()
  }, { signal })

  const dropdowns = [...panel.querySelectorAll('[data-mobile-dropdown]')]
  dropdowns.forEach(dropdown => {
    setSubmenuExpanded(dropdown, false)
    dropdown.querySelector('[data-mobile-dropdown-trigger]')?.addEventListener('click', event => {
      event.preventDefault()
      const expand = dropdown.getAttribute('data-expanded') !== 'true'
      dropdowns.forEach(other => setSubmenuExpanded(other, other === dropdown && expand))
    }, { signal })
  })

  panel.classList.add('float-panel-closed')
  panel.setAttribute('aria-hidden', 'true')
  panel.setAttribute('inert', '')
  panel.hidden = true
  syncTriggers(false)

  const controller = {
    close,
    dispose: () => {
      disposed = true
      closeGeneration++
      abortController.abort()
      clearHideTimer()
      releaseBodyLock()
      panel.classList.add('float-panel-closed')
      panel.setAttribute('aria-hidden', 'true')
      panel.setAttribute('inert', '')
      panel.hidden = true
      syncTriggers(false)
      if (window.navigationMenuController === controller) delete window.navigationMenuController
    },
  }
  window.navigationMenuController = controller
  return controller
}
