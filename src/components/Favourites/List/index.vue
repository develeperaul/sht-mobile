<template>
  <div>
    <ListEmpty v-if="items.length === 0" />
    <template v-else>
      <ListItem
        class="list-item"
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import ListItem from 'src/components/Directions/List/Item/index.vue';
  import type { DirectionListItem } from 'src/api/directions';
  import ListEmpty from './Empty.vue';

  defineProps<{
    items: DirectionListItem[],
  }>();
</script>

<style scoped lang="scss">
  .list-item {
    & + & {
      margin-top: 12px;
    }
  }
</style>
