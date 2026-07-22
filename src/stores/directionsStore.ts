// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import {
  getDirectionSubgroup,
  getFilters,
  getOffers,
  stories,
  story,
} from 'src/api/main'
import { DataVal } from 'src/models'
import {
  StoriesT,
  StoryT,
  StoryGroupT,
  FilterT,
  OfferT,
  OfferCardT,
  DirectionSubgroupT,
} from 'src/models/api/main'
import { DirectionT, DirectionCardT } from 'src/models/api/main'
import { getDirections, getDirection } from 'src/api/main'
import { buildRequestCacheKey, fetchWithRequestCache } from 'src/utils/requestCache'
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
      const res = await fetchWithRequestCache(
        buildRequestCacheKey('store:directions', obj ?? {}),
        10 * 60 * 1000,
        () => getDirections(obj),
      )
      directions.value.data = res.data
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
      const res = await fetchWithRequestCache(
        `store:directions:show:${uuid}`,
        10 * 60 * 1000,
        () => getDirection(uuid),
      )
      direction.value.data = res.data
    } catch (e) {
      throw e
    } finally {
      direction.value.loading = false
    }
  }

  const directionsSubgroup = ref<DataVal<DirectionSubgroupT | null>>({
    loading: false,
    data: null,
  })
  const setDirectionsSubgroup = async (uuid: string, date?: string) => {
    try {
      directionsSubgroup.value.loading = true
      directionsSubgroup.value.data = await fetchWithRequestCache(
        buildRequestCacheKey(`store:directions:subgroup:${uuid}`, { date }),
        10 * 60 * 1000,
        () => getDirectionSubgroup(uuid, date),
      )
    } catch (e) {
      throw e
    } finally {
      directionsSubgroup.value.loading = false
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
      const res = await fetchWithRequestCache(
        'store:directions:filters',
        60 * 60 * 1000,
        getFilters,
      )
      filters.value.data = res.data
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
        const res = (await fetchWithRequestCache(
          buildRequestCacheKey('store:directions:offers', { direction_uuid, days, date }),
          5 * 60 * 1000,
          () => getOffers(direction_uuid, days, date),
        )).data

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
    directionsSubgroup,
    setDirectionsSubgroup,
  }
})
