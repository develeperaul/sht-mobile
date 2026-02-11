<template>
  <article class="item">
    <h2 class="name">{{ item.name }}</h2>
    <div class="raiting-wrap">
      <span class="raiting-label">Рейтинг отеля</span>
      <span class="raiting-value">{{ item.rating }}</span>
    </div>
    <div class="text-wrap" v-html="item.description"></div>
    <GalleryImages class="gal" :images="item.images" />
  </article>
</template>

<script setup lang="ts">
  import GalleryImages from '../GalleryImages.vue';
  import { Hotel } from 'src/api/directions';

  defineProps<{
    item: Hotel,
  }>();
</script>

<style scoped lang="scss">
  .item {
    @apply tw-text-gray_main;
  }

  .name {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .raiting-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
  }

  .raiting {
    &-label {
      flex-grow: 1;
      font-size: 16px;
      line-height: 1;
    }

    &-value {
      font-weight: 600;
      font-size: 20px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
  }

  .text-wrap {
    font-size: 16px;
    line-height: 1.1;
    @apply tw-text-black2;
  }

  .gal {
    margin-top: 12px;
  }
</style>
