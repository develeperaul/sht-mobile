<template>
  <div>
    <div class="search-actions tw-mb-4">
      <TextInput class="search-actions__inp" v-model="search" />
      <ButtonRound class="search-actions__btn" icon="calendar" iconFill="#8BA7F6" type="button" @click="$emit('show:calendar')" />
    </div>
    <div class="filter-actions">
      <ButtonDropdown
        :title="currentSort?.name ?? 'Сортировка'"
        :active="showedSort"
        @click="showedSort = !showedSort"
      />
    </div>
    <ListChildren v-if="items" :items="items" />
    <SortParamsModal v-model="showedSort" v-model:sort="sortValue" @refresh="send" />
    <q-inner-loading :showing="!data && loading" />
  </div>
</template>

<script setup lang="ts">
  import ButtonDropdown from 'src/components/Base/ButtonDropdown.vue';
  import SortParamsModal from 'src/components/Search/SortParams/Modal.vue';
  import ListChildren from 'src/components/Directions/Catalog/ListChildren.vue';
  import { computed, ref } from 'vue';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';
  import type { SortType } from 'src/api/directions';
  import { options as sortOpts } from 'src/components/Search/SortParams/consts';

  const props = defineProps<{
    id: string,
    range: { start: string, end: string } | null,
  }>();

  defineEmits<{
    (event: 'show:calendar'): void,
  }>();

  const sortValue = ref<SortType>('popularity');

  const search = ref('');

  const { data, loading, send } = useRequest(
    () => directionsApi.showSubgroup(
      props.id,
      {
        sort_by: sortValue.value,
        ...(search.value !== '' ? { search: search.value } : {}),
        ...(props.range !== null ? {
          date_from: props.range.start,
          date_to: props.range.end,
        } : {}),
      }
    )
  );

  const refresh = throttle(500, send);

  watch([
    search,
    () => props.range?.start ?? null,
    () => props.range?.end ?? null,
  ], () => refresh());

  const items = computed(() => data.value?.data ?? null);
  const showedSort = ref(false);
  const currentSort = computed(() => sortOpts.find(o => o.value === sortValue.value) ?? null);
</script>

<style scoped lang="scss">
  .filter-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }
</style>
