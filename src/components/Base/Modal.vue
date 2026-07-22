<template>
  <Teleport to="body">
    <div
      v-if="!isLeaved"
      class="modal"
      :class="[
        `x-${xPos}`,
        `y-${yPos}`,
        { 'is-open': value }
      ]"
      v-bind="$attrs"
    >
      <Transition
        appear
        :name="animation"
        @after-leave="isLeaved = true"
      >
        <div v-if="value" class="wrap">
          <slot v-bind="{ hide }"></slot>
        </div>
      </Transition>
      <slot name="after"></slot>
      <div class="overlay" @click="hide"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import useScrollToggle from 'src/composables/useScrollToggle';
  import { ref, toRef, watch } from 'vue';

  interface Props {
    xPos?: 'left' | 'center' | 'right',
    yPos?: 'top' | 'center' | 'bottom',
    animation?: 'zoom' | 'slide-right' | 'slide-bottom',
    skipScroll?: boolean,
  }

  const props = withDefaults(
    defineProps<Props>(),
    {
      xPos: 'center',
      yPos: 'center',
      animation: 'zoom',
      skipScroll: false,
    },
  );

  defineOptions({
    inheritAttrs: false,
  });

  const screenHeight = window.innerHeight + 'px';

  const value = defineModel<boolean>({
    default: false,
  });

  const isLeaved = ref(!value.value);

  watch(value, (v) => {
    if(v) isLeaved.value = false;
  });

  useScrollToggle(value, toRef(props, 'skipScroll'));

  function hide() {
    value.value = false;
  }
</script>

<style scoped lang="scss">
  .modal {
    --screen-height: v-bind(screenHeight);
    position: fixed;
    width: 100vw;
    height: 100vh;
    height: var(--screen-height);
    z-index: 5900;
    left: 0;
    top: 0;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.64);
    z-index: -1;
    opacity: 0;
    transition: opacity 220ms ease-out;
  }

  .is-open .overlay {
    opacity: 1;
  }

  .wrap {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: grid;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    will-change: transform, opacity;
  }

  .x-right .wrap {
    justify-items: end;
  }

  .x-left .wrap {
    justify-items: start;
  }

  .x-center .wrap {
    justify-items: center;
  }

  .y-top .wrap {
    align-items: start;
  }

  .y-center .wrap {
    align-items: center;
  }

  .y-bottom .wrap {
    align-items: end;
  }

  .zoom-enter-active {
    transition: opacity var(--duration, 260ms) ease-out, transform var(--duration, 260ms) cubic-bezier(0.22, 1, 0.36, 1);
  }

  .zoom-leave-active {
    transition: opacity 180ms ease-in, transform 180ms ease-in;
  }

  .zoom-enter-from,
  .zoom-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.985);
  }

  .slide-right-enter-active {
    transition: opacity var(--duration, 280ms) ease-out, transform var(--duration, 280ms) cubic-bezier(0.22, 1, 0.36, 1);
  }

  .slide-right-leave-active {
    transition: opacity 180ms ease-in, transform 180ms ease-in;
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    opacity: 0;
    transform: translate3d(32px, 0, 0);
  }

  .slide-bottom-enter-active {
    transition: opacity var(--duration, 280ms) ease-out, transform var(--duration, 280ms) cubic-bezier(0.22, 1, 0.36, 1);
  }

  .slide-bottom-leave-active {
    transition: opacity 180ms ease-in, transform 180ms ease-in;
  }

  .slide-bottom-enter-from,
  .slide-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 32px, 0);
  }

  :slotted(.wrap > div) {
    pointer-events: all;
    will-change: scroll-position;
    overflow: auto;
    max-height: 100vh;
    max-height: calc(var(--screen-height) * var(--card-max-mult, 1));
  }
</style>
