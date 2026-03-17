<template>
  <q-footer class="tw-bg-transparent env-b">
    <div class="tw-container">
      <nav class="nav glass">
        <router-link
          v-for="item in items"
          :key="item.icon"
          :to="item.to"
          custom
          v-slot="{ href, isExactActive, navigate }"
        >
          <a class="nav-item" :href="href" @click="navigate"
          >
            <span class="nav-item__icon-wrap">
              <BaseIcon :name="`${item.icon}-${ isExactActive ? 'active' : 'inactive' }`" fit />
            </span>
          </a>
        </router-link>
      </nav>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
  const items = [
    {
      icon: 'menu-home',
      to: { name: 'home' },
    },
    {
      icon: 'menu-dir',
      to: { name: 'directions' },
    },
    {
      icon: 'menu-fav',
      to: { name: 'favourites.index' },
    },
    {
      icon: 'menu-posts',
      to: { name: 'posts.index' },
    },
    {
      icon: 'menu-profile',
      to: { name: 'profile' },
    },
  ] as const;
</script>

<style scoped lang="scss">
  .nav {
    --bg-color: rgba(255, 255, 255, 0.5);
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .nav-item {
    padding: 4px;

    &__icon-wrap {
      display: block;
      width: 24px;
      height: 24px;
    }
  }
</style>
