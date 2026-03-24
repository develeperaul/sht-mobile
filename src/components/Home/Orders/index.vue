<template>
  <section class="card-primary home-card" v-if="items && items.length > 0">
    <h2 class="home-card__title">
      Предстоящие путешествия
    </h2>
    <SliderItems :items="items" />
  </section>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import * as ordersApi from 'src/api/orders';
  import SliderItems from './SliderItems.vue'

  const { data } = useRequest(() => ordersApi.all({ type: 'upcoming' }));

  const items = computed(() => data.value?.data ?? null);
</script>
