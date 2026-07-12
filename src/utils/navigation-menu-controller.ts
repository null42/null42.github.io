export interface NavigationMenuController {
  dispose: () => void
  close: (options?: { restoreFocus?: boolean }) => void
}

const PANEL_ID = 'nav-menu-panel'
const TRIGGER_IDS = ['nav-menu-switch', 'mobile-dock-menu']

export function initNavigationMenu(): NavigationMenuController | undefined {
  window.navigationMenuController?.dispose()

  const panel = document.getElementById(PANEL_ID)
  const triggers = TRIGGER_IDS
    .map(id => document.getElementById(id))
    .filter((element): element is HTMLButtonElement => element instanceof HTMLButtonElement)
  if (!panel || triggers.length === 0) return undefined

  const abortController = new AbortController()
  const { signal } = abortController
  let activeTrigger: HTMLButtonElement | undefined
  let hideTimer: ReturnType<typeof setTimeout> | undefined

  const isOpen = () => !panel.classList.contains('float-panel-closed')
  const syncTriggers = (open: boolean) => {
    triggers.forEach(trigger => trigger.setAttribute('aria-expanded', String(open)))
  }
  const finishHiding = () => {
    if (!isOpen()) panel.hidden = true
  }
  const close = ({ restoreFocus = false } = {}) => {
    if (!isOpen()) return
    panel.classList.add('float-panel-closed')
    panel.setAttribute('aria-hidden', 'true')
    panel.setAttribute('inert', '')
    syncTriggers(false)
    hideTimer = setTimeout(finishHiding, 300)
    if (restoreFocus) activeTrigger?.focus()
  }
  const open = (trigger: HTMLButtonElement) => {
    if (hideTimer) clearTimeout(hideTimer)
    activeTrigger = trigger
    panel.hidden = false
    panel.removeAttribute('inert')
    panel.setAttribute('aria-hidden', 'false')
    panel.classList.remove('float-panel-closed')
    syncTriggers(true)
  }

  panel.addEventListener('transitionend', finishHiding, { signal })
  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.stopPropagation()
      isOpen() ? close() : open(trigger)
    }, { signal })
  })
  document.addEventListener('click', event => {
    if (isOpen() && event.target instanceof Node && !panel.contains(event.target)) close()
  }, { signal })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) close({ restoreFocus: true })
  }, { signal })

  panel.classList.add('float-panel-closed')
  panel.setAttribute('aria-hidden', 'true')
  panel.setAttribute('inert', '')
  panel.hidden = true
  syncTriggers(false)

  const controller = {
    close,
    dispose: () => {
      abortController.abort()
      if (hideTimer) clearTimeout(hideTimer)
      if (window.navigationMenuController === controller) delete window.navigationMenuController
    },
  }
  window.navigationMenuController = controller
  return controller
}
