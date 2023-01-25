<script lang="ts" setup>
interface iProps {
  isOpen: boolean
}

defineProps<iProps>()
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <section class="popup" :class="[isOpen && 'opened']">
    <div class="popup__backdrop" @click="close"></div>
    <div class="popup__wrapper">
      <button class="popup__close-btn" @click="close">
        <span class="popup__btn-line"></span>
        <span class="popup__btn-line"></span>
      </button>
      <slot />
    </div>
  </section>
</template>
