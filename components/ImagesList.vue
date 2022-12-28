<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)
</script>

<template>
  <section class="section section--pb images-list">
    <div class="container images-list__wrapper">
      <ul class="images-list__list">
        <li
          v-for="(img, idx) in story.content.images"
          :key="idx"
          class="images-list__li"
        >
          <img class="images-list__img" :src="img.filename" alt="Image" />
          <p v-if="img.name" class="images-list__desc">{{ img.name }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
