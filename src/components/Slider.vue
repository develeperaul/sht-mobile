<template>
  <Swiper
    :modules="[Pagination]"
    :slides-per-view="1"
    :space-between="20"
    :pagination="pagination"
    class="slider"
  >
    <SwiperSlide
      v-for="(slide, idx) in imgs"
      :key="idx"
      src
      class="slider__slide"
    >
      <img :src="slide.url" />
    </SwiperSlide>
    <div class="slider__pagination-orher"></div>
  </Swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import { Pagination } from 'swiper/modules'
// Не забудьте про стили!
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps<{
  imgs: { url: string }[]
}>()
const slides = [
  { img: 'https://cs1.htmlacademy.ru/blog/html-tags/img/previewOg.png' },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnpOT3H89ShReyMUGCtqaY3RISC9o7BdcFQ&s',
  },
]

const pagination = {
  el: '.slider__pagination-orher',
  type: 'bullets',
  clickable: false,
  renderBullet: function (index, className) {
    return '<div class="' + className + '">' + '<span>' + '</span>' + '</div>'
  },
}
</script>
<style lang="scss" scoped>
.slider {
  &__slide {
    height: 208px;
    width: 100%;
    border-radius: 30px;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
