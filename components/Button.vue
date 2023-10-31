<script setup lang="ts">
const emit = defineEmits(['open'])

const onClick = () => {
  emit('open')
}
</script>

<template>
  <button class="button" @click="onClick">
    <span>
      <slot />
    </span>
  </button>
</template>
