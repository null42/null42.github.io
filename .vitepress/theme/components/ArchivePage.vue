<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Article {
  title: string
  date: string
  section?: string
  navGroup?: string
  navGroupOrder?: number
  chapter?: string
  chapterTitle?: string
  category: string
  tags: string[]
  status: string
  type?: string
  summary: string
  url: string
  body?: string
}

const ALL = '全部'

const query = ref('')
const section = ref(ALL)
const navGroup = ref(ALL)
const chapter = ref(ALL)
const tag = ref(ALL)
const month = ref(ALL)
const status = ref(ALL)
const type = ref(ALL)

const typedArticles = ref<Article[]>([])

onMounted(async () => {
  typedArticles.value = (await import('../../generated/articles.json')).default as Article[]
})

const sections = computed(() => [ALL, ...Array.from(new Set(typedArticles.value.map((article) => article.section || article.category))).sort()])
const navGroups = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      typedArticles.value
        .filter((article) => section.value === ALL || article.section === section.value || article.category === section.value)
        .map((article) => article.navGroup)
        .filter(Boolean)
    )
  ).sort()
])
const chapters = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      typedArticles.value
        .filter((article) => section.value === ALL || article.section === section.value || article.category === section.value)
        .filter((article) => navGroup.value === ALL || article.navGroup === navGroup.value)
        .map((article) => article.chapterTitle || article.chapter)
        .filter(Boolean)
    )
  ).sort()
])
const tags = computed(() => [ALL, ...Array.from(new Set(typedArticles.value.flatMap((article) => article.tags))).sort()])
const months = computed(() => [ALL, ...Array.from(new Set(typedArticles.value.map((article) => article.date.slice(0, 7)))).sort().reverse()])
const statuses = computed(() => [ALL, ...Array.from(new Set(typedArticles.value.map((article) => article.status))).sort()])
const types = computed(() => [ALL, ...Array.from(new Set(typedArticles.value.map((article) => article.type).filter(Boolean))).sort()])
const learningPaths = computed(() => {
  const groups = new Map<string, { section: string; navGroup: string; count: number; order: number }>()
  for (const article of typedArticles.value) {
    if (!article.navGroup) continue
    const articleSection = article.section || article.category
    const key = `${articleSection}::${article.navGroup}`
    const current = groups.get(key)
    if (current) {
      current.count += 1
      current.order = Math.min(current.order, article.navGroupOrder || 999)
    } else {
      groups.set(key, {
        section: articleSection,
        navGroup: article.navGroup,
        count: 1,
        order: article.navGroupOrder || 999
      })
    }
  }
  return Array.from(groups.values()).sort(
    (a, b) => a.section.localeCompare(b.section, 'zh-CN') || a.order - b.order || a.navGroup.localeCompare(b.navGroup, 'zh-CN')
  )
})

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return typedArticles.value.filter((article) => {
    const matchesSection = section.value === ALL || article.section === section.value || article.category === section.value
    const matchesNavGroup = navGroup.value === ALL || article.navGroup === navGroup.value
    const articleChapter = article.chapterTitle || article.chapter
    const matchesChapter = chapter.value === ALL || articleChapter === chapter.value || article.chapter === chapter.value
    const matchesTag = tag.value === ALL || article.tags.includes(tag.value)
    const matchesMonth = month.value === ALL || article.date.startsWith(month.value)
    const matchesStatus = status.value === ALL || article.status === status.value
    const matchesType = type.value === ALL || article.type === type.value
    const haystack = [article.title, article.summary, article.section, article.navGroup, article.category, articleChapter, article.status, article.type, ...article.tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    const matchesQuery = !needle || haystack.includes(needle)
    return matchesSection && matchesNavGroup && matchesChapter && matchesTag && matchesMonth && matchesStatus && matchesType && matchesQuery
  })
})

function selectLearningPath(item?: { section: string; navGroup: string }) {
  section.value = item?.section || ALL
  navGroup.value = item?.navGroup || ALL
  chapter.value = ALL
}
</script>

<template>
  <section class="kb-archive">
    <div class="kb-learning-paths" aria-label="学习地图快捷入口">
      <button
        class="kb-path-chip"
        :class="{ active: section === ALL && navGroup === ALL }"
        type="button"
        @click="selectLearningPath()"
      >
        全部路径
      </button>
      <button
        v-for="item in learningPaths"
        :key="`${item.section}-${item.navGroup}`"
        class="kb-path-chip"
        :class="{ active: section === item.section && navGroup === item.navGroup }"
        type="button"
        @click="selectLearningPath(item)"
      >
        <span>{{ item.section }}</span>
        {{ item.navGroup }}
        <strong>{{ item.count }}</strong>
      </button>
    </div>

    <div class="kb-filterbar kb-filterbar-archive">
      <input v-model="query" class="kb-search-input" aria-label="关键词搜索" title="搜索 Buck / FOC / SVPWM / 采样时序" />
      <select v-model="section" class="kb-select" aria-label="栏目">
        <option v-for="item in sections" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="navGroup" class="kb-select" aria-label="学习路径">
        <option v-for="item in navGroups" :key="item" :value="item">{{ item }}</option>
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
          {{ article.date }} / {{ article.section || article.category }}<template v-if="article.navGroup"> / {{ article.navGroup }}</template><template v-if="article.chapterTitle || article.chapter"> / {{ article.chapterTitle || article.chapter }}</template>
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
