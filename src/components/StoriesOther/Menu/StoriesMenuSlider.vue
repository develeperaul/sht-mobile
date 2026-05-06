<template>
  <swiper
    class="stories-menu-slider"
    :slides-per-view="swiperOptions.slidesPerView"
  >
    <swiper-slide
      class="stories-menu-slider__item"
      v-for="(story, index) in stories"
      :key="story.id"
      @click="openStory(story.id, index)"
    >
      <div class="stories-menu-slider__item-img">
        <img :src="story.image.url" alt="" class="tw-object-cover" />
      </div>
      <div v-if="story.title" class="stories-menu-slider__item-title">
        {{ story.title }}

      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { StoriesT } from 'src/models/api/main'
const props = defineProps<{
  stories: StoriesT[]
}>()

const swiperOptions = ref({
  slidesPerView: 'auto',
})

const openStory = async (id: number, index: number) => {
  console.log(id, index)
  mainStore().storyOtherList.data = props.stories
  mainStore().storyOtherIndex = index
  mainStore().isStoriesOtherActive = true
}
</script>

<style lang="scss" scoped>
.stories-menu-slider {
  overflow: visible;
  padding: 1px 0;
  &__item {



    cursor: pointer;
    overflow: hidden;
    display: grid;
    align-content: end;
    justify-items: center;
    grid-template-rows: 95px auto;
    gap: 8px;

    width: 95px;
    &:not(:last-child) {
      margin-right: 10px;
    }
    &-img {
      width: 95px;
      height: 95px;
      border-radius: 9999px;
      overflow: hidden;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    &-title {
      @apply p2;
      text-align: center;
      position: relative;
      word-break: break-all;

      font-weight: 400;
      color: #161616;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      hyphens: none;
      overflow-wrap: normal;
      word-break: keep-all;
    }
  }
}
</style>
