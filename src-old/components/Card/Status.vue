<template>
  <div class="card-status">
    <div class="p1">Внесите остаток стоимости</div>
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="-3" y="-3" width="50" height="50"
        ><div
          xmlns="http://www.w3.org/1999/xhtml"
          style="
            backdrop-filter: blur(1.5px);
            clip-path: url(#bgblur_0_616_7599_clip_path);
            height: 100%;
            width: 100%;
          "
        ></div
      ></foreignObject>
      <g data-figma-bg-blur-radius="3">
        <rect
          y="44"
          width="44"
          height="44"
          rx="22"
          transform="rotate(-90 0 44)"
          fill="#E9FF5E"
        />
        <path
          d="M19.7984 15.4004L26.3984 22.0004L19.7984 28.6004"
          stroke="#161616"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="bgblur_0_616_7599_clip_path" transform="translate(3 3)">
          <rect
            y="44"
            width="44"
            height="44"
            rx="22"
            transform="rotate(-90 0 44)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.card-status {
  @apply tw-p-3 tw-bg-white tw-flex tw-justify-between tw-items-center;
  border-radius: 24px;
}
</style>
