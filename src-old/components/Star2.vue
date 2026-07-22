<template>
  <svg
    v-if="active"
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_699_10570)">
      <path
        d="M28.5 46.6163L46.1138 56.0173L42.75 36.1054L57 22.0042L37.3064 19.0991L28.5 0.982819L19.6936 19.0991L0 22.0042L14.25 36.1054L10.8862 56.0173L28.5 46.6163Z"
        fill="#C6D9F1"
      />
    </g>
    <defs>
      <clipPath id="clip0_699_10570">
        <rect width="57" height="57" fill="white" />
      </clipPath>
    </defs>
  </svg>

  <svg
    v-else
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_699_10569)">
      <path
        d="M28.5 46.6163L46.1138 56.0173L42.75 36.1054L57 22.0042L37.3064 19.0991L28.5 0.982849L19.6936 19.0991L0 22.0042L14.25 36.1054L10.8862 56.0173L28.5 46.6163Z"
        fill="#E5EEF9"
      />
    </g>
    <defs>
      <clipPath id="clip0_699_10569">
        <rect width="57" height="57" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  }
)
</script>
<style lang="scss" scoped></style>
