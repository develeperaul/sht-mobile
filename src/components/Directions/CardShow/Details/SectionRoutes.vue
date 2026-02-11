<template>
  <section>
    <DropdownItem
      class="sec-item"
      v-for="(route, index) in routes"
      :key="route.id"
      :initialActive="index === 0"
    >
      <template #title>
        <span>День {{ route.day }}.</span> <span class="text-label">{{ route.title }}</span>
      </template>
      <div class="text-wrap" v-html="route.description"></div>
      <GalleryImages class="sec-gal" v-if="route.images.length > 0" :images="route.images" />
    </DropdownItem>
  </section>
</template>

<script setup lang="ts">
  import type { RouteItem } from 'src/api/directions';
  import DropdownItem from '../DropdownItem.vue';
  import GalleryImages from '../GalleryImages.vue';

  defineProps<{
    routes: RouteItem[],
  }>();
</script>

<style scoped lang="scss">
  .sec-gal {
    margin-top: 24px;
  }

  .text-label {
    font-weight: 400;
    font-size: 16px;
  }
</style>
