<template>
  <Swiper
    class="swiper-gallery-pag"
    :spaceBetween="16"
    :modules="modules"
    pagination
  >
    <SwiperSlide
      v-for="image in images"
    >
      <img class="photo" :src="image.url" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';

  type Item = { url: string };

  defineProps<{
    images: Item[],
  }>();

  const modules = [ Pagination ];
</script>

<style scoped lang="scss">
  .photo {
    border-radius: 30px;
    width: 100%;
  }
</style>
