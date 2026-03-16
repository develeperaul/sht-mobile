<template>
  <div class="search-actions items">
    <TextInput class="search-actions__inp" :color="color" :modelValue="''" isLink @click="showSearch" />
    <ButtonRound
      class="search-actions__btn"
      :iconFill="color === 'white' ? '#ffffff' : '#8BA7F6'"
      icon="calendar"
      type="button"
      @click="showCalendar"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  defineProps<{
    color: 'white' | 'blue',
  }>();

  const router = useRouter();

  function showSearch() {
    router.push({ name: 'search.index', query: { focusInput: '1' } });
  }

  function showCalendar() {
    router.push({ name: 'search.index', query: { showCalendar: '1' } });
  }
</script>

<style scoped lang="scss">
  .items {
    .search-actions__inp, .search-actions__btn {
      --b-color: rgba(255, 255, 255, 0.3);
      --bg-color: rgba(255, 255, 255, 0.3);
    }
  }
</style>
