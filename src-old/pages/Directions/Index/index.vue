<template>
  <q-page class="env-t tw-relative">
    <div class="tw-container">
      <Toolbar class="tw-mb-4" title="Все направления" />
      <router-view
        :range="range"
        @show:calendar="showedCalendar = true"
        v-slot="{ Component }"
      >
        <Transition name="anim" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
    <ModalCalendar v-model:showed="showedCalendar" v-model="range" />
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/Base/Toolbar.vue';
  import { ref } from 'vue';
  import ModalCalendar from 'src/components/Search/ModalCalendar.vue';

  const showedCalendar = ref(false);
  const range = ref<{ start: string, end: string } | null>(null);
</script>

<style scoped lang="scss">
  .anim {
    &-enter-active, &-leave-active {
      transition: opacity 300ms;
    }

    &-enter-from, &-leave-to {
      opacity: 0;
    }
  }
</style>
