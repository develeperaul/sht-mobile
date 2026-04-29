<template>
  <div class="content" >
    <div class=" tw-underline tw-text-blue_link" @click="openBrowse(text)">Ссылка на статью</div>
    <div
      class=" tw-mt-8"
        v-if="
          stories.length > 0
        "
      >
        <div class="h3 tw-mb-3">Что вас ожидает</div>
        <div class=" p1 tw-mb-3">
          Малая часть из того, что запомнится <br> вам на всю жизнь:
        </div>
        <div>
          <Stories
            :stories="stories"
          />
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { StoriesT } from 'src/models/api/main';
import { Browser } from '@capacitor/browser'
import Stories from 'src/components/StoriesOther/Index.vue'
  defineProps<{
    text: string,
    stories: StoriesT[]
  }>();
const openBrowse = (url: string) => {
  // alert(url)
  Browser.open({ url: url })
  Browser.addListener('browserFinished', () => {
    // обновить статус
  })

}
</script>

<style scoped lang="scss">
  .content {
    font-size: 16px;
    line-height: 1.4;
    @apply tw-text-black2;
  }
</style>
