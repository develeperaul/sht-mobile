<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="popup" v-if="model">
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
              <div class="h2 tw-text-center">Подтвердите почту</div>
              <div class="p1 tw-text-center">
                Введите код из почтового ящика <br />
                {{ mail }}
              </div>
              <code-input
                class="tw-flex tw-justify-center"
                @filled="diabledBtn = false"
                @unfilled="diabledBtn = true"
              />
              <div class="tw-mb-6 tw-mt-6">
                <div class="p1">
                  Если не пришло письмо, проверьте папку «Спам»
                </div>
                <div class="link p2 tw-text-center">Не получили код?</div>
              </div>
              <BaseButton :disabled="diabledBtn"> Отправить </BaseButton>
            </Form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { verifyEmail } from 'src/api/profile'
import profileStore from 'src/stores/profileStore'

const props = defineProps<{
  mail: string
}>()
const emit = defineEmits(['update'])
const diabledBtn = ref(true)
const model = defineModel()
const { profile } = storeToRefs(profileStore())
const verify = async (vals: { kod: string }) => {
  try {
    await verifyEmail(props.mail, vals.kod)
    if (profile.value)
      await profileStore().update({
        first_name: profile.value.first_name ?? '',
        last_name: profile.value.last_name ?? '',
        patronymic: profile.value.patronymic ?? '',
        birthday: profile.value.birthday ?? '',
        phone: profile.value.phone ?? '',
        email: props.mail,
      })

    emit('update')
  } catch (e) {
    throw e
  }
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
