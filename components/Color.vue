<script setup lang="ts">
interface iProps {
  text: string
  stroke: string
  background: string
}
defineProps<iProps>()
</script>

<template>
  <div class="color-change">
    <div
      class="color-change__background"
      :style="{ borderColor: stroke, backgroundColor: background }"
    ></div>
    <p class="color-change__text">— {{ text }}</p>
  </div>
</template>
