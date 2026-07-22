<template>
  <section>
    <HotelsList :items="hotels" />
  </section>
</template>

<script setup lang="ts">
  import { Hotel } from 'src/api/directions';
  import HotelsList from '../Hotels/List.vue';

  defineProps<{
    hotels: Hotel[],
  }>();
</script>
