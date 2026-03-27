<template>
  <BaseModal class="filter-modal" v-model="value" y-pos="bottom" x-pos="left" animation="slide-bottom">
    <div class="card-sheet glass">
      <div class="card-sheet__top">
        <button class="card-sheet__panel" type="button" v-touch-swipe.mouse.bottom="close"></button>
        <div class="card-sheet__toolbar">
          <div class="card-sheet__action card-sheet__action--left"></div>
          <div class="card-sheet__title">Фильтры</div>
          <div class="card-sheet__action card-sheet__action--right">
            <button type="button" @click="$emit('clear'); close()">Сбросить</button>
          </div>
        </div>
      </div>
      <div v-if="filterValues" class="card-sheet__body-wrap">
        <LocationType class="filter-sec" :filter="filter" :typesItems="filterValues.types" />
        <FilterPrice
          class="filter-sec"
          :filter="filter"
          :min="filterValues.prices.min"
          :max="filterValues.prices.max"
        />
        <FilterPeriod class="filter-sec" :filter="filter" />
      </div>
      <div class="card-sheet__btn-wrap env-b">
        <BaseButton @click="$emit('reload'); close()">Показать</BaseButton>
      </div>
      <q-inner-loading :showing="loading" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from 'src/components/Base/Modal.vue';
  import FilterPrice from './Price.vue';
  import FilterPeriod from './Period.vue';
  import LocationType from './LocationType.vue';
  import { FilterParams } from './useDirectionsFilter';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  import { watch, computed } from 'vue';

  defineProps<{
    filter: FilterParams,
  }>();

  defineEmits<{
    (event: 'reload'): void,
    (event: 'clear'): void,
  }>();

  const value = defineModel<boolean>({ default: false });

  function close() {
    value.value = false;
  }

  const { data, loading, send } = useRequest(directionsApi.filters, { immediate: false });

  const filterValues = computed(() => data.value?.data ?? null);

  watch(value, (val) => {
    if(!data.value && val) {
      console.log(val);
      send();
    }
  }, { immediate: true });
</script>

<style scoped lang="scss">
  .card-sheet {
    width: 100%;
    position: relative;
    z-index: 1;
    --bg-color: rgba(152, 183, 222, 0.6);
    --radius: 32px 32px 0 0;
    display: flex;
    flex-direction: column;
    padding: 0 12px;

    &__top {
      padding-bottom: 10px;
    }

    &__panel {
      position: relative;
      z-index: 1;
      height: 20px;
      width: 100%;
      padding-top: 5px;
      cursor: pointer;

      &::after {
        content: '';
        display: block;
        width: 36px;
        height: 5px;
        border-radius: 3px;
        margin: 0 auto;
        @apply tw-bg-white;
      }
    }

    &__body-wrap {
      flex-grow: 1;
      overflow-x: hidden;
    }

    &__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-top: 15px;
    }

    &__action {
      width: 50%;
      font-size: 14px;
      line-height: 1;
      font-weight: 400;
      @apply tw-text-white;

      &--left {
        text-align: left;
      }

      &--right {
        text-align: right;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.25;
      @apply tw-text-white;
    }

    &__btn-wrap {
      padding-top: 16px;
    }
  }


  .filter-sec {
    & + & {
      margin-top: 8px;
    }
  }

  :global(.filter-modal) {
    --card-max-mult: 0.9;
  }

  :global(.filter-modal .overlay) {
    background: none !important;
  }
</style>
