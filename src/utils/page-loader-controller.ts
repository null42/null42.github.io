export type LoaderMode = 'initial' | 'transition'

type SwupHooks = {
  on: (name: 'visit:start' | 'page:view', callback: () => void) => (() => void) | void
}

type PageLoaderWindow = Window & {
  swup?: { hooks?: SwupHooks }
  pageLoaderLifecycle?: PageLoaderLifecycle
}

export interface PageLoaderController {
  dispose: () => void
  hideWhenReady: (reason: LoaderMode) => Promise<boolean>
  isVisible: () => boolean
  show: (mode: LoaderMode) => number
}

export interface PageLoaderLifecycle {
  controller: PageLoaderController
  dispose: () => void
}

interface ControllerOptions {
  document?: Document
  fadeDuration?: number
  hideDelay?: number
  maxWait?: number
  reducedMotion?: boolean
  transitionHideDelay?: number
  waitForReady?: (context: { reason: LoaderMode; token: number }) => Promise<void>
}

interface LifecycleOptions extends ControllerOptions {
  window?: PageLoaderWindow
}

const delay = (milliseconds: number) => new Promise<void>((resolve) => globalThis.setTimeout(resolve, milliseconds))

function waitForImage(image: HTMLImageElement): Promise<void> {
  if (image.complete || image.loading === 'lazy') return Promise.resolve()
  return new Promise((resolveImage) => {
    image.addEventListener('load', () => resolveImage(), { once: true })
    image.addEventListener('error', () => resolveImage(), { once: true })
  })
}

export async function waitForBrowserPageReady(documentRef: Document): Promise<void> {
  if (documentRef.readyState === 'loading') {
    await new Promise<void>((resolveReady) => {
      documentRef.addEventListener('DOMContentLoaded', () => resolveReady(), { once: true })
    })
  }
  const criticalImages = Array.from(documentRef.querySelectorAll<HTMLImageElement>('main img, #swup-container img'))
    .filter((image) => image.fetchPriority === 'high' || image.getAttribute('fetchpriority') === 'high')
  await Promise.all([
    ...criticalImages.map(waitForImage),
    documentRef.fonts?.ready ?? Promise.resolve(),
  ])
}

function applyVisibleState(documentRef: Document, loader: HTMLElement, mode: LoaderMode, reducedMotion: boolean): void {
  loader.hidden = false
  loader.dataset.loaderMode = mode
  loader.dataset.reducedMotion = String(reducedMotion)
  loader.classList.remove('page-loader--hidden')
  loader.classList.add('page-loader--visible')
  documentRef.documentElement.classList.add('is-page-loading')
  documentRef.body?.setAttribute('aria-busy', 'true')
}

function beginHiddenState(documentRef: Document, loader: HTMLElement): void {
  loader.classList.remove('page-loader--visible')
  loader.classList.add('page-loader--hidden')
  documentRef.documentElement.classList.remove('is-page-loading')
  documentRef.body?.removeAttribute('aria-busy')
}

function finishHiddenState(loader: HTMLElement): void {
  loader.hidden = true
}

export function createPageLoaderController({
  document: documentRef = document,
  fadeDuration = 420,
  hideDelay = 180,
  maxWait = 300,
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  transitionHideDelay = 90,
  waitForReady = () => waitForBrowserPageReady(documentRef),
}: ControllerOptions = {}): PageLoaderController {
  const loader = documentRef.getElementById('page-loader')
  if (!loader) throw new Error('Page loader element is missing')
  let token = 0
  let visible = false
  let disposed = false

  const hide = async (currentToken: number): Promise<boolean> => {
    if (disposed || !visible || currentToken !== token) return false
    visible = false
    beginHiddenState(documentRef, loader)
    if (!reducedMotion && fadeDuration > 0) await delay(fadeDuration)
    if (disposed || visible || currentToken !== token) return false
    finishHiddenState(loader)
    return true
  }

  const show = (mode: LoaderMode): number => {
    if (disposed) return token
    token += 1
    visible = true
    applyVisibleState(documentRef, loader, mode, reducedMotion)
    return token
  }

  const hideWhenReady = async (reason: LoaderMode): Promise<boolean> => {
    const currentToken = token
    if (reason === 'transition') {
      if (!reducedMotion && transitionHideDelay > 0) await delay(transitionHideDelay)
      return hide(currentToken)
    }
    const settledBy = await Promise.race([
      Promise.resolve(waitForReady({ reason, token: currentToken })).catch(() => undefined).then(() => 'ready' as const),
      delay(maxWait).then(() => 'timeout' as const),
    ])
    if (settledBy === 'ready' && !reducedMotion && hideDelay > 0) await delay(hideDelay)
    return hide(currentToken)
  }

  return {
    show,
    hideWhenReady,
    isVisible: () => visible,
    dispose: () => {
      if (disposed) return
      disposed = true
      token += 1
      visible = false
      beginHiddenState(documentRef, loader)
      finishHiddenState(loader)
    },
  }
}

export function initPageLoaderLifecycle({
  document: documentRef = document,
  window: windowRef = window as PageLoaderWindow,
  ...controllerOptions
}: LifecycleOptions = {}): PageLoaderLifecycle | undefined {
  if (windowRef.pageLoaderLifecycle) return windowRef.pageLoaderLifecycle
  const loader = documentRef.getElementById('page-loader')
  if (!loader) return undefined

  const controller = createPageLoaderController({ document: documentRef, ...controllerOptions })
  const abortController = new AbortController()
  const removeHooks: Array<() => void> = []
  let hooksAttached = false

  const attachSwupHooks = () => {
    if (hooksAttached || !windowRef.swup?.hooks) return
    hooksAttached = true
    const removeVisitStart = windowRef.swup.hooks.on('visit:start', () => controller.show('transition'))
    const removePageView = windowRef.swup.hooks.on('page:view', () => { void controller.hideWhenReady('transition') })
    if (typeof removeVisitStart === 'function') removeHooks.push(removeVisitStart)
    if (typeof removePageView === 'function') removeHooks.push(removePageView)
  }

  attachSwupHooks()
  if (!hooksAttached) documentRef.addEventListener('swup:enable', attachSwupHooks, { once: true, signal: abortController.signal })

  const lifecycle: PageLoaderLifecycle = {
    controller,
    dispose: () => {
      abortController.abort()
      for (const removeHook of removeHooks.splice(0)) removeHook()
      controller.dispose()
      if (windowRef.pageLoaderLifecycle === lifecycle) delete windowRef.pageLoaderLifecycle
    },
  }
  windowRef.pageLoaderLifecycle = lifecycle
  controller.show('initial')
  void controller.hideWhenReady('initial')
  return lifecycle
}
