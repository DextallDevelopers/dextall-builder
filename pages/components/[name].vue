<template>
  <div class="component-preview" :style="`--th: ${height}px`">
    <Blok :body="component" />
  </div>
</template>

<script setup lang="ts">
import { iBlokBody } from '~/types/story'
import { useComponentsStories } from '~/composables/stories/components'

const route = useRoute()
const height = ref(0)

const { name } = route.params

const { story, listenStory } = await useComponentsStories(name as string)

listenStory(name)

const component = computed((): iBlokBody[] => {
  return [
    {
      data: story.value,
      _uid: story.value.uuid,
      component: story.value.content.component,
    },
  ]
})

onMounted(() => {
  height.value = window.innerHeight
})
</script>
