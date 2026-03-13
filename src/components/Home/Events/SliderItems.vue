<template>
  <Swiper
    class="swiper-gallery-pag"
    :slidesPerView="1"
    :spaceBetween="8"
    :modules="modules"
    pagination
  >
    <SwiperSlide
      v-for="item in list"
      :key="item.uuid"
    >
      <router-link class="prom-link" :to="{ name: 'promotions.show', params: { id: item.uuid } }">
        <img class="photo" :src="item.image!.url" :alt="item.title" />
      </router-link>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';
  import type { PromotionsItem } from 'src/api/promotions';
  import { computed } from 'vue';

  const props = defineProps<{
    items: PromotionsItem[],
  }>();

  const modules = [ Pagination ];

  const list = computed(() => {
    return props.items.filter(item => item.image !== null);
  });
</script>

<style scoped lang="scss">
  .prom-link {
    display: block;
    width: 100%;
  }

  .photo {
    border-radius: 20px;
    width: 100%;
  }
</style>
