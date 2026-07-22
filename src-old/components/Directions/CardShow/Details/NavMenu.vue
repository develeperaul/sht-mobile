<template>
  <Swiper
    :space-between="12"
    :slides-per-view="'auto'"
    free-mode
    :resistanceRatio="0"
    :modules="modules"
    grab-cursor
  >
    <SwiperSlide
      class="slide"
      v-for="menuItem in menu"
      :key="menuItem.value"
    >
      <button
        class="tab-btn"
        :class="{ 'tab-btn--active': menuItem.value === active }"
        type="button"
        @click="$emit('change:tab', menuItem.value)"
      >{{ menuItem.name }}</button>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
 import { Swiper, SwiperSlide } from 'swiper/vue';
  import { FreeMode } from 'swiper/modules';

  defineProps<{
    active: string,
  }>();

  defineEmits<{
    (event: 'change:tab', value: string): void,
  }>();

  type MenuItem = { name: string, value: string };

  const modules = [ FreeMode ];

  const menu: MenuItem[] = [
    {
      name: 'Описание',
      value: 'description',
    },
    {
      name: 'Маршрут',
      value: 'routes',
    },
    {
      name: 'Проживание',
      value: 'hotels',
    },
    {
      name: 'Питание',
      value: 'food',
    },
    {
      name: 'Что включено',
      value: 'includes',
    },
    {
      name: 'FAQ',
      value: 'faq',
    },
  ];
</script>

<style scoped lang="scss">
  .tab-btn {
    padding: 8px 0;
    white-space: nowrap;
    font-size: 16px;
    line-height: 1.3;
    user-select: none;
    border-bottom: 1px solid transparent;
    @apply tw-text-gray_main;

    &--active {
      border-bottom-color: theme('colors.blue_icon');
    }
  }

  .slide {
    width: auto;
  }
</style>
