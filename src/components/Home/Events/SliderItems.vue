<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="1"
    :spaceBetween="8"
    :modules="modules"
    pagination
  >
    <SwiperSlide>
      1
    </SwiperSlide>
    <SwiperSlide>
      2
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';

  defineProps<{

  }>();

  const modules = [ Pagination ];
</script>
