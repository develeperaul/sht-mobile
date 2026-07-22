<template>
  <router-link
    :to="{ name: 'direction', params: { id: direction.id } }"
    class="card-direction"
    :class="[size ? 'card-direction_sm' : '']"
    :style="{ backgroundImage: `url(${direction.background?.url})` }"
  >
    <div class="card-direction__top">
      <div class="card-direction__labels">
        <div class="card-direction__label">
          от {{ direction.min_date }} дней {{}}
        </div>
        <div class="card-direction__label">
          {{
            dayjs()
              .locale('ru')
              .month(Number(direction.offers_min_start_date))
              .format('MMMM')
          }}-
          {{
            dayjs()
              .locale('ru')
              .month(Number(direction.offers_max_end_date))
              .format('MMMM')
          }}
        </div>
      </div>
      <div
        class="card-direction__title"
        v-fit-text="{ min: 26, max: 30, lineHeight: 1.1 }"
      >
        {{ direction.name }}
      </div>
    </div>
    <div class="card-direction__bottom">
      <div class="card-direction__price">
        <div>
          от
          <span v-amount-pretty="direction.offers_min_price"> </span>
        </div>
        <div
          class="tw-w-11 tw-h-11 tw-rounded-[9999px] tw-bg-white tw-grid tw-place-content-center"
        >
          <BaseIcon name="chevronright" class="tw-w-6 tw-h-6 tw-text-black" />
        </div>
      </div>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { DirectionT } from 'src/models/api/main'
import dayjs from 'dayjs'

const props = defineProps<{
  direction: DirectionT
  size?: string
}>()
</script>
<style lang="scss" scoped>
.card-direction {
  @apply tw-text-white tw-grid tw-content-between tw-bg-gray_main;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 400px;
  border-radius: 32px;
  overflow: hidden;
  padding: 20px;
  max-width: 100%;
  &_sm {
    height: 257px;
  }
  &__top {
  }
  &__labels {
    @apply tw-inline-flex tw-gap-2 tw-mb-3;
  }
  &__label {
    @apply p1 tw-text-white tw-font-normal;
    padding: 6.55px 13.5px;
    border-radius: 19.66px;
    backdrop-filter: blur(10.486258506774902px);
    background: #0000000d;
  }
  &__title {
    @apply h1 tw-uppercase;
  }
  &__bottom {
  }
  &__price {
    @apply tw-text-white p1 tw-flex tw-justify-between tw-items-center;
    backdrop-filter: blur(40px);
    background: #ffffff0d;
    padding: 8px 8px 8px 20px;
    border-radius: 50px;
  }
}
</style>
