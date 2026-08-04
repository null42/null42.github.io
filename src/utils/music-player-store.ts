export type MusicLoopMode = 'list' | 'one' | 'random'

export interface MusicTrack {
  id: string
  title: string
  artist: string
  src: string
  cover?: string
  lyrics?: string
}

export interface MusicPlayerAudio extends EventTarget {
  currentTime: number
  duration: number
  muted: boolean
  paused: boolean
  preload: string
  src: string
  volume: number
  load: () => void
  pause: () => void
  play: () => Promise<void>
}

export interface MusicPlayerState {
  currentIndex: number
  currentTime: number
  duration: number
  error?: string
  loopMode: MusicLoopMode
  loading: boolean
  muted: boolean
  playing: boolean
  track: MusicTrack
  tracks: MusicTrack[]
  volume: number
}

export interface MusicPlayerStore {
  cycleLoopMode: () => void
  destroy: () => void
  getAudio: () => MusicPlayerAudio
  getState: () => MusicPlayerState
  next: () => void
  pause: () => void
  play: () => Promise<void>
  previous: () => void
  seek: (seconds: number) => void
  select: (index: number) => void
  setVolume: (volume: number) => void
  subscribe: (listener: (state: MusicPlayerState) => void) => () => void
  toggle: () => Promise<void>
  toggleMute: () => void
}

interface StoreOptions {
  audio?: MusicPlayerAudio
  currentIndex?: number
  currentTime?: number
  loopMode?: MusicLoopMode
  muted?: boolean
  onDestroy?: () => void
  random?: () => number
  tracks: MusicTrack[]
  volume?: number
}

type MusicPlayerWindow = Window & {
  __null42MusicPlayerStore?: MusicPlayerStore
  musicPlayerViewLifecycle?: MusicPlayerViewLifecycle
  swup?: { hooks?: { on: (name: 'content:replace', callback: () => void) => (() => void) | void } }
}

interface GlobalStoreOptions extends StoreOptions {
  window?: MusicPlayerWindow
}

interface ViewLifecycleOptions {
  document?: Document
  store?: MusicPlayerStore
  window?: MusicPlayerWindow
}

export interface MusicPlayerViewLifecycle {
  dispose: () => void
  store: MusicPlayerStore
  sync: () => void
}

