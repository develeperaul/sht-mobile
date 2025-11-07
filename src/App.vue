<template>
  <router-view />
</template>

<script setup lang="ts">
import { getAccessToken } from './api/tokens'
import directionsStore from './stores/directionsStore'
import friendStore from './stores/friendStore'
import profileStore from './stores/profileStore'

//

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
    ])
  } catch (e) {
    throw e
  }
})
</script>
