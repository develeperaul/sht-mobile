<template>
  <article class="item">
    <div class="title-wrap" @click="showed = !showed">
      <component v-if="title" class="label" :is="titleTag">{{ title }}</component>
      <div class="label " v-else>
        <slot name="title"></slot>
      </div>
      <button class="btn tw-flex-shrink-0" :class="{ 'btn--active': showed }" type="button">
        <BaseIcon name="arrow-top" fit />
      </button>
    </div>
    <SlideUpDown :duration="300" :active="showed">
      <div class="content" v-if="text" v-html="text"></div>
      <div class="content" v-else>
        <slot></slot>
      </div>
    </SlideUpDown>
  </article>
</template>

<script setup lang="ts">
  //@ts-ignore
  import SlideUpDown from 'vue-slide-up-down';
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      titleTag?: string,
      title?: string,
      text?: string,
      initialActive?: boolean,
    }>(), { titleTag: 'h2', initialActive: false },
  );

  const showed = ref(props.initialActive);
</script>

<style scoped lang="scss">
  .btn {
    width: 44px;
    height: 44px;
    transition: transform 300ms;
    transform: rotate(180deg);

    &--active {
      transform: rotate(0deg);
    }
  }

  .title-wrap {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    @apply tw-text-gray_main;
  }

  .label {
    flex-grow: 1;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .item {
    border-bottom: 1px solid theme('colors.blue_light_icon');
    @apply tw-text-black2;
  }

  .content {
    font-size: 16px;
    line-height: 1.3;
    padding-bottom: 12px;
  }
</style>
