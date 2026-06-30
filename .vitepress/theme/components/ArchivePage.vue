<script setup lang="ts">
import { computed, ref } from 'vue'
import articles from '../../generated/articles.json'

interface Article {
  title: string
  date: string
  category: string
  tags: string[]
  summary: string
  url: string
  body: string
}

const query = ref('')
const category = ref('全部')
const month = ref('全部')

const typedArticles = articles as Article[]
const categories = computed(() => ['全部', ...Array.from(new Set(typedArticles.map((article) => article.category))).sort()])
const months = computed(() => [
  '全部',
  ...Array.from(new Set(typedArticles.map((article) => article.date.slice(0, 7))))
    .sort()
    .reverse()
])

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return typedArticles.filter((article) => {
    const matchesCategory = category.value === '全部' || article.category === category.value
    const matchesMonth = month.value === '全部' || article.date.startsWith(month.value)
    const haystack = [article.title, article.summary, article.category, ...article.tags, article.body].join(' ').toLowerCase()
    const matchesQuery = !needle || haystack.includes(needle)
    return matchesCategory && matchesMonth && matchesQuery
  })
})
</script>

<template>
  <section class="kb-archive">
    <div class="kb-filterbar">
      <input v-model="query" class="kb-search-input" aria-label="关键词搜索" title="搜索 Buck / FOC / SVPWM / 采样时序" />
      <select v-model="category" class="kb-select" aria-label="分类">
        <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="month" class="kb-select" aria-label="时间">
        <option v-for="item in months" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="kb-result-count">{{ filtered.length }} 篇文章</div>

    <div class="kb-article-list">
      <a v-for="article in filtered" :key="article.url" class="kb-article-card" :href="article.url">
        <span class="kb-article-date">{{ article.date }}</span>
        <strong>{{ article.title }}</strong>
        <span class="kb-article-summary">{{ article.summary }}</span>
        <span class="kb-tags">
          <span v-for="tag in article.tags" :key="tag" class="kb-tag">{{ tag }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
