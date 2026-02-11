<template>
  <section>
    <h2 class="title">FAQ</h2>
    <FaqItem
      v-for="item in questions"
      :key="item.id"
      :label="item.question"
      :text="item.answer"
    />
  </section>
</template>

<script setup lang="ts">
  import { Question } from 'src/api/directions';

  defineProps<{
    questions: Question[],
  }>();
</script>

<style scoped lang="scss">
  .title {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.3;
    letter-spacing: -0.02em;
    @apply tw-text-gray_main tw-uppercase;
  }
</style>
