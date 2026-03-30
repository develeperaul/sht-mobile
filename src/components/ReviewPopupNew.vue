<template>
  <BaseModal v-if="success" class="filter-modal  glass-w " v-model="value" y-pos="center" x-pos="left" animation="zoom">
      <div class=" tw-w-full tw-px-3">
        <div class="glass-w  !tw-rounded-32 tw-p-3 tw-pb-6 tw-grid tw-gap-4 tw-justify-items-center ">
          <button class="card-sheet__close tw-justify-self-end  glass" type="button" @click="close">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4173 0.750072L0.75 12.4173M12.4173 12.4173L0.75 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
          <div class=" h3 tw-text-white">
            Отзыв отправлен!
          </div>
          <div class=" p2 tw-text-center tw-text-white">
            Спасибо, что нашли время и поделились. <br> Это помогает стать нам лучше.
          </div>
          <BaseButton class=" !tw-w-fit" @click="router.push({name:'home'})">
            На главную
          </BaseButton>
        </div>

      </div>


  </BaseModal>
  <BaseModal v-else class="filter-modal glass-w" v-model="value" y-pos="bottom" x-pos="left" animation="slide-bottom">
    <div class="card-sheet glass tw-max-h-[95vh]">
      <div class="card-sheet__top tw-grid tw-p-5 tw-px-0">
        <button class="card-sheet__close tw-justify-self-end  glass" type="button" @click="close">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4173 0.750072L0.75 12.4173M12.4173 12.4173L0.75 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>



          <div class="card-sheet__title tw-justify-self-center" style=" max-width: 265px;">Оцените поездку на {{ title }}</div>


      </div>
      <div  class="card-sheet__body-wrap">
        <div class="popup__content--wrapper">
              <div class="tw-flex tw-justify-center tw-gap-[11px] tw-mb-6">
                <Star3
                  v-for="value in 5"
                  @click="rating = value"
                  :active="rating >= value"
                />
              </div>
              <div class=" tw-grid tw-gap-2 tw-mb-4">
                <textarea
                  v-model="text1"
                  class="reviewnew__input"
                  placeholder="Расскажите немного о поездке — где были, когда, что особенно запомнилось и как всё прошло для вас?"
                />
                <textarea
                  v-model="text2"
                  class="reviewnew__input"
                  placeholder="Как вы узнали о TeamTravel и почему решили доверить организацию вашего путешествия нам? "
                />
              </div>
              <div class="p1 tw-text-white">Прикрепите фото</div>
              <div
                class="tw-flex tw-gap-1 tw-justify-items-start tw-overflow-auto tw-mb-6 tw-pt-2.5 no-scrollbar"
              >
                <FileOther @file-load="fileLoad" class="tw-shrink-0" />
                <FileOther
                  v-for="(value, index) in imgIds"
                  @delete-file="(e) => deleteImg(index, e)"
                  :id="value.id"
                  :url="value.url ?? ''"
                  :noimg="false"
                  class="tw-shrink-0"
                />
              </div>
            </div>

      </div>
      <div class="card-sheet__btn-wrap env-b">
        <BaseButton class="tw-mt-2" @click="sendReview">
          Оставить отзыв
        </BaseButton>
      </div>

    </div>
  </BaseModal>


</template>

<script setup lang="ts">
import BaseModal from 'src/components/Base/Modal.vue';
import { deleteMedia, getDirectionReview } from 'src/api/main'
import { uploadFile } from 'src/api/profile'
import { useRouter } from 'vue-router';


const rating = ref(0)
const props = defineProps<{
  direction__uuid: string
  title: string
}>()

const router = useRouter()
const value = defineModel<boolean>({ default: false });
const text1 = ref('')
const text2 = ref('')
const success = ref(false)
const sendReview = () => {
  getDirectionReview(props.direction__uuid, {
    rating: rating.value,
    description: text1.value,
    how_found_us: text2.value,
    image_ids: imgIds.value.map((i) => i.id),
  }).then(() => (success.value = true))
}
const imgIds = ref<{ url: string; id: string }[]>([])
const fileLoad = async (file: File) => {
  try {
    const res = (await uploadFile(file)).data.image
    imgIds.value = [...imgIds.value, res]
  } catch (e) {
    throw e
  }
}

const deleteImg = async (index: number, id: string) => {
  try {
    await deleteMedia(id)
    imgIds.value.splice(index, 1)
    // убрать объект из массива
  } catch (e) {
    throw e
  }
}

function close() {
    value.value = false;
  }
</script>

<style scoped lang="scss">
.card-sheet__title {
  @apply h2 tw-text-center;
}
.reviewnew__input {
  @apply p2;
  min-height: 117px;
  width: 100%;
  background: linear-gradient(180deg, #F4F7FF 0%, #DFE7FF 100%);
  color: #787F92;
  border-radius: 32px;
  padding: 20px;
  outline: none;
}
</style>
