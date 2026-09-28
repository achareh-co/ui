<script setup lang="ts">
const props = defineProps<{
  d: string | string[]
}>()

const paths = Array.isArray(props.d) ? props.d : [props.d]
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    aria-hidden="true"
  >
    <path
      v-for="(path, index) in paths"
      :key="index"
      :d="path"
    />
  </svg>
</template>
