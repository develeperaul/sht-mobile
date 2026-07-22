<template>
  <router-link
    :to="
      item.parent_id === null
      ? { name: 'directions.children', params: { id: item.id } }
      : { name: 'directions.show', params: { id: item.id } }
    "
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
</template>

<script setup lang="ts">
  import ListItem from 'src/components/Directions/List/Item/index.vue';
  import type { DirectionFavItem } from 'src/api/directions';

  defineProps<{
    item: DirectionFavItem,
  }>();
</script>
