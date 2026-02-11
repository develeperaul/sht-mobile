<template>
  <div class="content" v-html="text"></div>
</template>

<script setup lang="ts">
  defineProps<{
    text: string,
  }>();
</script>

<style scoped lang="scss">
  .content {
    font-size: 16px;
    line-height: 1.4;
    @apply tw-text-black2;
  }
</style>
