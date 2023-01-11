<script setup lang="ts">
import { arch } from 'os'
import { useQoutesStories } from '~/composables/stories/quotes'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const includedTab = computed(() => {
  if (story.value.content?.whats_included_tab) {
    return story.value.content.whats_included_tab[0]
  }
  return null
})
</script>

<template>
  <section v-if="includedTab" class="section section--pb included">
    <div class="container grid included__wrapper">
      <div class="included__left-block">
        <h2 class="included__title">included:</h2>
        <p v-if="includedTab.included_description" class="included__desc">
          {{ includedTab.included_description }}
        </p>
        <ul v-if="includedTab.included.length" class="included__list">
          <li
            v-for="(el, idx) in includedTab.included"
            :key="idx"
            class="included__li"
          >
            <div class="include__line"></div>
            <p class="include__text">{{ el }}</p>
            <div
              v-if="idx === includedTab.included.length - 1"
              class="include__line"
            ></div>
          </li>
        </ul>
      </div>
      <div class="included__right-block">
        <h2 class="included__title">not included:</h2>
        <p v-if="includedTab.not_included_description" class="included__desc">
          {{ includedTab.not_included_description }}
        </p>
        <ul v-if="includedTab.not_included.length" class="included__list">
          <li
            v-for="(el, idx) in includedTab.not_included"
            :key="idx"
            class="included__li"
          >
            <div class="include__line"></div>
            <p class="include__text">{{ el }}</p>
            <div
              v-if="idx === includedTab.not_included.length - 1"
              class="include__line"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
