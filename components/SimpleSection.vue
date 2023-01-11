<script setup lang="ts">
interface iProps {
  body: {
    content: {
      title: string
      subtitle: string
      description: string
      image: {
        filename: string
      }
    }
  }
}

const props = defineProps<iProps>()
</script>

<template>
  <section class="section section--pb simple-section">
    <div class="container simple-section__wrapper">
      <h2 class="simple-section__title">{{ props.body.content.title }}</h2>
      <h4 class="simple-section__subtitle">
        {{ props.body.content.subtitle }}
      </h4>
      <p class="simple-section__desc">
        {{ props.body.content.description }}
      </p>
      <img
        v-if="props.body.content.image.filename"
        class="simple-section__img"
        :src="props.body.content.image.filename"
        alt="Image"
      />
    </div>
  </section>
</template>
