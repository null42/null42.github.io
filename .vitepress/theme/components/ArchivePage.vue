<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { sortArticlesForLearning } from '../article-ranking'

interface Article {
  articleId: string
  title: string
  date: string
  sectionId?: string
  sectionTitle?: string
  routeId?: string
  routeTitle?: string
  stageId?: string
  stageTitle?: string
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
const sectionId = ref(ALL)
const routeId = ref(ALL)
const stageId = ref(ALL)
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
  return sectionId.value === ALL ? undefined : sectionId.value
})

const selectedRouteId = computed(() => {
  return routeId.value === ALL ? undefined : routeId.value
})

const sections = computed(() => filterOptions.value.sections)
const navGroups = computed(() =>
  filterOptions.value.routes
    .filter((item) => !selectedColumnId.value || item.columnId === selectedColumnId.value)
)
const chapters = computed(() =>
  filterOptions.value.stages
    .filter((item) => !selectedColumnId.value || item.columnId === selectedColumnId.value)
    .filter((item) => !selectedRouteId.value || item.routeId === selectedRouteId.value)
)
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
    const matchesSection = sectionId.value === ALL || article.sectionId === sectionId.value
    const matchesNavGroup = routeId.value === ALL || article.routeId === routeId.value
    const matchesChapter = stageId.value === ALL || article.stageId === stageId.value
    const matchesTag = tag.value === ALL || article.tags.includes(tag.value)
    const haystack = [article.title, article.summary, article.sectionId, article.sectionTitle, article.routeId, article.routeTitle, article.stageId, article.stageTitle, article.category, article.status, article.type, article.quality, ...article.tags]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return matchesSection && matchesNavGroup && matchesChapter && matchesTag && (!needle || haystack.includes(needle))
  })
  return sortArticlesForLearning(matches)
})

function selectLearningPath(item?: { columnId?: string; routeId?: string }) {
  sectionId.value = item?.columnId || ALL
  routeId.value = item?.routeId || ALL
  stageId.value = ALL
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
        :class="{ active: sectionId === ALL && routeId === ALL }"
        type="button"
        @click="selectLearningPath()"
      >
        全部路线
      </button>
      <button
        v-for="item in learningPaths"
        :key="item.id"
        class="kb-path-chip"
        :class="{ active: sectionId === item.columnId && routeId === item.routeId }"
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
      <select v-model="sectionId" class="kb-select" aria-label="栏目">
        <option :value="ALL">{{ ALL }}</option>
        <option v-for="item in sections" :key="item.id" :value="item.columnId || item.id">{{ item.label }}</option>
      </select>
      <select v-model="routeId" class="kb-select" aria-label="学习路线">
        <option :value="ALL">{{ ALL }}</option>
        <option v-for="item in navGroups" :key="item.id" :value="item.routeId || item.id">{{ item.label }}</option>
      </select>
      <select v-model="stageId" class="kb-select" aria-label="阶段">
        <option :value="ALL">{{ ALL }}</option>
        <option v-for="item in chapters" :key="item.id" :value="item.stageId || item.id">{{ item.label }}</option>
      </select>
      <select v-model="tag" class="kb-select" aria-label="标签">
        <option v-for="item in tags" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <div class="kb-result-count">{{ filtered.length }} 篇文章</div>

    <div class="kb-article-list">
      <a v-for="article in filtered" :key="article.articleId" class="kb-article-card" :href="article.url">
        <span class="kb-article-date">
          {{ article.date }} / {{ article.sectionTitle || article.sectionId || article.category }}<template v-if="article.routeTitle || article.routeId"> / {{ article.routeTitle || article.routeId }}</template><template v-if="article.stageTitle || article.stageId"> / {{ article.stageTitle || article.stageId }}</template>
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
