<template>
  <div class="search-actions">
    <TextInput class="search-actions__inp" :modelValue="''" isLink @click="showSearch" />
    <ButtonRound class="search-actions__btn" icon="calendar" type="button" @click="showCalendar" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function showSearch() {
    router.push({ name: 'search.index', query: { focusInput: '1' } });
  }

  function showCalendar() {
    router.push({ name: 'search.index', query: { showCalendar: '1' } });
  }
</script>
