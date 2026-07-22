<template>
  <section class="card-primary">
    <ul class="params">
      <li class="param">
        <span class="label">Продолжительность</span>
        <div class="value">{{ daysCount }}</div>
      </li>
      <li class="param">
        <span class="label">Группа</span>
        <div class="value">до {{ maxMembers }} человек</div>
      </li>
      <li class="param">
        <span class="label">Сложность</span>
        <LevelText :level="difficultyLevel" :labelVariant="1" />
      </li>
      <li class="param">
        <span class="label">Комфорт</span>
        <LevelText :level="comfortLevel" :labelVariant="0" />
      </li>
      <li class="param">
        <span class="label">Период</span>
        <div class="value">{{ period }}</div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import LevelText from './LevelText.vue';
  import { monthLabels } from '../../model/consts';
  import type { ShowOfferItem } from 'src/api/directions';

  const props = defineProps<{
    maxMembers: number,
    difficultyLevel: number,
    comfortLevel: number,
    dates: string[],
    offer: ShowOfferItem | null,
  }>();

  const period = computed(() => {
    if(props.dates.length === 0) return '-';
    if(props.dates.length === 1) return props.dates[0]!;
    return `${parseDate(props.dates[0]!)} - ${parseDate(props.dates[props.dates.length - 1]!)}`;
  });

  const daysCount = computed(() => {
    if(!props.offer) return '-';
    const end = Date.parse(props.offer.end_date);
    const start = Date.parse(props.offer.start_date);
    return Math.ceil((end - start) / 1000 / 60 / 60 / 24);
  });

  function parseDate(date: string) {
    const [_year, month] = date.split('-');
    let monthLabel = '-';
    if(month) {
      const index = parseInt(month);
      if(!isNaN(index) && monthLabels[index - 1]) {
        monthLabel = monthLabels[index - 1]![0];
      }
    }
    return monthLabel;
  }
</script>

<style scoped lang="scss">
  .param {
    display: flex;
    padding: 12px 0;
    font-size: 16px;
    line-height: 1.375;
    @apply tw-text-black2 tw-border-b tw-border-solid tw-border-blue_bg;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border: 0;
    }
  }

  .label {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.15;
    @apply tw-text-gray_icon;
  }

</style>
