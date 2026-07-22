<template>
   <div class="tw-grid">
     <div v-if="service?.slider" class="tw-overflow-hidden tw-mb-3">
       <Slider :imgs="service.slider" />
     </div>
     <div>
       <div class="p1 tw-grid tw-gap-4" v-html="typograf(sanitizedDescription)"></div>
     </div>
   </div>
</template>
<script setup lang="ts">
import { ServiceT } from 'src/models/api/main'
import { useSanitizeHtml } from 'src/composables/useSanitizeHtml'
import { useTypograf } from 'src/composables/useTypograf';

const props = defineProps<{
  service: ServiceT
}>()

const { sanitized: sanitizedDescription } = useSanitizeHtml(() => props.service.description)
const {typograf} = useTypograf(()=>null)
</script>
<style lang="scss" scoped></style>
