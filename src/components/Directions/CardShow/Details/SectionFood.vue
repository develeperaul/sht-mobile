<template>
  <div class="content" v-html="tText"></div>
</template>

<script setup lang="ts">
import  {useTypograf} from 'src/composables/useTypograf';
const props =defineProps<{
  text: string,
}>();
const { typograf } = useTypograf(() => null);
const tText = computed(() => typograf(props.text));
</script>

<style scoped lang="scss">
  .content {
    font-size: 16px;
    line-height: 1.4;
    @apply tw-text-black2;
  }
</style>
