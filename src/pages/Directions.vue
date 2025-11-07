<template>
  <q-page class="tw-container">
    <head-block title="Направления" class="tw-mb-3" />
    <div class="tw-flex tw-overflow-auto tw-gap-1 tw-mb-6 no-scrollbar">
      <div
        class="tab-min tw-shrink-0"
        :class="{ active: filter === 'all' }"
        @click="
          () => {
            rezet()
            filter = 'all'
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
          <BaseIcon name="filter" class="tw-w-6 tw-h-6 tw-text-dark" />
        </div>
        Фильтры
      </div>
      <div class="tab-min tw-shrink-0" v-for="locale in filters.data?.types">
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
        <Direction
          v-if="directions.data.length > 0"
          v-for="direction in directions.data"
          size="sm"
          :direction="direction"
        />
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

    <div class="popupfilter" v-show="popupFilterOpen">
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
              v-for="year in filters.data?.years"
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
              v-for="month in filters.data?.months"
              @click="setFilter('month', month)"
              :class="{ active: filterList.month == month }"
              size="lg"
            >
              {{ dayjs().locale('ru').month(Number(month)).format('MMMM') }}
            </BaseButtonFiltr>
          </div>
          <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Направления по России</span>
              <sup class="tw-font-montserrat tw-mt-2">{{
                filters.data?.directions.locals.length
              }}</sup>
            </div>
            <div class="tw-flex tw-flex-wrap tw-gap-2">
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
          <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Направления по зарубежу и СНГ</span>
              <sup class="tw-font-montserrat tw-mt-2">{{
                filters.data?.directions.foreign.length
              }}</sup>
            </div>
            <div class="tw-flex tw-flex-wrap tw-gap-2">
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
          <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Стоимость в ₽</span>
            </div>
            <div
              class="tw-grid tw-grid-cols-[90px_1fr] tw-justify-center tw-justify-items-center"
            >
              <div class="tw-flex tw-items-center tw-gap-1">
                <BaseInput
                  name="min"
                  v-model="filterList.price_to"
                  :placeholder="Number(filters.data.prices.min).toFixed(0)"
                  :min="Number(filters.data.prices.min).toFixed(0)"
                  type="number"
                />
                –
              </div>
              <BaseInput
                name="max"
                v-model="filterList.price_from"
                :placeholder="Number(filters.data.prices.max).toFixed(0)"
                :max="Number(filters.data.prices.max).toFixed(0)"
                type="number"
              />
            </div>
          </div>
          <!-- <div class="tw-bg-blue_bg tw-p-5 tw-rounded-32">
            <div class="tw-flex tw-gap-1 tw-mb-4">
              <span class="p1">Количество дней</span>
              <sup class="tw-font-montserrat tw-mt-2">12</sup>
            </div>
            <div class="tw-flex tw-flex-wrap tw-gap-2">
              <BaseButtonFiltr class="active" size="lg"> 2014 </BaseButtonFiltr>
              <BaseButtonFiltr class="" size="lg"> 2014 </BaseButtonFiltr>
              <BaseButtonFiltr class="" size="lg"> 2014 </BaseButtonFiltr>
            </div>
          </div> -->
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

const { directions, filters } = storeToRefs(directionsStore())

const filter = ref<'all' | 'filter'>('all')
const filterList = ref<{
  days_count_from: null | number
  days_count_to: null | number
  is_weekend: boolean
  month: null | string
  name: null | string
  price_from: string
  price_to: string
  year: null | string | number
}>({
  days_count_from: null,
  days_count_to: null,
  is_weekend: false,
  month: null,
  name: null,
  price_from: '',
  price_to: '',
  year: null,
})

const setFilter = (
  type:
    | 'days_count_from'
    | 'days_count_to'
    | 'is_weekend'
    | 'month'
    | 'name'
    | 'price_from'
    | 'price_to'
    | 'year',
  val: string | number
) => {
  if (filterList.value.hasOwnProperty(type)) {
    filterList.value[type] = val
    filter.value = 'filter'
  }
}

const rezet = async () => {
  filterList.value = {
    days_count_from: null,
    days_count_to: null,
    is_weekend: false,
    month: null,
    name: null,
    price_from: '',
    price_to: '',
    year: null,
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
        if (element.length > 0) {
          obj[key] = element
        }
      }
    }
  }
  await directionsStore().setDirections(obj)
  popupFilterOpen.value = false
}
const setTabVal = (val: string) => {
  if (val === 'filter') {
    popupFilterOpen.value = true
  }
}
onMounted(() => {
  // if (directions.value.data.length === 0) directionsStore().setDirections()
})
</script>
<style lang="scss">
.popupfilter {
  @apply tw-bg-white tw-rounded-32;
  z-index: 10000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 12px 12px 12px;
  &__wrapper {
    @apply no-scrollbar;
    display: grid;
    height: 100%;
    overflow: auto;
  }
}
</style>
