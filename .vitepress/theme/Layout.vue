<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import GiscusComments from './components/GiscusComments.vue'
import { kbThemeConfig, kbThemeVars } from './kb-theme'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
const themeVars = kbThemeVars()
</script>

<template>
  <div class="kb-theme-shell" :data-density="kbThemeConfig.layout.density" :style="themeVars">
    <Layout>
      <template #doc-after>
        <GiscusComments v-if="frontmatter.comments !== false && frontmatter.visibility !== 'encrypted' && page.relativePath.startsWith('content/')" :term="page.relativePath" />
      </template>
    </Layout>
  </div>
</template>
