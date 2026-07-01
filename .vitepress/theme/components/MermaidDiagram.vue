<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

declare global {
  interface Window {
    mermaid?: {
      initialize: (options: Record<string, unknown>) => void
      render: (id: string, code: string) => Promise<{ svg: string }>
    }
  }
}

const props = defineProps<{
  code: string
}>()

const rendered = ref('')
const error = ref('')
const source = computed(() => decodeURIComponent(props.code))
const elementId = `mermaid-${Math.random().toString(36).slice(2)}`

async function loadMermaid() {
  if (window.mermaid) return window.mermaid
  await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
  if (!window.mermaid) throw new Error('Mermaid failed to load')
  return window.mermaid
}

async function renderDiagram() {
  error.value = ''
  rendered.value = ''
  await nextTick()

  try {
    const mermaid = await loadMermaid()
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })
    const result = await mermaid.render(elementId, source.value)
    rendered.value = result.svg
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

onMounted(renderDiagram)
watch(source, renderDiagram)
</script>

<template>
  <figure class="kb-mermaid">
    <div v-if="rendered" class="kb-mermaid-svg" v-html="rendered" />
    <pre v-else-if="error" class="kb-mermaid-error"><code>{{ error }}</code></pre>
    <pre v-else class="kb-mermaid-loading"><code>{{ source }}</code></pre>
  </figure>
</template>
