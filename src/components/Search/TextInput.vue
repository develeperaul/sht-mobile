<template>
  <div class="text-inp glass" :class="[ `text-inp--${color}`, { 'is-link': isLink } ]">
    <span class="search-icon">
      <BaseIcon name="search" fit />
    </span>
    <div v-if="isLink" class="inp-mock">Куда отправимся?</div>
    <input v-else ref="inputRef" class="inp" name="search" type="text" autocomplete="off" placeholder="Куда отправимся?" v-model="value" />
    <button v-if="!isLink" class="clear" type="button" @click="value = ''">
      <BaseIcon name="close" fit />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      isLink?: boolean,
      autoFocus?: boolean,
      color?: 'blue' | 'white',
    }>(), {
      isLink: false,
      color: 'blue',
    }
  );

  const value = defineModel<string>({ required: true });

  const inputRef = ref<HTMLInputElement | null>(null);

  onMounted(() => {
    if(props.autoFocus && inputRef.value) {
      inputRef.value.focus();
    }
  });
</script>

<style scoped lang="scss">
  .is-link {
    &.text-inp {
      cursor: pointer !important;
    }
  }

  .search-icon {
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    z-index: 1;
    top: 19px;
    left: 12px;
  }

  .text-inp {
    position: relative;
    --radius: 24px;
    --b-color: rgba(255, 255, 255, 0.8);
    --bg-color: rgba(255, 255, 255, 0.5);

    &--white {
      .search-icon {
        @apply tw-text-white;
      }

      .inp-mock, .inp {
        @apply tw-text-white;
      }

      .inp {
        &::placeholder {
          @apply tw-text-white;
        }
      }
    }

    &--blue {
      .search-icon {
        @apply tw-text-blue_icon2;
      }

      .inp-mock, .inp {
        @apply tw-text-gray_main;
      }

      .inp {
        &::placeholder {
          @apply tw-text-gray_main;
        }
      }
    }
  }

  .inp-mock, .inp {
    background: none;
    width: 100%;
    height: 60px;
    padding-left: 48px;
    padding-right: 36px;
    font-size: 14px;
    line-height: 1;
  }

  .inp-mock {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .inp {
    display: block;
    outline: none;
  }

  .clear {
    display: block;
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 16px;
    width: 20px;
    height: 20px;
    @apply tw-text-gray_icon;
  }
</style>
