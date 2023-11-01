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

console.log(projects.value)
</script>

<template>
  <section
    v-if="projects.length"
    id="projects"
    class="section section--pb projects"
  >
    <div class="container projects__wrapper">
      <h2 class="projects__title">Latest projects</h2>
      <div class="projects__line" />
      <ul class="projects__list">
        <li
          v-for="project in projects"
          :key="project._uid"
          class="projects__li"
        >
          <a
            :href="`https://www.dextall.com/${project.full_slug}`"
            class="projects__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div class="projects__img-wrapper">
              <img
                class="projects__img"
                :src="project.content.Screen_1[0].main_image.filename"
                alt="Image"
              />
            </div>
            <p class="projects__name">
              {{ project.content.Screen_1[0].project_name }}
            </p>
            <p class="projects__desc">
              {{ project.content.Screen_1[0].project_description }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
