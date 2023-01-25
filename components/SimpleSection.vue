<script setup lang="ts">
interface iImage {
  filename: string
}

interface iProps {
  body: {
    content: {
      title: string
      subtitle: string
      description: string
      images: iImage[]
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

      <ul
        v-if="body.content.images?.length"
        class="simple-section__images-wrapper"
      >
        <li
          v-for="img in body.content.images"
          :key="img.filename"
          class="simple-section__li"
        >
          <img
            class="simple-section__img"
            :src="getImgSrc(img.filename, '700x700')"
            alt="Image"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
