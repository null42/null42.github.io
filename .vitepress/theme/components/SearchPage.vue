<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { searchRecords, type SearchRecord } from '../../../scripts/kb/search/build-index'

interface FilterOption {
  id: string
  label: string
  count: number
  columnId?: string
  routeId?: string
  stageId?: string
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
  return sectionId.value === ALL ? undefined : sectionId.value
})

const selectedRouteId = computed(() => {
  return routeId.value === ALL ? undefined : routeId.value
})

const selectedStageId = computed(() => {
  return stageId.value === ALL ? undefined : stageId.value
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
    .slice(0, 8)
)

const results = computed(() =>
  searchRecords(records.value, query.value, {
    sectionId: selectedColumnId.value,
    routeId: selectedRouteId.value,
    stageId: selectedStageId.value,
    tag: tag.value === ALL ? undefined : tag.value
  })
)

function selectLearningPath(item?: { columnId?: string; routeId?: string }) {
  sectionId.value = item?.columnId || ALL
  routeId.value = item?.routeId || ALL
  stageId.value = ALL
}
</script>

<template>
  <section class="kb-search-page">
    <div class="kb-search-map" aria-label="学习地图快捷入口">
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

    <div class="kb-search-panel">
      <input v-model="query" class="kb-search-input" aria-label="全文搜索" placeholder="电流环 / SVPWM / PFC / 采样" />
      <div class="kb-filterbar kb-filterbar-search">
        <label class="kb-filter-field">
          <span class="kb-filter-label">栏目</span>
          <select v-model="sectionId" class="kb-select" aria-label="栏目">
            <option :value="ALL">{{ ALL }}</option>
            <option v-for="item in sections" :key="item.id" :value="item.columnId || item.id">{{ item.label }}</option>
          </select>
        </label>
        <label class="kb-filter-field">
          <span class="kb-filter-label">学习路线</span>
          <select v-model="routeId" class="kb-select" aria-label="学习路线">
            <option :value="ALL">{{ ALL }}</option>
            <option v-for="item in navGroups" :key="item.id" :value="item.routeId || item.id">{{ item.label }}</option>
          </select>
        </label>
        <label class="kb-filter-field">
          <span class="kb-filter-label">阶段</span>
          <select v-model="stageId" class="kb-select" aria-label="阶段">
            <option :value="ALL">{{ ALL }}</option>
            <option v-for="item in chapters" :key="item.id" :value="item.stageId || item.id">{{ item.label }}</option>
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
      <a v-for="result in results" :key="`${result.record.articleId}-${result.anchor || 'top'}`" class="kb-article-card" :href="result.url">
        <span class="kb-article-date">
          {{ result.record.date }} / {{ result.record.sectionTitle || result.record.sectionId || result.record.category }}<template v-if="result.record.routeTitle || result.record.routeId"> / {{ result.record.routeTitle || result.record.routeId }}</template><template v-if="result.record.stageTitle || result.record.stageId"> / {{ result.record.stageTitle || result.record.stageId }}</template>
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
