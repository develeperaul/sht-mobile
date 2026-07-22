<template>
  <Empty v-if="items.length === 0" />
  <ul v-else>
    <li
      class="item-wrap"
      v-for="item in items"
      :key="item.id"
    >
      <ListItem :item="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { DirectionSearchItem } from 'src/api/directions';
  import ListItem from './Item.vue';
  import Empty from 'src/components/Search/Empty.vue';

  defineProps<{
    items: DirectionSearchItem[],
  }>();
</script>

<style scoped lang="scss">
  .item-wrap {
    border: 0px solid rgba(213, 208, 255, 0.5);

    & + & {
      border-top-width: 1px;
    }
  }
</style>
