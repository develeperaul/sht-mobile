<template>
  <q-page class="tw-container">
    <head-block title="Направления" class="tw-mb-3" />
    <template v-if="mainStore().isOnline">
      <div class="tw-flex tw-overflow-auto tw-gap-1 tw-mb-6 no-scrollbar">
        <div
          class="tab-min tw-shrink-0"
          :class="{ active: filter === 'all' }"
          @click="
            () => {
              rezet()
            }
          "
        >
          Все
        </div>
        <div
          class="tab-min tw-shrink-0"
          :class="{ active: filter === 'filter' }"
          @click="setTabVal('filter')"
        >
          <div class="tab__icon">
            <div class="">
              <BaseIcon name="filter" class="tw-w-6 tw-h-6 tw-text-dark" />
            </div>
          </div>
          Фильтры
        </div>
        <div
          class="tab-min tw-shrink-0"
          v-for="locale in filters.data?.types"
          @click="setFilter('type', locale.value, true)"
          :class="{ active: filterList.type == locale.value }"
        >
          <div class="tab-min__icon">
            <img :src="locale.image" />
          </div>
          {{ locale.title }}
        </div>
      </div>

      <div class="tw-grid tw-gap-2">
        <q-skeleton
          v-if="directions.loading"
          v-for="value in 1"
          class="tw-rounded-32 tw-shrink-0"
          width="100%"
          height="257px"
        ></q-skeleton>
        <template v-else>
          <LazyOnView
            v-for="direction in directions.data"
            :key="direction.id"
            v-if="directions.data.length > 0"
          >
            <Direction size="sm" :direction="direction" />
          </LazyOnView>
          <div v-else>
            <div class="tw-text-center p1">
              Нет доступных направлений в этих датах, но вы можете заказать
              индивидуальное путешествие или попробуйте выбрать другие даты
            </div>

            <!-- <div>
          <div class="tw-flex tw-items-center tw-justify-between tw-mb-3">
            <div class="p1">Вам также могут подойти</div>
            <base-icon
              name="chevronright"
              class="tw-text-gray_icon tw-w-4 tw-h-4"
            />
          </div>
          <div class="tw-grid tw-gap-2">
            <Direction
              v-for="direction in directions.data"
              sm
              :direction="direction"
            />
          </div>
        </div> -->
          </div>
        </template>
      </div>
    </template>
    <NoInt v-else />

    <div class="popupfilter env-t env-b" v-show="popupFilterOpen">
      <div class="popupfilter__wrapper">
        <div class="popupfilter__top tw-flex tw-justify-between tw-mb-5">
          <div
            class="p2 tw-text-gray_main tw-underline"
            @click="popupFilterOpen = false"
          >
            Закрыть
          </div>
          <div class="p1">Фильтры</div>
          <div class="p2 tw-text-[#16161680] tw-underline" @click="rezet">
            Сбросить все
          </div>
        </div>
        <div class="tw-grid tw-gap-3" v-if="filters.data">
          <div
            class="tw-inline-flex tw-justify-start tw-overflow-auto no-scrollbar"
          >
            <BaseButtonFiltr
              v-for="year in Object.keys(filters.data?.years)"
              @click="setFilter('year', year)"
              :class="{ active: filterList.year == year }"
              size="lg"
            >
              {{ dayjs().locale('ru').year(Number(year)).format('YYYY') }}
            </BaseButtonFiltr>
          </div>
          <div
            class="tw-inline-flex tw-justify-start tw-overflow-auto no-scrollbar"
          >
            <BaseButtonFiltr
              v-for="month in tabs2"
              @click="setFilter('month', month.name)"
              :class="{ active: filterList.month == month.name }"
              size="lg"
            >
              {{
                dayjs()
                  .locale('ru')
                  .month(Number(month.name) - 1)
                  .format('MMMM')
              }}
            </BaseButtonFiltr>
          </div>
          <div ref="rush" class="tw-bg-blue_bg tw-p-5 tw-rounded-32 content">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Направления по России</span>
              <sup class="tw-font-montserrat tw-mt-2">{{
                filters.data?.directions.locals.length
              }}</sup>
            </div>
            <div class="content__block">
              <div class="tw-flex tw-flex-wrap tw-gap-2 tw-overflow-hidden">
                <BaseButtonFiltr
                  v-for="direction in filters.data?.directions.locals"
                  @click="setFilter('name', direction.name)"
                  :class="{ active: filterList.name == direction.name }"
                  size="lg"
                >
                  {{ direction.name }}
                </BaseButtonFiltr>
              </div>
            </div>
            <div class="content__btns">
              <div
                class="content__btn add p1 tw-underline"
                @click="toggle(rush, 'open')"
              >
                Посмотреть все
              </div>
              <div
                class="content__btn hide p1 tw-underline"
                @click="toggle(rush, 'close')"
              >
                Скрыть
              </div>
            </div>
          </div>
          <div ref="other" class="tw-bg-blue_bg tw-p-5 tw-rounded-32 content">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Направления по зарубежу и СНГ</span>
              <sup class="tw-font-montserrat tw-mt-2">{{
                filters.data?.directions.foreign.length
              }}</sup>
            </div>
            <div class="content__block">
              <div class="tw-flex tw-flex-wrap tw-gap-2 tw-overflow-hidden">
                <BaseButtonFiltr
                  v-for="direction in filters.data?.directions.foreign"
                  @click="setFilter('name', direction.name)"
                  :class="{ active: filterList.name == direction.name }"
                  size="lg"
                >
                  {{ direction.name }}
                </BaseButtonFiltr>
              </div>
            </div>
            <div class="content__btns">
              <div
                class="content__btn add p1 tw-underline"
                @click="toggle(other, 'open')"
              >
                Посмотреть все
              </div>
              <div
                class="content__btn hide p1 tw-underline"
                @click="toggle(other, 'close')"
              >
                Скрыть
              </div>
            </div>
          </div>
          <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Стоимость в ₽</span>
            </div>
            <div
              class="tw-grid tw-grid-cols-[1fr_1fr] tw-justify-center tw-justify-items-center"
            >
              <div class="tw-flex tw-items-center tw-gap-1">
                <BaseInput
                  name="min"
                  v-model="filterList.price_from"
                  :placeholder="Number(filters.data.prices.min).toFixed(0)"
                  :min="Number(filters.data.prices.min).toFixed(0)"
                  type="number"
                />
                <div class="tw-pr-1">–</div>
              </div>
              <BaseInput
                name="max"
                v-model="filterList.price_to"
                :placeholder="Number(filters.data.prices.max).toFixed(0)"
                :max="Number(filters.data.prices.max).toFixed(0)"
                type="number"
              />
            </div>
          </div>
          <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Количество дней</span>
            </div>
            <div class="tw-flex tw-flex-wrap tw-gap-2">
              <BaseButtonFiltr
                size="lg"
                @click="setFilter('is_weekend', 1)"
                :class="{ active: filterList.is_weekend == 1 }"
              >
                Туры выходного дня
              </BaseButtonFiltr>
              <BaseButtonFiltr
                size="lg"
                @click="
                  () => {
                    ;(setFilter('days_count_from', 7),
                      setFilter('days_count_to', 99))
                  }
                "
                :class="{ active: filterList.days_count_from == 7 }"
              >
                От 7 дней
              </BaseButtonFiltr>
              <BaseButtonFiltr
                size="lg"
                @click="
                  () => {
                    ;(setFilter('days_count_from', 0),
                      setFilter('days_count_to', 7))
                  }
                "
                :class="{ active: filterList.days_count_from == 0 }"
              >
                До 7 дней
              </BaseButtonFiltr>
            </div>
          </div>
          <BaseButton @click="updateFilter"> Применить </BaseButton>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Stories from 'src/components/Stories/Index.vue'