declare global {
  interface Window {
    __null42MusicPlayerStore?: MusicPlayerStore
    musicPlayerViewLifecycle?: MusicPlayerViewLifecycle
  }
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const MUSIC_PLAYER_STORAGE_KEY = 'null42:music-player:v1'

interface MusicPlayerSnapshot {
  currentIndex?: number
  currentTime?: number
  loopMode?: MusicLoopMode
  muted?: boolean
  volume?: number
}

function requireLocalTrack(track: MusicTrack): MusicTrack {
  if (!track.src.startsWith('/') || track.src.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(track.src)) {
    throw new Error(`Music track must use a local source: ${track.src}`)
  }
  for (const optionalSource of [track.cover]) {
    if (optionalSource && (!optionalSource.startsWith('/') || optionalSource.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(optionalSource))) {
      throw new Error(`Music track must use a local asset: ${optionalSource}`)
    }
  }
  return { ...track }
}

function createBrowserAudio(): MusicPlayerAudio {
  const audio = new Audio()
  audio.setAttribute('data-null42-music-audio', '')
  audio.style.display = 'none'
  document.body.appendChild(audio)
  return audio
}

export function createMusicPlayerStore({
  audio: providedAudio,
  currentIndex = 0,
  currentTime = 0,
  loopMode = 'list',
  muted = false,
  onDestroy,
  random = Math.random,
  tracks: inputTracks,
  volume = 0.7,
}: StoreOptions): MusicPlayerStore {
  const ownsAudio = !providedAudio
  const audio = providedAudio ?? createBrowserAudio()
  const tracks = inputTracks.map(requireLocalTrack)
  if (tracks.length === 0) throw new Error('Music player requires at least one local track')
  const listeners = new Set<(state: MusicPlayerState) => void>()
  let destroyed = false
  let playbackRequested = false
  let playOperation = 0
  let pendingInitialTime = Number.isFinite(currentTime) ? Math.max(0, currentTime) : 0
  const initialIndex = Number.isInteger(currentIndex) ? (currentIndex + tracks.length) % tracks.length : 0
  let state: MusicPlayerState = {
    currentIndex: initialIndex,
    currentTime: pendingInitialTime,
    duration: Number.isFinite(audio.duration) ? audio.duration : 0,
    loopMode,
    loading: true,
    muted,
    playing: false,
    track: tracks[initialIndex],
    tracks,
    volume: clamp(volume, 0, 1),
  }

  audio.preload = 'metadata'
  audio.muted = state.muted
  audio.volume = state.volume
  audio.src = state.track.src
  audio.load()

  const publish = (patch: Partial<MusicPlayerState> = {}) => {
    state = { ...state, ...patch }
    for (const listener of listeners) listener(state)
  }
  const loadTrack = (index: number, resume = playbackRequested) => {
    if (destroyed) return
    const normalizedIndex = (index + tracks.length) % tracks.length
    pendingInitialTime = 0
    playOperation += 1
    audio.pause()
    audio.src = tracks[normalizedIndex].src
    audio.currentTime = 0
    audio.load()
    publish({
      currentIndex: normalizedIndex,
      currentTime: 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      error: undefined,
      loading: true,
      playing: false,
      track: tracks[normalizedIndex],
    })
    if (resume) void play()
  }
  const play = async () => {
    if (destroyed) return
    playbackRequested = true
    const operation = ++playOperation
    try {
      await audio.play()
      if (destroyed || operation !== playOperation) return
      publish({ error: undefined, playing: true })
    } catch (error) {
      if (destroyed || operation !== playOperation) return
      playbackRequested = false
      publish({ error: error instanceof Error ? error.message : '播放失败', loading: false, playing: false })
    }
  }
  const pause = () => {
    if (destroyed) return
    playbackRequested = false
    playOperation += 1
    audio.pause()
    publish({ playing: false })
  }
  const ended = () => {
    if (state.loopMode === 'one') {
      audio.currentTime = 0
      void play()
      return
    }
    const randomIndex = Math.floor(clamp(random(), 0, 0.999999) * tracks.length)
    const nextIndex = state.loopMode === 'random'
      ? tracks.length > 1 && randomIndex === state.currentIndex
        ? (randomIndex + 1) % tracks.length
        : randomIndex
      : state.currentIndex + 1
    loadTrack(nextIndex, true)
  }
  const syncTime = () => publish({
    currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
    duration: Number.isFinite(audio.duration) ? audio.duration : 0,
  })
  const syncPlay = () => publish({ loading: false, playing: true })
  const syncPause = () => publish({ playing: false })
  const syncVolume = () => publish({ muted: audio.muted, volume: audio.volume })
  const syncError = () => {
    playbackRequested = false
    publish({ error: '音频加载或解码失败', loading: false, playing: false })
  }
  const syncLoading = () => publish({ loading: true })
  const syncReady = () => {
    if (pendingInitialTime > 0) {
      const duration = Number.isFinite(audio.duration) ? audio.duration : pendingInitialTime
      audio.currentTime = clamp(pendingInitialTime, 0, duration)
      pendingInitialTime = 0
    }
    publish({
      currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      loading: false,
    })
  }

  audio.addEventListener('ended', ended)
  audio.addEventListener('timeupdate', syncTime)
  audio.addEventListener('durationchange', syncTime)
  audio.addEventListener('loadedmetadata', syncReady)
  audio.addEventListener('loadstart', syncLoading)
  audio.addEventListener('waiting', syncLoading)
  audio.addEventListener('canplay', syncReady)
  audio.addEventListener('play', syncPlay)
  audio.addEventListener('pause', syncPause)
  audio.addEventListener('volumechange', syncVolume)
  audio.addEventListener('error', syncError)

  return {
    getAudio: () => audio,
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      listener(state)
      return () => listeners.delete(listener)
    },
    play,
    pause,
    async toggle() {
      if (playbackRequested) pause()
      else await play()
    },
    previous() {
      if (destroyed) return
      if (audio.currentTime > 3) {
        audio.currentTime = 0
        syncTime()
        return
      }
      loadTrack(state.currentIndex - 1)
    },
    next() { if (!destroyed) loadTrack(state.currentIndex + 1) },
    select(index) {
      if (destroyed) return
      if (!Number.isInteger(index) || index < 0 || index >= tracks.length) return
      loadTrack(index)
    },
    seek(seconds) {
      if (destroyed) return
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0
      audio.currentTime = clamp(seconds, 0, duration)
      syncTime()
    },
    setVolume(nextVolume) {
      if (destroyed) return
      audio.volume = clamp(nextVolume, 0, 1)
      if (audio.volume > 0) audio.muted = false
      syncVolume()
    },
    toggleMute() {
      if (destroyed) return
      audio.muted = !audio.muted
      syncVolume()
    },
    cycleLoopMode() {
      if (destroyed) return
      const modes: MusicLoopMode[] = ['list', 'one', 'random']
      publish({ loopMode: modes[(modes.indexOf(state.loopMode) + 1) % modes.length] })
    },
    destroy() {
      if (destroyed) return
      destroyed = true
      playbackRequested = false
      playOperation += 1
      listeners.clear()
      audio.pause()
      audio.removeEventListener('ended', ended)
      audio.removeEventListener('timeupdate', syncTime)
      audio.removeEventListener('durationchange', syncTime)
      audio.removeEventListener('loadedmetadata', syncReady)
      audio.removeEventListener('loadstart', syncLoading)
      audio.removeEventListener('waiting', syncLoading)
      audio.removeEventListener('canplay', syncReady)
      audio.removeEventListener('play', syncPlay)
      audio.removeEventListener('pause', syncPause)
      audio.removeEventListener('volumechange', syncVolume)
      audio.removeEventListener('error', syncError)
      audio.src = ''
      audio.load()
      if (ownsAudio && audio instanceof HTMLElement) audio.remove()
      onDestroy?.()
    },
  }
}

