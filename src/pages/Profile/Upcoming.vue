<template>
  <q-page class="tw-container bg">
    <div class="tw-pb-[100px]">
      <head-block title="Team Travel" class="tw-mb-3" theme="white" />
      <div v-if="loading">Загрузка</div>
      <div v-if="offer">
        <div class="tw-flex tw-gap-1 tw-mb-3">
          <div
            class="p1 tw-text-white tw-bg-[#1616160D] tw-w-fit tw-py-[6.55px] tw-px-[13.11px] tw-rounded-[19.66px]"
          >
            {{ diff }}
          </div>
          <div
            class="p1 tw-text-white tw-bg-[#1616160D] tw-w-fit tw-py-[6.55px] tw-px-[13.11px] tw-rounded-[19.66px]"
          >
            {{ interval }}
          </div>
        </div>
        <div class="h1 tw-mb-2">
          {{ offer.offer.direction.name }}
        </div>
        <div class="p1 tw-mb-3">
          {{ offer.offer.direction.title }}
        </div>
        <div class="tw-flex tw-gap-2 tw-mb-3">
          <BaseButtonFiltr
            v-for="t in tabs"
            :class="{ active: t.id == tab }"
            size="lg"
            @click="tab = t.id"
          >
            {{ t.name }}
          </BaseButtonFiltr>
        </div>
        <div class="card-white" v-if="tab === 'obsh'">
          <div class="tw-grid tw-grid-cols-2">
            <div class="tw-grid tw-gap-3">
              <div class="h3">Стоимость</div>
              <div class="h2" v-amount-pretty="offer.final_price"></div>
            </div>
            <div class="tw-grid tw-gap-3">
              <div class="h3">Статус</div>
              <div class="h2">
                {{ statusNaming }}
              </div>
            </div>
          </div>
          <div class="tw-border-b tw-border-blue_bg tw-my-3"></div>
          <div class="p1">
            {{ offer.offer.description }}
          </div>
          <div class="tw-mt-6" v-if="offer.voucher_url || offer.contract_url">
            <div class="h3 tw-font-bold tw-mb-3">Документы</div>
            <div class="tw-flex tw-gap-2">
              <a
                v-if="offer.voucher_url"
                :href="offer.voucher_url"
                class="tw-w-[120px] tw-h-[120px] tw-rounded-32 tw-bg-blue_bg p1 tw-grid tw-place-content-center"
              >
                Ваучер.pdf
              </a>
              <a
                v-if="offer.contract_url"
                :href="offer.contract_url"
                class="tw-w-[120px] tw-h-[120px] tw-rounded-32 tw-bg-blue_bg p1 tw-grid tw-place-content-center"
              >
                Договор.pdf
              </a>
            </div>
          </div>
          <div class="tw-mt-6" v-if="offer.status === 'paid'">
            <div class="h3 tw-font-bold tw-mb-1">Авиабилеты</div>
            <div class="p2 tw-mb-6">Вы можете подгрузить сюда свои билеты</div>
            <div class="tw-flex tw-flex-wrap tw-gap-2 tw-justify-items-start">
              <FileOther @file-load="fileLoad" />
              <FileOther
                v-for="value in offer.tickets"
                @delete-file="deleteTicket"
                :id="value.id"
                :url="value.url ?? ''"
              />
            </div>
          </div>

          <div class="tw-grid tw-gap-3 tw-mt-3">
            <BaseButton
              theme="border"
              v-if="offer.status === 'paid' && offer.chat_url"
              @click="openChat(offer.chat_url)"
            >
              Перейти в чат путешествия
            </BaseButton>
            <BaseButton
              v-if="offer.status === 'waiting_review'"
              @click="openReview = true"
            >
              Оставить отзыв
            </BaseButton>
          </div>
          <BaseButton
            v-if="offer.status === 'pending' && offer.payment_url"
            @click="ordersStore().openURL(offer.payment_url)"
          >
            Внести предоплату
          </BaseButton>

          <!-- <div class="h3 tw-mb-3">Популярные вопросы</div>
                <div v-for="question in direction.data.questions">
                  <BaseSelectFaq :default="question.question">
                    <div>
                      {{ question.answer }}
                    </div>
                  </BaseSelectFaq>
                </div> -->
        </div>
        <div v-if="tab === 'local'" class="tw-grid tw-gap-3">
          <template v-if="direction.data">
            <div
              class="tw-bg-white tw-p-5 tw-rounded-32"
              v-if="direction.data.preview_stories.length > 0"
            >
              <div>
                <div class="p1 tw-mb-3">Главные впечатления</div>
                <div>
                  <Stories :stories="direction.data.preview_stories" />
                </div>
              </div>
            </div>

            <div class="tw-bg-white tw-p-5 tw-rounded-32">
              <div class="h3 tw-mb-3">Условия</div>
              <div class="tw-mb-3">
                <tab-head
                  theme="tw-bg-blue_bg"
                  v-model="tab3"
                  :options="tabs3"
                  class="tw-mb-6"
                />
                <tab-body v-model="tab3">
                  <tab-content name="prozhivanie" class="tw-grid">
                    <div class="tw-overflow-hidden">
                      <SliderHotels
                        :hotels="direction.data.hotels"
                        class="tw-mb-3"
                      />
                    </div>
                    <div v-if="direction.data?.video_url">
                      <div class="p1">Обзорное видео</div>
                      <!-- {{ showVideo }} -->
                      <div
                        class="tw-relative tw-h-[250px] tw-rounded-[30px] tw-overflow-hidden"
                      >
                        <BaseIcon
                          name="play"
                          class="tw-w-10 tw-h-10 tw-absolute tw-top-1/2 tw-left-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10"
                        />
                        <div
                          class="tw-absolute"
                          v-html="direction.data.video_url"
                        ></div>
                      </div>
                    </div>
                  </tab-content>
                  <tab-content name="pitanie" class="tw-grid tw-gap-3">
                    <SliderServices v-if="powerData" :service="powerData" />
                  </tab-content>
                  <tab-content name="transport" class="tw-grid tw-gap-3">
                    <SliderServices
                      v-if="transportData"
                      :service="transportData"
                    />
                  </tab-content>
                </tab-body>
              </div>
            </div>
            <div
              class="tw-bg-white tw-p-5 tw-rounded-32"
              v-if="direction.data.locations.length > 0"
            >
              <div class="h3 tw-mb-6">Локации</div>
              <ul
                class="p1 tw-list-disc tw-space-y-2 tw-pl-3 marker:tw-text-[0.7em] tw-grid tw-gap-3"
              >
                <li v-for="location in direction.data.locations">
                  {{ location.name }}
                </li>
              </ul>
            </div>
            <div
              class="tw-bg-white tw-p-5 tw-rounded-32"
              v-if="direction.data.additional_info.length > 0"
            >
              <div class="h3 tw-mb-6">Дополнительно оплачивается</div>
              <ul
                class="tw-list-disc tw-space-y-2 tw-pl-3 marker:tw-text-[0.7em] tw-grid tw-gap-3"
              >
                <li v-for="info in direction.data.additional_info">
                  {{ info.name }}
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <ReviewPopup
      v-if="direction.data"
      v-model="openReview"
      :direction__uuid="direction.data.id"
      :title="direction.data.name"
    />
  </q-page>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { getOrder, uploadTicket } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'
