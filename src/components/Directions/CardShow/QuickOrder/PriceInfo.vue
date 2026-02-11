<template>
  <article class="item">
    <h2 class="label">Быстрое бронирование</h2>
    <p class="caption">Общая стоимость/чел.</p>
    <p class="price" v-amount-pretty="price"></p>
    <p class="currency">-</p>
  </article>
</template>

<script setup lang="ts">
  defineProps<{
    price: string,
  }>();
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
