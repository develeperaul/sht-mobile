<template>
  <section class="dir-filter-card gradient-card">
    <div class="dir-filter-card__title">Количество дней</div>
    <div class="actions">
      <button
        class="dir-filter-badge"
        :class="{ 'dir-filter-badge--active': props.filter.days_count_to !== null }"
        type="button"
        @click="daysTo"
      >
        До 7 дней
      </button>
      <button
        class="dir-filter-badge"
        :class="{ 'dir-filter-badge--active': props.filter.days_count_from !== null }"
        type="button"
        @click="daysFrom"
      >
        От 7 дней
      </button>
      <button
        class="dir-filter-badge"
        :class="{ 'dir-filter-badge--active': props.filter.is_weekend !== null }"
        type="button"
        @click="weekend"
      >
        Туры выходного дня
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { FilterParams } from './useDirectionsFilter';

  const props = defineProps<{
    filter: FilterParams,
  }>();

  function daysTo()  {
    const val = props.filter.days_count_to;
    props.filter.days_count_to = val === null ? 7 : null;
    props.filter.days_count_from = null;
  }

  function daysFrom()  {
    const val = props.filter.days_count_from;
    props.filter.days_count_from = val === null ? 7 : null;
    props.filter.days_count_to = null;
  }

  function weekend() {
    const val = props.filter.is_weekend;
    props.filter.is_weekend = val === null ? '1' : null;
  }
</script>

<style scoped lang="scss">
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
