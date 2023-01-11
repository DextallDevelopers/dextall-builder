<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'
// import { parse } from 'html2pdfmake'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const { startFormattedDate, timeLeft, endFormattedDate } = useQuoteDate(
  story.value.content.start_quote_date,
  story.value.content.end_quote_date
)
</script>

<template>
  <div class="pdf">
    <div class="pdf__wrapper">
      <section class="section container pdf__section">
        <div class="pdf__date-wrapper">
          <div class="pdf__date">
            <p class="pdf__date-text">Date of the quote:</p>
            <p class="pdf__date-number">{{ startFormattedDate }}</p>
          </div>
          <div class="pdf__date">
            <p class="pdf__date-text">Time left before expiration:</p>
            <p class="pdf__date-number">
              {{ timeLeft }} ({{ endFormattedDate }})
            </p>
          </div>
        </div>
        <p class="pdf__text">{{ story.content.scope }}</p>
        <h2 class="pdf__title">{{ story.content.title }}</h2>
        <p class="pdf__desc">{{ story.content.address }}</p>
      </section>
      <!-- <ImagesList /> -->
      <ProductSpecifications />
      <!-- <Included /> -->
      <!-- <Drawings /> -->
    </div>
  </div>
</template>
