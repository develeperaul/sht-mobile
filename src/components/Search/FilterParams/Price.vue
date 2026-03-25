<template>
  <section class="dir-filter-card gradient-card">
    <div class="dir-filter-card__title">Стоимость в ₽</div>
    <div class="actions">
      <input class="dir-filter-inp action" type="number" name="price_from" placeholder="1000" v-model="filter.price_from" />
      <span>-</span>
      <input class="dir-filter-inp action" type="number" name="price_to" placeholder="1000" v-model="filter.price_to" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { FilterParams } from './useDirectionsFilter';

  defineProps<{
    filter: FilterParams,
  }>();
</script>

<style scoped lang="scss">
  .actions {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .action {
    width: 50%;
  }
</style>
