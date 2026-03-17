<template>
  <div class="toolbar">
    <ButtonRound
      class="btn-back"
      type="button"
      icon="arrowleft"
      size="38px"
      iconSize="0.6em"
      @click="$router.back"
    />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
  import ButtonRound from './ButtonRound.vue';

  defineProps<{
    title: string,
  }>();
</script>

<style scoped lang="scss">
  .toolbar {
    display: flex;
    align-items: center;
    gap: 16px;

    &::after {
      content: '';
      display: block;
      width: 38px;
      height: 38px;
      opacity: 0;
    }
  }

  .title {
    flex-grow: 1;
    text-align: center;
  }

  .btn-back {
    --bg-color: rgba(255, 255, 255, 0.5);
  }
</style>
