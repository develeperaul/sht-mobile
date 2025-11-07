<template>
  <div>
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string | number
}>()
</script>
<style lang="scss" scoped></style>
