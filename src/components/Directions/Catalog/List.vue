<template>
  <Empty v-if="items.length === 0" />
  <section v-else class="tw-space-y-4">
    <router-link
      v-for="item in items"
      :key="item.id"
      custom
      :to="{ name: 'directions.children', params: { id: item.id } }"
      v-slot="{ href, navigate }"
    >
      <ListItem :item="item" tag="a" :href="href" @click="navigate" />
    </router-link>
  </section>
</template>

<script setup lang="ts">
  import type { DirectionListItem } from 'src/api/directions';
  import ListItem from 'src/components/Directions/List/Item/index.vue';
  import Empty from 'src/components/Search/Empty.vue';

  defineProps<{
    items: DirectionListItem[],
  }>();
</script>