import { FilterT } from 'src/models/api/main'
import directionsStore from 'src/stores/directionsStore'
import LazyOnView from 'src/components/LazyOnView.vue'
const { directions, filters } = storeToRefs(directionsStore())

const filter = ref<'all' | 'filter' | 'other'>('all')
const filterList = ref<{
  days_count_from: null | number
  days_count_to: null | number
  is_weekend: null | number
  month: null | string
  name: null | string
  price_from: string
  price_to: string
  year: null | string | number
  type: null | string
}>({
  days_count_from: null,
  days_count_to: null,
  is_weekend: 0,
  month: null,
  name: null,
  price_from: '',
  price_to: '',
  year: null,
  type: null,
})

const currentYear = ref<string | number>('')
const tab2 = ref('')
const tabs2 = ref<{ id: string; name: string }[]>([])
watch(currentYear, (val) => {
  if (val) {
    tabs2.value = filters.value.data?.years[val]?.map((m) => {
      return {
        id: m,
        name: m,
      }
    })
  } else {
    tabs2.value = []
  }
})

const months = computed(() => {})
const setFilter = (
  type:
    | 'days_count_from'
    | 'days_count_to'
    | 'is_weekend'
    | 'month'
    | 'name'
    | 'price_from'
    | 'price_to'
    | 'year'
    | 'type',
  val: string | number | boolean,
  update?: boolean
) => {
  if (type === 'year') {
    currentYear.value = val
  }
  console.log(val)

  if (filterList.value.hasOwnProperty(type)) {
    filterList.value[type] = val

    if (update) {
      filterList.value = {
        days_count_from: null,
        days_count_to: null,
        is_weekend: 0,
        month: null,
        name: null,
        price_from: '',
        price_to: '',
        year: null,
        type: val,
      }
      updateFilter()
      filter.value = 'other'
    } else {
      filterList.value.type = null
      filter.value = 'filter'
    }
  }
}