export function getGlobalMusicPlayerStore(options: GlobalStoreOptions): MusicPlayerStore {
  const windowRef = options.window ?? window as MusicPlayerWindow
  if (windowRef.__null42MusicPlayerStore) return windowRef.__null42MusicPlayerStore
  const storage = getMusicPlayerStorage(windowRef)
  const snapshot = readMusicPlayerSnapshot(storage)
  let persistTimer: ReturnType<typeof setTimeout> | undefined
  let unsubscribePersistence: (() => void) | undefined
  let store: MusicPlayerStore
  const persist = () => {
    if (!storage || !store) return
    const state = store.getState()
    try {
      storage.setItem(MUSIC_PLAYER_STORAGE_KEY, JSON.stringify({
        currentIndex: state.currentIndex,
        currentTime: state.currentTime,
        loopMode: state.loopMode,
        muted: state.muted,
        volume: state.volume,
      } satisfies MusicPlayerSnapshot))
    } catch {}
  }
  const queuePersist = () => {
    if (persistTimer) clearTimeout(persistTimer)
    persistTimer = setTimeout(persist, 500)
  }
  store = createMusicPlayerStore({
    ...options,
    currentIndex: snapshot.currentIndex,
    currentTime: snapshot.currentTime,
    loopMode: snapshot.loopMode ?? options.loopMode,
    muted: snapshot.muted,
    volume: snapshot.volume ?? options.volume,
    onDestroy: () => {
      if (persistTimer) clearTimeout(persistTimer)
      persist()
      unsubscribePersistence?.()
      windowRef.removeEventListener('pagehide', persist)
      if (windowRef.musicPlayerViewLifecycle?.store === store) {
        windowRef.musicPlayerViewLifecycle.dispose()
      }
      if (windowRef.__null42MusicPlayerStore === store) delete windowRef.__null42MusicPlayerStore
    },
  })
  unsubscribePersistence = store.subscribe(queuePersist)
  windowRef.addEventListener('pagehide', persist)
  windowRef.__null42MusicPlayerStore = store
  return store
}

