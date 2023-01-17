<script setup lang="ts">
import { iStories } from '~/types/story'
const config = useRuntimeConfig()

const storiesData = ref<iStories>(null)

const URL = `https://api.storyblok.com/v2/cdn/stories/?by_slugs=news/*&per_page=3&version=draft&token=${config.DEXTALL_STORYBLOK_TOKEN}&cv=1671800179`

// const { data: storiesData } = await useFetch<iStories>(URL)

const res = await fetch(URL).then(res => res.json())

storiesData.value = res

const news = computed(() => {
  return storiesData.value.stories
})

const $el = ref(null)

onMounted(async () => {
  const $cards = document.querySelectorAll(
    '.cards__item'
  ) as NodeListOf<HTMLElement>
  const $title = document.querySelector('.news__title')

  // Constants
  const OFFSET = 20

  const { marginBottom } = getComputedStyle($cards[0])
  const { height } = $title.getBoundingClientRect()
  let margin = parseInt(marginBottom, 10)

  $cards.forEach((card, index) => {
    card.style.top = `${index * OFFSET + height + 60}px`
    card.style.marginBottom = `${margin}px`
    margin -= OFFSET
  })
})
</script>

<template>
  <section v-if="news.length" ref="$el" class="section section--pb news">
    <div class="container news__wrapper">
      <div class="news__content">
        <h2 class="news__title">Latest news</h2>

        <div class="cards-wrapper">
          <ul class="cards">
            <li
              v-for="(item, idx) in news"
              :key="item._uid"
              class="cards__item"
            >
              <NewsCard
                :idx="idx"
                :title="item.name"
                :date="item.first_published_at || item.created_at"
                :img="item?.content?.big_image?.filename"
                :slug="item.full_slug"
              />
            </li>
          </ul>
        </div>
      </div>
      <div>dsa</div>
    </div>
  </section>
</template>
