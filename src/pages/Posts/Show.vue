<template>
  <q-page class="tw-relative">
    <CardCover
      class="post-cover"
      v-if="item && item.banner_image"
      :title="item.title"
      :date="item.created_at"
      :readTime="item.reading_time"
      :image="item.banner_image"
    />
    <div v-if="item" class="card-primary">
      <div class="text" v-html="item.description"></div>
    </div>
    <q-inner-loading :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import * as postsApi from 'src/api/posts';
  import CardCover from 'src/components/Posts/CardCover.vue';

  const props = defineProps<{
    id: string,
  }>();

  const { data, loading } = useRequest(() => postsApi.show(props.id));

  const item = computed(() => data.value?.data ?? null);
</script>

<style scoped lang="scss">
  .text {
    font-size: 16px;
    line-height: 1.3;
  }

  .post-cover {
    margin-bottom: 12px;
  }
</style>
