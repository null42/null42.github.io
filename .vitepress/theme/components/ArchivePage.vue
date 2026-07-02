<script setup lang="ts">
import { computed, ref } from 'vue'
import articles from '../../generated/articles.json'

interface Article {
  title: string
  date: string
  section?: string
  chapter?: string
  chapterTitle?: string
  category: string
  tags: string[]
  status: string
  type?: string
  summary: string
  url: string
  body: string
}

const ALL = '全部'

const query = ref('')
const section = ref(ALL)
const chapter = ref(ALL)
const tag = ref(ALL)
const month = ref(ALL)
const status = ref(ALL)
const type = ref(ALL)

const typedArticles = articles as Article[]
const sections = computed(() => [ALL, ...Array.from(new Set(typedArticles.map((article) => article.section || article.category))).sort()])
const chapters = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      typedArticles
        .filter((article) => section.value === ALL || article.section === section.value || article.category === section.value)
        .map((article) => article.chapterTitle || article.chapter)
        .filter(Boolean)
    )
  ).sort()
])
const tags = computed(() => [ALL, ...Array.from(new Set(typedArticles.flatMap((article) => article.tags))).sort()])
const months = computed(() => [ALL, ...Array.from(new Set(typedArticles.map((article) => article.date.slice(0, 7)))).sort().reverse()])
const statuses = computed(() => [ALL, ...Array.from(new Set(typedArticles.map((article) => article.status))).sort()])
const types = computed(() => [ALL, ...Array.from(new Set(typedArticles.map((article) => article.type).filter(Boolean))).sort()])

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return typedArticles.filter((article) => {
    const matchesSection = section.value === ALL || article.section === section.value || article.category === section.value
    const articleChapter = article.chapterTitle || article.chapter
    const matchesChapter = chapter.value === ALL || articleChapter === chapter.value || article.chapter === chapter.value
    const matchesTag = tag.value === ALL || article.tags.includes(tag.value)
    const matchesMonth = month.value === ALL || article.date.startsWith(month.value)
    const matchesStatus = status.value === ALL || article.status === status.value
    const matchesType = type.value === ALL || article.type === type.value
    const haystack = [article.title, article.summary, article.section, article.category, articleChapter, article.status, article.type, ...article.tags, article.body]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    const matchesQuery = !needle || haystack.includes(needle)
    return matchesSection && matchesChapter && matchesTag && matchesMonth && matchesStatus && matchesType && matchesQuery
  })
})
</script>

<template>
  <section class="kb-archive">
    <div class="kb-filterbar kb-filterbar-archive">
      <input v-model="query" class="kb-search-input" aria-label="关键词搜索" title="搜索 Buck / FOC / SVPWM / 采样时序" />
      <select v-model="section" class="kb-select" aria-label="栏目">
        <option v-for="item in sections" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="chapter" class="kb-select" aria-label="章节">
        <option v-for="item in chapters" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="tag" class="kb-select" aria-label="标签">
        <option v-for="item in tags" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="month" class="kb-select" aria-label="时间">
        <option v-for="item in months" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="status" class="kb-select" aria-label="状态">
        <option v-for="item in statuses" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="type" class="kb-select" aria-label="类型">
        <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="kb-result-count">{{ filtered.length }} 篇文章</div>

    <div class="kb-article-list">
      <a v-for="article in filtered" :key="article.url" class="kb-article-card" :href="article.url">
        <span class="kb-article-date">
          {{ article.date }} · {{ article.section || article.category }}<template v-if="article.chapterTitle || article.chapter"> / {{ article.chapterTitle || article.chapter }}</template>
        </span>
        <strong>{{ article.title }}</strong>
        <span class="kb-article-summary">{{ article.summary }}</span>
        <span class="kb-tags">
          <span v-for="item in article.tags" :key="item" class="kb-tag">{{ item }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
