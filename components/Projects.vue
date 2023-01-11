<script setup lang="ts">
import { iStories } from '~/types/story'
const config = useRuntimeConfig()

const URL = `https://api.storyblok.com/v2/cdn/stories/?by_slugs=projects/*&sort_by=content.order:asc&per_page=5&version=draft&token=${config.DEXTALL_STORYBLOK_TOKEN}&cv=1671800179`

const { data: storiesData } = await useFetch<iStories>(URL)

const projects = computed(() => {
  return storiesData.value.stories
})

const getImgSrc = (img: string, size?: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size })
}
</script>

<template>
  <section
    v-if="projects.length"
    id="projects"
    class="section section--pb projects"
  >
    <div class="container projects__wrapper">
      <h2 class="projects__title">Latest projects</h2>
      <ul class="projects__list">
        <li
          v-for="(project, idx) in projects"
          :key="project._uid"
          class="projects__li"
        >
          <a
            :href="`https://www.dextall.com/${project.full_slug}`"
            class="projects__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p class="projects__number">0{{ idx + 1 }}</p>
            <div class="projects__img-wrapper">
              <img
                class="projects__img"
                :src="
                  getImgSrc(
                    project.content.Screen_1[0].main_image.filename,
                    '600x600'
                  )
                "
                alt="Image"
              />
            </div>
            <p class="projects__desc">
              {{ project.content.Screen_1[0].project_name }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
