<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  caption?: string
}>()
</script>

<template>
  <figure class="kb-figure">
    <img :src="src" :alt="alt || caption || ''" loading="lazy" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
