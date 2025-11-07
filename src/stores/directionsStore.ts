// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getFilters, getOffers, stories, story } from 'src/api/main'
import { DataVal } from 'src/models'
import {
  StoriesT,
  StoryT,
  StoryGroupT,
  FilterT,
  OfferT,
  OfferCardT,
} from 'src/models/api/main'
import { DirectionT, DirectionCardT } from 'src/models/api/main'
import { getDirections, getDirection } from 'src/api/main'
export default defineStore('directions', () => {
  const directions = ref<DataVal<DirectionT[]>>({ loading: false, data: [] })

  const setDirections = async (obj?: {
    days_count_from?: null | number
    days_count_to?: null | number
    is_weekend?: boolean
    month?: null | string
    name?: null | string
    price_from?: string
    price_to?: string
    year?: null | string | number
  }) => {
    try {
      directions.value.loading = true
      directions.value.data = (await getDirections(obj)).data
    } catch (e) {
      throw e
    } finally {
      directions.value.loading = false
    }
  }

  const direction = ref<DataVal<DirectionCardT | null>>({
    loading: false,
    data: null,
  })

  const setDirection = async (uuid: string) => {
    try {
      direction.value.loading = true
      direction.value.data = (await getDirection(uuid)).data
    } catch (e) {
      throw e
    } finally {
      direction.value.loading = false
    }
  }

  const transportData = computed(() => {
    if (direction.value && direction.value.data?.services) {
      return direction.value.data?.services.find(
        (el) => el.type === 'transport'
      )
    }
    return null
  })
  const powerData = computed(() => {
    if (direction.value && direction.value.data?.services) {
      return direction.value.data?.services.find(
        (el) => el.type === 'power_supply'
      )
    }
    return null
  })
  const filters = ref<DataVal<FilterT | null>>({ loading: false, data: null })
  const setFilters = async () => {
    try {
      filters.value.loading = true
      filters.value.data = (await getFilters()).data
    } catch (e) {
      throw e
    } finally {
      filters.value.loading = false
    }
  }

  const offersMap = reactive<Map<string, OfferT[]>>(new Map())
  const offers = ref<OfferT[]>([])
  const currentOffer = ref<DataVal<OfferT | OfferCardT | null>>({
    loading: false,
    data: null,
  })
  const setOffers = async (
    direction_uuid: string,
    days: string,
    date: string
  ) => {
    const ofs = offersMap.get(`${direction_uuid}_${days}_${date} `)
    if (!ofs) {
      try {
        const res = (await getOffers(direction_uuid, days, date)).data

        offersMap.set(`${direction_uuid}_${days}_${date} `, res)
        offers.value = res
      } catch (e) {
        throw e
      } finally {
      }
    } else {
      offers.value = ofs
    }
  }

  return {
    directions,
    setDirections,
    filters,
    setFilters,
    direction,
    setDirection,
    offersMap,
    offers,
    setOffers,
    currentOffer,
    transportData,
    powerData,
  }
})
