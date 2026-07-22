<template>
  <div class="item">
    <img src="/test.jpeg" alt="" />
    <div class="content">
      <div class="text">Открытие нового салона на Пушкина</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.item {
  @apply tw-relative tw-w-[90px] tw-h-[90px] tw-overflow-hidden tw-grid tw-content-end tw-p-1.5;
  border-radius: 15px;
  & img {
    @apply tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0;
    @apply tw-bg-black/30;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @apply tw-bg-black/30;
    z-index: 1;
  }
  & .content {
    @apply tw-text-white tw-text-t00 tw-relative;
    z-index: 2;
  }
}
</style>
