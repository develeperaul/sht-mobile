<template>
  <div>
    <div class="search-actions tw-mb-6">
      <TextInput class="search-actions__inp" v-model="search" />
      <ButtonRound class="search-actions__btn" icon="calendar" iconFill="#8BA7F6" type="button" @click="$emit('show:calendar')" />
    </div>
    <ListChildren v-if="items" :items="items" />
    <q-inner-loading :showing="!data && loading" />
  </div>
</template>

<script setup lang="ts">
  import ListChildren from 'src/components/Directions/Catalog/ListChildren.vue';
  import { computed, ref } from 'vue';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';

  const props = defineProps<{
    id: string,
    range: { start: string, end: string } | null,
  }>();

  defineEmits<{
    (event: 'show:calendar'): void,
  }>();

  const search = ref('');

  const { data, loading, send } = useRequest(
    () => directionsApi.showSubgroup(
      props.id,
      {
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
</script>
