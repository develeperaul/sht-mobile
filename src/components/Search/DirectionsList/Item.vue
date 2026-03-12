<template>
  <router-link class="item" :to="{ name: 'search.show-direction', params: { id: item.id } }">
    <div class="dir-wrap">
      <span v-if="item.background" class="photo-wrap">
        <img class="photo" :src="item.background.url" :alt="item.name" />
      </span>
      <span class="dir-name">{{ item.name }}</span>
    </div>
    <div class="count">{{ item.children_count }} маршрута</div>
  </router-link>
</template>

<script setup lang="ts">
  import type { DirectionSearchItem } from 'src/api/directions';

  defineProps<{
    item: DirectionSearchItem,
  }>();
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
