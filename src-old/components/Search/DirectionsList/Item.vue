<template>
  <router-link class="item" :to="{ name: 'search.show-direction', params: { id: item.id } }">
    <div class="dir-wrap">
      <span v-if="item.background" class="photo-wrap">
        <img class="photo" :src="item.background.url" :alt="item.name" />
      </span>
      <span class="dir-name">{{ item.name }}</span>
    </div>
    <div class="count">{{ item.children_count }} {{ routeLabel }}</div>
  </router-link>
</template>

<script setup lang="ts">
  import type { DirectionSearchItem } from 'src/api/directions';
  import { computed } from 'vue';

  const props = defineProps<{
    item: DirectionSearchItem,
  }>();

  const routeLabel = computed(() => {
    const count = props.item.children_count;
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'маршрутов';
    }

    if (lastDigit === 1) {
      return 'маршрут';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'маршрута';
    }

    return 'маршрутов';
  });
</script>

<style scoped lang="scss">
  .dir-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .photo-wrap {
    width: 34px;
    height: 34px;
  }


  .item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 0;
  }

  .photo {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .count {
    font-size: 14px;
    line-height: 1;
    @apply tw-text-gray_icon;
  }

  .dir-name {
    font-size: 14px;
    line-height: 1;
    @apply tw-text-gray_main;
  }
</style>
