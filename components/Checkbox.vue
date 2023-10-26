<script setup lang="ts">
const isChecked = ref(false)

const emit = defineEmits(['check'])

watch(isChecked, () => {
  emit('check', isChecked)
})
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      id="cbx"
      v-model="isChecked"
      class="checkbox"
      type="checkbox"
      style="display: none"
    />
    <label class="cbx" for="cbx">
      <span class="checkbox__wave">
        <svg
          class="checkbox__svg"
          width="12px"
          height="10px"
          viewbox="0 0 12 10"
        >
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <slot />
    </label>
  </div>
</template>
