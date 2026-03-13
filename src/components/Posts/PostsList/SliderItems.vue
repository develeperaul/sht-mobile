<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="1.1"
    :spaceBetween="8"
    :modules="modules"
    pagination
  >
    <SwiperSlide
      v-for="item in items"
      :key="item.id"
    >
      <ListItem :item="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import type { PostsItem } from 'src/api/posts';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import ListItem from './Item.vue';

  defineProps<{
    items: PostsItem[],
  }>();

  const modules = [ Pagination ];
</script>
