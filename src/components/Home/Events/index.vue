<template>
  <section class="card-primary home-card">
    <h2 class="home-card__title">
      В центре внимания
    </h2>
    <p class="home-card__subtitle">
      События, новости и лимитированные предложения
    </p>
    <pre>{{ data }}</pre>
    <SliderItems />
  </section>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import SliderItems from './SliderItems.vue';
  import * as promotionsApi from 'src/api/promotions';

  const { data } = useRequest(promotionsApi.all);
</script>
