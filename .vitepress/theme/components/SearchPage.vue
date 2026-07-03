<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import searchIndex from '../../generated/search-index.json'
import { searchRecords, type SearchRecord } from '../../../scripts/kb/search/build-index'

const ALL = '全部'

const query = ref('')
const section = ref(ALL)
const navGroup = ref(ALL)
const chapter = ref(ALL)
const tag = ref(ALL)

const records = searchIndex as SearchRecord[]

onMounted(() => {
  const initialQuery = new URLSearchParams(window.location.search).get('q')
  if (initialQuery) {
    query.value = initialQuery
  }
})

const sections = computed(() => [ALL, ...Array.from(new Set(records.map((record) => record.section || record.category))).sort()])
const navGroups = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      records
        .filter((record) => section.value === ALL || record.section === section.value || record.category === section.value)
        .map((record) => record.navGroup)
        .filter(Boolean)
    )
  ).sort()
])
const chapters = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      records
        .filter((record) => section.value === ALL || record.section === section.value || record.category === section.value)
        .filter((record) => navGroup.value === ALL || record.navGroup === navGroup.value)
        .map((record) => record.chapterTitle || record.chapter)
        .filter(Boolean)
    )
  ).sort()
])
const tags = computed(() => [ALL, ...Array.from(new Set(records.flatMap((record) => record.tags))).sort()])

const learningPaths = computed(() => {
  const groups = new Map<string, { section: string; navGroup: string; count: number; order: number }>()
  for (const record of records) {
    if (!record.navGroup) continue
    const recordSection = record.section || record.category
    const key = `${recordSection}::${record.navGroup}`
    const current = groups.get(key)
    if (current) {
      current.count += 1
      current.order = Math.min(current.order, record.navGroupOrder || 999)
    } else {
      groups.set(key, {
        section: recordSection,
        navGroup: record.navGroup,
        count: 1,
        order: record.navGroupOrder || 999
      })
    }
  }
  return Array.from(groups.values())
    .sort((a, b) => a.section.localeCompare(b.section, 'zh-CN') || a.order - b.order || a.navGroup.localeCompare(b.navGroup, 'zh-CN'))
    .slice(0, 8)
})

const results = computed(() =>
  searchRecords(records, query.value, {
    section: section.value === ALL ? undefined : section.value,
    navGroup: navGroup.value === ALL ? undefined : navGroup.value,
    chapter: chapter.value === ALL ? undefined : chapter.value,
    tag: tag.value === ALL ? undefined : tag.value
  })
)

function selectLearningPath(item?: { section: string; navGroup: string }) {
  section.value = item?.section || ALL
  navGroup.value = item?.navGroup || ALL
  chapter.value = ALL
}
</script>

<template>
  <section class="kb-search-page">
    <div class="kb-search-map">
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

    <div class="kb-result-count">{{ results.length }} 条结果</div>

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
