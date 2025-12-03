<template>
  <q-page class="tw-container bg">
    <div v-if="directionsSubgroup.loading">
      <div class="tw-mb-[18px]">
        <q-skeleton class="tw-mb-2" width="100%" height="34"></q-skeleton>
        <q-skeleton class="" width="100%" height="22"></q-skeleton>
      </div>
      <div class="tw-mb-6">
        <q-skeleton
          class="tw-rounded-32 tw-shrink-0"
          width="100%"
          height="50px"
        ></q-skeleton>
      </div>
    </div>
    <div v-else>
      <template
        v-if="
          isSubgroup &&
          directionsSubgroup.data &&
          directionsSubgroup.data.data.length > 0 &&
          directionsSubgroup.data.data[0]
        "
      >
        <head-block
          :title="directionsSubgroup.data.data[0].name"
          class="tw-mb-3"
          theme="white"
        />

        <div class="tw-mb-3 tw-overflow-hidden -tw-mx-4 tw-grid">
          <div class="tw-inline-flex tw-gap-[5px] tw-overflow-auto tw-px-4">
            <BaseButtonFiltr
              v-for="t in tabs4"
              :class="{ active: t.id == tab4 }"
              size="lg"
              @click="
                () => {
                  if (tab4 === t.id) tab4 = ''
                  else tab4 = t.id
                }
              "
            >
              {{ formatDate(t) }}
            </BaseButtonFiltr>
          </div>
        </div>
        <LazyOnView>
          <div class="tw-grid tw-gap-2">
            <div
              v-for="value in directionsSubgroup.data.data"
              class="tw-rounded-32 tw-overflow-hidden"
              @click="setDirectionGroup(value.id)"
            >
              <div class="tw-h-[144px] tw-bg-gray_icon">
                <img
                  class="tw-h-full tw-w-full"
                  v-if="value.background"
                  :src="value.background?.url"
                  alt=""
                />
              </div>
              <div class="tw-bg-white tw-pt-3 tw-pb-6 tw-px-5">
                <div class="tw-mb-8">
                  <div class="h1 tw-mb-1">
                    {{ value.name }}
                  </div>
                  <div class="h3">
                    {{ value.title }}
                  </div>
                </div>
                <div class="p2 tw-mb-2">
                  {{ value.description }}
                </div>

                <div class="h3">
                  от
                  <span v-amount-pretty="value.offers_min_price"> </span>
                </div>
              </div>
            </div>
          </div>
        </LazyOnView>
      </template>
      <template v-else>
        <div class="tw-pb-[100px]">
          <head-block title="Team Travel" class="tw-mb-3" theme="white" />
          <template v-if="mainStore().isOnline">
            <LazyOnView>
              <div>
                <template v-if="direction.data">
                  <div class="tw-mb-[18px]">
                    <div class="h1 tw-mb-2 tw-text-white">
                      {{ direction.data.name }}
                    </div>
                    <div class="p1 tw-text-white">
                      {{ direction.data.title }}
                    </div>
                  </div>
                  <div class="tw-mb-5">
                    <tab-head
                      v-if="tabs.length > 1"
                      v-model="tab"
                      :options="tabs"
                      class="tw-mb-6"
                    />
                    <div v-else class="p1 tw-mb-2 tw-text-white">
                      {{
                        `${tab} ${
                          Number(tab) == 1
                            ? 'день'
                            : Number(tab) >= 2 && Number(tab) <= 4
                              ? 'дня'
                              : 'дней'
                        }`
                      }}
                    </div>
                    <!-- <tab-body v-model="tab">
              <tab-content name="all" class="tw-grid tw-gap-3"> -->
                  </div>
                  <div>
                    <div class="p1 tw-mb-4 tw-text-white">Выбрать дату</div>

                    <div class="tw-mb-3 tw-overflow-hidden -tw-mx-4 tw-grid">
                      <div
                        class="tw-inline-flex tw-gap-[5px] tw-overflow-auto tw-px-4"
                      >
                        <BaseButtonFiltr
                          class="tw-text-nowrap"
                          v-for="t in tabs2"
                          :class="{ active: t.id == tab2 }"
                          size="lg"
                          @click="tab2 = t.id"
                        >
                          {{ formatDate(t) }}
                        </BaseButtonFiltr>
                      </div>
                    </div>
                    <div class="tw-mb-3" v-if="options.length > 0">
                      <BaseSelect
                        default="Выбери дату"
                        :options="options"
                        class="select"
                        @input="displayToKey"
                        :update="updateSelect"
                      />
                    </div>
                    <div class="tw-grid tw-gap-3">
                      <div
                        class="tw-bg-white tw-p-5 tw-rounded-32"
                        v-if="currentOffer.data"
                      >
                        <div
                          v-if="currentOffer.data"
                          class="tw-grid tw-gap-3 tw-mb-6"
                        >
                          <div class="h3">Стоимость</div>
                          <div
                            class="h2"
                            v-amount-pretty="
                              Number(currentOffer.data.price).toFixed(0)
                            "
                          ></div>
                        </div>
                        <div
                          v-if="
                            direction.data &&
                            direction.data.preview_stories.length > 0
                          "
                        >
                          <div class="p1 tw-mb-3">Главные впечатления</div>
                          <div>
                            <Stories
                              :stories="direction.data.preview_stories"
                            />
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
                              <div v-if="direction.data.video_url">
                                <div class="p1">Обзорное видео</div>
                                <!-- {{ showVideo }} -->
                                <div
                                  class="tw-relative tw-h-[250px] tw-rounded-[30px] tw-overflow-hidden"
                                >
                                  <!-- <BaseIcon
                                    name="play"
                                    class="tw-w-10 tw-h-10 tw-absolute tw-top-1/2 tw-left-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10"
                                  /> -->
                                  <div
                                    class="tw-absolute tw-w-full tw-h-full"
                                    v-html="direction.data.video_url"
                                  ></div>
                                </div>
                              </div>
                            </tab-content>
                            <tab-content
                              name="pitanie"
                              class="tw-grid tw-gap-3"
                            >
                              <SliderServices
                                v-if="powerData"
                                :service="powerData"
                              />
                            </tab-content>
                            <tab-content
                              name="transport"
                              class="tw-grid tw-gap-3"
                            >
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
                          <li
                            v-for="info in direction.data.additional_info"
                            class="p1"
                          >
                            {{ info.name }}
                          </li>
                        </ul>
                      </div>

                      <div
                        class="tw-bg-white tw-p-5 tw-rounded-32"
                        v-if="direction.data.questions.length > 0"
                      >
                        <div class="h3 tw-mb-3">Популярные вопросы</div>
                        <div class="tw-grid tw-gap-3">
                          <div v-for="question in direction.data.questions">
                            <BaseSelectFaq :default="question.question">
                              <div>
                                {{ question.answer }}
                              </div>
                            </BaseSelectFaq>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </LazyOnView>
          </template>
          <NoInt v-else />
        </div>
        <div
          v-if="selectOffer && options.length > 0 && mainStore().isOnline"
          class="tw-fixed tw-bottom-[130px] tw-left-0 tw-right-0 tw-z-10 tw-container"
        >
          <BaseButton
            @click="
              router.push({ name: 'booking', params: { uuid: selectOffer } })
            "
            >Забронировать</BaseButton
          >
        </div>
        <div
          v-else
          class="tw-fixed tw-bottom-[130px] tw-left-0 tw-right-0 tw-z-10 tw-container"
        >
          <BaseButton disabled>Выберите дату, чтобы забронировать</BaseButton>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Stories from 'src/components/StoriesOther/Index.vue'
