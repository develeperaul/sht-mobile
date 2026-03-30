<template>
  <BaseModal  class="filter-modal   glass-w " v-model="model" y-pos="bottom" x-pos="left" animation="zoom">
    <div class=" tw-w-full tw-px-3 env-b ">
        <div class="glass-w  !tw-rounded-32 tw-p-3 tw-pb-6 tw-grid tw-gap-4 tw-justify-items-center ">
          <button class="card-sheet__close tw-justify-self-end  glass" type="button" @click="close">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4173 0.750072L0.75 12.4173M12.4173 12.4173L0.75 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <Form
          class="tw-grid tw-gap-4 tw-justify-items-center"
          @submit="verify"
        >
          <div class=" h2 tw-text-white">
            Подтвердите телефон
          </div>
          <div class="p1 tw-text-white tw-text-center">
            Введите код из смс <br />
            +7{{ phone }}
          </div>
          <code-input
            class="tw-flex tw-justify-center"
            @filled="diabledBtn = false"
            @unfilled="diabledBtn = true"
            bg="transparent"
          />
          <div class="link p2 tw-text-center">
            Не получили код?
          </div>
          <BaseButton :disabled="diabledBtn"> Отправить </BaseButton>
        </Form>
      </div>

    </div>
  </BaseModal>
  <!-- <div class="popup" v-if="model">
    <div class="popup__wrapper">
      <BaseIcon
        name="close"
        class="popup__close tw-mr-0 tw-ml-auto"
        @click="model = false"
      />
      <div class="popup__content">
        <Form
          class="card-white tw-grid tw-gap-[23px] tw-mt-[32.5px]"
          @submit="verify"
        >
          <div class="h2 tw-text-center">Подтвердите телефон</div>
          <div class="p1 tw-text-center">
            Введите код из смс <br />
            +7{{ phone }}
          </div>
          <code-input
            class="tw-flex tw-justify-center"
            @filled="diabledBtn = false"
            @unfilled="diabledBtn = true"
          />
          <div class="tw-mb-6 tw-mt-6">
            <div class="link p2 tw-text-center">Не получили код?</div>
          </div>
          <BaseButton :disabled="diabledBtn"> Отправить </BaseButton>
        </Form>
      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import BaseModal from 'src/components/Base/Modal.vue';
import { verifyEmail, verifyPhone } from 'src/api/profile'
import profileStore from 'src/stores/profileStore'

const props = defineProps<{
  phone: string
}>()
const emit = defineEmits(['update'])
const diabledBtn = ref(true)
const model = defineModel<boolean>({ default: false });

const { profile } = storeToRefs(profileStore())
const verify = async (vals: { kod: string }) => {
  try {
    await verifyPhone(`+7${props.phone}`, vals.kod)
    if (profile.value)
      await profileStore().update({
        first_name: profile.value.first_name ?? '',
        last_name: profile.value.last_name ?? '',
        patronymic: profile.value.patronymic ?? '',
        birthday: profile.value.birthday ?? '',
        phone: `+7${props.phone}`,
      })
    emit('update')
  } catch (e) {
    throw e
  }
}
function close() {
  model.value = false;
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
