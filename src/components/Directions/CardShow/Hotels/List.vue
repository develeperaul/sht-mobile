<template>
  <div class="items">
    <HotelItem
      class="list-item"
      v-for="item in items"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
  import { Hotel } from 'src/api/directions';
  import HotelItem from './Item.vue';

  defineProps<{
    items: Hotel[],
  }>();
</script>

<style scoped lang="scss">
  .items {

  }

  .list-item {
    & + & {
      padding-top: 32px;
      margin-top: 32px;
      border-top: 1px solid theme('colors.blue_light_icon');
    }
  }
</style>
