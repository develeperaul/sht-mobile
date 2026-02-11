<template>
  <div class="level-text">
    <div class="rounds">
      <span
        class="round"
        :class="{ 'round--active': i === 1 || i <= level  }"
        v-for="i in 5"
      ></span>
    </div>
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    level: number,
    labelVariant: 0 | 1,
  }>();

  const label = computed(() => {
    const { labelVariant, level } = props;
    return level < 3
      ? ['Низкий', 'Низкая'][labelVariant]
      : level >= 3 && level < 5
      ? ['Средний', 'Средняя'][labelVariant]
      : ['Высокий', 'Высокая'][labelVariant];
  });
</script>

<style scoped lang="scss">
  .level-text {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rounds {
    display: flex;
    gap: 4px;
  }

  .round {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    @apply tw-bg-blue_bg;

    &--active {
      @apply tw-bg-blue_icon;
    }
  }
</style>
