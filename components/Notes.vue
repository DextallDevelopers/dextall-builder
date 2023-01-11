<script setup lang="ts">
interface iProps {
  body: {
    content: {
      title: string
      description: string
      button_link: string
    }
  }
}

defineProps<iProps>()
</script>

<template>
  <section class="section section--pb notes">
    <div class="container notes__wrapper">
      <div class="notes__line"></div>
      <div class="notes__main-block">
        <h3 class="notes__title">
          {{ body.content.title }}
        </h3>
        <p class="notes__desc">
          {{ body.content.description }}
        </p>
        <CircleButton class="notes__btn">
          {{ body.content.button_link }}
        </CircleButton>
      </div>
      <div class="notes__line"></div>
    </div>
  </section>
</template>
