<template>
  <div>
    <div class="content" v-html="tText"></div>
    <GalleryImages v-if="slider" class=" tw-mt-4" :images="slider" />
  </div>
</template>

<script setup lang="ts">
import { useTypograf } from 'src/composables/useTypograf';
import GalleryImages from '../GalleryImages.vue';
const props =defineProps<{
  text: string,
  slider: { url:string}[]
}>();
const { typograf } = useTypograf(() => null);
const tText = computed(() => typograf(props.text));
</script>

<style scoped lang="scss">
  .content {
    font-size: 16px;
    line-height: 1.4;
    @apply tw-text-black2;
  }
</style>
