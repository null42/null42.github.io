<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { searchRecords, type SearchRecord } from '../../../scripts/kb/search/build-index'

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
const loading = ref(true)

const records = ref<SearchRecord[]>([])
const filterOptions = ref<FilterOptions>(emptyOptions)

onMounted(async () => {
  const initialQuery = new URLSearchParams(window.location.search).get('q')
  if (initialQuery) query.value = initialQuery
  try {
    const [searchModule, columnsModule] = await Promise.all([
      import('../../generated/search-index.json'),
      import('../../generated/columns.json')
    ])
    records.value = searchModule.default as SearchRecord[]
    filterOptions.value = columnsModule.default as FilterOptions
  } finally {
    loading.value = false
  }
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
    .slice(0, 8)
)

const results = computed(() =>
  searchRecords(records.value, query.value, {
    section: section.value === ALL ? undefined : section.value,
    navGroup: navGroup.value === ALL ? undefined : navGroup.value,
    chapter: chapter.value === ALL ? undefined : chapter.value,
    tag: tag.value === ALL ? undefined : tag.value
  })
)

function selectLearningPath(item?: { section: string; label: string }) {
  section.value = item?.section || ALL
  navGroup.value = item?.label || ALL
  chapter.value = ALL
}
</script>

<template>
  <section class="kb-search-page">
    <div class="kb-search-map" aria-label="学习地图快捷入口">
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

    <div class="kb-search-panel">
      <input v-model="query" class="kb-search-input" aria-label="全文搜索" placeholder="电流环 / SVPWM / PFC / 采样" />
      <div class="kb-filterbar kb-filterbar-search">
        <label class="kb-filter-field">
          <span class="kb-filter-label">栏目</span>
          <select v-model="section" class="kb-select" aria-label="栏目">
            <option v-for="item in sections" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label class="kb-filter-field">
          <span class="kb-filter-label">学习路线</span>
          <select v-model="navGroup" class="kb-select" aria-label="学习路线">
            <option v-for="item in navGroups" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label class="kb-filter-field">
          <span class="kb-filter-label">阶段</span>
          <select v-model="chapter" class="kb-select" aria-label="阶段">
            <option v-for="item in chapters" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label class="kb-filter-field">
          <span class="kb-filter-label">标签</span>
          <select v-model="tag" class="kb-select" aria-label="标签">
            <option v-for="item in tags" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
      </div>
    </div>

    <div class="kb-result-count">{{ loading ? '正在加载索引' : `${results.length} 条结果` }}</div>

    <div class="kb-article-list">
      <a v-for="result in results" :key="`${result.record.url}-${result.anchor || 'top'}`" class="kb-article-card" :href="result.url">
        <span class="kb-article-date">
          {{ result.record.date }} / {{ result.record.section || result.record.category }}<template v-if="result.record.navGroup"> / {{ result.record.navGroup }}</template><template v-if="result.record.chapterTitle || result.record.chapter"> / {{ result.record.chapterTitle || result.record.chapter }}</template>
        </span>
        <strong>{{ result.record.title }}</strong>
        <span class="kb-match-reason">{{ result.matchReason }}</span>
        <span class="kb-article-summary" v-html="result.snippet" />
        <span class="kb-tags">
          <span v-for="item in result.record.tags" :key="item" class="kb-tag">{{ item }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
