<template>
  <section class="tw-space-y-4">
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

  defineProps<{
    items: DirectionListItem[],
  }>();
</script>
