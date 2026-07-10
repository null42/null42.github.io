<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { kbThemeConfig } from '../kb-theme'
import { resolveImageIndex, readManualOffset, writeManualOffset } from '../daily-image'

const gallery = kbThemeConfig.visualMode.gallery

const manualOffset = ref(0)
const loaded = ref(false)
const failed = ref(false)
const currentIndex = ref(0)

const currentImage = computed(() => {
  if (gallery.length === 0) return null
  return gallery[currentIndex.value] || null
})

const heroStyle = computed(() => {
  if (!currentImage.value || failed.value) return {}
  return {
    backgroundImage: `url(${currentImage.value.src})`,
    backgroundPosition: currentImage.value.position
  }
})

function recalcIndex() {
  if (gallery.length === 0) {
    currentIndex.value = 0
    return
  }
  const idx = resolveImageIndex(gallery.length, manualOffset.value)
  currentIndex.value = idx >= 0 ? idx : 0
}

function nextImage() {
  if (gallery.length === 0) return
  manualOffset.value += 1
  writeManualOffset(manualOffset.value)
  loaded.value = false
  failed.value = false
  recalcIndex()
}

function onImageLoad() {
  loaded.value = true
  failed.value = false
}

function onImageError() {
  failed.value = true
  loaded.value = true
}

/** 预加载图片以判断加载状态 */
function preload(src: string) {
  loaded.value = false
  failed.value = false
  const img = new Image()
  img.onload = onImageLoad
  img.onerror = onImageError
  img.src = src
}

onMounted(() => {
  manualOffset.value = readManualOffset()
  recalcIndex()
  if (currentImage.value) preload(currentImage.value.src)
})

watch(currentIndex, () => {
  if (currentImage.value) preload(currentImage.value.src)
})
</script>

<template>
  <section
    v-if="gallery.length > 0"
    class="kb-home-hero"
    :class="{ 'is-loading': !loaded, 'is-failed': failed }"
    :style="heroStyle"
    :aria-label="currentImage?.alt || '首页背景'"
  >
    <div class="kb-home-hero-media" aria-hidden="true" />
    <div class="kb-home-hero-content">
      <h1 class="kb-home-hero-title">lx 的个人知识库</h1>
      <p class="kb-home-hero-subtitle">
        电源控制 · 电机控制 · 仿真与工程学习记录
      </p>
      <div class="kb-home-hero-actions">
        <a class="kb-home-hero-btn kb-home-hero-btn-primary" href="/content/motor/getting-started.html">
          开始学习
        </a>
        <a class="kb-home-hero-btn kb-home-hero-btn-ghost" href="/archive.html">
          浏览文章库
        </a>
      </div>
    </div>
    <button
      v-if="gallery.length > 1"
      class="kb-hero-next"
      type="button"
      aria-label="切换下一张背景图"
      title="下一张"
      @click="nextImage"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
      </svg>
    </button>
  </section>
</template>
