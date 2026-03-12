<template>
    <q-dialog
      v-model="showed"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="gradient-card card-block">
        <div class="head">
          <ButtonRound
            class="btn-back"
            type="button"
            icon="arrowleft"
            size="38px"
            iconSize="0.6em"
            @click="close"
          />
          <p class="head__title">Выберите даты</p>
          <button class="head__clear" type="button" @click="clear">
            Сбросить
          </button>
        </div>
        <DatePicker
          class="modal-calendar"
          v-model.range.string="innerValue"
          :rows="3"
          :columns="1"
          :masks="{ modelValue: 'YYYY-MM-DD', }"
          mode="date"
          color="system"
        />
        <div class="action-wrap">
          <BaseButton class="btn-action" type="button" @click="show">
            Показать
          </BaseButton>
        </div>
      </div>
    </q-dialog>
</template>

<script setup lang="ts" generic="T extends { range: { start: string, end: string } | null }">
  import { DatePicker } from 'v-calendar';
  import { ref, watch } from 'vue';

  const value = defineModel<{ start: string, end: string } | null>({ default: null });
  const showed = defineModel<boolean>('showed', { default: false });

  const innerValue = ref<{ start: string, end: string } | null>(null);

  watch(value, (newVal) => {
    innerValue.value = newVal;
  }, { deep: true });

  function clear() {
    innerValue.value = null;
  }

  function show() {
    value.value = innerValue.value;
    showed.value = false;
    innerValue.value = null;
  }

  function close() {
    innerValue.value = null;
    showed.value = false;
  }
</script>

<style scoped lang="scss">
  .card-block {
    padding: 20px 12px;
  }

  .head {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    text-align: center;

    &__title {
      flex-grow: 1;
      font-size: 16px;
      line-height: 1.2;
      @apply tw-text-gray_main;
    }

    &__clear {
      font-size: 14px;
      line-height: 1;
      text-decoration: underline;
      @apply tw-text-blue_additional;
    }
  }

  .btn-back {
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);
  }

  :deep(.modal-calendar.vc-container) {
    width: 100%;
    margin-bottom: 12px;
  }

  .action-wrap {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  :deep(.modal-calendar) {
    box-shadow: 0px 8px 42px 0px rgba(0, 0, 0, 0.1);
  }

  :deep(.modal-calendar.vc-system) {
    --vc-accent-50: #f0f6fe;
    --vc-accent-100: #e1edfd;
    --vc-accent-200: rgba(60, 122, 201, 0.2);
    --vc-accent-300: #97c2f9;
    --vc-accent-400: #72a5f6;
    --vc-accent-500: #4d8df4;
    --vc-accent-600: #2875f2;
    --vc-accent-700: #105edb;
    --vc-accent-800: #0d4ab0;
    --vc-accent-900: #0b3d8f;
    --vc-gray-900: #787F92;
    --vc-header-title-color: #000000;
    --vc-gray-500: rgba(0, 0, 0, 0.2);
  }

  :deep(.modal-calendar.vc-light .vc-attr) {
    --vc-highlight-light-content-color: #4D6DC3;
  }

  :deep(.modal-calendar .vc-highlight-content-light), :deep(.modal-calendar .vc-highlight-content-solid) {
    font-weight: var(--vc-font-normal);
  }

  :deep(.modal-calendar .vc-header .vc-title) {
    font-weight: var(--vc-font-normal);
  }

  :deep(.modal-calendar.vc-bordered) {
    border-radius: 32px;
  }

  :deep(.modal-calendar.vc-light) {
    --vc-border: #FFFFFF;
    --vc-bg: rgba(255, 255, 255, 0.6);
  }
</style>
