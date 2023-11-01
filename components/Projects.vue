<script setup lang="ts">
import { iStories } from '~/types/story'
const config = useRuntimeConfig()
const storiesData = ref<iStories>(null)

const URL = `https://api.storyblok.com/v2/cdn/stories/?by_slugs=projects/*&sort_by=content.order:asc&per_page=5&version=draft&token=${config.DEXTALL_STORYBLOK_TOKEN}&cv=1671800179`

const res = await fetch(URL).then(res => res.json())

storiesData.value = res

const projects = computed(() => {
  return storiesData.value.stories
})

const getImgSrc = (img: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size: '1200x1000', region: 'eu' })
}

const specs = computed(() => {
  return projects.value.map(story => {
    return story.content.Screen_4[0].object_specifications.slice(0, 3)
  })
})
</script>

<template>
  <section
    v-if="projects.length"
    id="projects"
    class="section section--pb projects"
  >
    <div class="container projects__wrapper">
      <h2 class="projects__title">Latest projects</h2>
      <div class="projects__main-line" />
      <ul class="projects__list">
        <li
          v-for="(project, i) in projects"
          :key="project._uid"
          class="projects__li"
        >
          <a
            :href="`https://www.dextall.com/${project.full_slug}`"
            class="projects__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div class="projects__top-wrapper">
              <div class="projects__img-wrapper">
                <img
                  class="projects__img"
                  :src="
                    getImgSrc(project.content.Screen_1[0].main_image.filename)
                  "
                  alt="Image"
                />
              </div>
              <h4 class="projects__title">
                {{ project.content.Screen_1[0].project_name }}
              </h4>
              <p
                v-if="project.content.Screen_1[0].project_description"
                class="projects__desc"
              >
                {{ project.content.Screen_1[0].project_description }}
              </p>
            </div>
            <div class="projects__bottom-wrapper">
              <ul class="projects__info">
                <li
                  v-for="(el, idx) in specs[i]"
                  :key="idx"
                  class="projects__info-wrapper"
                >
                  <div class="projects__line" />
                  <div class="projects__info-content">
                    <p class="projects__text">{{ el.specification_name }}</p>
                    <p class="projects__quantity">{{ el.specification }}</p>
                  </div>
                  <div
                    v-if="idx === specs[i].length - 1"
                    class="projects__line"
                  />
                </li>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
