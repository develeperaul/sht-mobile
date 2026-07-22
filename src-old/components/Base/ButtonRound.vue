<template>
  <component class="btn-round glass" :is="tag">
    <span class="icon-wrap">
      <BaseIcon :name="icon" :color="iconFill" fit />
    </span>
  </component>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      tag?: string,
      icon: string,
      iconSize?: string,
      iconFill?: string,
      size?: string,
    }>(),
    { tag: 'button', size: '60px', iconSize: '0.5em' },
  );
</script>

<style scoped lang="scss">
  .btn-round {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font-size: v-bind(size);
    --radius: 50%;
  }

  .icon-wrap {
    display: block;
    width: v-bind(iconSize);
    height: v-bind(iconSize);
  }
</style>
