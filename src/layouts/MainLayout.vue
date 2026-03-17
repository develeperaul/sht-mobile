<template>
  <q-layout
    view="lHh Lpr lFf"
    class="main-layout bg"
    :style="{
      backgroundImage: route.meta.bg ? 'url(' + storeMain.bg + ')' : '',
      backgroundColor: route.meta.bg ? '#000' : '',
    }"
  >
    <q-page-container>
      <router-view class="tw-pb-7" />
    </q-page-container>
    <MenuBottom />
  </q-layout>
</template>

<script setup lang="ts">
  import MenuBottom from 'src/components/Blocks/Menu.vue';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const storeMain = mainStore()
</script>
<style scoped>
.bg {
  background-repeat: no-repeat;
  background-size: auto;
}

.main-layout {
  background: linear-gradient(180deg, #F4F7FF 0%, #DFE7FF 100%);
}
</style>
