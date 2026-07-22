<template>
  <ButtonRound
    class="fav-btn"
    :class="{ 'fav-btn--active': isActive }"
    type="button"
    icon="heart"
    :size="size"
    iconSize="0.5em"
    iconFill="#ffffff"
    @click.prevent="favStore.toggle(itemId); favStore.sync()"
  />
</template>

<script setup lang="ts">
  import ButtonRound from 'src/components/Base/ButtonRound.vue';
  import { useFavouritesStore } from 'src/stores/favourites';
  import { computed } from 'vue';

  const favStore = useFavouritesStore();

  const props = withDefaults(
    defineProps<{
      itemId: string,
      size?: string,
    }>(),
    { size: '34px' },
  );

  const isActive = computed(() => favStore.has(props.itemId));
</script>

<style scoped lang="scss">
  .fav-btn :deep(.icon-wrap) {
    opacity: 0.2;
  }

  .fav-btn--active :deep(.icon-wrap) {
    opacity: 1;
  }
</style>
