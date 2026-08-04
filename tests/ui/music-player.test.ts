// @vitest-environment happy-dom
import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  bindMusicPlayerView,
  createMusicPlayerStore,
  getGlobalMusicPlayerStore,
  initMusicPlayerViewLifecycle,
  type MusicPlayerAudio,
  type MusicTrack,
} from '../../src/utils/music-player-store'

class FakeAudio extends EventTarget implements MusicPlayerAudio {
  currentTime = 0
  duration = 180
  muted = false
  paused = true
  preload = ''
  src = ''
  volume = 1
  load = vi.fn()
  play = vi.fn(async () => { this.paused = false; this.dispatchEvent(new Event('play')) })
  pause = vi.fn(() => { this.paused = true; this.dispatchEvent(new Event('pause')) })
}

const tracks: MusicTrack[] = [
  { id: 'vivideva', title: "Omg it's ビビデバ", artist: '匕匕亏八（小桃不会系列）', src: '/assets/music/omg-its-vivideva.mp3' },
  { id: 'second', title: 'Second', artist: 'Local', src: '/assets/music/second.mp3', lyrics: '[00:00.00]Line' },
]

afterEach(() => {
  window.musicPlayerViewLifecycle?.dispose()
  delete window.__null42MusicPlayerStore
  window.localStorage.clear()
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('real local music player', () => {
  it('ships only local media and a real music page', () => {
    const config = fs.readFileSync('src/config/musicConfig.ts', 'utf8')
    expect(config).toContain('mode: "local"')
    expect(config).toContain('/assets/music/omg-its-vivideva.mp3')
    expect(config).not.toMatch(/https?:\/\/|meting/i)
    expect(fs.existsSync('public/assets/music/omg-its-vivideva.mp3')).toBe(true)
    expect(fs.existsSync('src/pages/music.astro')).toBe(true)
  })

  it('records the user-provided audio source, transcode, hash, and rights notice', () => {
    const provenancePath = 'reports/music-asset-provenance.json'
    expect(fs.existsSync(provenancePath)).toBe(true)
    const provenance = JSON.parse(fs.readFileSync(provenancePath, 'utf8')) as {
      asset: {
        sourcePath: string
        sourceSha256: string
        targetPath: string
        targetSha256: string
        transformation: string
        authorization: string
        rightsStatus: string
        licenseNoticeReference: string
      }
    }
    expect(provenance.asset.sourcePath).toContain("548-Omg it's ビビデバ")
    expect(provenance.asset.sourcePath).not.toMatch(/^[a-z]:[\\/]/i)
    expect(provenance.asset.sourceSha256).toBe('70da73c54a58f462c2edca8af277f1c92f07567359dd09315bc4a81073a22501')
    expect(provenance.asset.targetPath).toBe('public/assets/music/omg-its-vivideva.mp3')
    const targetHash = createHash('sha256').update(fs.readFileSync(provenance.asset.targetPath)).digest('hex')
    expect(provenance.asset.targetSha256).toBe(targetHash)
    expect(provenance.asset.transformation).toMatch(/ffmpeg|mp3/i)
    expect(provenance.asset.authorization).toContain('2026-07-25')
    expect(provenance.asset.rightsStatus).toMatch(/user-provided|用户提供/i)
    const notices = fs.readFileSync(provenance.asset.licenseNoticeReference, 'utf8')
    expect(notices).toContain('User-provided local music asset')
    expect(notices).toContain(provenance.asset.targetSha256)
  })

  it('does not autoplay before a user gesture', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    expect(audio.src).toContain(tracks[0].src)
    expect(audio.play).not.toHaveBeenCalled()
    expect(store.getState().playing).toBe(false)
  })

  it('supports play, pause, previous, next, and direct selection', async () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    await store.play()
    expect(audio.play).toHaveBeenCalledOnce()
    store.pause()
    expect(audio.pause).toHaveBeenCalledOnce()
    store.next()
    expect(store.getState().currentIndex).toBe(1)
    store.previous()
    expect(store.getState().currentIndex).toBe(0)
    store.select(1)
    expect(store.getState().track.id).toBe('second')
  })

  it('does not let an obsolete play promise override a newer pause intent', async () => {
    const audio = new FakeAudio()
    let resolvePlay!: () => void
    audio.play = vi.fn(() => new Promise<void>((resolve) => { resolvePlay = resolve }))
    const store = createMusicPlayerStore({ tracks, audio })

    const pendingPlay = store.play()
    store.pause()
    resolvePlay()
    await pendingPlay

    expect(store.getState().playing).toBe(false)
  })

  it('lets a second toggle cancel playback while the first play request is pending', async () => {
    const audio = new FakeAudio()
    let resolvePlay!: () => void
    audio.play = vi.fn(() => new Promise<void>((resolve) => { resolvePlay = resolve }))
    const store = createMusicPlayerStore({ tracks, audio })

    const firstToggle = store.toggle()
    await store.toggle()
    expect(audio.pause).toHaveBeenCalledOnce()
    resolvePlay()
    await firstToggle
    expect(store.getState().playing).toBe(false)
  })

  it('keeps playback intent when changing tracks', async () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    await store.play()
    store.next()
    await Promise.resolve()

    expect(store.getState().track.id).toBe('second')
    expect(store.getState().playing).toBe(true)
    expect(audio.play).toHaveBeenCalledTimes(2)
  })

  it('keeps a pending playback intent when changing tracks before play resolves', async () => {
    const audio = new FakeAudio()
    let resolveFirstPlay!: () => void
    audio.play = vi.fn()
      .mockImplementationOnce(() => new Promise<void>((resolve) => { resolveFirstPlay = resolve }))
      .mockImplementationOnce(async () => {
        audio.paused = false
        audio.dispatchEvent(new Event('play'))
      })
    const store = createMusicPlayerStore({ tracks, audio })

    const pendingPlay = store.play()
    store.next()
    await Promise.resolve()
    expect(audio.play).toHaveBeenCalledTimes(2)
    expect(store.getState().track.id).toBe('second')
    expect(store.getState().playing).toBe(true)

    resolveFirstPlay()
    await pendingPlay
    expect(store.getState().track.id).toBe('second')
    expect(store.getState().playing).toBe(true)
  })

  it('supports seek, volume, and mute without leaving valid ranges', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio, volume: 0.7 })
    store.seek(500)
    expect(audio.currentTime).toBe(180)
    store.setVolume(2)
    expect(audio.volume).toBe(1)
    store.setVolume(-1)
    expect(audio.volume).toBe(0)
    store.toggleMute()
    expect(audio.muted).toBe(true)
  })

  it('cycles list, one, and random loop modes and handles ended', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio, random: () => 0 })
    expect(store.getState().loopMode).toBe('list')
    store.cycleLoopMode()
    expect(store.getState().loopMode).toBe('one')
    audio.currentTime = 60
    audio.dispatchEvent(new Event('ended'))
    expect(audio.currentTime).toBe(0)
    store.cycleLoopMode()
    expect(store.getState().loopMode).toBe('random')
    audio.dispatchEvent(new Event('ended'))
    expect(store.getState().currentIndex).toBe(1)
  })

  it('restarts the current track before moving to the previous one', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio, currentIndex: 1 })
    audio.currentTime = 12
    store.previous()
    expect(store.getState().currentIndex).toBe(1)
    expect(audio.currentTime).toBe(0)
  })

  it('reports buffering and ready states', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    audio.dispatchEvent(new Event(`waiting`))
    expect(store.getState().loading).toBe(true)
    audio.dispatchEvent(new Event(`canplay`))
    expect(store.getState().loading).toBe(false)
  })

  it('rejects remote track sources', () => {
    expect(() => createMusicPlayerStore({
      tracks: [{ id: 'remote', title: 'Remote', artist: 'Remote', src: 'https://example.com/song.mp3' }],
      audio: new FakeAudio(),
    })).toThrow(/local/i)
  })

  it('releases view subscriptions without disposing the persistent store', () => {
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)
    listener.mockClear()
    unsubscribe()
    store.next()
    expect(listener).not.toHaveBeenCalled()
    expect(store.getState().track.id).toBe('second')
  })

  it('keeps one global store across page replacement', () => {
    const audio = new FakeAudio()
    const first = getGlobalMusicPlayerStore({ tracks, audio, window })
    first.select(1)
    const second = getGlobalMusicPlayerStore({ tracks, audio: new FakeAudio(), window })
    expect(second).toBe(first)
    expect(second.getState().track.id).toBe('second')
  })

  it('restores safe playback preferences from local storage', () => {
    window.localStorage.setItem('null42:music-player:v1', JSON.stringify({
      currentIndex: 1,
      currentTime: 42,
      loopMode: 'one',
      muted: true,
      volume: 0.35,
    }))
    const audio = new FakeAudio()
    const store = getGlobalMusicPlayerStore({ tracks, audio, window })
    audio.dispatchEvent(new Event('loadedmetadata'))

    expect(store.getState()).toMatchObject({ currentIndex: 1, currentTime: 42, loopMode: 'one', muted: true, volume: 0.35 })
    expect(audio.currentTime).toBe(42)
  })

  it('creates a fresh global store after the previous store is destroyed', () => {
    const first = getGlobalMusicPlayerStore({ tracks, audio: new FakeAudio(), window })
    first.destroy()
    const secondAudio = new FakeAudio()
    const second = getGlobalMusicPlayerStore({ tracks, audio: secondAudio, window })

    expect(second).not.toBe(first)
    expect(second.getAudio()).toBe(secondAudio)
  })

  it('disposes the old view lifecycle and blocks every control after store destruction', () => {
    document.body.innerHTML = '<section data-music-player><button data-music-action="toggle"></button></section>'
    const hooks = { on: vi.fn().mockReturnValue(vi.fn()) }
    const windowRef = Object.assign(window, { swup: { hooks } })
    const firstAudio = new FakeAudio()
    const firstStore = getGlobalMusicPlayerStore({ tracks, audio: firstAudio, window: windowRef })
    const firstLifecycle = initMusicPlayerViewLifecycle({ document, window: windowRef, store: firstStore })
    const firstSource = firstAudio.src
    const firstVolume = firstAudio.volume

    firstStore.destroy()
    firstStore.next()
    firstStore.seek(60)
    firstStore.setVolume(0.2)
    firstStore.toggleMute()
    firstStore.cycleLoopMode()
    expect(firstAudio.src).toBe('')
    expect(firstAudio.currentTime).toBe(0)
    expect(firstAudio.volume).toBe(firstVolume)
    expect(firstAudio.src).not.toBe(firstSource)
    expect(windowRef.musicPlayerViewLifecycle).toBeUndefined()

    const secondAudio = new FakeAudio()
    const secondStore = getGlobalMusicPlayerStore({ tracks, audio: secondAudio, window: windowRef })
    const secondLifecycle = initMusicPlayerViewLifecycle({ document, window: windowRef, store: secondStore })
    expect(secondLifecycle).not.toBe(firstLifecycle)
    document.querySelector<HTMLButtonElement>('[data-music-action="toggle"]')!.click()
    expect(secondAudio.play).toHaveBeenCalledOnce()
    expect(firstAudio.play).not.toHaveBeenCalled()
  })

  it('binds synchronized controls and reports lyrics fallback', async () => {
    document.body.innerHTML = `
      <section data-music-player>
        <button data-music-action="toggle"></button>
        <button data-music-action="next"></button>
        <button data-music-action="mute"></button>
        <input data-music-seek type="range" />
        <input data-music-volume type="range" />
        <span data-music-title></span><span data-music-artist></span>
        <span data-music-current></span><span data-music-duration></span>
        <span data-music-loop></span><div data-music-lyrics></div>
        <p data-music-error role="status"></p>
      </section>`
    const root = document.querySelector<HTMLElement>('[data-music-player]')!
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks: [tracks[0]], audio })
    const dispose = bindMusicPlayerView(root, store)
    root.querySelector<HTMLButtonElement>('[data-music-action="toggle"]')!.click()
    await Promise.resolve()
    expect(audio.play).toHaveBeenCalledOnce()
    expect(root.querySelector('[data-music-title]')?.textContent).toBe(tracks[0].title)
    expect(root.querySelector('[data-music-lyrics]')?.textContent).toMatch(/暂无歌词/)
    dispose()
  })

  it('renders rejected playback and media errors in the live player status', async () => {
    document.body.innerHTML = `
      <section data-music-player>
        <button data-music-action="toggle"></button>
        <p data-music-error role="status"></p>
      </section>`
    const root = document.querySelector<HTMLElement>('[data-music-player]')!
    const audio = new FakeAudio()
    audio.play = vi.fn().mockRejectedValue(new Error('Playback denied'))
    const store = createMusicPlayerStore({ tracks, audio })
    const dispose = bindMusicPlayerView(root, store)

    root.querySelector<HTMLButtonElement>('[data-music-action="toggle"]')!.click()
    await Promise.resolve()
    await Promise.resolve()
    expect(root.querySelector('[data-music-error]')?.textContent).toContain('Playback denied')

    audio.dispatchEvent(new Event('error'))
    expect(root.querySelector('[data-music-error]')?.textContent).toContain('音频加载或解码失败')
    dispose()
  })

  it('installs one Swup hook and replaces only page-scoped view bindings', () => {
    document.body.innerHTML = '<section data-music-player><button data-music-action="toggle"></button></section>'
    const removals = [vi.fn()]
    let contentReplace!: () => void
    const hooks = { on: vi.fn((_name: string, callback: () => void) => { contentReplace = callback; return removals[0] }) }
    const windowRef = Object.assign(window, { swup: { hooks } })
    const audio = new FakeAudio()
    const store = createMusicPlayerStore({ tracks, audio })
    const first = initMusicPlayerViewLifecycle({ document, window: windowRef, store })
    const second = initMusicPlayerViewLifecycle({ document, window: windowRef, store })
    expect(first).toBe(second)
    expect(hooks.on).toHaveBeenCalledOnce()
    expect(hooks.on).toHaveBeenCalledWith('content:replace', expect.any(Function))
    const departedRoot = document.querySelector<HTMLElement>('[data-music-player]')!
    departedRoot.remove()
    const reenteredRoot = document.createElement('section')
    reenteredRoot.dataset.musicPlayer = ''
    reenteredRoot.innerHTML = '<button data-music-action="toggle"></button>'
    document.body.append(reenteredRoot)
    contentReplace()
    departedRoot.querySelector<HTMLButtonElement>('button')!.click()
    expect(audio.play).not.toHaveBeenCalled()
    reenteredRoot.querySelector<HTMLButtonElement>('button')!.click()
    expect(audio.play).toHaveBeenCalledOnce()
    first.dispose()
    expect(removals[0]).toHaveBeenCalledOnce()
  })

  it('attaches the Swup hook once when Swup becomes available after initialization', () => {
    document.body.innerHTML = '<section data-music-player></section>'
    const removal = vi.fn()
    const hooks = { on: vi.fn().mockReturnValue(removal) }
    const windowRef = Object.assign(window, { swup: undefined })
    const store = createMusicPlayerStore({ tracks, audio: new FakeAudio() })
    const lifecycle = initMusicPlayerViewLifecycle({ document, window: windowRef, store })

    Object.assign(windowRef, { swup: { hooks } })
    document.dispatchEvent(new Event('swup:enable'))
    document.dispatchEvent(new Event('swup:enable'))

    expect(hooks.on).toHaveBeenCalledOnce()
    expect(hooks.on).toHaveBeenCalledWith('content:replace', expect.any(Function))
    lifecycle.dispose()
    expect(removal).toHaveBeenCalledOnce()
  })
})
