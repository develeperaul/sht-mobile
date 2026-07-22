<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="1"
    :spaceBetween="8"
    :speed="550"
    :threshold="8"
    :resistance-ratio="0.25"
    :long-swipes-ratio="0.2"
    :touch-release-on-edges="true"
    :modules="modules"
    pagination
    :style="{ 'padding-bottom': items.length <= 1 ? '0px' : ''}"
  >
    <SwiperSlide
      v-for="item in items"
      :key="item.id"
    >
      <OrderItem @click="router.push({ name: 'upcoming', params: { uuid: item.id } })" :item="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import type { OrderListItem } from 'src/api/orders';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import OrderItem from './Item.vue';
  import { useRouter } from 'vue-router';

  defineProps<{
    items: OrderListItem[],
  }>();
  const router = useRouter()

  const modules = [ Pagination ];
</script>
