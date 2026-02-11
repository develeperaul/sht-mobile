<template>
  <section class="card-primary">
    <PriceInfo class="pr-info" v-if="currentOffer" :price="currentOffer.price" />
    <DatesTape class="dt-sec" :dates="dates" :currentDate="currentDate" @change:date="$emit('change:date', $event)" />
    <Select
      class="dt-select"
      :modelValue="currentOffer"
      :options="offers"
      defaultLabel="Выберите дату"
      primaryKey="id"
      :getLabel="getOfferLabel"
      :getOptionLabel="getOfferLabel"
      @update:modelValue="$emit('change:offer', $event)"
    />
    <BaseButton>Забронировать</BaseButton>
    <q-inner-loading :showing="loading" />
  </section>
</template>

<script setup lang="ts">
  import * as directionsApi from 'src/api/directions';
  import useRequest from 'src/composables/useRequest';
  import PriceInfo from './PriceInfo.vue';
  import DatesTape from './DatesTape.vue';
  import Select from '../Select.vue';
  import { computed } from 'vue';
  import type { ShowOfferItem } from 'src/api/directions';
  import { monthLabels } from '../../model/consts';

  const props = defineProps<{
    directionId: string,
    currentDate: string,
    currentOffer: ShowOfferItem | null,
    dates: string[],
  }>();

  const emit = defineEmits<{
    (event: 'change:date', value: string): void,
    (event: 'change:offer', value: ShowOfferItem | null): void,
  }>();

  const { data, loading } = useRequest(
    () => directionsApi.showOffers(props.directionId, {
      date: props.currentDate,
    }),
    {
      watch: [ () => props.currentDate ],
      onSuccess(res) {
        emit('change:offer', res.data[0] ?? null);
      },
    }
  );

  const offers = computed(() => {
    if(!data.value) return [];
    return data.value.data;
  });

  function prettyDate(date: string) {
    const parts = date.split('T')[0]?.split('-');
    if(!parts) return '?';
    const [year = '?', month = '?', day = '?'] = parts;
    const index = parseInt(month);
    if(isNaN(index) || !monthLabels[index - 1]) return '?';
    return `${day} ${monthLabels[index - 1]![1]} ${year}`;
  }

  function getOfferLabel(val: ShowOfferItem) {
    const start = prettyDate(val.start_date);
    const end = prettyDate(val.end_date);
    return `${start} - ${end}`;
  }
</script>

<style scoped lang="scss">
  .pr-info {
    margin-bottom: 32px;
  }

  .dt-sec {
    margin-bottom: 12px;
  }

  .dt-select {
    margin-bottom: 32px;
  }
</style>
