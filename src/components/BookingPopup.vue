<template>
  <BaseModal  class="filter-modal  glass-w " v-model="value" y-pos="center" x-pos="left" animation="zoom">
      <div class=" tw-w-full tw-px-3">
        <div class="glass-w  !tw-rounded-32 tw-p-3 tw-pb-6 tw-grid tw-gap-4 tw-justify-items-center ">
          <button class="card-sheet__close tw-justify-self-end  glass" type="button" @click="close">

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4173 0.750072L0.75 12.4173M12.4173 12.4173L0.75 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
          <div class=" h3 tw-text-white">
            Заявка отправлена 💌
          </div>
          <div class=" p2 tw-text-center tw-text-white">
            Мы уже всё получили. В ближайшее время с вами свяжется менеджер
                из нашей команды.
          </div>
          <BaseButton class=" !tw-w-fit" @click=" router.push({name: 'home'})">
            На главную
          </BaseButton>
        </div>

      </div>


  </BaseModal>


</template>

<script setup lang="ts">
import BaseModal from 'src/components/Base/Modal.vue';
import { useRouter } from 'vue-router';
const router = useRouter()



const value = defineModel<boolean>({ default: false });
function close() {
    value.value = false;
  }
</script>
