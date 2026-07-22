<template>
  <BaseModal v-model="value" y-pos="bottom" x-pos="left" animation="slide-bottom">
    <div class="card-sheet glass">
      <div class="card-sheet__top">
        <button class="card-sheet__panel" type="button" v-touch-swipe.mouse.bottom="close"></button>
        <div class="card-sheet__toolbar">
          <div class="card-sheet__action card-sheet__action--left"></div>
          <div class="card-sheet__title">Сортировка</div>
          <div class="card-sheet__action card-sheet__action--right"></div>
        </div>
      </div>
      <div class="card-sheet__body-wrap">
        <div
          v-for="option in options"
          :key="option.value"
          class="option-item"
          :class="{ 'option-item--active': option.value === sortValue }"
          @click="updateSort(option.value)"
        >
          <span class="option-item__title">{{ option.name }}</span>
          <span class="option-item__action glass">
            <BaseIcon class="option-item__icon" name="option-checked" fit />
          </span>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from 'src/components/Base/Modal.vue';
  import type { SortType } from 'src/api/directions';
  import { options } from './consts';

  const value = defineModel<boolean>({ default: false });
  const sortValue = defineModel<SortType | null>('sort', { default: null });

  const emit = defineEmits<{
    (event: 'refresh'): void,
  }>();

  function close() {
    value.value = false;
  }

  function updateSort(value: SortType) {
    sortValue.value = value;
    close();
    emit('refresh');
  }
</script>


<style scoped lang="scss">
  .option-item {
    cursor: pointer;
    padding: 16px 0;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    --bg-op: 0.2;
    --bg-color: rgba(255, 255, 255, var(--bg-op));

    & + & {
      border-top: 1px solid #fff;
    }

    &--active {
      --bg-op: 0.5;
    }

    &__icon {
      display: none;
    }

    &--active &__icon {
      display: block;
    }

    &__title {
      flex-grow: 1;
      font-size: 16px;
      line-height: 1;
      @apply tw-text-white;
    }

    &__action {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      @apply tw-text-white;
    }
  }
</style>
