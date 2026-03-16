<template>
  <div class="hello">
    <div class="tw-container">
      <UserProfile
        v-if="profileStore.profile"
        :type="type"
        :name="profileStore.profile.first_name ?? ''"
        :avatar="profileStore.profile.avatar"
      />
      <div v-else class="logo-wrap">
        <img width="133" height="55" src="~/assets/images/logo.svg" alt="логотип" />
      </div>
    </div>
    <div class="cover" :class="[ `cover--${type}` ]"></div>
  </div>
</template>

<script setup lang="ts">
  import useProfileStore from 'src/stores/profileStore';
  import UserProfile from './UserProfile.vue';

  defineProps<{
    type: 'morning' | 'evening' | 'night',
  }>();

  const profileStore = useProfileStore();
</script>

<style scoped lang="scss">
  .logo-wrap {
    width: 133px;
    margin: 0 auto;
  }

  .cover {
    position: absolute;
    width: 100%;
    padding-top: 126%;
    top: 0;
    left: 0;
    z-index: -1;

    &--morning {
      background-image: url('./covers/morning.svg');
      background-size: cover;
    }

    &--evening {
      background-image: url('./covers/evening.svg');
      background-size: cover;
    }

    &--night {
      background-image: url('./covers/night.svg');
      background-size: cover;
    }
  }
</style>
