<template>
  <article class="item">
    <div class="title-wrap" @click="showed = !showed">
      <h3 class="label">{{ label }}</h3>
      <button type="button" class="btn">
        <BaseIcon class="btn-icon" :class="{ 'btn-icon--active': showed }" name="btn-plus" fit />
      </button>
    </div>
    <SlideUpDown :duration="300" :active="showed">
      <div class="text" v-html="text"></div>
    </SlideUpDown>
  </article>
</template>

<script setup lang="ts">
  //@ts-ignore
  import SlideUpDown from 'vue-slide-up-down';
  import { ref } from 'vue';

  defineProps<{
    label: string,
    text: string,
  }>();

  const showed = ref(false);
</script>

<style scoped lang="scss">
  .title-wrap {
    padding: 12px 0;
    display: flex;
    gap: 16px;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }

  .label {
    flex-grow: 1;
    color: #131518;
    font-size: 16px;
    line-height: 1.3;
    font-weight: 400;
  }

  .btn {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  .text {
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
    padding-bottom: 15px;
    @apply tw-text-black2;
  }

  .btn-icon {
    transition: transform 300ms;

    &--active {
      transform: rotate(45deg);
    }
  }
</style>
