<template>
  <Preloader v-model="isPreloaderVisible" :duration="4500" />
  <div v-if="!isPreloaderVisible">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { LocalStorage } from 'quasar'
import { getAccessToken } from './api/tokens'
import directionsStore from './stores/directionsStore'
import friendStore from './stores/friendStore'
import profileStore from './stores/profileStore'

//
const isPreloaderVisible = ref(false)
const isPreloader = LocalStorage.getItem('preloader')
if (!isPreloader) isPreloaderVisible.value = true
onMounted(async () => {
  const token = getAccessToken()
  if (token) {
    try {
      await Promise.allSettled([
        profileStore().setProfile(),
        friendStore().setFriends(),
        mainStore().getStories(),
        directionsStore().setDirections(),
        directionsStore().setFilters(),
      ])
    } catch (e) {
      throw e
    }
  }
  try {
    await Promise.allSettled([
      mainStore().getStories(),
      directionsStore().setDirections(),
      directionsStore().setFilters(),
      mainStore().setPromotion(),
    ])
  } catch (e) {
    throw e
  }
})
</script>
