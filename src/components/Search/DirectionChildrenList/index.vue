<template>
  <div>
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
