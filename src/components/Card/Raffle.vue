<template>
  <div class="card-raffle">
    <div class="card-raffle__content">
      <div class="card-raffle__label">Розыгрыш</div>

      <div>
        <div
          class="h1 tw-uppercase tw-text-center tw-mb-2"
          v-html="'Прыжок <br/> с парашютом'"
        ></div>
        <div class="p2">Выиграйте прыжок при поездке на Кавказ!</div>
      </div>
    </div>
    <div
      class="card-raffle__bg"
      style="background-image: url('src/assets/test.png')"
    ></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.card-raffle {
  height: 457px;
  width: 100%;
  position: relative;
  padding: 12px 0;
  &__content {
    display: grid;
    width: 284px;
    position: relative;
    z-index: 1;
    justify-items: center;
    height: 100%;
    margin: 0 auto;
    align-content: space-between;
  }
  &__label {
    @apply tw-text-white tw-p-2 p2;
    background: #ffffff0d;
    backdrop-filter: blur(40px);
    border-radius: 32px;
    width: fit-content;
  }
  &__bg {
    backdrop-filter: blur(32.5px);
    background: linear-gradient(
      180deg,
      rgba(82, 155, 208, 0) 61.68%,
      #edf7ff 125.6%
    );
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
