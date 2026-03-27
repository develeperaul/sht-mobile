<template>
  <div @click="router.push(to)" class="card-upcoming":style="{ 'background-image': `url(${img})` }">
    <div class="card-upcoming__top">
      <div class="glass card-upcoming__status" v-show="statusNaming">
        {{statusNaming}}
      </div>
      <div @click.stop>

        <FavButton   size="34px" :itemId="to.params.uuid" style="box-shadow: 0px 0px 24px 0px #0000000D;" />
      </div>
    </div>

    <div class="card-upcoming__bottom">
      <div class="">
          <div
              class="card-upcoming__title tw-mb-0.5"

            >
            {{ name }}
          </div>
          <div class="p3 tw-text-white">
            {{ title }}
          </div>
          <div class="badges">


            <div class="badge badge-lg glass">{{ dates }}</div>
            <div class="badge badge-lg glass">
              {{ diff }}
              {{
                Number(diff) == 1
                  ? 'день'
                  : Number(diff) >= 2 && Number(diff) <= 4
                    ? 'дня'
                    : 'дней'
              }}
            </div>
          </div>
        </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import FavButton from 'src/components/Favourites/ButtonToggle.vue';
import { useStatus } from 'src/composition/statuslist'
import { useRouter } from 'vue-router'

const props = defineProps<{
  to: { name: string; params: { uuid: string } }
  title: string
  dates: string
  img: string
  name: string
  status:
    | 'fresh'
    | 'pending'
    | 'paid'
    | 'cancelled'
    | 'completed'
    | 'waiting_review'
  diff: string
}>()

const router = useRouter()

const { statusNaming } = useStatus(props.status)
</script>
<style lang="scss" scoped>
.card-upcoming {
  @apply tw-bg-white tw-grid tw-content-between tw-overflow-hidden tw-grid tw-p-5 ;
  border-radius: 32px;
  height: 220px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #00000033;

  &__top {
    @apply tw-flex tw-justify-between  ;
  }
  &__status {

    background: linear-gradient(90deg, #E9FF5E 0%, #EAF890 23.56%, #E7FF4F 48.56%, #EDFA98 78.85%, #E9FF5E 100%);
    height: 34px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    padding-inline: 12px;
    line-height: 18px;
    letter-spacing: -0.022em
  }
  &__title {
    @apply h2 tw-text-white;
  }
  &__bottom {

  }

}
</style>
