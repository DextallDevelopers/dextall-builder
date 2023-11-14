<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const elevationsList = computed(() => {
  if (story.value.content?.elevations) {
    return story.value.content.elevations[0]
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
    v-if="elevationsList"
    v-editable="elevationsList"
    class="section section--pb drawings"
  >
    <div class="container drawings__wrapper">
      <h2 class="drawings__title">Elevations/scope</h2>
      <div class="drawings__line" />
      <div class="drawings__list">
        <div
          v-for="(elem, idx) in elevationsList.item"
          :key="idx"
          class="grid drawings__item"
        >
          <figure class="drawings__img-wrapper">
            <img
              class="drawings__img"
              :src="getImgSrc(elem.image.filename)"
              alt="Image"
            />
            <figcaption>{{ elem.image.name }}</figcaption>
          </figure>
          <div class="drawings__legend">
            <Color
              v-for="(color, index) in elem.legend"
              :key="index"
              v-editable="color"
              :text="color.text"
              :stroke="color.border.color"
              :background="color.background.color"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    v-else
    style="
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    Soon
  </div>
</template>
