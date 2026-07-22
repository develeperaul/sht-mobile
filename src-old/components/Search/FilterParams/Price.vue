<template>
  <section class="dir-filter-card gradient-card">
    <div class="dir-filter-card__title">Стоимость в ₽</div>
    <div class="actions">
      <input
        class="dir-filter-inp action"
        type="number"
        name="price_from"
        :placeholder="min"
        v-model="filter.price_from"
        :value="filter.price_from"
        @change="updateMin"
      />
      <span>-</span>
      <input
        class="dir-filter-inp action"
        type="number"
        name="price_to"
        :placeholder="max"
        :value="filter.price_to"
        @change="updateMax"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { FilterParams } from './useDirectionsFilter';

  const props = defineProps<{
    filter: FilterParams,
    min: string,
    max: string,
  }>();

  function parseN(val: string) {
    let valN = parseFloat(val);
    valN = isNaN(valN) ? 0 : valN;
    return valN
  }

  function parseVal(val: string) {
    return val !== '' ? parseFloat(val) : 0;
  }

  function updateMin(event: Event) {
    const inp = event.target as HTMLInputElement;
    const minN = parseN(props.min);
    const val = parseVal(inp.value);
    props.filter.price_from = Math.max(minN, val).toString();
  }

  function updateMax(event: Event) {
    const inp = event.target as HTMLInputElement;
    const maxN = parseN(props.max);
    const minN = parseN(props.min);
    const val = parseVal(inp.value);
    props.filter.price_to = Math.min(maxN, Math.max(val, minN)).toString();
  }
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
