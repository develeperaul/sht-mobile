<template>
  <button class="btn-dropdown" :class="{ 'btn-dropdown--active': active }" type="button">
    <span>{{ title }}</span>
    <span class="btn-dropdown__icon">
      <BaseIcon name="chevronright" fit />
    </span>
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string,
      active?: boolean
    }>(), { active: false },
  );
</script>

<style scoped lang="scss">
  .btn-dropdown {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    line-height: 1;
    @apply tw-text-blue_additional;

    &__icon {
      width: 12px;
      height: 12px;
      transform: rotate(90deg);
    }

    &--active &__icon {
      transform: rotate(-90deg);
    }
  }
</style>
