<template>
  <div class="tw-flex tw-justify-between tw-items-center">
    <div class="h2">Привет{{ name }}!</div>

    <router-link
      :to="{ name: 'profile' }"
      class="tw-bg-white tw-rounded-full tw-w-12 tw-h-12 tw-grid tw-place-content-center tw-overflow-hidden"
    >
      <img
        v-if="profile?.avatar"
        :src="profile.avatar.url"
        alt=""
        class="tw-w-full tw-h-full"
      />
      <BaseIcon v-else name="user" class="tw-w-7 tw-h-7 tw-text-blue_icon" />
    </router-link>
  </div>
</template>
<script setup lang="ts">
import profileStore from 'src/stores/profileStore'

const { profile } = storeToRefs(profileStore())

const name = computed(() => {
  if (profile.value) return ', ' + profile.value.first_name
  return ''
})
</script>
<style lang="scss" scoped></style>
