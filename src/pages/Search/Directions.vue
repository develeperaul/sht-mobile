<template>
  <div class="dir-list glass">
    <div class="search-actions">
      <TextInput class="search-actions__inp" v-model="directionParams.search" :autoFocus="focusInput" />
      <ButtonRound class="search-actions__btn" icon="calendar" type="button" @click="showed = true" />
    </div>
    <p class="title">Все направления</p>
    <DirectionsList v-if="items" :items="items" />
    <ModalCalendar v-model:showed="showed" v-model="directionParams.range" />
  </div>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  import DirectionsList from 'src/components/Search/DirectionsList/index.vue';
  import TextInput from 'src/components/Search/TextInput.vue';
  import ButtonRound from 'src/components/Search/ButtonRound.vue';
  import ModalCalendar from 'src/components/Search/ModalCalendar.vue';
  import type { DirectionParams } from './types/index';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';
  import { ref, watch } from 'vue';

  const props = withDefaults(
    defineProps<{
      directionParams: DirectionParams,
      focusInput?: boolean,
      showCalendar?: boolean,
    }>(),
    {
      focusInput: false,
      showCalendar: false,
    },
  )

  const { data, send } = useRequest(
    () => directionsApi.search({
      ...(props.directionParams.search !== '' ? { search: props.directionParams.search } : {}),
      ...(props.directionParams.range !== null ? {
        date_from: props.directionParams.range.start,
        date_to: props.directionParams.range.end,
      } : {}),
    }),
  );

  const refresh = throttle(500, send);

  watch([
    () => props.directionParams.search,
    () => props.directionParams.range?.start ?? null,
    () => props.directionParams.range?.end ?? null,
  ], () => refresh());

  const items = computed(() => data.value?.data ?? null);

  const showed = ref(props.showCalendar);
</script>

<style scoped lang="scss">
  .dir-list {
    padding: 16px;
    --bg-color: rgba(137, 137, 137, 0.1);
    --b-color: rgba(255, 255, 255, 0.8);
    --radius: 24px;
  }

  .title {
    margin-top: 30px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.2;
    @apply tw-text-gray_icon;
  }
</style>
