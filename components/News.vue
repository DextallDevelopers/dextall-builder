<script setup lang="ts">
import { iStories } from '~/types/story'
const config = useRuntimeConfig()

const URL = `https://api.storyblok.com/v2/cdn/stories/?by_slugs=news/*&per_page=3&version=draft&token=${config.DEXTALL_STORYBLOK_TOKEN}&cv=1671800179`

const { data: storiesData } = await useFetch<iStories>(URL)

const news = computed(() => {
  return storiesData.value.stories
})

console.log(news.value)
</script>

<template>
  <section v-if="news.length" class="section section--pb news">
    <div class="container news__wrapper">
      <div class="news__title-wrapper">
        <h2 class="news__title">Latest news</h2>
      </div>
      <div class="cards-wrapper">
        <ul class="cards">
          <NewsCard
            v-for="(item, idx) in news"
            :key="item._uid"
            :idx="idx"
            :title="item.name"
            :date="item.first_published_at || item.created_at"
            :img="item?.content?.big_image?.filename"
            class="news__cards"
            :slug="item.full_slug"
          />
        </ul>
      </div>
    </div>
  </section>
</template>
