<template>
  <q-page class="tw-container bg env-t tw-relative">
    <!-- backgroundImage: route.meta.bg ? 'url(' + storeMain.bg + ')' : '', -->
    <div class="tw-pb-[100px]">
      <!-- <head-block title="Team Travel" class="tw-mb-3" theme="white" /> -->
       <Toolbar invert class=" tw-mb-5 tw-relative tw-z-10" title="Team Travel" />
      <div v-if="loading">Загрузка</div>
      <div v-if="offer" >
        <div v-if="offer.offer.direction.background?.url" class="offer-bg tw-absolute tw-top-0 tw-left-0" :style="{
          backgroundImage:  'url(' + offer.offer.direction.background.url + ')'
        }"></div>
        <div class=" tw-relative tw-grid tw-content-end tw-h-[220px] tw-mb-6" >

          <div class="badges tw-mb-3">


              <div class="badge badge-lg glass">{{ diff }}</div>
              <div class="badge badge-lg glass">{{ interval }}</div>
          </div>
          <!-- <div class="tw-flex tw-gap-1 tw-mb-3">
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
          </div> -->
          <div class="h1 tw-mb-2 tw-invert">
            {{ offer.offer.direction.name }}
          </div>
          <div class="p1 tw-mb-6 tw-invert">
            {{ offer.offer.direction.title }}
          </div>
        </div>
        <tab-head v-model="tab" :options="tabs" class="tw-mb-3" />
          <!-- <tab-body v-model="tab" class=" tw-grid">
            <tab-content name="upcoming" class=" tw-grid"> -->
        <!-- <div class="tw-flex tw-gap-2 tw-mb-3">
          <BaseButtonFiltr
            v-for="t in tabs"
            :class="{ active: t.id == tab }"
            size="lg"
            @click="tab = t.id"
          >
            {{ t.name }}
          </BaseButtonFiltr>
        </div> -->
        <div class="card-white" v-if="tab === 'obsh'">
          <div class=" card-status " :class="offer.status">
            <span>
              {{ statusNaming }}
            </span>
            <svg width="64" height="46" viewBox="0 0 64 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g v-if="offer.status !== 'paid'" filter="url(#filter0_d_9150_13607)">
              <rect x="24" y="9" width="28" height="28" rx="14" fill="white" fill-opacity="0.4" shape-rendering="crispEdges"/>
              <path d="M35.1186 23.76C35.1186 24.16 34.9719 24.5 34.6786 24.78C34.3986 25.06 34.0519 25.2 33.6386 25.2C33.2386 25.2 32.8919 25.06 32.5986 24.78C32.3186 24.5 32.1786 24.16 32.1786 23.76C32.1786 23.36 32.3186 23.02 32.5986 22.74C32.8919 22.46 33.2386 22.32 33.6386 22.32C34.0519 22.32 34.3986 22.46 34.6786 22.74C34.9719 23.02 35.1186 23.36 35.1186 23.76ZM39.6795 23.76C39.6795 24.16 39.5329 24.5 39.2395 24.78C38.9595 25.06 38.6129 25.2 38.1995 25.2C37.7995 25.2 37.4529 25.06 37.1595 24.78C36.8795 24.5 36.7395 24.16 36.7395 23.76C36.7395 23.36 36.8795 23.02 37.1595 22.74C37.4529 22.46 37.7995 22.32 38.1995 22.32C38.6129 22.32 38.9595 22.46 39.2395 22.74C39.5329 23.02 39.6795 23.36 39.6795 23.76ZM44.2405 23.76C44.2405 24.16 44.0938 24.5 43.8005 24.78C43.5205 25.06 43.1738 25.2 42.7605 25.2C42.3605 25.2 42.0138 25.06 41.7205 24.78C41.4405 24.5 41.3005 24.16 41.3005 23.76C41.3005 23.36 41.4405 23.02 41.7205 22.74C42.0138 22.46 42.3605 22.32 42.7605 22.32C43.1738 22.32 43.5205 22.46 43.8005 22.74C44.0938 23.02 44.2405 23.36 44.2405 23.76Z" fill="#1C1C1E"/>
              </g>

              <g v-else class="" filter="url(#filter0_d_8748_25958)">
              <rect x="24" y="9" width="28" height="28" rx="14" fill="white" fill-opacity="0.4" shape-rendering="crispEdges"/>
              <path d="M42 20L36.0337 26L34 23.9548" stroke="#1C1C1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <filter id="filter0_d_9150_13607" x="0" y="-15" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9150_13607"/>
              <feBlend mode="normal" in="BackgroundImageFix" in2="effect1_dropShadow_9150_13607" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              </filter>

              <filter id="filter0_d_8748_25958" x="0" y="-15" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8748_25958"/>
              <feBlend mode="normal" in="BackgroundImageFix" in2="effect1_dropShadow_8748_25958" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              </filter>
              </defs>
            </svg>


          </div>
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
              <!-- <FileOther

                @delete-file="deleteTicket"
                id="1"
                url="/space.png"
                :noimg="false"
              />
              <FileOther

                @delete-file="deleteTicket"
                id="1"
                url="/space.png"

              /> -->
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
    <!-- <ReviewPopup
      v-if="direction.data"
      v-model="openReview"
      :direction__uuid="direction.data.id"
      :title="direction.data.name"
    /> -->
    <ReviewPopupNew

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
const storeMain = mainStore()
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

const openReview = ref(true)
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
<style scoped lang="scss">
.card-status {
  @apply p3;
  height: 46px;
  background: linear-gradient(360deg, rgba(255, 95, 80, 0.4) -17.5%, rgba(255, 95, 80, 0.04) 88.62%);
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  padding-left: 12px;
  padding-right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-image-source: linear-gradient(180deg, #FF3B30 0%, #FFFFFF 145.83%);
  margin-bottom: 16px;
  .pending {
    background: linear-gradient(360deg, rgba(255, 211, 80, 0.4) -17.5%, rgba(255, 211, 80, 0.04) 88.62%);
    border-image-source: linear-gradient(180deg, #FFA800 0%, #FFFFFF 145.83%);
  }
  .paid {
    background: linear-gradient(360deg, rgba(138, 220, 81, 0.4) -17.5%, rgba(50, 217, 103, 0.04) 88.62%);
    border-image-source: linear-gradient(180deg, rgba(50, 217, 103, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);


  }
}
</style>
