<template>
  <q-intersection
    :once="once"
    :threshold="threshold"
    transition="fade"
    class="lazy-on-view"
  >
    <!-- Рендерим слот только когда блок попал в зону видимости -->
    <div>
      <slot />
    </div>
  </q-intersection>
</template>

<script setup>
const props = defineProps({
  // Сработать один раз и больше не скрывать
  once: {
    type: Boolean,
    default: true,
  },
  // Насколько элемент должен быть виден (0–1)
  threshold: {
    type: Number,
    default: 0.1,
  },
})
</script>

<style scoped>
.lazy-on-view {
  /* Можно задать минимальную высоту, чтобы place-holder не схлопывался */
  min-height: 50px;
}
</style>
