<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const drawingsTab = computed(() => {
  if (story.value.content?.scope_of_work_tab) {
    return story.value.content.scope_of_work_tab[0]
  }
  return null
})

const getImgSrc = (img: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size: '1920x0' })
}
</script>

<template>
  <section
    v-if="drawingsTab"
    v-editable="drawingsTab"
    class="section section--pb drawings"
  >
    <div class="container drawings__wrapper">
      <div class="drawings__img-block">
        <h2 v-if="drawingsTab.title" class="drawings__title">
          {{ drawingsTab.title }}
        </h2>
        <p v-if="drawingsTab.description" class="drawings__desc">
          {{ drawingsTab.description }}
        </p>
        <ul v-if="drawingsTab.images.length" class="drawings__img-list">
          <li
            v-for="(elem, idx) in drawingsTab.images"
            :key="idx"
            class="drawings__img-li"
          >
            <img
              class="drawings__img"
              :src="getImgSrc(elem.filename)"
              alt="Image"
            />
            <p v-if="elem.name" class="drawings__img-desc">{{ elem.name }}</p>
          </li>
        </ul>
      </div>
      <div v-if="drawingsTab.drawings.length" class="drawings__elevation">
        <div
          v-if="
            drawingsTab.drawings.length >= 3 && drawingsTab.drawings.length < 5
          "
          class="drawings__lines-wrapper"
        >
          <div class="drawings__line"></div>
          <div class="drawings__line"></div>
        </div>
        <ul class="grid drawings__elevation-list">
          <li
            v-for="(elem, idx) in drawingsTab.drawings"
            :key="idx"
            class="drawings__elevation-li"
          >
            <h3 v-if="elem.name" class="drawings__elevation-title">
              {{ elem.name }}
            </h3>
            <img
              class="drawings__elevation-img"
              :src="getImgSrc(elem.filename)"
              alt="Image"
            />
          </li>
        </ul>
      </div>
      <ul v-if="drawingsTab.legend.length" class="drawings__colors-list">
        <Color
          v-for="(color, idx) in drawingsTab.legend"
          :key="idx"
          v-editable="color"
          :text="color.text"
          :stroke="color.border.color"
          :background="color.background.color"
        />
      </ul>
    </div>
  </section>
</template>
