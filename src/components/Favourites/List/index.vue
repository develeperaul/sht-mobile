<template>
  <div>
    <ListEmpty v-if="items.length === 0" />
    <template v-else>
      <ListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './Item.vue';
  import type { DirectionFavItem } from 'src/api/directions';
  import ListEmpty from './Empty.vue';

  defineProps<{
    items: DirectionFavItem[],
  }>();
</script>

<style scoped lang="scss">
  .list-item {
    & + & {
      margin-top: 12px;
    }
  }
</style>
