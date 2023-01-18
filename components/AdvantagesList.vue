<script setup lang="ts">
import { useStoryblokImage } from '~/composables/storyblokImage'

interface iItems {
  title_text: string
  text: string
}

interface iProps {
  body: {
    content: {
      title: string
      description: string
      items: iItems[]
      image: {
        filename: string
      }
    }
  }
}

const props = defineProps<iProps>()

const li = computed(() => {
  return props.body.content.items
})

const getImgSrc = (img: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size: '800x800' })
}
</script>

<template>
  <section class="section section--pb advantages">
    <div class="container advantages__wrapper">
      <h2 class="advantages__title">{{ body.content.title }}</h2>
      <div class="grid advantages__content-wrapper">
        <div class="advantages__left-block">
          <p class="advantages__text">
            {{ body.content.description }}
          </p>
          <ul class="advantages__list">
            <li v-for="(item, idx) in li" :key="idx" class="advantages__li">
              <div class="advantages__line"></div>
              <div class="grid advantages__text-wrapper">
                <p class="advantages__bold-text">
                  {{ item.title_text }}
                </p>
                <p class="advantages__italic-text">
                  {{ item.text }}
                </p>
              </div>
              <div v-if="idx + 1 === li.length" class="advantages__line"></div>
            </li>
          </ul>
        </div>
        <img
          class="advantages__img"
          :src="getImgSrc(body.content.image.filename)"
          alt="Image"
        />
      </div>
    </div>
  </section>
</template>
