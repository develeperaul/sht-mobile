<template>
  <div>
    <ListItem
      class="post-item"
      v-for="item in items"
      :key="item.id"
      :item="item"
      design="white"
    />
  </div>
</template>

<script setup lang="ts">
  import ListItem from './Item.vue';
  import type { PostsItem } from 'src/api/posts';

  defineProps<{
    items: PostsItem[],
  }>();
</script>

<style scoped lang="scss">
  .post-item {
    & + & {
      margin-top: 12px;
    }
  }
</style>
