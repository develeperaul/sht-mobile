<template>
  <div>
    <div class="tw-overflow-hidden tw-mb-3">
      <Slider :imgs="service.slider" />
    </div>
    <div>
      <div class="p1 tw-break-all" v-html="service.description"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ServiceT } from 'src/models/api/main'

const props = defineProps<{
  service: ServiceT
}>()
</script>
<style lang="scss" scoped></style>
