<script setup lang="ts">
import { iStory } from '~~/types/story'
import { Ref } from 'nuxt/dist/app/compat/capi'

const storyapi = useStoryblokApi()
const stories: Ref<iStory[]> = ref([])

try {
  const { data } = await storyapi.get(`cdn/stories/?by_slugs=quotes/*`, {
    version: 'draft',
  })
  stories.value = data.stories
} catch (e) {
  console.log(e.message)
}

const isDev = computed(() => {
  return process.env.NODE_ENV === 'development'
})
</script>

<template>
  <div>
    <h1 class="home-thumb">
      Hello! You are on the service of commercial offers Dextall. Please ask
      your manager for a link to the current commercial offer and login to view
    </h1>
    <ul v-if="isDev && stories" class="stories-links">
      <li v-for="story in stories" :key="story.id" class="stories-link">
        <NuxtLink :to="'/' + story.full_slug">{{
          story?.content?.title + ' ' + story?.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
