<template>
  <q-page class="tw-container">
    <head-block title="Мои путешествия" class="tw-mb-3" />
    <div class="tw-flex tw-gap-2 tw-mb-3">
      <BaseButtonFiltr
        class="tw-shrink-0"
        v-for="t in tabs"
        :class="{ active: t.id == tab }"
        size="lg"
        @click="tab = t.id"
      >
        {{ t.name }}
      </BaseButtonFiltr>
    </div>
    <template v-if="tab === 'upcoming'">
      <div v-if="ordersUpcoming" class="tw-grid tw-gap-3">
        <Upcoming
          v-for="value in ordersUpcoming"
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
        />
      </div>
    </template>
    <template v-if="tab === 'past'">
      <div v-if="ordersPast" class="tw-grid tw-gap-3">
        <Upcoming
          v-for="value in ordersPast"
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
        />
      </div>
    </template>
  </q-page>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import { getOrderList } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'

const ordersUpcoming = ref<OfferCardList[]>()
const ordersPast = ref<OfferCardList[]>()
const tab = ref<'upcoming' | 'past'>('upcoming')
const tabs = ref<{ id: string; name: string }[]>([
  { id: 'upcoming', name: 'Предстоящие путешествия' },
  { id: 'past', name: 'Прошедшие' },
])
onMounted(async () => {
  ordersUpcoming.value = (await getOrderList('upcoming')).data
  ordersPast.value = (await getOrderList('past')).data
})
</script>
<style lang="scss" scoped></style>
