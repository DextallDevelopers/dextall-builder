<script setup lang="ts">
const emit = defineEmits(['open'])

const open = () => {
  emit('open')
}
</script>

<template>
  <button class="button" @click="open">
    <span>
      <slot />
    </span>
  </button>
</template>
