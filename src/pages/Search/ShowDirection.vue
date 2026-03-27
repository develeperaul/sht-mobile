<template>
  <div>
    <div class="search-actions tw-mb-4">
      <TextInput class="search-actions__inp" v-model="directionChildrenParams.search" />
      <ButtonRound class="search-actions__btn" icon="calendar" iconFill="#8BA7F6" type="button" @click="showed = true" />
    </div>
    <div class="filter-actions">
      <ButtonDropdown
        :title="currentSort?.name ?? 'Сортировка'"
        :active="showedSort"
        @click="showedSort = !showedSort"
      />
    </div>
    <DirectionChildrenList class="items-list" v-if="items" :items="items" />
    <SortParamsModal v-model="showedSort" v-model:sort="sortValue" @refresh="send" />
    <ModalCalendar v-model:showed="showed" v-model="directionParams.range" />
  </div>
</template>

<script setup lang="ts">
  import ButtonDropdown from 'src/components/Base/ButtonDropdown.vue';
  import SortParamsModal from 'src/components/Search/SortParams/Modal.vue';
  import DirectionChildrenList from 'src/components/Search/DirectionChildrenList/index.vue';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import type { DirectionParams, DirectionChildrenParams } from './types/index';
  import { ref } from 'vue';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';
  import ModalCalendar from 'src/components/Search/ModalCalendar.vue';
  import type { SortType } from 'src/api/directions';
  import { options as sortOpts } from 'src/components/Search/SortParams/consts';

  const props = defineProps<{
    directionParams: DirectionParams,
    directionChildrenParams: DirectionChildrenParams,
  }>();

  const route = useRoute();

  const id = computed(() => route.params.id as string);

  const sortValue = ref<SortType>('popularity');

  const { data, send } = useRequest(
    () => directionsApi.showSubgroup(
      id.value,
      {
        sort_by: sortValue.value,
        ...(props.directionChildrenParams.search !== '' ? { search: props.directionChildrenParams.search } : {}),
        ...(props.directionParams.range !== null ? {
          date_from: props.directionParams.range.start,
          date_to: props.directionParams.range.end,
        } : {}),
      }
    )
  );

  const refresh = throttle(500, send);

  watch([
    () => props.directionChildrenParams.search,
    () => props.directionParams.range?.start ?? null,
    () => props.directionParams.range?.end ?? null,
  ], () => refresh());

  const items = computed(() => data.value?.data ?? null);

  const showed = ref(false);
  const showedSort = ref(false);
  const currentSort = computed(() => sortOpts.find(o => o.value === sortValue.value) ?? null);
</script>

<style scoped lang="scss">
  .items-list {
    margin-top: 12px;
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }
</style>
