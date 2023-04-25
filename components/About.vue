<script lang="ts" setup>
import { useComponentsStories } from '~/composables/stories/components'

const route = useRoute()
const { name } = route.params

const { stories } = await useComponentsStories(name as string)

const getComponent = (name: string) => {
  const storyComponent = stories.value.find(story => story.name === name)
  return {
    data: storyComponent,
    _uid: storyComponent.uuid,
    component: storyComponent.content.component,
  }
}

// const ourMissionComponent = computed(() => {
//   return getComponent('Our Mission')
// })

// const approachComponent = computed(() => {
//   return getComponent('Approach')
// })

const numbersComponent = computed(() => {
  return getComponent('numbers')
})
</script>

<template>
  <div class="about">
    <Blok :body="[numbersComponent]" />
  </div>
</template>
