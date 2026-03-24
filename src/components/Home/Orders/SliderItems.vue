<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="1"
    :spaceBetween="8"
    :modules="modules"
    pagination
  >
    <SwiperSlide
      v-for="item in items"
      :key="item.id"
    >
      <OrderItem :item="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import type { OrderListItem } from 'src/api/orders';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import OrderItem from './Item.vue';

  defineProps<{
    items: OrderListItem[],
  }>();

  const modules = [ Pagination ];
</script>
