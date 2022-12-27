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
  <section
    v-editable="story.content.product_summary_tab[0]"
    class="section specifications-1"
  >
    <div class="container specifications-1__wrapper">
      <div class="specifications-1__top-block">
        <div class="specifications-1__text-wrapper">
          <h2 class="specifications-1__title">Product Summary:</h2>
          <h3 class="specifications-1__desc">
            {{ story.content.title }}
          </h3>
        </div>
        <img
          class="specifications-1__img"
          src="/images/product-specifications/1.png"
          alt="Image"
        />
      </div>
      <div class="specifications-1__bottom-block">
        <div class="specifications-1__line"></div>
        <p class="specifications-1__small-text">
          {{ story.content.product_summary_tab[0].id }}
        </p>
      </div>
    </div>
  </section>
  <section class="section section--pb specifications-2">
    <div class="container specifications-2__wrapper">
      <SpecificationsTable
        v-editable="
          story.content.product_summary_tab[0].product_summary_table[0]
        "
        :table="story.content.product_summary_tab[0].product_summary_table[0]"
      />
    </div>
  </section>
</template>
