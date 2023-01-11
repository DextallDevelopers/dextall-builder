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

defineProps<iProps>()

const getImgSrc = (img: string, size?: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size })
}
</script>

<template>
  <section class="section section--pb simple-section">
    <div class="container simple-section__wrapper">
      <h2 class="simple-section__title">{{ body.content.title }}</h2>
      <h4 class="simple-section__subtitle">
        {{ body.content.subtitle }}
      </h4>
      <p class="simple-section__desc">
        {{ body.content.description }}
      </p>
      <img
        v-if="body.content.image.filename"
        class="simple-section__img"
        :src="getImgSrc(body.content.image.filename, '1920x1080')"
        alt="Image"
      />
    </div>
  </section>
</template>
