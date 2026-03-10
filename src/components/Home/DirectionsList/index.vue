<template>
  <section class="card-primary home-card">
    <h2 class="home-card__title">
      Путешествия —<br>это маленькая жизнь
    </h2>
    <p class="home-card__subtitle">
      Выберите свой сценарий в коллекции SayHelloTravel
    </p>
    <SliderItems class="items-slider" v-if="items" :items="itemsLimited" />
    <CardLinkNext :to="{ name: 'directions' }" :text="linkLabel" />
  </section>
</template>

<script setup lang="ts">
  import CardLinkNext from 'src/components/Home/CardLinkNext.vue';
  import useRequest from 'src/composables/useRequest';
  import SliderItems from './SliderItems.vue';
  import * as directionsApi from 'src/api/directions';
  import { computed } from 'vue';

  const { data } = useRequest(directionsApi.all);

  const items = computed(() => data.value?.data ?? null);

  const itemsLimited = computed(() => {
    if(!items.value) return [];
    return items.value.slice(0, 7);
  });

  const linkLabel = computed(() => {
    return `Все направления ${ items.value ? `(${items.value.length})` : '' }`.trim();
  });
</script>

<style scoped lang="scss">
  .items-slider {
    margin-bottom: 12px;
  }
</style>
