<template>
  <article class="item">
    <h2 class="label">Быстрое бронирование</h2>
    <p class="caption">Общая стоимость/чел.</p>
    <p class="price tw-flex " >
      <span v-amount-pretty="price"></span>
      <BaseIcon @click="openModal = true"  name="info" class=" tw-mx-2 tw-mb-2 tw-w-3.5 tw-h-3.5"  />
    </p>
    <p class="currency">-</p>
  </article>
  <BaseModal v-model="openModal" y-pos="bottom" x-pos="left" animation="slide-bottom">
    <div class="card-sheet glass-w env-b">
      <div class="card-sheet__top">
        <button class="card-sheet__panel" type="button" v-touch-swipe.mouse.bottom="openModal=false"></button>
      </div>
      <div class="card-sheet__body-wrap tw-py-10">

        <div class=" p2 tw-text-white tw-text-center tw-mx-auto" style=" max-width: 298px;">
          Остаток стоимости тура оплачивается на месте в валюте по текущему курсу на момент оплаты.
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from 'src/components/Base/Modal.vue';
  defineProps<{
    price: string,
  }>();
  const openModal = ref(false)
</script>

<style scoped lang="scss">
  .item {
    border-radius: 24px;
    background-color: #F5F8FC;
    padding: 16px 12px;
  }

  .label {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    @apply tw-text-gray_main;
  }

  .caption {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 8px;
    @apply tw-text-gray_icon2;
  }

  .price {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.4;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    @apply tw-text-gray_main;
  }
</style>
