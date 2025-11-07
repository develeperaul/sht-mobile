<template>
  <q-page class="tw-container">
    <head-block title="Мои путешествия" class="tw-mb-3" />
    <div v-if="orders" class="tw-grid tw-gap-3">
      <Upcoming
        v-for="value in orders"
        :to="{ name: 'upcoming', params: { uuid: value.id } }"
        title="Предстоящее путешествие с Team Travel"
        :dates="`${dayjs(value.offer.start_date).locale('ru').format('DD MMMM')}-${dayjs(value.offer.end_date).locale('ru').format('DD MMMM')}`"
        img="value.offer.direction.background?.url"
        :name="value.offer.direction.name"
        :status="value.status"
        :diff="
          dayjs(value.offer.end_date)
            .locale('ru')
            .diff(value.offer.start_date, 'day', true)
        "
      />
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import { getOrderList } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'

const orders = ref<OfferCardList[]>()
const tab = ref<'upcoming' | 'past'>('upcoming')
const tabs = ref<{ id: string; name: string }[]>([
  { id: 'upcoming', name: 'Предстоящие путешествия' },
  { id: 'past', name: 'Прошедшие' },
])
onMounted(async () => {
  orders.value = (await getOrderList(tab.value)).data
})
</script>
<style lang="scss" scoped></style>