function getMusicPlayerStorage(windowRef: MusicPlayerWindow): Storage | undefined {
  try {
    return windowRef.localStorage
  } catch {
    return undefined
  }
}

function readMusicPlayerSnapshot(storage: Storage | undefined): MusicPlayerSnapshot {
  if (!storage) return {}
  try {
    const value = JSON.parse(storage.getItem(MUSIC_PLAYER_STORAGE_KEY) || '{}') as MusicPlayerSnapshot
    if (!value || typeof value !== 'object') return {}
    return {
      currentIndex: Number.isInteger(value.currentIndex) ? value.currentIndex : undefined,
      currentTime: Number.isFinite(value.currentTime) ? value.currentTime : undefined,
      loopMode: value.loopMode && ['list', 'one', 'random'].includes(value.loopMode) ? value.loopMode : undefined,
      muted: typeof value.muted === 'boolean' ? value.muted : undefined,
      volume: Number.isFinite(value.volume) ? clamp(value.volume!, 0, 1) : undefined,
    }
  } catch {
    return {}
  }
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

const lyricCache = new Map<string, Array<{ time: number; text: string }>>()

function currentLyric(track: MusicTrack, currentTime: number): string {
  if (!track.lyrics?.trim()) return '暂无歌词'
  let lines = lyricCache.get(track.id)
  if (!lines) {
    lines = track.lyrics.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/)
      if (!match) return []
      const fraction = match[3] ? Number(`0.${match[3]}`) : 0
      return [{ time: Number(match[1]) * 60 + Number(match[2]) + fraction, text: match[4].trim() }]
    }).filter(line => line.text)
    lyricCache.set(track.id, lines)
  }
  let active = lines[0]?.text ?? '暂无歌词'
  for (const line of lines) {
    if (line.time > currentTime) break
    active = line.text
  }
  return active
}

