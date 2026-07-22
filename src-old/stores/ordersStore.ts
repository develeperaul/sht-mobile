// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Browser } from '@capacitor/browser'
import { DataVal } from 'src/models'
import { useRouter } from 'vue-router'
import { create, getOrderList } from 'src/api/order'
import { OfferCardList } from 'src/models/api/main'
export default defineStore('orders', () => {
  const router = useRouter()
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
  const urlOrderPending = computed(() => {
    const ord = ordersUpcoming.value.data.find((o) => o.status === 'pending')

    if (ord && ord.payment_url) {
      return ord.payment_url
    }
    return ''
  })
  const isOrderWaitingReview = computed(() => {
    const ord = ordersUpcoming.value.data.find(
      (o) => o.status === 'waiting_review'
    )

    console.log(ord)

    if (ord) {
      return ord
    }
    return ord
  })

  const openURL = (url: string) => {
    // alert(url)
    Browser.open({ url: url })
    Browser.addListener('browserFinished', () => {
      // обновить статус
    })
    router.push({ name: 'orders' })
  }
  return {
    createOrder,
    setOrder,
    ordersPast,
    ordersUpcoming,

    urlOrderPending,
    openURL,
    isOrderWaitingReview,
  }
})
