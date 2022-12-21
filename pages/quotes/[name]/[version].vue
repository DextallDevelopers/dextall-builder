<script setup lang="ts">
import { useTransition } from '~/composables/transition'
import { useQoutesStories } from '~/composables/stories/quotes'
useTransition()

const { isAuth, isLoaded } = useAppState()

const route = useRoute()

const { name, version } = route.params

const getStories = async () => {
  const { stories } = await useQoutesStories(name as string)
  return stories
}

getStories().then(data => {
  console.log(data.value)
})
// // listenStory(slug)

// console.log(stories)

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
    <Main />
    <ImagesList />
    <Projects />
    <News />
    <Contacts />
  </div>
  <Login v-else />
</template>