import Stories from 'src/components/Stories/Index.vue'
import directionsStore from 'src/stores/directionsStore'
import { deleteMedia } from 'src/api/main'
import { useStatus } from 'src/composition/statuslist'

import { useRouter } from 'vue-router'
import ordersStore from 'src/stores/ordersStore'

const props = defineProps<{
  offerProps?: OfferCardList
  uuid: string
}>()

const router = useRouter()
const tab = ref<'obsh' | 'local'>('obsh')
const tabs = ref<{ id: string; name: string }[]>([
  { id: 'obsh', name: 'Общая информация' },
  { id: 'local', name: 'Подробнее' },
])

const tab3 = ref('prozhivanie')
const tabs3 = ref<{ id: string; name: string }[]>([
  {
    id: 'prozhivanie',
    name: 'Проживание',
  },
  {
    id: 'pitanie',
    name: 'Питание',
  },
  {
    id: 'transport',
    name: 'Транспорт',
  },
])

const avatar_id = ref<string>('')
//загрузка файла
const fileLoad = async (file: File) => {
  try {
    avatar_id.value = (await uploadTicket(props.uuid, file)).data.id
    offer.value = (await getOrder(props.uuid)).data
  } catch (e) {
    throw e
  }
}

const openReview = ref(false)
const offer = ref<OfferCardList>()
const loading = ref(false)
// const { statusNaming } = useStatus(offer.value?.status)
const statusNaming = computed(() => {
  if (offer.value && offer.value.status === 'fresh') return 'Новый'
  if (offer.value && offer.value.status === 'paid') return 'Оплачено'
  if (offer.value && offer.value.status === 'pending')
    return 'Ожидает предоплаты'
  if (offer.value && offer.value.status === 'cancelled') return 'Отменен'
  if (offer.value && offer.value.status === 'waiting_review')
    return 'Ожидает отзыва'
  if (offer.value && offer.value.status === 'completed') return 'Завершен'
})
const { direction, transportData, powerData } = storeToRefs(directionsStore())
onMounted(async () => {
  if (props.offerProps) offer.value = props.offerProps
  else {
    loading.value = true
    offer.value = (await getOrder(props.uuid)).data
    loading.value = false
  }
  if (offer.value) {
    await directionsStore().setDirection(offer.value.offer.direction.id)
    if (offer.value.offer.direction.background)
      mainStore().bg = offer.value.offer.direction.background.url
    else mainStore().bg = ''
  }
})

const diff = computed(() => {
  let d = 0

  if (offer.value)
    d = dayjs(dayjs(offer.value.offer.end_date).format('YYYY-MM-DD'))
      .locale('ru')
      .diff(
        dayjs(offer.value.offer.start_date).format('YYYY-MM-DD'),
        'day',
        true
      )

  return `${d} ${
    Number(d) == 1 ? 'день' : Number(d) >= 2 && Number(d) <= 4 ? 'дня' : 'дней'
  }`
})
const interval = computed(() => {
  if (offer.value)
    return `${dayjs(offer.value.offer.start_date).locale('ru').format('DD MMMM')}-${dayjs(offer.value.offer.end_date).locale('ru').format('DD MMMM')}`
  return ''
})

const deleteTicket = async (id: string) => {
  try {
    deleteMedia(id)
    offer.value = (await getOrder(props.uuid)).data
  } catch (e) {
    throw e
  }
}

const openChat = (url: string) => {
  // alert(url)
  Browser.open({ url: url })
  Browser.addListener('browserFinished', () => {
    // обновить статус
  })
  router.push({ name: 'orders' })
}
</script>
<style scoped lang="scss"></style>
