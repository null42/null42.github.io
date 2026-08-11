import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const reader = fs.readFileSync('src/components/private-reader/readers/ReaderHost.astro', 'utf8')

describe('private reader reading controls', () => {
  it('offers persistent typography and view preferences', () => {
    expect(reader).toContain('data-font-family')
    expect(reader).toContain('data-content-width')
    expect(reader).toContain('data-view-mode')
    expect(reader).toContain('applyFontFamily')
    expect(reader).toContain('applyContentWidth')
    expect(reader).toContain('applyViewMode')
    expect(reader).toContain('private-reader:prefs')
  })

  it('supports paged navigation and restores horizontal position', () => {
    expect(reader).toContain('data-view-mode="paged"')
    expect(reader).toContain('movePagedPage')
    expect(reader).toContain('scrollLeft: readerBody?.scrollLeft || 0')
    expect(reader).toContain('Number.isFinite(saved.scrollLeft)')
  })

  it('cancels narration during chapter changes and cleanup', () => {
    expect(reader).toContain('data-btn-tts')
    expect(reader).toContain('new SpeechSynthesisUtterance(text)')
    expect(reader).toContain('window.speechSynthesis.cancel()')
    expect(reader.match(/stopReading\(\)/g)?.length).toBeGreaterThanOrEqual(3)
  })

  it('provides fullscreen reading with a fallback state', () => {
    expect(reader).toContain('data-btn-fullscreen')
    expect(reader).toContain('requestFullscreen')
    expect(reader).toContain('fullscreenchange')
    expect(reader).toContain('data-reader-fullscreen')
  })

  it('uses opaque reader and settings surfaces', () => {
    expect(reader).toContain('--reader-bg: #ffffff')
    expect(reader).toContain('background: var(--reader-bg)')
    expect(reader).toContain('background: var(--card-bg, #ffffff)')
  })
})
