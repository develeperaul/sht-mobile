<template>
  <router-link class="profile" :to="{ name: 'profile' }">
    <div class="avatar">
      <img class="avatar__img" v-if="avatar" :src="avatar.url" />
      <BaseIcon v-else name="profile-avatar" fit />
    </div>
    <div class="title" :class="[ type === 'night' ? 'title--white' : 'title--black' ]">
      {{ welcomeTitle }},<br>{{ name }}
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import type { ProfileT } from 'src/models/api/profile';

  import { computed } from 'vue';

  const props = defineProps<{
    type: 'morning' | 'evening' | 'night',
    name: string,
    avatar: ProfileT['avatar'],
  }>();

  const welcomeTitle = computed(
    () =>
      props.type === 'morning' ? 'Добрый день' :
      props.type === 'evening' ? 'Добрый вечер' : 'Доброй ночи',
  );
</script>

<style scoped lang="scss">
  .profile {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.1;
    letter-spacing: -0.02em;

    &--black {
      @apply tw-text-gray_main;
    }

    &--white {
      @apply tw-text-white;
    }
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