const rezet = async () => {
  filterList.value = {
    days_count_from: null,
    days_count_to: null,
    is_weekend: 0,
    month: null,
    name: null,
    price_from: '',
    price_to: '',
    year: null,
    type: null,
  }
  filter.value = 'all'
  await directionsStore().setDirections()
  popupFilterOpen.value = false
}

const popupFilterOpen = ref(false)
const updateFilter = async () => {
  let obj = {}

  for (const key in filterList.value) {
    if (Object.prototype.hasOwnProperty.call(filterList.value, key)) {
      const element = filterList.value[key]
      if (element !== null) {
        console.log(element, key)
        obj[key] = element
        // if (element.length > 0) {
        // }
      }
    }
  }
  console.log(obj)

  await directionsStore().setDirections(obj)
  popupFilterOpen.value = false
}
const setTabVal = (val: string) => {
  if (val === 'filter') {
    popupFilterOpen.value = true
  }
}

const rush = ref<HTMLElement | null>(null)
const other = ref<HTMLElement | null>(null)
onMounted(() => {
  // if (directions.value.data.length === 0) directionsStore().setDirections()
})

const toggle = (el: HTMLElement, type: 'open' | 'close') => {
  if (type === 'open') el.classList.add('active')
  if (type === 'close') el.classList.remove('active')
}
</script>
<style lang="scss">
.popupfilter {
  z-index: 10000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  &__wrapper {
    @apply tw-bg-white tw-rounded-32;
    padding: 20px 12px 12px 12px;
    @apply no-scrollbar;
    display: grid;
    align-content: start;
    height: 100%;
    overflow: auto;
  }
}

.content {
  &__block {
    display: grid;
    grid-template-rows: 84px;
    transition: all 0.3s ease;
  }
  &__btns {
    position: relative;
    padding-top: 15px;
    &::after {
      content: '';
      width: 100%;
      height: 33px;
      background: linear-gradient(
        180deg,
        rgba(229, 238, 249, 0) 0%,
        #e5eef9 69.7%
      );
      display: block;
      position: absolute;
      top: 15px;
      left: 0;
      transform: translateY(-100%);
      transition: all 0.3s ease;
    }
  }
  &__btn {
    &.add {
      display: block;
    }
    &.hide {
      display: none;
    }
  }
  &.active {
    .content__block {
      grid-template-rows: 100%;
    }
    .content__btns::after {
      height: 0;
    }
    .content__btn.add {
      display: none;
    }
    .content__btn.hide {
      display: block;
    }
  }
}
</style>
