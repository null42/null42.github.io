<script setup lang="ts">
import Giscus from '@giscus/vue'

defineProps<{
  term: string
}>()

const repo = import.meta.env.VITE_GISCUS_REPO
const repoId = import.meta.env.VITE_GISCUS_REPO_ID
const category = import.meta.env.VITE_GISCUS_CATEGORY || 'General'
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID

const enabled = Boolean(repo && repoId && categoryId)
</script>

<template>
  <section class="kb-comments">
    <Giscus
      v-if="enabled"
      :repo="repo"
      :repo-id="repoId"
      :category="category"
      :category-id="categoryId"
      mapping="specific"
      :term="term"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
    />
    <p v-else class="kb-comments-note">
      留言区会在配置 giscus 后启用。发现问题时，可以先在本地 Markdown 旁记录，后续统一修正。
    </p>
  </section>
</template>
