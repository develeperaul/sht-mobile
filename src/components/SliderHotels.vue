<template>
  <div class="tw-grid tw-gap-8">
    <div class="tw-overflow-hidden" v-for="(slide, idx) in hotels">
      <div class="h3 tw-mb-3 tw-font-bold">
        {{ slide.name }}
      </div>
      <div class="tw-overflow-hidden tw-mb-3">
        <Slider :imgs="slide.images" />
      </div>
      <div>
        <div
          class="h3 tw-font-bold tw-flex tw-items-center tw-justify-between tw-mb-3"
        >
          <div class=" ">Рейтинг</div>
          <div>
            {{ slide.rating }}
          </div>
        </div>
        <div class="p1 tw-grid tw-gap-4" v-html="slide.description"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import { Pagination } from 'swiper/modules'
// Не забудьте про стили!
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { HotelT } from 'src/models/api/main'

const props = defineProps<{
  hotels: HotelT[]
}>()

const pagination = {
  el: '.slider__pagination-orher',
  type: 'bullets',
  clickable: false,
  renderBullet: function (index, className) {
    return '<div class="' + className + '">' + '<span>' + '</span>' + '</div>'
  },
}
</script>
<style lang="scss" scoped></style>
