<template>
  <q-page class="env-t">
    <div class="tw-container">
      <div class="head">
        <ButtonRound
          class="btn-back"
          type="button"
          icon="arrowleft"
          size="38px"
          iconSize="0.6em"
          @click="$router.back"
        />
        <p class="head__title">Поиск</p>
      </div>
      <router-view
        v-bind="
          type === 'directions'
          ? { directionParams }
          : type === 'directions-children'
          ? { directionParams, directionChildrenParams }
          : {}
        "
      >
      </router-view>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue';
  import type { DirectionParams, DirectionChildrenParams } from './types/index';
  import ButtonRound from 'src/components/Base/ButtonRound.vue';
  import { useRoute } from 'vue-router';

  const directionParams = reactive<DirectionParams>({
    search: '',
    range: null,
  });

  const directionChildrenParams = reactive<DirectionChildrenParams>({
    search: '',
    sort_by: 'popularity',
  });

  const route = useRoute();

  const type = computed(() => route.meta.type as string);
</script>

<style scoped lang="scss">
  .head {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    text-align: center;
    padding-right: 38px;

    &__title {
      flex-grow: 1;
      font-size: 16px;
      line-height: 1.2;
      @apply tw-text-gray_main;
    }
  }

  .btn-back {
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);
  }
</style>
