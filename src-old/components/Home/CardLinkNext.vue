<template>
  <router-link class="link-btn" :to="to">
    <span class="link-btn__text">{{ text }}</span>
    <span class="link-btn__icon">
      <BaseIcon name="right" fit />
    </span>
  </router-link>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router';

  defineProps<{
    to: RouteLocationRaw,
    text: string,
  }>();
</script>

<style scoped lang="scss">
  .link-btn {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 14px;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.25;
    @apply tw-text-blue_additional;

    &__icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }

    &__text {
      flex-grow: 1;
    }
  }
</style>
