<template>
   <div class="tw-grid">
     <div v-if="service?.slider" class="tw-overflow-hidden tw-mb-3">
       <Slider :imgs="service.slider" />
     </div>
     <div>
       <div class="p1 tw-grid tw-gap-4" v-html="sanitizedDescription"></div>
     </div>
   </div>
</template>
<script setup lang="ts">
import { ServiceT } from 'src/models/api/main'
import { useSanitizeHtml } from 'src/composables/useSanitizeHtml'

const props = defineProps<{
  service: ServiceT
}>()

const sanitizedDescription = useSanitizeHtml(() => props.service.description)
</script>
<style lang="scss" scoped></style>
