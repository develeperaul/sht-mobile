<template>
  <div class="tw-overflow-hidden -tw-mr-5.5">
    <StoriesMenuSlider :stories="stories" />
    <teleport to="body">
      <StoriesMainWrapper />
    </teleport>
  </div>
</template>
<script setup lang="ts">
import StoriesMenuSlider from './Menu/StoriesMenuSlider.vue'
import StoriesMainWrapper from './Main/StoriesMainWrapper.vue'

import { StoriesT, StoryT } from 'src/models/api/main'
const props = defineProps<{
  stories: StoriesT[]
}>()
</script>
<style lang="scss" scoped></style>
