<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="2.1"
    :spaceBetween="8"
    :modules="modules"
    pagination
  >
    <SwiperSlide
      v-for="item in items"
      :key="item.id"
    >
      <router-link
        :to="{ name: 'directions.children', params: { id: item.id } }"
        custom
        v-slot="{ href, navigate }"
      >
        <DirectionsItem :item="item" size="sm" hideSubtitle :href="href" @click="navigate" />
      </router-link>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import type { DirectionListItem } from 'src/api/directions';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import DirectionsItem from 'src/components/Directions/List/Item/index.vue';

  defineProps<{
    items: DirectionListItem[],
  }>();

  const modules = [ Pagination ];
</script>
