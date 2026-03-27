<template>
  <section class="dir-filter-card gradient-card">
    <div class="dir-filter-card__title">По странам</div>
    <div class="actions">
      <button
        v-for="item in typesItems"
        class="dir-filter-badge"
        :class="{ 'dir-filter-badge--active': props.filter.type === item.value }"
        type="button"
        @click="updateValue(item)"
      >
        {{ item.title }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { FilterParams } from './useDirectionsFilter';
  import type { FilterTypesItem } from 'src/api/directions';

  const props = defineProps<{
    filter: FilterParams,
    typesItems: FilterTypesItem[],
  }>();

  function updateValue(item: FilterTypesItem) {
    const type = props.filter.type;
    props.filter.type = type !== item.value ? item.value : null;
  }
</script>

<style scoped lang="scss">
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
