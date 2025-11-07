<template>
  <div class="card-review">
    <div class="card-review__top">
      <img src="~assets/test.png" alt="" class="card-review__img" />
      <div class="tw-grid tw-gap-1">
        <div class="h2">Вероника Ш.</div>
        <div class="p2">15 мар. 2025 г.</div>
      </div>
    </div>
    <div class="card-review__content">
      <div class="tw-flex tw-items-center tw-gap-1">
        <Star active />
        <Star active />
        <Star active />
        <Star />
        <Star />
      </div>
      <div class="p2 card-review__text">
        Первый раз ездила с Team Travel на Байкал в конце февраля-начало марта
        2025 г. Все прошло отлично, организация тура была на высоком уровне!
        Нашла НашлаНашлаНашлаНашла 
      </div>
      <div class="p2 tw-underline">Подробнее</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.card-review {
  @apply tw-bg-white tw-p-5 tw-grid tw-gap-3;
  border-radius: 32px;
  &__top {
    @apply tw-flex tw-items-center tw-gap-3;
  }
  &__img {
    width: 62px;
    height: 62px;
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
  }
  &__content {
    @apply tw-grid tw-gap-3;
  }
  &__text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
