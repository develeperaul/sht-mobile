<template>
  <Preloader v-model="isPreloaderVisible" :duration="4500" />
  <div v-if="!isPreloaderVisible">
    <router-view />
  </div>
  <svg style="display: none;">
    <filter id="refraction-filter">
      <!-- Генерируем мягкое искажение -->
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="noise" />
      <!-- scale="12" соответствует сильному преломлению 80 -->
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
    </filter>
  </svg>
</template>

<script setup lang="ts">
import { LocalStorage } from 'quasar'
import directionsStore from './stores/directionsStore'
import friendStore from './stores/friendStore'
import useProfileStore from 'src/stores/profileStore'

const profileStore = useProfileStore()
const isPreloaderVisible = ref(false)
const isPreloader = LocalStorage.getItem('preloader')
if (!isPreloader) isPreloaderVisible.value = true

onMounted(async () => {
  const countStart = localStorage.getItem('countStart')
  if (countStart) {
    localStorage.setItem('countStart', String(JSON.parse(countStart) + 1))
  } else {
    localStorage.setItem('countStart', '1')
  }

  await Promise.allSettled([
    mainStore().getStories(),
    directionsStore().setDirections(),
    directionsStore().setFilters(),
    mainStore().setPromotion(),
  ]);

  await profileStore.isReady;

  if(profileStore.profile) {
    await friendStore().setFriends();
  }
});
</script>
