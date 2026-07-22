<template>
  <Empty v-if="items.length === 0" />
  <div v-else>
    <router-link
      v-for="item in items"
      :key="item.id"
      :to="{ name: 'directions.show', params: { id: item.id } }"
      custom
      v-slot="{ href, navigate }"
    >
      <ListItem
        class="list-item"
        :item="item"
        tag="a"
        :href="href"
        @click="navigate"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import ListItem from 'src/components/Directions/List/Item/index.vue';
  import type { SubgroupItem } from 'src/api/directions';
  import Empty from 'src/components/Search/Empty.vue';

  defineProps<{
    items: SubgroupItem[],
  }>();
</script>

<style scoped lang="scss">
  .list-item {
    & + & {
      margin-top: 12px;
    }
  }
</style>
