<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="popup" v-if="model">
        <div class="popup__wrapper" v-if="success">
          <BaseIcon
            name="close"
            class="popup__close tw-mr-0 tw-ml-auto"
            @click="model = false"
          />
          <div>
            <div class="h3 tw-font-semibold tw-text-center tw-mb-4">
              Отзыв отправлен!
            </div>
            <div class="p2 tw-text-center tw-mb-4">
              Спасибо, что нашли время и поделились. <br />
              Это помогает стать нам лучше.
            </div>
            <BaseButton @click="model = false"> Закрыть </BaseButton>
          </div>
        </div>
        <div class="popup__wrapper" v-else>
          <BaseIcon
            name="close"
            class="popup__close tw-mr-0 tw-ml-auto"
            @click="model = false"
          />
          <div class="popup__content review">
            <div class="review__title tw-mb-6">Оцените поездку на Камчатку</div>
            <div class="tw-flex tw-justify-center tw-gap-[11px] tw-mb-6">
              <Star2
                v-for="value in 5"
                @click="rating = value"
                :active="rating >= value"
              />
            </div>
            <div>
              <textarea
                v-model="text1"
                class="review__input"
                placeholder="Расскажите немного о поездке — где были, когда, что особенно запомнилось и как всё прошло для вас?"
              />
              <textarea
                v-model="text2"
                class="review__input"
                placeholder="Как вы узнали о TeamTravel и почему решили доверить организацию вашего путешествия нам? "
              />
            </div>

            <BaseButton @click="sendReview"> Оставить отзыв </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { getDirectionReview } from 'src/api/main'

const rating = ref(0)
const props = defineProps<{
  direction__uuid: string
}>()
const model = defineModel()
const text1 = ref('')
const text2 = ref('')
const success = ref(false)
const sendReview = () => {
  getDirectionReview(props.direction__uuid, {
    rating: rating.value,
    description: text1.value,
    how_found_us: text2.value,
  }).then(() => (success.value = true))
}
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #16161699;
  &__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    padding: 24px;
    @apply tw-rounded-t-32;
  }
  &__close {
    color: #949494;
    width: 24px;
    height: 24px;
  }
}
.review {
  &__title {
    @apply h2 tw-font-bold  tw-text-center;
  }
  &__input {
    @apply tw-bg-blue_bg p2 tw-outline-none;
    height: 117px;
    width: 100%;
    border-radius: 32px;
    padding: 20px;
    &::placeholder {
      @apply tw-text-black p2;
    }
  }
}
</style>
