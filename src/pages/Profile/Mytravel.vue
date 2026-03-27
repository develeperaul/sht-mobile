<template>
  <q-page class="tw-container env-t tw-grid tw-grid-rows-[auto_1fr] tw-content-start">

    <Toolbar class="tw-mb-5" title="Мои путешествия" />
    <div class="tw-grid tw-grid-rows-[auto_1fr]">

      <tab-head v-model="tab" :options="tabs" class="tw-mb-3" />
          <tab-body v-model="tab" class=" tw-grid">
            <tab-content name="upcoming" class=" tw-grid tw-content-start">
              <template v-if="ordersUpcoming.load">

              </template>
              <template v-else>

                <div v-if="ordersUpcoming.data?.length > 0" class="tw-grid tw-gap-3">
                  <UpcomingGlass
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
                  />
                </div>
                <ListNone v-else class=" tw-self-center"/>
              </template>
            </tab-content>
            <tab-content name="past" class=" tw-grid">
              <template v-if="ordersPast.load">

              </template>
              <template v-else>
              <div v-if="ordersPast.data?.length > 0" class="tw-grid tw-gap-3">
                <Upcoming
                  v-for="value in ordersPast.data"
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
              <ListNone v-else class=" tw-self-center"/>
              </template>
            </tab-content>
            </tab-body>
    </div>

  </q-page>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import ListNone from 'src/components/ListNone.vue'
import { getOrderList } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'

const ordersUpcoming = ref < { load: boolean, data:OfferCardList[]} >({load: false, data:[]})
const ordersPast = ref < { load: boolean, data:OfferCardList[]} >({load: false, data:[]})
const tab = ref<'upcoming' | 'past'>('upcoming')
const tabs = ref<{ id: string; name: string }[]>([
  { id: 'upcoming', name: 'Предстоящие' },
  { id: 'past', name: 'Прошедшие' },
])

onMounted(async () => {
  try {
    ordersUpcoming.value.load = true
    ordersUpcoming.value.data = (await getOrderList('upcoming')).data
  }
  catch (e) {
    throw e
  } finally {
    ordersUpcoming.value.load = false
  }
  try {
    ordersPast.value.load = true
    ordersPast.value.data = (await getOrderList('past')).data
  }
  catch (e) {
    throw e
  } finally {
    ordersPast.value.load = false
  }

})
</script>
<style lang="scss" scoped></style>
