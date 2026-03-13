<template>
  <router-link
    class="item"
    :class="{
      'gradient-card': design === 'blue',
      'item--white': design === 'white',
    }"
    :to="{ name: 'posts.show', params: { id: item.id } }"
  >
    <div class="img-wrap">
      <img class="photo" :src="item.preview_image.url" />
      <div class="cat-wrap" v-if="item.rubrics[0]">
        <p class="category glass">{{ item.rubrics[0].name }}</p>
      </div>
    </div>
    <div class="info">
      <div class="info-param">
        <span class="info-param__icon">
          <BaseIcon name="calendar" fit />
        </span>
        <span>{{ dateVal }}</span>
      </div>
      <div class="info-param">
        <span class="info-param__icon">
          <BaseIcon name="clock" fit />
        </span>
        <span>{{ item.reading_time }} мин</span>
      </div>
    </div>
    <p class="name">{{ item.title }}</p>
  </router-link>
</template>

<script setup lang="ts">
  import type { PostsItem } from 'src/api/posts';
  import { prettyDate } from 'src/utils/dates';

  const props = withDefaults(
    defineProps<{
      item: PostsItem,
      design?: 'white' | 'blue',
    }>(),
    { design: 'blue' },
  );

  const dateVal = computed(() => prettyDate(props.item.created_at));
</script>

<style scoped lang="scss">
  .item {
    display: block;
    width: 100%;
    border-radius: 32px;
    padding: 6px;
    padding-bottom: 24px;

    &--white {
      @apply tw-bg-white;
    }
  }

  .img-wrap {
    position: relative;
    z-index: 1;
    box-shadow: 0px 7.13px 27.42px 0px rgba(154, 161, 171, 0.2);
  }

  .photo {
    border-radius: 32px;
    width: 100%;
  }

  .cat-wrap {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 0;
    left: 0;
    z-index: 1;
    padding-top: 12px;
  }

  .category {
    display: inline-block;
    padding: 6px 8px;
    @apply tw-text-white;
  }

  .name {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-top: 12px;
    @apply tw-text-gray_main;
  }

  .info {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .info-param {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.02em;
    @apply tw-text-gray_icon2;

    &__icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
