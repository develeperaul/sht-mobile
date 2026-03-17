<template>
  <q-page class="tw-relative env-t tw-pb-36">
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
      </div>
      <div class="card-primary" v-if="item">
        <div v-if="item.image" class="img-wrap">
          <img class="photo" :src="item.image.url" :alt="item.title" />
        </div>
        <h1 class="title">{{ item.title }}</h1>
        <div class="text" v-html="item.description"></div>
      </div>
    </div>
    <q-inner-loading :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
  import ButtonRound from 'src/components/Base/ButtonRound.vue';
  import useRequest from 'src/composables/useRequest';
  import * as promotionsApi from 'src/api/promotions';

  const props = defineProps<{
    id: string,
  }>();

  const { data, loading } = useRequest(() => promotionsApi.show(props.id));

  const item = computed(() => data.value?.data ?? null);
</script>

<style scoped lang="scss">
  .btn-back {
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);
  }

  .head {
    margin-bottom: 12px;
  }

  .img-wrap {
    margin-bottom: 24px;
  }

  .photo {
    border-radius: 30px;
    width: 100%s;
  }

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }

  .text {
    font-size: 14px;
    line-height: 1.2;
  }
</style>
