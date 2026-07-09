<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
let isMounted = false
let renderRun = 0

async function renderDiagram() {
  const currentRun = renderRun += 1
  error.value = ''
  rendered.value = ''
  await nextTick()
  if (!isMounted || currentRun !== renderRun) return

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
    if (!isMounted || currentRun !== renderRun) return
    rendered.value = result.svg
  } catch (err) {
    if (!isMounted || currentRun !== renderRun) return
    error.value = err instanceof Error ? err.message : String(err)
  }
}

onMounted(() => {
  isMounted = true
  void renderDiagram()
})

onBeforeUnmount(() => {
  isMounted = false
  renderRun += 1
})

watch(source, () => {
  if (isMounted) void renderDiagram()
})
</script>

<template>
  <figure class="kb-mermaid">
    <div v-show="rendered" class="kb-mermaid-svg" v-html="rendered" />
    <pre v-show="!rendered && error" class="kb-mermaid-error"><code>{{ error }}</code></pre>
    <pre v-show="!rendered && !error" class="kb-mermaid-loading"><code>{{ rawSource }}</code></pre>
  </figure>
</template>
