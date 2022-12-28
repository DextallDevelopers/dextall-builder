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
  <section class="section section--pb included">
    <div class="container grid included__wrapper">
      <div class="included__left-block">
        <h2 class="included__title">included:</h2>
        <p class="included__desc">
          {{ story.content.whats_included_tab[0].included_description }}
        </p>
        <ul class="included__list">
          <li
            v-for="(el, idx) in story.content.whats_included_tab[0].included"
            :key="idx"
            class="included__li"
          >
            <div class="include__line"></div>
            <p class="include__text">{{ el }}</p>
            <div
              v-if="
                idx === story.content.whats_included_tab[0].included.length - 1
              "
              class="include__line"
            ></div>
          </li>
        </ul>
      </div>
      <div class="included__right-block">
        <h2 class="included__title">not included:</h2>
        <p class="included__desc">
          {{ story.content.whats_included_tab[0].not_included_description }}
        </p>
        <ul class="included__list">
          <li
            v-for="(el, idx) in story.content.whats_included_tab[0]
              .not_included"
            :key="idx"
            class="included__li"
          >
            <div class="include__line"></div>
            <p class="include__text">{{ el }}</p>
            <div
              v-if="
                idx ===
                story.content.whats_included_tab[0].not_included.length - 1
              "
              class="include__line"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
