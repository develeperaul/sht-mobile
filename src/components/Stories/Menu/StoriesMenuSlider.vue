<template>
  <swiper
    class="stories-menu-slider"
    :slides-per-view="swiperOptions.slidesPerView"
  >
    <swiper-slide
      class="stories-menu-slider__item"
      :class="{ 'active': !mainStore().watchStoriesId.some(item => item.id === String(story.id)) }"
      v-for="(story, index) in stories"
      :key="story.id"
      @click="openStory(story.id, index)"
    >
      <div class="stories-menu-slider__item-img">
        <img :src="story.image.url" alt="" class="tw-object-cover" />
      </div>
      <div class="stories-menu-slider__item-title">
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
  const stringId = String(id)
  const alreadyWatched = mainStore().watchStoriesId.some(item => item.id === stringId)
  if (!alreadyWatched) {
    // Просто пушим — useStorage сам обновит localStorage
    mainStore().watchStoriesId.push({ id: stringId })
  }
  mainStore().storyIndex = index
  mainStore().isStoriesActive = true
}
</script>

<style lang="scss" scoped>
.stories-menu-slider {
  overflow: visible;
  padding: 1px 0;
  &__item {
    padding: 6px;
    margin: 2.5px;
    border-radius: 32px;
    cursor: pointer;
    overflow: hidden;
    display: grid;
    align-content: end;
    width: 95px;
    height: 95px;
    &.active {
      outline: 2.4px solid #E9FF5E;
      outline-offset: 0px;

    }
    &:not(:last-child) {
      margin-right: 10px;
    }
    &-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    &-title {
      @apply tw-font-wix;
      padding: 6px 8px;
      position: relative;
      font-size: 10px;
      line-height: 11px;
      font-weight: 500;
      color: #fff;
      // filter: invert(1);
    }
  }
}
</style>
