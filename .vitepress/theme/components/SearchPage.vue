<script setup lang="ts">
import { computed, ref } from 'vue'
import searchIndex from '../../generated/search-index.json'
import { searchRecords, type SearchRecord } from '../../../scripts/kb/search/build-index'

const ALL = '全部'

const query = ref('')
const section = ref(ALL)
const chapter = ref(ALL)
const tag = ref(ALL)
const month = ref(ALL)

const records = searchIndex as SearchRecord[]

const sections = computed(() => [ALL, ...Array.from(new Set(records.map((record) => record.section || record.category))).sort()])
const chapters = computed(() => [
  ALL,
  ...Array.from(
    new Set(
      records
        .filter((record) => section.value === ALL || record.section === section.value || record.category === section.value)
        .map((record) => record.chapterTitle || record.chapter)
        .filter(Boolean)
    )
  ).sort()
])
const tags = computed(() => [ALL, ...Array.from(new Set(records.flatMap((record) => record.tags))).sort()])
const months = computed(() => [ALL, ...Array.from(new Set(records.map((record) => record.month))).sort().reverse()])

const results = computed(() =>
  searchRecords(records, query.value, {
    section: section.value === ALL ? undefined : section.value,
    chapter: chapter.value === ALL ? undefined : chapter.value,
    tag: tag.value === ALL ? undefined : tag.value,
    month: month.value === ALL ? undefined : month.value
  })
)
</script>

<template>
  <section class="kb-search-page">
    <div class="kb-filterbar kb-filterbar-wide">
      <input v-model="query" class="kb-search-input" aria-label="全文搜索" placeholder="搜索标题、正文、标签，例如 PFC / 电流环 / SVPWM" />
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
    </div>

    <div class="kb-result-count">{{ results.length }} 条结果</div>

    <div class="kb-article-list">
      <a v-for="{ record, snippet } in results" :key="record.url" class="kb-article-card" :href="record.url">
        <span class="kb-article-date">
          {{ record.date }} · {{ record.section || record.category }}<template v-if="record.chapterTitle || record.chapter"> / {{ record.chapterTitle || record.chapter }}</template>
        </span>
        <strong>{{ record.title }}</strong>
        <span class="kb-article-summary" v-html="snippet" />
        <span class="kb-tags">
          <span v-for="item in record.tags" :key="item" class="kb-tag">{{ item }}</span>
        </span>
      </a>
    </div>
  </section>
</template>
