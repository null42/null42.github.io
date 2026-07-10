<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { kbThemeConfig } from '../kb-theme'

const tracks = kbThemeConfig.visualMode.music

const STORAGE_VOLUME = 'kb-music-volume'
const STORAGE_TRACK = 'kb-music-track'
const STORAGE_COLLAPSED = 'kb-music-collapsed'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.6)
const currentIndex = ref(0)
const collapsed = ref(false)
const errorMsg = ref('')

const hasTracks = computed(() => tracks.length > 0)
const currentTrack = computed(() => tracks[currentIndex.value] || null)

function safeRead(key: string, fallback: string): string {
  try {
    return window.localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function safeWrite(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // 静默回退
  }
}

function togglePlay() {
  const audio = audioRef.value
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play().catch(() => {
      errorMsg.value = '播放失败'
      isPlaying.value = false
    })
  }
}

function seek(e: Event) {
  const target = e.target as HTMLInputElement
  const audio = audioRef.value
  if (!audio) return
  const t = (Number(target.value) / 100) * duration.value
  audio.currentTime = t
  currentTime.value = t
}

function changeVolume(e: Event) {
  const target = e.target as HTMLInputElement
  const v = Number(target.value) / 100
  volume.value = v
  if (audioRef.value) audioRef.value.volume = v
  safeWrite(STORAGE_VOLUME, String(v))
}

function prevTrack() {
  if (tracks.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
}

function nextTrack() {
  if (tracks.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % tracks.length
}

function toggleCollapse() {
  collapsed.value = !collapsed.value
  safeWrite(STORAGE_COLLAPSED, String(collapsed.value))
}

function formatTime(s: number): string {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function onLoadedMetadata() {
  const audio = audioRef.value
  if (!audio) return
  duration.value = audio.duration
}

function onTimeUpdate() {
  const audio = audioRef.value
  if (!audio) return
  currentTime.value = audio.currentTime
}

function onPlay() {
  isPlaying.value = true
  errorMsg.value = ''
}

function onPause() {
  isPlaying.value = false
}

function onEnded() {
  nextTrack()
}

function onError() {
  errorMsg.value = '音频加载失败，已跳过'
  isPlaying.value = false
  setTimeout(() => {
    errorMsg.value = ''
    nextTrack()
  }, 2000)
}

watch(currentIndex, () => {
  safeWrite(STORAGE_TRACK, String(currentIndex.value))
  errorMsg.value = ''
  if (isPlaying.value && audioRef.value) {
    audioRef.value.load()
    audioRef.value.play().catch(() => {
      isPlaying.value = false
    })
  }
})

onMounted(() => {
  volume.value = Number(safeRead(STORAGE_VOLUME, '0.6')) || 0.6
  collapsed.value = safeRead(STORAGE_COLLAPSED, 'false') === 'true'
  const trackIdx = Number(safeRead(STORAGE_TRACK, '0')) || 0
  currentIndex.value = tracks.length > 0 ? trackIdx % tracks.length : 0
  const audio = audioRef.value
  if (audio) audio.volume = volume.value
})

onBeforeUnmount(() => {
  const audio = audioRef.value
  if (audio) audio.pause()
})
</script>

<template>
  <div
    v-if="hasTracks"
    class="kb-music-player"
    :class="{ 'is-collapsed': collapsed }"
    role="region"
    aria-label="音乐播放器"
  >
    <audio
      ref="audioRef"
      :src="currentTrack?.src"
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @error="onError"
    />
    <div class="kb-music-player-header">
      <button
        class="kb-music-btn"
        type="button"
        :aria-label="isPlaying ? '暂停' : '播放'"
        @click="togglePlay"
      >
        <svg v-if="!isPlaying" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" />
        </svg>
      </button>
      <div class="kb-music-info">
        <span class="kb-music-title" :title="currentTrack?.title">{{ currentTrack?.title }}</span>
        <span class="kb-music-artist">{{ currentTrack?.artist }}</span>
      </div>
      <button class="kb-music-btn kb-music-btn-sm" type="button" aria-label="上一首" @click="prevTrack">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>
      <button class="kb-music-btn kb-music-btn-sm" type="button" aria-label="下一首" @click="nextTrack">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
        </svg>
      </button>
      <button
        class="kb-music-btn kb-music-btn-sm"
        type="button"
        :aria-label="collapsed ? '展开播放器' : '折叠播放器'"
        @click="toggleCollapse"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path v-if="!collapsed" fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z" />
          <path v-else fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z" />
        </svg>
      </button>
    </div>
    <div v-show="!collapsed" class="kb-music-player-body">
      <div class="kb-music-progress">
        <span class="kb-music-time">{{ formatTime(currentTime) }}</span>
        <input
          class="kb-music-seek"
          type="range"
          min="0"
          max="100"
          :value="duration ? (currentTime / duration) * 100 : 0"
          :aria-label="'进度条 ' + formatTime(currentTime) + ' / ' + formatTime(duration)"
          @input="seek"
        />
        <span class="kb-music-time">{{ formatTime(duration) }}</span>
      </div>
      <div class="kb-music-volume">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02"
          />
        </svg>
        <input
          class="kb-music-volume-seek"
          type="range"
          min="0"
          max="100"
          :value="Math.round(volume * 100)"
          aria-label="音量"
          @input="changeVolume"
        />
      </div>
      <p v-if="errorMsg" class="kb-music-error" role="alert">{{ errorMsg }}</p>
    </div>
  </div>
</template>