import directionsStore from 'src/stores/directionsStore'

import dayjs from 'dayjs'

import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { OfferT } from 'src/models/api/main'
const props = defineProps<{
  id: string
}>()
const router = useRouter()
const {
  direction,
  directionsSubgroup,
  offersMap,
  offers,
  currentOffer,
  transportData,
  powerData,
} = storeToRefs(directionsStore())
const keyMap = ref('')

const isSubgroup = ref(false)
onMounted(async () => {
  try {
    await directionsStore().setDirectionsSubgroup(props.id)

    if (
      directionsSubgroup.value.data &&
      directionsSubgroup.value.data?.data.length >= 1
    ) {
      isSubgroup.value = true
      tabs4.value = directionsSubgroup.value.data.dates.map((day) => {
        return {
          id: day,
          name: day,
        }
      })
      // if (tabs4.value[0]) {
      //   tab4.value = tabs4.value[0].id
      // }
      if (directionsSubgroup.value.data.data[0]?.background)
        mainStore().bg = directionsSubgroup.value.data.data[0].background.url
      else mainStore().bg = ''
    } else {
      try {
        await directionsStore().setDirection(props.id)
        if (direction.value.data) {
          if (direction.value.data.background)
            mainStore().bg = direction.value.data.background.url
          else mainStore().bg = ''
          // for (const key in direction.value.data.dates) {
          //   if (Object.prototype.hasOwnProperty.call(direction.value.data.dates, key)) {
          //     const element = direction.value.data.dates[key];

          //   }
          // }

          tabs.value = Object.keys(direction.value.data.dates).map((day) => {
            return {
              id: day,
              name: `${day} ${
                Number(day) == 1
                  ? 'день'
                  : Number(day) >= 2 && Number(day) <= 4
                    ? 'дня'
                    : 'дней'
              }`,
            }
          })
          if (tabs.value[0]) {
            tab.value = tabs.value[0].id

            tabs2.value = direction.value.data.dates[tab.value].map((day) => {
              return {
                id: day,
                name: day,
              }
            })
            if (tabs2.value[0]) {
              tab2.value = tabs2.value[0].id
            }
          }

          keyMap.value = `${props.id}_${tab.value}_${tab2.value}`
          // if(offersMap.get(key))
        }
      } catch (e) {
        throw e
      }
    }
  } catch (e) {
    throw e
  }

  // установка фона
  // if (direction.value.data)
  //   mainStore().bg = direction.value.data.background?.url ?? ''
})
const currentId = ref('')
const setDirectionGroup = async (id: string) => {
  currentId.value = id
  try {
    await directionsStore().setDirection(id)
    isSubgroup.value = false
    if (direction.value.data) {
      if (direction.value.data.background)
        mainStore().bg = direction.value.data.background.url
      else mainStore().bg = ''

      tabs.value = Object.keys(direction.value.data.dates).map((day) => {
        return {
          id: day,
          name: `${day} ${
            Number(day) == 1
              ? 'день'
              : Number(day) >= 2 && Number(day) <= 4
                ? 'дня'
                : 'дней'
          }`,
        }
      })

      if (tabs.value[0]) {
        tab.value = tabs.value[0].id

        tabs2.value = direction.value.data.dates[tab.value].map((day) => {
          return {
            id: day,
            name: day,
          }
        })
        if (tabs2.value[0]) {
          const tabId = tabs2.value.find((t) => t.id === tab4.value)
          tab2.value = tabId?.id ?? tabs2.value[0].id
        }
      }

      keyMap.value = `${id}_${tab.value}_${tab2.value}`
      if (!offersMap.value.get(keyMap.value)) {
        try {
          await directionsStore().setOffers(id, tab.value, tab2.value)
        } catch (e) {
          throw e
        }
      }
      // if(offersMap.get(key))
    }
  } catch (e) {
    throw e
  }
}
const showVideo = ref(false)

