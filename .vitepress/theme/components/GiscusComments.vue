<script setup lang="ts">
import { computed } from 'vue'
import Giscus from '@giscus/vue'

const { term } = defineProps<{
  term: string
}>()

const repo = import.meta.env.VITE_GISCUS_REPO || 'null42/null42.github.io'
const repoId = import.meta.env.VITE_GISCUS_REPO_ID
const category = import.meta.env.VITE_GISCUS_CATEGORY || 'General'
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID
const enabled = Boolean(repo && repoId && categoryId)
const fallbackIssueUrl = computed(() => {
  const encodedTerm = encodeURIComponent(term)
  const title = encodeURIComponent(`文章反馈：${term}`)
  const body = encodeURIComponent(`来源页面：${term}\n\n问题记录：\n- `)
  return `https://github.com/${repo}/issues/new?title=${title}&body=${body}&labels=feedback&source=${encodedTerm}`
})
</script>

<template>
  <section class="kb-comments">
    <h2 class="kb-comments-title">留言</h2>
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
    <div v-else class="kb-comments-note">
      <p>留言区会在配置 Giscus 后变成站内评论。现在可以先用 GitHub Issue 记录这篇文章的问题，标题和来源会自动带上。</p>
      <a :href="fallbackIssueUrl" target="_blank" rel="noreferrer">记录这篇文章的问题</a>
    </div>
  </section>
</template>
