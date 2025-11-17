<template>
  <transition name="preloader-fade">
    <div v-if="modelValue" class="preloader">
      <div class="preloader__content">
        <div class="preloader__places-container">
          <div class="preloader__places">
            <!-- Слайды с местами -->
            <div
              v-for="(place, index) in places"
              :key="index"
              ref="placeRefs"
              class="preloader__place"
            >
              <img :src="place.image" alt="" />
              <!-- один лейбл с переносом строки, поэтому v-html -->
              <p class="preloader__place__label" v-html="place.label"></p>
            </div>

            <!-- Воздушный "фон" как в исходнике -->
            <div class="preloader__place air"></div>
          </div>
        </div>

        <div class="preloader__airline">
          <div class="preloader__airline__line"></div>
          <div class="preloader__airline__line-filler" ref="lineFiller"></div>
          <img
            class="preloader__airline__plane"
            ref="plane"
            src="/plane.svg"
            alt="Самолет"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { LocalStorage } from 'quasar'
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  /**
   * v-model: показывать/прятать прелоадер
   */
  modelValue: {
    type: Boolean,
    default: true,
  },
  /**
   * За сколько миллисекунд проходит вся анимация прогресса
   * (в оригинале 4500)
   */
  duration: {
    type: Number,
    default: 4500,
  },
  /**
   * Автоматически скрывать прелоадер после завершения анимации
   */
  autoClose: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'finished'])

const lineFiller = ref(null)
const plane = ref(null)
const placeRefs = ref([])

/**
 * Данные слайдов (те же картинки и подписи, что в исходнике)
 */
const places = [
  {
    image: '/preload1.png',
    label: 'Китай',
  },
  {
    image: '/preload2.png',
    label: 'ЮАР',
  },
  {
    image: '/preload3.png',
    label: 'Намибия',
  },
  {
    image: '/preload4.png',
    label: 'Япония',
  },
  {
    image: '/preload5.png',
    label: 'Камчатка',
  },
  {
    image: '/preload6.png',
    label: 'Кольский',
  },
  {
    image: '/preload7.png',
    label: 'Мальдивы',
  },
]

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function startPreloaderAnimation() {
  const ANIMATION_DURATION = props.duration
  const AFTER_ANIMATION_WAIT_DURATION = 500

  const line = lineFiller.value
  const planeEl = plane.value
  const items = placeRefs.value || []

  if (!line || !planeEl || !items.length) return

  const stepsCount = items.length / 2
  const stepDuration = ANIMATION_DURATION / stepsCount

  line.style.transition = `width ${ANIMATION_DURATION / 500}s linear`
  planeEl.style.transition = `left ${ANIMATION_DURATION / 500}s linear`

  // небольшая задержка как в исходнике
  await pause(stepDuration)

  line.style.width = '100%'
  planeEl.style.left = '100%'

  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('illum-show')
    await pause(stepDuration)
    if (i !== items.length - 1) {
      items[i].classList.add('illum-hide')
    }
  }

  await pause(AFTER_ANIMATION_WAIT_DURATION)

  emit('finished')
  LocalStorage.setItem('preloader', 'true')
  if (props.autoClose) {
    emit('update:modelValue', false)
  }
}

/**
 * Блокировка скролла, как в оригинальном скрипте
 */
function lockScroll() {
  if (typeof document === 'undefined') return
  document.body.style.overflow = 'hidden'
  window.scrollTo(0, 0)
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}

function unlockScroll() {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
}

onMounted(async () => {
  if (!props.modelValue) return
  lockScroll()
  await nextTick()
  startPreloaderAnimation()
})

watch(
  () => props.modelValue,
  async (value) => {
    if (value) {
      // при повторном показе перезапускаем анимацию
      lockScroll()

      // сбрасываем состояния элементов
      const items = placeRefs.value || []
      const line = lineFiller.value
      const planeEl = plane.value

      items.forEach((el) => {
        el.classList.remove('illum-show', 'illum-hide')
      })

      if (line) {
        line.style.transition = ''
        line.style.width = '0%'
      }
      if (planeEl) {
        planeEl.style.transition = ''
        planeEl.style.left = '0%'
      }

      await nextTick()
      startPreloaderAnimation()
    } else {
      unlockScroll()
    }
  }
)

onBeforeUnmount(() => {
  unlockScroll()
})
</script>

<style scoped>
@keyframes illum_show {
  0% {
    opacity: 0;
    left: -200%;
  }

  100% {
    opacity: 1;
    left: 0;
  }
}

@keyframes illum_hide {
  0% {
    opacity: 1;
    left: 0;
  }

  100% {
    opacity: 0;
    left: 200%;
  }
}

.preloader {
  min-height: 550px;
  height: 100vh;
  background-position: center bottom;
  background-attachment: scroll;
  background-image: url('/space.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
}

.preloader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
}

.preloader__places-container {
  width: 197px;
  height: 279px;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 90px;
  border: 18px solid #dddddd;
  display: flex;
  position: relative;
}

.preloader__places {
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
}

.preloader__place {
  position: absolute;
  left: -200%;
  opacity: 0;
  height: 100%;
  min-width: 100%;
  background-size: cover;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 60px;
  z-index: 10;
}

.preloader__place.air {
  backdrop-filter: blur(30px);
  left: 0;
  opacity: 1;
  z-index: -1;
}

.preloader__place.illum-show {
  animation: illum_show 0.8s ease-in-out forwards;
}

.preloader__place.illum-hide {
  animation: illum_hide 0.8s ease-in-out forwards;
}

.preloader__place__bg {
  width: 100%;
}

.preloader__place img {
  width: 100%;
  height: 100%;
  border-radius: 70px;
}

.preloader__place__label {
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;

  position: relative;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 45px;
}

.preloader__airline {
  position: relative;
  width: 343px;
}

.preloader__airline__line,
.preloader__airline__line-filler {
  background-color: #e5ebee;
  height: 4px;
  top: calc(50% - 2px);
  border-radius: 10px;
  position: absolute;
  width: 100%;
}

.preloader__airline__line-filler {
  width: 0%;
  background-color: white;
}

.preloader__airline__plane {
  position: relative;
  z-index: 10;
  left: 0%;
  top: 1.5px;
}

@media (max-width: 480px) {
  .preloader__airline {
    position: relative;
    width: 300px;
  }
}

/* лёгкий fade для появления/исчезновения через <transition> */
.preloader-fade-enter-active,
.preloader-fade-leave-active {
  transition: opacity 0.3s ease;
}
.preloader-fade-enter-from,
.preloader-fade-leave-to {
  opacity: 0;
}
</style>
