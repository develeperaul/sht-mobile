<template>
  <q-page class="tw-bg-blue_bg">
    <Slider />

    <!-- <Stories :stories="storyList.data" /> -->
    <!-- <Stories /> -->
    <!-- <Direction />
    <Review />
    <status />
    <raffle />
    <Upcoming />
    <General />
    <bonus />
    <Review2 /> -->
  </q-page>
</template>
<script setup lang="ts">
import Stories from 'src/components/Stories/Index.vue'
import Review from 'src/components/Card/Review.vue'
const storeMain = mainStore()
const { storyList } = storeToRefs(storeMain)
const stories = [
  {
    id: 1,
    title: '1',
    published_at: '1',
    unpublished_at: 'string',
    context_image: {
      id: 1,
      path: 'https://storage.yandexcloud.net/storage.yasno.media/nat-geo/images/2020/6/25/0fc978aba29e466e8eb4ffc946532d5e.max-1200x800.jpg',
      width: '150',
      height: '1',
      url: 'https://storage.yandexcloud.net/storage.yasno.media/nat-geo/images/2020/6/25/0fc978aba29e466e8eb4ffc946532d5e.max-1200x800.jpg',
    },
    image: {
      id: 1,
      path: 'https://static-cse.canva.com/blob/191106/00_verzosa_winterlandscapes_jakob-owens-tb-2640x1485.jpg',
      width: '100',
      height: '100',
      url: 'https://static-cse.canva.com/blob/191106/00_verzosa_winterlandscapes_jakob-owens-tb-2640x1485.jpg',
    },
  },
]

const swiperOptions = ref({
  slidesPerView: 'auto',
  centeredSlides: true,
})
</script>
<style lang="scss" scoped></style>
