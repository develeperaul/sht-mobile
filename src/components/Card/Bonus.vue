<template>
  <div class="card-bonus">
    <div class="tw-py-3.5 tw-px-[18px]">
      <div class="h3 tw-mb-[7px]">Скидка 1 000 ₽</div>
      <div class="p2 tw-mb-3">
        за регистрацию <br />
        в приложении
      </div>
      <div @click="router.push({ name: 'reg2' })" class="card-bonus__btn">
        Получить
      </div>
    </div>
    <img src="~assets/img/bonus.png" alt="" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style lang="scss" scoped>
.card-bonus {
  @apply tw-rounded-32 tw-text-white tw-grid tw-grid-cols-2;
  background: linear-gradient(98.74deg, #889eda 16.72%, #e2ecf2 80.14%);
  &__btn {
    @apply tw-bg-geen_btn tw-text-black tw-font-normal tw-w-fit tw-px-[15px];
    font-size: 14px;
    line-height: 18px;
    height: 28px;
    font-weight: 700;
    border-radius: 28.6px;
    display: flex;
    align-items: center;
  }
}
</style>
