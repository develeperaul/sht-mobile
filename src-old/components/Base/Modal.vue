<template>
  <Teleport to="body">
    <div
      v-if="!isLeaved"
      class="modal"
      :class="[
        `x-${xPos}`,
        `y-${yPos}`
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
  }

  .wrap {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: grid;
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
    animation: zoomIn;
    animation-duration: var(--duration, 400ms);
  }

  .zoom-leave-active {
    animation: zoomOut;
    animation-duration: var(--duration, 400ms);
  }

  .slide-right-enter-active {
    animation: slideInRight;
    animation-duration: var(--duration, 400ms);
  }

  .slide-right-leave-active {
    animation: slideOutRight;
    animation-duration: var(--duration, 400ms);
  }

  .slide-bottom-enter-active {
    animation: slideInUp;
    animation-duration: var(--duration, 400ms);
  }

  .slide-bottom-leave-active {
    animation: slideOutDown;
    animation-duration: var(--duration, 400ms);
  }

  :slotted(.wrap > div) {
    pointer-events: all;
    will-change: scroll-position;
    overflow: auto;
    max-height: 100vh;
    max-height: calc(var(--screen-height) * var(--card-max-mult, 1));
  }
</style>
