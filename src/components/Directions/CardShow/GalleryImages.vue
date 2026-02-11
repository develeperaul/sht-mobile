<template>
  <Swiper
    class="gallery"
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
  import { Pagination } from 'swiper/modules';

  type Item = { url: string };

  defineProps<{
    images: Item[],
  }>();

  import { Swiper, SwiperSlide } from 'swiper/vue';

  const modules = [ Pagination ];
</script>

<style scoped lang="scss">
  .photo {
    border-radius: 30px;
    width: 100%;
  }

  .gallery {
    --swiper-pagination-bottom: 0px;
    --swiper-pagination-color: theme('colors.blue_icon2');
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-bullet-inactive-color: theme('colors.blue_light_icon');
    padding-bottom: 18px;

    &:deep(.swiper-pagination) {
      font-size: 0;
    }
  }
</style>
