<template>
  <q-page class="tw-container">
    <head-block-profile class="tw-mb-[17px]" />
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
        <div class="tw-flex tw-gap-3 tw-overflow-auto no-scrollbar">
          <q-skeleton
            v-if="directions.loading"
            v-for="value in 1"
            class="tw-rounded-32 tw-shrink-0"
            width="100%"
            height="400px"
          ></q-skeleton>
          <Direction
            v-else
            v-for="direction in directions.data"
            sm
            :direction="direction"
            class="tw-shrink-0"
          />
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
            dayjs(value.offer.end_date)
              .locale('ru')
              .diff(value.offer.start_date, 'day', true)
          "
          class="tw-shrink-0 tw-w-full"
        />
      </div>

      <raffle />
    </div>
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

onMounted(async () => {
  const token = getAccessToken()
  if (token) {
    ordersStore().setOrder('upcoming')
  }
})
</script>
