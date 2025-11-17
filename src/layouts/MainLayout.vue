<template>
  <q-layout
    view="lHh Lpr lFf"
    class="tw-bg-blue_bg bg env-t"
    :style="{
      backgroundImage: route.meta.bg ? 'url(' + storeMain.bg + ')' : '',
      backgroundColor: route.meta.bg ? '#000' : '',
    }"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="nav-panel env-b">
      <div class="tw-container tw-py-4 tw-flex tw-justify-between tw-px-8">
        <router-link
          to="/"
          class="tw-grid tw-justify-items-center tw-gap-[3px]"
          v-slot="{ isExactActive }"
        >
          <BaseIcon
            name="home"
            class="tw-w-6 tw-h-6"
            :class="[
              isExactActive ? 'tw-text-blue_icon' : '  tw-text-blue_main',
            ]"
          />
          <span
            :class="[
              isExactActive ? 'tw-text-blue_icon' : '  tw-text-blue_main',
            ]"
            class="p3"
          >
            Главная
          </span>
        </router-link>
        <router-link
          :to="{ name: 'directions' }"
          class="tw-grid tw-justify-items-center tw-gap-[3px]"
          v-slot="{ isExactActive }"
        >
          <BaseIcon
            name="loсation"
            class="tw-w-6 tw-h-6"
            :class="[
              isExactActive ? 'tw-text-blue_icon' : '  tw-text-blue_main',
            ]"
          />
          <span
            :class="[
              isExactActive ? 'tw-text-blue_icon' : '  tw-text-blue_main',
            ]"
            class="p3"
          >
            Направления
          </span>
        </router-link>
        <router-link
          :to="{ name: 'profile' }"
          class="tw-grid tw-justify-items-center tw-gap-[3px]"
          v-slot="{ isExactActive }"
        >
          <BaseIcon
            name="user"
            class="tw-w-6 tw-h-6"
            :class="[
              isExactActive ? 'tw-text-blue_icon' : ' tw-text-blue_main',
            ]"
          />
          <span
            :class="[
              isExactActive ? 'tw-text-blue_icon ' : '  tw-text-blue_main',
            ]"
            class="p3"
          >
            Профиль
          </span>
        </router-link>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const storeMain = mainStore()
</script>
<style scoped>
.bg {
  background-repeat: no-repeat;
  background-size: auto;
}
</style>