export function bindMusicPlayerView(root: HTMLElement, store: MusicPlayerStore): () => void {
  const eventController = new AbortController()
  const title = root.querySelector<HTMLElement>('[data-music-title]')
  const artist = root.querySelector<HTMLElement>('[data-music-artist]')
  const current = root.querySelector<HTMLElement>('[data-music-current]')
  const duration = root.querySelector<HTMLElement>('[data-music-duration]')
  const loop = root.querySelector<HTMLElement>('[data-music-loop]')
  const lyrics = root.querySelector<HTMLElement>('[data-music-lyrics]')
  const errorStatus = root.querySelector<HTMLElement>('[data-music-error]')
  const seek = root.querySelector<HTMLInputElement>('[data-music-seek]')
  const volume = root.querySelector<HTMLInputElement>('[data-music-volume]')
  const toggle = root.querySelector<HTMLButtonElement>('[data-music-action="toggle"]')
  const mute = root.querySelector<HTMLButtonElement>('[data-music-action="mute"]')

  const loadingStatus = root.querySelector<HTMLElement>(`[data-music-loading]`)
  const trackItems = [...root.querySelectorAll<HTMLElement>(`[data-track-index]`)]

  const unsubscribe = store.subscribe((state) => {
    root.dataset.musicPlaying = String(state.playing)
    root.dataset.musicLoading = String(state.loading)
    root.setAttribute(`aria-busy`, String(state.loading))
    if (title) title.textContent = state.track.title
    if (artist) artist.textContent = state.track.artist
    if (current) current.textContent = formatTime(state.currentTime)
    if (duration) duration.textContent = formatTime(state.duration)
    if (loop) loop.textContent = ({ list: `列表`, one: `单曲`, random: `随机` } as const)[state.loopMode]
    if (loadingStatus) loadingStatus.hidden = !state.loading
    if (lyrics) lyrics.textContent = currentLyric(state.track, state.currentTime)
    if (errorStatus) {
      errorStatus.textContent = state.error ?? ''
      errorStatus.hidden = !state.error
    }
    if (seek) {
      seek.max = String(Math.max(0, state.duration))
      seek.value = String(Math.min(state.currentTime, state.duration || 0))
    }
    if (volume) volume.value = String(state.volume)
    toggle?.setAttribute('aria-pressed', String(state.playing))
    toggle?.setAttribute('aria-label', state.playing ? '暂停' : '播放')
    if (toggle) toggle.textContent = state.playing ? '⏸' : '▶'
    mute?.setAttribute('aria-pressed', String(state.muted))
    trackItems.forEach((item) => {
      item.toggleAttribute('data-active', Number(item.dataset.trackIndex) === state.currentIndex)
    })
  })

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const trackButton = target.closest<HTMLElement>('[data-track-index]')
    if (trackButton) {
      store.select(Number(trackButton.dataset.trackIndex))
      return
    }
    const action = target.closest<HTMLElement>('[data-music-action]')?.dataset.musicAction
    if (action === 'toggle') void store.toggle()
    if (action === 'previous') store.previous()
    if (action === 'next') store.next()
    if (action === 'mute') store.toggleMute()
    if (action === 'loop') store.cycleLoopMode()
  }, { signal: eventController.signal })
  seek?.addEventListener('input', () => store.seek(Number(seek.value)), { signal: eventController.signal })
  volume?.addEventListener('input', () => store.setVolume(Number(volume.value)), { signal: eventController.signal })

  return () => {
    eventController.abort()
    unsubscribe()
  }
}

export function initMusicPlayerViewLifecycle({
  document: documentRef = document,
  store = (window as MusicPlayerWindow).__null42MusicPlayerStore!,
  window: windowRef = window as MusicPlayerWindow,
}: ViewLifecycleOptions = {}): MusicPlayerViewLifecycle {
  if (windowRef.musicPlayerViewLifecycle?.store === store) return windowRef.musicPlayerViewLifecycle
  windowRef.musicPlayerViewLifecycle?.dispose()
  if (!store) throw new Error('Music player store is not initialized')
  const bindings = new Map<HTMLElement, () => void>()
  const lifecycleController = new AbortController()
  let removeHook: (() => void) | undefined
  let hookAttached = false
  const sync = () => {
    for (const [root, dispose] of bindings) {
      if (root.isConnected) continue
      dispose()
      bindings.delete(root)
    }
    documentRef.querySelectorAll<HTMLElement>('[data-music-player]').forEach((root) => {
      if (!bindings.has(root)) bindings.set(root, bindMusicPlayerView(root, store))
    })
  }
  sync()
  const attachSwupHook = () => {
    if (hookAttached) return
    const hooks = windowRef.swup?.hooks
    if (!hooks) return
    const remove = hooks.on('content:replace', sync)
    if (typeof remove === 'function') removeHook = remove
    hookAttached = true
  }
  attachSwupHook()
  if (!hookAttached) {
    documentRef.addEventListener('swup:enable', attachSwupHook, {
      once: true,
      signal: lifecycleController.signal,
    })
  }
  const lifecycle: MusicPlayerViewLifecycle = {
    store,
    sync,
    dispose() {
      lifecycleController.abort()
      removeHook?.()
      for (const dispose of bindings.values()) dispose()
      bindings.clear()
      if (windowRef.musicPlayerViewLifecycle === lifecycle) delete windowRef.musicPlayerViewLifecycle
    },
  }
  windowRef.musicPlayerViewLifecycle = lifecycle
  return lifecycle
}
