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
  <section class="section section--pb drawings">
    <div class="container drawings__wrapper">
      <div class="drawings__img-block">
        <h2 class="drawings__title">
          {{ story.content.scope_of_work_tab[0].title }}
        </h2>
        <p class="drawings__desc">
          {{ story.content.scope_of_work_tab[0].description }}
        </p>
        <ul class="grid drawings__img-list">
          <li
            v-for="(elem, idx) in story.content.scope_of_work_tab[0].images"
            :key="idx"
            class="drawings__img-li"
          >
            <img class="drawings__img" :src="elem.filename" alt="Image" />
            <p class="drawings__img-desc">{{ elem.name }}</p>
          </li>
        </ul>
      </div>
      <div class="drawings__elevation">
        <div
          v-if="
            story.content.scope_of_work_tab[0].drawings.length >= 3 &&
            story.content.scope_of_work_tab[0].drawings.length < 5
          "
          class="drawings__lines-wrapper"
        >
          <div class="drawings__line"></div>
          <div class="drawings__line"></div>
        </div>
        <ul class="grid drawings__elevation-list">
          <li
            v-for="(elem, idx) in story.content.scope_of_work_tab[0].drawings"
            :key="idx"
            class="drawings__elevation-li"
          >
            <h3 class="drawings__elevation-title">{{ elem.name }}</h3>
            <img
              class="drawings__elevation-img"
              :src="elem.filename"
              alt="Image"
            />
          </li>
        </ul>
      </div>
      <ul class="drawings__colors-list">
        <Color
          v-for="(color, idx) in story.content.scope_of_work_tab[0].legend"
          :key="idx"
          :text="color.text"
          :stroke="color.border.color"
          :background="color.background.color"
        />
      </ul>
    </div>
  </section>
</template>
