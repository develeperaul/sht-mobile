<template>
  <div>
    <div class="search-actions">
      <TextInput class="search-actions__inp" v-model="directionChildrenParams.search" />
      <ButtonRound class="search-actions__btn" icon="calendar" iconFill="#8BA7F6" type="button" @click="showed = true" />
    </div>
    <DirectionChildrenList class="items-list" v-if="items" :items="items" />
    <ModalCalendar v-model:showed="showed" v-model="directionParams.range" />
  </div>
</template>

<script setup lang="ts">
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

  const props = defineProps<{
    directionParams: DirectionParams,
    directionChildrenParams: DirectionChildrenParams,
  }>();

  const route = useRoute();

  const id = computed(() => route.params.id as string);

  const { data, send } = useRequest(
    () => directionsApi.showSubgroup(
      id.value,
      {
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
</script>

<style scoped lang="scss">
  .items-list {
    margin-top: 12px;
  }
</style>
