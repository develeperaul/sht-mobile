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
      <div class="text t" v-html="item.description"></div>
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

// const item = computed(() => data.value?.data ?? null);
  const item = computed(() => {
  const post = data.value?.data ?? null;
  if (!post || !post.description) return post;

  // 1. Создаем парсер
  const parser = new DOMParser();
  // 2. Превращаем строку в DOM-дерево
  const doc = parser.parseFromString(post.description, 'text/html');

  // 3. Находим все элементы внутри
  const allElements = doc.querySelectorAll('*');

  // 4. Удаляем атрибуты class и style
  allElements.forEach(el => {
    el.removeAttribute('class');
    el.removeAttribute('style');
  });

  // 5. Возвращаем очищенный HTML обратно в описание
  return {
    ...post,
    description: doc.body.innerHTML
  };
});
</script>
<style lang="scss">
// .t {
//   // display: none;
//   & > div {
//     // & > * {
//     //     display: none;

//     // }
//   }
//   & * {
//       width: 100% !important;
//       height: 100%;
//       object-fit: cover;
//     }
// }
</style>
<style scoped lang="scss">
  .text {
    font-size: 16px;
    line-height: 1.3;
    display: grid;
    gap: 16px;
    min-width: 0;
    width: 100%;

    // 2. Управляем переносом длинных слов и ссылок
    overflow-wrap: break-word; // Переносит длинные слова
    word-wrap: break-word;     // Для старых браузеров
    word-break: break-word;    // Разрывает слишком длинные строки
    hyphens: auto;             // (Опционально) добавляет переносы

    // 3. Важно для вложенных элементов (картинки, таблицы, видео)
    :deep(*) {
      max-width: 100% !important;
      box-sizing: border-box;
    }
    :deep(h1) {
      font-weight: 700;
    }
    :deep(h2) {
      font-weight: 700;
    }
    :deep(h3) {
      font-weight: 700;
    }
    :deep(h4) {
      font-weight: 700;
    }
    :deep(h5) {
      font-weight: 700;
    }
    :deep(h6) {
      font-weight: 700;
    }
    :deep(img) {
      height: auto;
      display: block;
    }
    :deep(img) {

      width: 100% !important;
      height: 100%;
      object-fit: cover;
    }
    :deep(ul) {
      list-style-type: none; // Отключаем стандартные точки
      padding: 0;
      margin: 0;
      display: grid;
      gap: 8px; // Расстояние между пунктами списка

      li {
        position: relative;
        padding-left: 25px; // Место под кастомный маркер
        display: block;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5em; // Центрируем по первой строке текста
          width: 17px;
          height: 7px;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='17' height='7' viewBox='0 0 17 7' fill='none'%3e%3ccircle cx='3.5' cy='3.5' r='3.5' fill='%23D0ED17'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: center left;
        }
      }
    }

    :deep(i) {
      position: relative;
      display: flex;
      gap: 24px;
      background: #f6f8fd;
      padding: 10px 10px 15px 30px;
      border-radius: 20px;
      font-style: normal;
      &::before {
        content: "";
        display: block;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        background-position: center;
        background-repeat: no-repeat;
        // background-color: #fff;
        border-radius: 99999px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='w3.org' viewBox='0 0 24 24'%3E%3Ccircle fill='%23ffffff' cx='12.125' cy='12.125' r='12'/%3E%3Cpath fill='%23cfdae9' d='M10.922 6.486c0-.728.406-1.091 1.217-1.091s1.215.363 1.215 1.091c0 .347-.102.617-.304.81-.202.193-.507.289-.911.289-0.406 0-.812-.366-.812-1.099zm2.33 11.306h-2.234V9.604h2.234v8.188z'/%3E%3C/svg%3E");

      }

    }

  }


  .post-cover {
    margin-bottom: 12px;
  }
</style>
