<script setup lang="ts">
import { computed } from 'vue'
import { useVisualMode } from '../useVisualMode'

const { mode, toggle } = useVisualMode()

const label = computed(() => (mode.value === 'visual' ? '美化' : '简洁'))
const ariaLabel = computed(() =>
  mode.value === 'visual' ? '切换到简洁模式' : '切换到美化模式'
)
const nextMode = computed(() => (mode.value === 'visual' ? 'simple' : 'visual'))
</script>

<template>
  <button
    class="kb-mode-toggle"
    :data-active="mode === 'visual' ? 'true' : 'false'"
    :aria-label="ariaLabel"
    :title="`当前：${label}模式，点击切换到${nextMode === 'visual' ? '美化' : '简洁'}模式`"
    @click="toggle"
  >
    <svg
      v-if="mode === 'visual'"
      class="kb-mode-toggle-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 5.58a.996.996 0 0 0 1.41 0a.996.996 0 0 0 0-1.41L5.99 2.76a.996.996 0 1 0-1.41 1.41l1.41 1.41m12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.41 1.41a.996.996 0 1 0 1.41-1.41l-1.41-1.41m1.41-12.37a.996.996 0 0 0-1.41-1.41L5.99 18.54a.996.996 0 1 0 1.41 1.41L19.77 7.37"
      />
    </svg>
    <svg
      v-else
      class="kb-mode-toggle-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1"
      />
    </svg>
    <span class="kb-mode-toggle-label">{{ label }}</span>
  </button>
</template>
