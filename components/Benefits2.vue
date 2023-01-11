<script setup lang="ts">
interface iItems {
  text: string
}

interface iProps {
  body: {
    content: {
      title: string
      items: iItems[]
    }
  }
}

const props = defineProps<iProps>()

const items = computed(() => {
  return props.body.content.items
})
</script>

<template>
  <section class="section section--pb benefits-2">
    <div class="container benefits-2__wrapper">
      <div class="benefits-2__title-wrapper">
        <h2 class="benefits-2__title">{{ body.content.title }}</h2>
      </div>
      <ul class="benefits-2__list">
        <li v-for="(item, idx) in items" :key="idx" class="benefits-2__li">
          <div class="benefits-2__line"></div>
          <p class="benefits-2__text">
            {{ item.text }}
          </p>
          <div v-if="idx === items.length - 1" class="benefits-2__line"></div>
        </li>
      </ul>
    </div>
  </section>
</template>
