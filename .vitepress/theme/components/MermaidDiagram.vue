<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type mermaid from 'mermaid'

const props = defineProps<{
  code: string
}>()

const rendered = ref('')
const error = ref('')
const rawSource = computed(() => decodeURIComponent(props.code))
const source = computed(() => normalizeMermaidSource(rawSource.value))
const elementId = `mermaid-${Math.random().toString(36).slice(2)}`

async function loadMermaid() {
  const module = await import('mermaid')
  return module.default as typeof mermaid
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

function normalizeMermaidSource(value: string): string {
  return value.replace(/^(\s*)state\s+([A-Za-z_][\w-]*)\s+as\s+"([^"\n]+)"\s*$/gm, '$1state "$3" as $2')
}

onMounted(renderDiagram)
watch(source, renderDiagram)
</script>

<template>
  <figure class="kb-mermaid">
    <div v-if="rendered" class="kb-mermaid-svg" v-html="rendered" />
    <pre v-else-if="error" class="kb-mermaid-error"><code>{{ error }}</code></pre>
    <pre v-else class="kb-mermaid-loading"><code>{{ rawSource }}</code></pre>
  </figure>
</template>
