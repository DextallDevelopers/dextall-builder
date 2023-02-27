<script setup lang="ts">
import { ToastColor } from '~/composables/toasts'

import { useTransition } from '~/composables/transition'
import { useQoutesStories } from '~/composables/stories/quotes'
useTransition()

const { isAuth, isLoaded, isInEditor } = useAppState()
const { addToast } = useToasts()

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

watch(isInEditor, () => {
  if (isInEditor.value) {
    isAuth.value = true
    isLoaded.value = true
  }
})

onMounted(() => {
  if (isInEditor.value) {
    isAuth.value = true
    isLoaded.value = true
    return
  }
  const isAuthData = localStorage.getItem('isAuth')
  const userData = JSON.parse(localStorage.getItem('user') || '[]')
  const authTimestamp = JSON.parse(localStorage.getItem('authTimestamp'))

  isLoaded.value = true

  if (isAuthData !== 'true') {
    return
  }
  const sevenDays = 1000 * 60 * 60 * 24 * 7

  if (Date.now() > +authTimestamp + sevenDays) {
    localStorage.setItem('isAuth', 'false')
    localStorage.removeItem('userData')
    localStorage.removeItem('authTimestamp')
    return
  }

  isAuth.value = true
  addToast({
    color: ToastColor.success,
    id: Date.now().toString(),
    text: `Welcome back, ${userData.Name}`,
  })
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ story?.content?.title }}</Title>
      <Meta name="description" :content="story?.content?.scope" />
    </Head>
    <Loader v-if="!isLoaded" />
    <div v-else-if="!isAuth && isLoaded" data-page>
      <Main
        v-editable="story.content"
        :story="story.content"
        :address="story.content.address"
        :title="story.content.title"
        :scope="story.content.scope"
        :start-quote-date="story.content.start_quote_date"
        :end-quote-date="story.content.end_quote_date"
        :model="story.content.model"
      />
      <ImagesList />
      <Projects v-if="story.content.show_projects" />
      <News v-if="story.content.show_news" />
      <Contacts />
    </div>
    <Login
      v-else
      :title="story.content.title"
      :version="story.name"
      :start-quote-date="story.content.start_quote_date"
      :end-quote-date="story.content.end_quote_date"
    />
  </div>
</template>