const storeMain = mainStore()
const { storyList } = storeToRefs(storeMain)

const selectOffer = ref<string | null>(null)

const options = computed(() => {
  if (offers.value) {
    return offers.value.map((of) => {
      return {
        id: of.id,
        name: `${dayjs(of.start_date).locale('ru').format('DD MMMM')}-${dayjs(of.end_date).locale('ru').format('DD MMMM')} `,
      }
    })
  }
  return []
})
const updateSelect = ref<string>('')
const displayToKey = (e: { id: string; name: string }) => {
  selectOffer.value = e.id

  if (offers.value) {
    const cOf = offers.value.find((of) => of.id === selectOffer.value)
    if (cOf) currentOffer.value.data = cOf
  }
}
const tab = ref('')
const tabs = ref<{ id: string; name: string }[]>([])
const tab2 = ref('')
const tabs2 = ref<{ id: string; name: string }[]>([])
const tab4 = ref('')
const tabs4 = ref<{ id: string; name: string }[]>([])
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

const formatDate = (d: { id: string; name: string }) => {
  // dayjs(t.id).locale('ru').format('MMMM')
  const diffLocale = dayjs(d.id).format('YYYY') - dayjs().format('YYYY')
  if (diffLocale >= 1) return dayjs(d.id).locale('ru').format('MMMM YYYY')
  return dayjs(d.id).locale('ru').format('MMMM')
}

watchEffect(async () => {
  keyMap.value = `${props.id}_${tab.value}_${tab2.value}`
})
watch(tab, async (v, oV) => {
  if (oV && tab2.value) {
    updateSelect.value = v
    tabs2.value = direction.value.data.dates[v].map((day) => {
      return {
        id: day,
        name: day,
      }
    })
    if (tabs2.value[0]) {
      tab2.value = tabs2.value[0].id
    }

    if (!offersMap.value.get(keyMap.value)) {
      try {
        await directionsStore().setOffers(props.id, v, tab2.value)
      } catch (e) {
        throw e
      }
    }
  }
})
watch(tab2, async (v, oV) => {
  updateSelect.value = v
  selectOffer.value = null
  if (tab.value) {
    if (!offersMap.value.get(keyMap.value)) {
      try {
        await directionsStore().setOffers(currentId.value, tab.value, v)
      } catch (e) {
        throw e
      }
    }
  }
})
watch(tab4, async (v, oV) => {
  if (v) await directionsStore().setDirectionsSubgroup(props.id, v)
  else await directionsStore().setDirectionsSubgroup(props.id)
})

onBeforeRouteLeave((to, from) => {
  directionsSubgroup.value.data = null
  direction.value.data = null
  mainStore().bg = ''
  currentOffer.value.data = null
})
</script>
<style scoped lang="scss"></style>
