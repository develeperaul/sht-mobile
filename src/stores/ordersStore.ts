// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { DataVal } from 'src/models'

import { create, getOrderList } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'
export default defineStore('orders', () => {
  const ordersUpcoming = ref<DataVal<OfferCardList[]>>({
    loading: false,
    data: [],
  })
  const ordersPast = ref<DataVal<OfferCardList[]>>({ loading: false, data: [] })
  const createOrder = async (obj: {
    friends: { id: string }[]
    offer_id: string
    promo_code?: string
    comment?: string
  }) => {
    try {
      await create(obj)
    } catch (e) {
      throw e
    }
  }

  const setOrder = async (type: 'upcoming' | 'past') => {
    try {
      if (type === 'upcoming') {
        ordersUpcoming.value.loading = true
        ordersUpcoming.value.data = (await getOrderList(type)).data
      }
      if (type === 'past') {
        ordersPast.value.loading = true
        ordersPast.value.data = (await getOrderList(type)).data
      }
    } catch (e) {
      throw e
    } finally {
      ordersUpcoming.value.loading = false
      ordersPast.value.loading = false
    }
  }

  return {
    createOrder,
    setOrder,
    ordersPast,
    ordersUpcoming,
  }
})
