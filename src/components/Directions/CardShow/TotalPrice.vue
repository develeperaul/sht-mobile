<template>
  <div class="total-price card-primary">
    <div class="days-count">
      <span>{{ daysCount }} дней</span> <span>•</span> <span>{{ period }}</span>
    </div>
    <div class=" tw-flex tw-gap-5 tw-justify-between">
      <div>
        <p class="price-label">Предоплата</p>
        <div class="price-value" v-amount-pretty="offer.prepay"></div>
      </div>
      <div class="btn-gradient tw-w-fit" @click="router.push({ name: 'booking', params: { uuid: offer?.id } })">
        Бронировать
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ShowOfferItem } from 'src/api/directions';
  import { monthLabels } from '../model/consts';
import { useRouter } from 'vue-router';

  const router = useRouter()
  const props = defineProps<{
    offer: ShowOfferItem,
    showBtn?: boolean
  }>();

  const daysCount = computed(() => {
    if(!props.offer) return '-';
    const end = Date.parse(props.offer.end_date);
    const start = Date.parse(props.offer.start_date);
    return Math.ceil((end - start) / 1000 / 60 / 60 / 24);
  });

  const period = computed(() => {
    return getOfferLabel(props.offer);
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
  .total-price {
    width: 100%;
    box-shadow: 0px -4px 20px 0px rgba(7, 30, 58, 0.1);
  }

  .days-count {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 6px;
    @apply tw-text-black2;
  }

  .price-label {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 4px;
    @apply tw-text-gray_icon2;
  }

  .price-value {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    @apply tw-text-black2;
  }
</style>
