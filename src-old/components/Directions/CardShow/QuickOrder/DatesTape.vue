<template>
  <div class="dates">
    <p class="caption">Выбрать дату</p>
    <div class="area">
      <ul class="items">
        <li
          class="item"
          :class="{ 'item--divided': isDivided(index, date) }"
          v-for="(date, index) in parsedDates"
        >
          <template v-if="index === 0 || isDivided(index, date)">
            <span
              class="year-label"
              :class="{ 'year-label--first': index === 0 }"
            >
              {{ date[1] }}
            </span>
            <span v-if="index > 0" class="divider"></span>
          </template>
          <button
            class="btn-date"
            :class="{ 'btn-date--active': currentDate === date[0] }"
            @click="changeDate(date)"
          >
            {{ date[3] }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { monthLabels } from '../../model/consts';

  const props = defineProps<{
    dates: string[],
    currentDate: string,
  }>();

  const emit = defineEmits<{
    (event: 'change:date', value: string): void,
  }>();


  const parsedDates = computed(() => {
    const res = props.dates.map(date => {
      const [year, month] = date.split('-');
      let monthLabel = '-';
      if(month) {
        const index = parseInt(month);
        if(!isNaN(index) && monthLabels[index - 1]) {
          monthLabel = monthLabels[index - 1]![0];
        }
      }
      return [
        date,
        year ?? '-',
        month ?? '-',
        monthLabel,
      ];
    });
    return res;
  });

  function isDivided(index: number, date: string[]) {
    if(index === 0) return false;
    return parsedDates.value[index - 1]![1] !== date[1];
  }

  function changeDate(date: string[]) {
    emit('change:date', date[0]!);
  }
</script>

<style scoped lang="scss">
  .caption {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 12px;
    @apply tw-text-gray_icon2;
  }

  .area {
    width: 100%;
    max-width: 100%;
    overflow-y: hidden;
  }

  .items {
    display: flex;
    gap: 6px;
  }

  .item {
    position: relative;
    padding: 20px 0;
    white-space: nowrap;

    &--divided {
      padding-left: 14px;
    }
  }

  .btn-date {
    position: relative;
    padding: 4px 3px;

    &--active {
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        @apply tw-bg-blue_icon2;
      }
    }
  }

  .year-label {
    position: absolute;
    top: 0;
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    left: -12px;
    @apply tw-text-blue_icon2;

    &--first {
      left: 0;
    }
  }

  .divider {
    position: absolute;
    width: 1px;
    height: 20px;
    bottom: 26px;
    left: 6px;
    @apply tw-bg-blue_icon2;
  }
</style>
