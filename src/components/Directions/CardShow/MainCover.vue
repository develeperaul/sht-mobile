<template>
  <div class="cover">
    <img class="img" :src="image.url" :alt="title" />
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    image: { url: string },
    title: string,
    subtitle: string,
  }>();
</script>

<style scoped lang="scss">
  .cover {
    width: 100%;
    height: 300px;
    position: relative;
    z-index: 1;
    border-radius: 0 0 32px 32px;
    overflow: hidden;
    @apply tw-text-white;
  }

  .img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    left: 0;
    top: 0;
  }

  .title {
    font-size: 30px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .content {
    position: absolute;
    bottom: 0;
    z-index: 10;
    padding: 24px;
    padding-bottom: 12px;
  }

  .subtitle {
    font-size: 16px;
    line-height: 1.375;
    margin-top: 8px;
  }
</style>
