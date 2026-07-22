<template>
  <section class="card-primary home-card" v-if="items && items.length > 0">
    <h2 class="home-card__title">
      В центре внимания
    </h2>
    <p class="home-card__subtitle">
      События, новости и лимитированные предложения
    </p>
    <SliderItems :items="items" />
  </section>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import SliderItems from './SliderItems.vue';
  import * as promotionsApi from 'src/api/promotions';
  import { computed } from 'vue';

  const { data } = useRequest(promotionsApi.all);

  const items = computed(() => data.value?.data ?? null);
</script>
