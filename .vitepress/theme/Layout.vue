<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import GiscusComments from './components/GiscusComments.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <GiscusComments v-if="frontmatter.comments !== false && frontmatter.visibility !== 'encrypted' && page.relativePath.startsWith('content/')" :term="page.relativePath" />
    </template>
  </Layout>
</template>
