<template>
  <q-page class="tw-relative env-t">
    <div class="tw-container">
      <Toolbar class="tw-mb-5" title="Избранное" />
      <FavouritesList v-if="!loading" :items="items" />
      <q-inner-loading :showing="loading" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/Base/Toolbar.vue';
  import useRequest from 'src/composables/useRequest';
  import * as directionsApi from 'src/api/directions';
  import { useFavouritesStore } from 'src/stores/favourites';
  import FavouritesList from 'src/components/Favourites/List/index.vue';
  import { computed, watch } from 'vue';

  const favStore = useFavouritesStore();

  const { data, loading, send } = useRequest(
    () => directionsApi.all({ uuids: favStore.items }),
    { immediate: false },
  );

  const items = computed(() => data.value?.data ?? []);

  if(favStore.items.length > 0) send();
</script>
