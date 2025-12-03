<template>
  <q-page class="tw-container">
    <head-block-profile class="tw-mb-[17px]" />
    <LazyOnView v-if="mainStore().isOnline">
      <div>
        <div
          class="tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-[24px] p1 tw-bg-white tw-mb-8"
          v-if="ordersStore().urlOrderPending"
          @click="ordersStore().openURL(ordersStore().urlOrderPending)"
        >
          Внесите предоплату
          <div
            class="tw-w-11 tw-h-11 tw-rounded-full tw-bg-geen_btn tw-grid tw-place-content-center"
          >
            <BaseIcon name="chevronright" class="tw-w-4 tw-h-4" />
          </div>
        </div>
        <div class="tw-grid tw-gap-8">
          <div
            class="tw-flex tw-gap-3 tw-overflow-auto no-scrollbar"
            v-if="storyList.loading"
          >
            <q-skeleton
              v-for="value in 10"
              class="tw-rounded-32 tw-shrink-0"
              width="95px"
              height="95px"
            ></q-skeleton>
          </div>
          <Stories v-else :stories="storyList.data" />
          <div class="tw-grid">
            <div class="tw-flex tw-items-center tw-justify-between tw-mb-3">
              <router-link :to="{ name: 'directions' }" class="p1"
                >Все направления</router-link
              >
              <base-icon
                name="chevronright"
                class="tw-text-gray_icon tw-w-4 tw-h-4"
              />
            </div>
            <div
              class="tw-flex tw-gap-3 tw-overflow-auto no-scrollbar"
              v-if="directions.loading"
            >
              <q-skeleton
                v-for="value in 1"
                class="tw-rounded-32 tw-shrink-0"
                width="100%"
                height="400px"
              ></q-skeleton>
            </div>
            <div v-else class="tw-overflow-hidden">
              <Swiper
                :modules="[Pagination]"
                :slides-per-view="1"
                :space-between="20"
                :pagination="pagination"
                class="slider slider-other !tw-pb-8"
              >
                <SwiperSlide
                  v-for="direction in directions.data"
                  :key="direction.id"
                  src
                  class="slider__slide"
                >
                  <Direction :direction="direction" class="tw-shrink-0" />
                </SwiperSlide>
                <div class="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>

          <div class="tw-flex tw-gap-3 tw-overflow-auto no-scrollbar">
            <q-skeleton
              v-if="ordersUpcoming.loading"
              v-for="value in 10"
              class="tw-rounded-32 tw-shrink-0"
              width="100%"
              height="242px"
            ></q-skeleton>
            <Upcoming
              v-else
              v-for="value in ordersUpcoming.data"
              :to="{ name: 'upcoming', params: { uuid: value.id } }"
              title="Предстоящее путешествие с Team Travel"
              :dates="`${dayjs(value.offer.start_date).locale('ru').format('DD MMMM')}-${dayjs(value.offer.end_date).locale('ru').format('DD MMMM')}`"
              :img="value.offer.direction.background?.url"
              :name="value.offer.direction.name"
              :status="value.status"
              :diff="
                dayjs(dayjs(value.offer.end_date).format('YYYY-MM-DD'))
                  .locale('ru')
                  .diff(
                    dayjs(value.offer.start_date).format('YYYY-MM-DD'),
                    'day',
                    true
                  )
              "
              class="tw-shrink-0 tw-w-full"
            />
          </div>
          <Review2
            v-if="ordersStore().isOrderWaitingReview"
            :title="ordersStore().isOrderWaitingReview?.offer.direction.name"
            :direction__uuid="
              ordersStore().isOrderWaitingReview?.offer.direction.id
            "
          />

          <raffle
            v-if="mainStore().promotion"
            :promotion="mainStore().promotion"
          />
          <Bonus v-if="profileStore().profile === null" />
        </div>
      </div>
    </LazyOnView>
    <NoInt v-else />
  </q-page>
</template>

<script setup lang="ts">
import Stories from 'src/components/Stories/Index.vue'
import directionsStore from 'src/stores/directionsStore'
import ordersStore from 'src/stores/ordersStore'
const storeMain = mainStore()
const { storyList } = storeToRefs(storeMain)
import dayjs from 'dayjs'
import { getAccessToken } from 'src/api/tokens'
const { directions, filters } = storeToRefs(directionsStore())
const { ordersUpcoming } = storeToRefs(ordersStore())

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import profileStore from 'src/stores/profileStore'

const pagination = {
  el: '.swiper-pagination',
  type: 'bullets',
  clickable: false,
  dynamicBullets: true,
  dynamicMainBullets: 5,
  center: true,
  renderBullet: function (index, className) {
    return '<div class="' + className + '">' + '<span>' + '</span>' + '</div>'
  },
}

onMounted(async () => {
  const countStart = localStorage.getItem('countStart')
  if (countStart && JSON.parse(countStart) == '1') {
    console.log('sss')

    try {
      await Promise.allSettled([
        mainStore().getStories(),
        directionsStore().setDirections(),
        directionsStore().setFilters(),
        mainStore().setPromotion(),
      ])
    } catch (e) {
      throw e
    }
  }
  const token = getAccessToken()
  if (token) {
    ordersStore().setOrder('upcoming')
  }
})
</script>
