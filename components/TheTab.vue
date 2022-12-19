<template>
  <div class="tab" :class="[isOpen && 'tab--open']">
    <div class="tab__backdrop" @click="close"></div>
    <div class="tab__content">
      <div class="tab__line-wrapper">
        <div class="tab__line"></div>
      </div>
      <div class="container tab__window">
        <button class="tab__close-btn" @click="close">
          <span class="tab__btn-line"></span>
          <span class="tab__btn-line"></span>
        </button>
        <div class="tab__top">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isOpen, close } = useTab()
</script>
