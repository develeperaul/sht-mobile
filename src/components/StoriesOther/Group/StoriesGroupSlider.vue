<template>
  <swiper
    class="stories-group-slider"
    :modules="swiperOptions.modules"
    :pagination="swiperOptions.pagination"
  >
    <swiper-slide
      class="stories-group-slider__item env-t"
      v-for="(n, i) in mainStory"
      :key="i"
      :style="{
        backgroundImage: `url(${n.image?.url})`,
      }"
    >
      <div class="stories-group-slider__item-body tw-container">
        <div class="stories-group-slider__item-content">
          <!-- <div class="tw-text-h2 tw-font-semibold tw-mb-5">
            {{ n.title }}
          </div>
          <div class="tw-text-t1">
            {{ n.description }}
          </div> -->
          <div class="stories-group-slider__item-title">
            {{ n.title }}
          </div>
          <div class="stories-group-slider__item-description">
            {{ n.description }}
          </div>
        </div>
        <!-- <q-img
          :src="n.image.url"
          alt=""
          class="tw-rounded-2xl tw-absolute tw-w-full tw-h-full tw-left-0 tw-top-0 bg"
          fit="cover"
        /> -->
        <div v-if="n.action" class="tw-container tw-mb-6">
          <base-button
            theme="gradient"
            @click="$router.push({ name: 'to-record' })"
          >
            Записаться
          </base-button>
        </div>
      </div>
      <div class="prev" @click="$emit('prev')"></div>
      <div class="next" @click="$emit('next')"></div>
    </swiper-slide>

    <div class="swiper-pagination stories-group-slider__pagination"></div>
  </swiper>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'

const props = defineProps({
  mainStory: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['prev', 'next'])
onMounted(() => {
  console.log(props.mainStory)
})
const swiperOptions = ref({
  modules: [Pagination],
  pagination: {
    el: '.stories-group-slider__pagination',
    type: 'bullets',
    clickable: false,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + '<span>' + '</span>' + '</div>'
    },
  },
})
</script>

<style lang="scss" scoped>
.stories-group-slider {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__item {
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    @apply tw-bg-[#AEC3ED];

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard */

    &::after {
      z-index: 1;
      // content: '';
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 19.27%,
        #0f0e0e 93.72%
      );
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    &-body {
      display: grid;
      width: 100%;
      height: 100%;
      align-items: center;
    }
    &-content {
      display: grid;
      gap: 8px;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      padding-inline: 22px;
      padding-bottom: max(15px, env(safe-area-inset-bottom, 15px));
    }
    &-title {
      @apply h1 tw-text-white tw-font-bold;
      z-index: 2;
    }
    &-description {
      @apply p2 tw-text-white;
    }
  }

  &__pagination {
    @apply tw-absolute tw-top-5 tw-left-0 tw-right-0 tw-opacity-0 tw-w-full env-t tw-h-fit;
    display: flex;
    justify-content: space-between;

    z-index: 1;
    visibility: hidden;
    transition: opacity 0.8s ease;

    :deep(.swiper-pagination-bullet) {
      position: relative;
      width: 100%;
      flex-shrink: 10;
      border-radius: 999px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.5);
      overflow: hidden;
      box-shadow: 0 0 1px #00000059;

      margin-right: 0.9rem;

      &:first-child {
        margin-left: 2rem;
      }

      &:last-child {
        margin-right: 2rem;
      }

      span {
        position: absolute;
        background-color: white;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 999px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
    }
  }
  .prev,
  .next {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard */
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
}
</style>
