<template>
  <div class="select-wrap">
    <div class="select" role="select" @click="showed = !showed">
      <span class="select__label">{{ label }}</span>
      <span class="select__icon-wrap" :class="{ 'select__icon-wrap--active': showed }">
        <BaseIcon fit name="arrow-top" />
      </span>
    </div>
    <div class="dropdown" v-if="showed">
      <div
        class="option"
        :class="{ 'option--active': isActive(option) }"
        v-for="option in options"
        @click="changeValue(option); showed = false"
      >
        {{ getOptionLabel(option) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number | Record<string, unknown>, V extends keyof T = never">
  import { computed, ref } from 'vue';

  const props = defineProps<{
    options: T[],
    labelKey?: T extends Record<string, unknown> ? keyof T : never,
    valueKey?: V,
    primaryKey?: T extends Record<string, unknown> ? keyof T : never,
    defaultLabel?: string,
    modelValue?: (T extends string ? 'string' : T extends number ? 'number' : T[V] extends never ? T : T[V]) | null,
    getLabel?: (val: T extends string ? 'string' : T extends number ? 'number' : T[V] extends never ? T : T[V]) => string,
    getOptionLabel?: (val: T) => string,
  }>();

  const emit = defineEmits<{
    (
      event: 'update:modelValue',
      value: T extends string ? 'string' : T extends number ? 'number' : T[V] extends never ? T : T[V],
    ): void,
  }>();

  const showed = ref(false);

  const label = computed(() => {
    if(props.modelValue === undefined || props.modelValue === null) {
      return props.defaultLabel ?? 'Выберите значение';
    } else if(props.getLabel) {
      return props.getLabel(props.modelValue);
    } else if(props.labelKey && typeof props.modelValue === 'object' && props.labelKey in props.modelValue) {
      return `${(props.modelValue as any)[props.labelKey]}`;
    } else if(props.valueKey && props.labelKey && typeof props.modelValue !== 'object') {
      const e = props.options.find(el => (el as any)[props.valueKey] === props.modelValue);
      if(e) return `${e[props.labelKey]}`;
    } else if(typeof props.modelValue === 'string' || typeof props.modelValue === 'number') {
      return `${props.modelValue}`;
    }
    return '?';
  });


  function getOptionLabel(option: T) {
    if(props.getOptionLabel) {
      return props.getOptionLabel(option);
    } else if(typeof option === 'string' || typeof option === 'number') {
      return option;
    } else if(props.labelKey && typeof option === 'object' && props.labelKey in option) {
      return option[props.labelKey];
    }
    return '?';
  }

  function changeValue(option: T) {
    if(typeof option === 'string' || typeof option === 'number' || (typeof option === 'object' && !props.valueKey)) {
      emit('update:modelValue', option as any);
    } else if(props.valueKey && typeof option === 'object' && props.valueKey in option) {
      emit('update:modelValue', option[props.valueKey] as any);
    }
  }

  function isActive(option: T) {
    if(props.modelValue === null || props.modelValue === undefined) return false;
    if(typeof option === 'string' || typeof option === 'number') {
      return option === props.modelValue;
    } else if(typeof option === 'object' && props.valueKey && props.valueKey in option) {
      return option[props.valueKey] === props.modelValue;
    } else if(
      typeof option === 'object' && props.primaryKey && typeof props.modelValue === 'object' &&
      props.primaryKey in option &&
      props.primaryKey in (props.modelValue as any)
    ) {
      return option[props.primaryKey] === (props.modelValue as any)[props.primaryKey];
    }
    return false;
  }
</script>

<style scoped lang="scss">
  .select-wrap {
    position: relative;
  }

  .select {
    cursor: pointer;
    padding: 5px 8px;
    padding-left: 20px;
    background-color: #F5F8FC;
    border-radius: 60px;
    display: flex;
    align-items: center;
    gap: 16px;
    user-select: none;

    &__icon-wrap {
      width: 40px;
      height: 40px;
      transition: transform 200ms;

      &--active {
        transform: rotate(180deg);
      }
    }

    &__label {
      flex-grow: 1;
      font-weight: 400;
      font-size: 16px;
      line-height: 1;
      @apply tw-text-gray_main;
    }
  }

  .dropdown {
    max-height: 250px;
    padding: 10px 0;
    background-color: #F5F8FC;
    border-radius: 20px;
    position: absolute;
    top: calc(100% + 4px);
    z-index: 10;
    width: 100%;
    overflow-x: hidden;
  }

  .option {
    cursor: pointer;
    padding: 10px 16px;

    &--active {
      opacity: 0.5;
    }
  }
</style>
