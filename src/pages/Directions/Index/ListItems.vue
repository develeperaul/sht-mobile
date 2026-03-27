<template>
  <div>
    <div class="search-actions tw-mb-3">
      <TextInput class="search-actions__inp" v-model="search" />
      <ButtonRound class="search-actions__btn" icon="calendar" iconFill="#8BA7F6" type="button" @click="$emit('show:calendar')" />
    </div>
    <div class="filter-actions">
      <ButtonRound
        class="btn-settings"
        icon="settings"
        type="button"
        size="36px"
        iconSize="0.6em"
        @click="showedFilter = true"
      />
      <ButtonDropdown
        :title="currentSort?.name ?? 'Сортировка'"
        :active="showedSort"
        @click="showedSort = !showedSort"
      />
    </div>
    <CatalogList v-if="items" :items="items" />
    <FilterParamsModal v-model="showedFilter" :filter="filter" @reload="send" @clear="clearFilter(); send()" />
    <SortParamsModal v-model="showedSort" v-model:sort="sortValue" @refresh="send" />
    <q-inner-loading :showing="!data && loading" />
  </div>
</template>

<script setup lang="ts">
  import ButtonDropdown from 'src/components/Base/ButtonDropdown.vue';
  import SortParamsModal from 'src/components/Search/SortParams/Modal.vue';
  import FilterParamsModal from 'src/components/Search/FilterParams/Modal.vue';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  import { computed, ref, watch } from 'vue';
  import CatalogList from 'src/components/Directions/Catalog/List.vue';
  import useDirectionsFilter from 'src/components/Search/FilterParams/useDirectionsFilter';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';
  import type { SortType } from 'src/api/directions';
  import { options as sortOpts } from 'src/components/Search/SortParams/consts';

  const props = defineProps<{
    range: { start: string, end: string } | null,
  }>();

  defineEmits<{
    (event: 'show:calendar'): void,
  }>();

  const search = ref('');

  const { params: filter, clear: clearFilter } = useDirectionsFilter();

  const sortValue = ref<SortType>('popularity');

  const { data, loading, send } = useRequest(
    () => directionsApi.all({
      sort_by: sortValue.value,
      ...(
        Object.fromEntries(Object.entries(filter).filter(e => e[1] !== null && e[1] !== ''))
      ),
      ...(search.value !== '' ? { name: search.value } : {}),
      ...(props.range !== null ? {
        date_from: props.range.start,
        date_to: props.range.end,
      } : {}),
    }),
  );

  const refresh = throttle(500, send);

  watch([
    search,
    () => props.range?.start ?? null,
    () => props.range?.end ?? null,
  ], () => refresh());

  const items = computed(() => data.value?.data ?? null);

  const showedFilter = ref(false);
  const showedSort = ref(false);
  const currentSort = computed(() => sortOpts.find(o => o.value === sortValue.value) ?? null);
</script>


<style scoped lang="scss">
  .btn-settings {
    --bg-color: rgba(255, 255, 255, 0.6);
  }

  .filter-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }
</style>
