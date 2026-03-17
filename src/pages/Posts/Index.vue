<template>
  <q-page class="tw-relative env-t">
    <div class="tw-container">
      <div class="head">
        <ButtonRound
          class="btn-back"
          type="button"
          icon="arrowleft"
          size="38px"
          iconSize="0.6em"
          @click="$router.back"
        />
        <p class="head__title">SayHello Journal</p>
      </div>
      <CategoriesList
        class="categories-list"
        :activeCategory="activeCategory"
        @change:category="activeCategory = $event"
      />
      <PostsListItems v-if="items" :items="items" />
    </div>
    <q-inner-loading class="tw-z-10" :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
  import CategoriesList from 'src/components/Posts/PostsList/Categories.vue';
  import PostsListItems from 'src/components/Posts/PostsList/Items.vue';
  import useRequest from 'src/composables/useRequest';
  import * as postsApi from 'src/api/posts';
  import type { PostCategory } from 'src/api/posts';
  import ButtonRound from 'src/components/Base/ButtonRound.vue';

  const activeCategory = ref<PostCategory | null>(null);

  const { data, loading } = useRequest(
    () => {
      return postsApi.all({
        ...(activeCategory.value ? { rubric_ids: [ activeCategory.value.id ] } : {}),
      });
    },
    { watch: [ activeCategory ] }
  );

  const items = computed(() => {
    return data.value?.data ?? null;
  });
</script>

<style scoped lang="scss">
  .categories-list {
    margin-bottom: 12px;
  }

  .btn-back {
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);
  }

  .head {
    margin-bottom: 12px;
    padding-right: 38px;
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
    text-align: center;

    &__title {
      flex-grow: 1;
      font-size: 16px;
      line-height: 1.2;
      @apply tw-text-gray_main;
    }
  }
</style>
