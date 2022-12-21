<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useQoutesStories } from '~/composables/stories/quotes'
useTransition()

const { isAuth, isLoaded } = useAppState()

const route = useRoute()

const { name, version } = route.params
const { stories, story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

console.log(stories.value)

listenStory(version)

onMounted(() => {
  const isAuthData = localStorage.getItem('isAuth')

  if (isAuthData === 'true') {
    isAuth.value = true
  }
  isLoaded.value = true
})
</script>

<template>
  <Loader v-if="!isLoaded" />
  <div v-else-if="isAuth && isLoaded" data-page>
    <Main
      :address="story.content.address"
      :title="story.content.title"
      :scope="story.content.scope"
      :start-quote-date="story.content.start_quote_date"
      :end-quote-date="story.content.end_quote_date"
    />
    <ImagesList />
    <Projects />
    <News />
    <Contacts />
  </div>
  <Login
    v-else
    :title="story.content.title"
    :start-quote-date="story.content.start_quote_date"
    :end-quote-date="story.content.end_quote_date"
  />
</template>
