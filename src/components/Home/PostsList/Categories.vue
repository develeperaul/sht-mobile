<template>
  <Swiper
    class="items"
    slidesPerView="auto"
    spaceBetween="8"
    freeMode
    :resistanceRatio="0"
    grabCursor
    :modules="modules"
  >
    <SwiperSlide class="slide" v-for="(item, index) in items">
      <button
        class="tab-btn"
        :class="{
          'tab-btn--active': activeCategory ? item.name === activeCategory.name : item.id === '-1',
        }"
        @click="$emit('change:category', item.id === '-1' ? null : item)"
      >
        {{ item.name }}
      </button>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { FreeMode } from 'swiper/modules';
  import { computed } from 'vue';
  import * as postsApi from 'src/api/posts';
  import type { PostCategory } from 'src/api/posts';
  import useRequest from 'src/composables/useRequest';

  defineProps<{
    activeCategory: PostCategory | null,
  }>();

  defineEmits<{
    (event: 'change:category', category: PostCategory | null): void,
  }>();

  const modules = [ FreeMode ];

  const { data } = useRequest(postsApi.categories);

  const items = computed<PostCategory[]>(() => {
    if(!data.value) return [];
    return [ { name: 'Все', id: '-1' }, ...data.value.data ];
  });
</script>

<style scoped lang="scss">
  .tab-btn {
    --bg-color: rgba(255, 255, 255, 0.2);
    user-select: none;
    display: block;
    width: fit-content;
    padding: 8px;
    border-radius: 20px;
    box-shadow: 0px 2px 1.6px 0px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    @apply tw-text-gray_main;

    &--active {
      background: linear-gradient(99.64deg, #A7BEFD 3.89%, #72A5F6 79.63%);
      @apply tw-text-white;
    }
  }

  .items {
    padding-top: 4px;
    padding-bottom: 8px;
  }

  .slide {
    width: auto;
  }
</style>
