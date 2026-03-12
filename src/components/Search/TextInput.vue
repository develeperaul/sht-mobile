<template>
  <div class="text-inp glass">
    <input class="inp" name="search" type="text" autocomplete="off" placeholder="Куда отправимся?" v-model="value" />
    <button class="clear" type="button" @click="value = ''">
      <BaseIcon name="close" fit />
    </button>
  </div>
</template>

<script setup lang="ts">
  const value = defineModel<string>({ required: true });
</script>

<style scoped lang="scss">
  .text-inp {
    position: relative;
    --radius: 24px;
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);

    &::before {
      content: '';
      width: 19px;
      height: 19px;
      display: block;
      position: absolute;
      z-index: 1;
      top: 20px;
      left: 18px;
      border-radius: 50%;
      @apply tw-bg-blue_icon;
    }
  }

  .inp {
    background: none;
    display: block;
    width: 100%;
    height: 60px;
    outline: none;
    padding-left: 48px;
    padding-right: 36px;
    font-size: 14px;
    line-height: 1;
    @apply tw-text-gray_main;

    &::placeholder {
      @apply tw-text-gray_main;
    }
  }

  .clear {
    display: block;
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 16px;
    width: 20px;
    height: 20px;
    @apply tw-text-gray_icon;
  }
</style>
