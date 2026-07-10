<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import GiscusComments from './components/GiscusComments.vue'
import VisualModeToggle from './components/VisualModeToggle.vue'
import HomeVisualHero from './components/HomeVisualHero.vue'
import LocalMusicPlayer from './components/LocalMusicPlayer.vue'
import { kbThemeConfig, kbThemeVars } from './kb-theme'
import { useVisualMode } from './useVisualMode'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
const themeVars = kbThemeVars()
const { mode } = useVisualMode()

const isVisual = computed(() => mode.value === 'visual')
const isHome = computed(() => page.value.relativePath === 'index.md')
const showHero = computed(() => isHome.value && isVisual.value)
</script>

<template>
  <div
    class="kb-theme-shell"
    :data-density="kbThemeConfig.layout.density"
    :data-visual-mode="mode"
    :data-page="isHome ? 'home' : 'content'"
    :style="themeVars"
  >
    <Layout>
      <template #nav-bar-content-after>
        <VisualModeToggle />
      </template>
      <template #nav-screen-content-after>
        <div class="kb-mode-toggle-screen">
          <VisualModeToggle />
        </div>
      </template>
      <template #page-top>
        <HomeVisualHero v-if="showHero" />
      </template>
      <template #doc-after>
        <GiscusComments v-if="frontmatter.comments !== false && frontmatter.visibility !== 'encrypted' && page.relativePath.startsWith('content/')" :term="page.relativePath" />
      </template>
      <template #layout-bottom>
        <LocalMusicPlayer v-if="isVisual" />
      </template>
    </Layout>
  </div>
</template>
