<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import mermaid from 'mermaid'
import { normalizeMermaidSource } from '../../../scripts/kb/markdown-rendering'

const props = defineProps<{
  code: string
}>()

const rendered = ref('')
const error = ref('')
const rawSource = computed(() => decodeURIComponent(props.code))
const source = computed(() => normalizeMermaidSource(rawSource.value))
let diagramId = 0

async function renderDiagram() {
  error.value = ''
  rendered.value = ''
  await nextTick()

  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      flowchart: {
        htmlLabels: false,
        markdownAutoWrap: false
      },
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })
    const elementId = `mermaid-${Date.now().toString(36)}-${diagramId += 1}`
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
    <pre v-else class="kb-mermaid-loading"><code>{{ rawSource }}</code></pre>
  </figure>
</template>
