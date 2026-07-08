<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { sortArticlesForLearning } from '../article-ranking'

interface Article {
  title: string
  date: string
  section?: string
  navGroup?: string
  chapter?: string
  chapterTitle?: string
  category: string
  tags: string[]
  status: string
  type?: string
  quality?: string
  summary: string
  url: string
}

interface FilterOption {
  id: string
  label: string
  count: number
  columnId?: string
  routeId?: string
}

interface FilterOptions {
  sections: FilterOption[]
  routes: FilterOption[]
  stages: FilterOption[]
  tags: FilterOption[]
}

const ALL = '全部'
const emptyOptions: FilterOptions = { sections: [], routes: [], stages: [], tags: [] }

const query = ref('')
const section = ref(ALL)
const navGroup = ref(ALL)
const chapter = ref(ALL)
const tag = ref(ALL)

const typedArticles = ref<Article[]>([])
const filterOptions = ref<FilterOptions>(emptyOptions)

onMounted(async () => {
  const [articlesModule, columnsModule] = await Promise.all([
    import('../../generated/articles.json'),
    import('../../generated/columns.json')
  ])
  typedArticles.value = articlesModule.default as Article[]
  filterOptions.value = columnsModule.default as FilterOptions
})

const selectedColumnId = computed(() => {
  if (section.value === ALL) return undefined
  return filterOptions.value.sections.find((item) => item.label === section.value)?.columnId
})

const selectedRouteId = computed(() => {
  if (navGroup.value === ALL) return undefined
  return filterOptions.value.routes.find((item) => item.label === navGroup.value && (!selectedColumnId.value || item.columnId === selectedColumnId.value))?.routeId
})

const sections = computed(() => [ALL, ...filterOptions.value.sections.map((item) => item.label)])
const navGroups = computed(() => [
  ALL,
  ...filterOptions.value.routes
    .filter((item) => !selectedColumnId.value || item.columnId === selectedColumnId.value)
    .map((item) => item.label)
])
const chapters = computed(() => [
  ALL,
  ...filterOptions.value.stages
    .filter((item) => !selectedColumnId.value || item.columnId === selectedColumnId.value)
    .filter((item) => !selectedRouteId.value || item.routeId === selectedRouteId.value)
    .map((item) => item.label)
])
const tags = computed(() => [ALL, ...filterOptions.value.tags.map((item) => item.label)])

const learningPaths = computed(() =>
  filterOptions.value.routes
    .map((route) => ({
      ...route,
      section: filterOptions.value.sections.find((item) => item.columnId === route.columnId)?.label || ''
    }))
    .filter((route) => route.count > 0)
)

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  const matches = typedArticles.value.filter((article) => {
    const articleChapter = article.chapterTitle || article.chapter
    const matchesSection = section.value === ALL || article.section === section.value || article.category === section.value
    const matchesNavGroup = navGroup.value === ALL || article.navGroup === navGroup.value
    const matchesChapter = chapter.value === ALL || articleChapter === chapter.value || article.chapter === chapter.value
    const matchesTag = tag.value === ALL || article.tags.includes(tag.value)
    const haystack = [article.title, article.summary, article.section, article.navGroup, article.category, articleChapter, article.status, article.type, article.quality, ...article.tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return matchesSection && matchesNavGroup && matchesChapter && matchesTag && (!needle || haystack.includes(needle))
  })
  return sortArticlesForLearning(matches)
})

function selectLearningPath(item?: { section: string; label: string }) {
  section.value = item?.section || ALL
  navGroup.value = item?.label || ALL
  chapter.value = ALL
}
</script>

<template>
  <section class="kb-archive">
    <div class="kb-library-head">
      <div>
        <p class="kb-map-kicker">学习地图</p>
        <h2>先选路线，再进入文章</h2>
      </div>
      <a class="kb-inline-link" href="/search.html">全文搜索</a>
    </div>

    <div class="kb-learning-paths" aria-label="学习地图快捷入口">
      <button
        class="kb-path-chip"
        :class="{ active: section === ALL && navGroup === ALL }"
        type="button"
        @click="selectLearningPath()"
      >
        全部路线
      </button>
      <button
        v-for="item in learningPaths"
        :key="item.id"
        class="kb-path-chip"
        :class="{ active: section === item.section && navGroup === item.label }"
        type="button"
        @click="selectLearningPath(item)"
      >
        <span>{{ item.section }}</span>
        {{ item.label }}
        <strong>{{ item.count }}</strong>
      </button>
    </div>

    <div class="kb-filterbar kb-filterbar-archive">
      <input v-model="query" class="kb-search-input" aria-label="关键词搜索" title="搜索 Buck / FOC / SVPWM / 采样时序" />
      <select v-model="section" class="kb-select" aria-label="栏目">
        <option v-for="item in sections" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="navGroup" class="kb-select" aria-label="学习路线">
        <option v-for="item in navGroups" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="chapter" class="kb-select" aria-label="阶段">
        <option v-for="item in chapters" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="tag" class="kb-select" aria-label="标签">
        <option v-for="item in tags" :key="item" :value="item">{{ item }}</option>
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
