<script lang="ts" setup>
interface iProps {
  isOpen: boolean
}

defineProps<iProps>()
const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
</script>

<template>
  <Popup :is-open="isOpen" @close="onClose">
    <div class="report-popup">
      <p class="report-popup__text">Coming soon</p>
    </div>
  </Popup>
</template>
