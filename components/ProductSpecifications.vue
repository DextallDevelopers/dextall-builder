<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const productSummaryTab = computed(() => {
  if (story.value.content?.product_summary_tab) {
    return story.value.content.product_summary_tab[0]
  }
  return null
})
</script>

<template>
  <section
    v-if="productSummaryTab"
    v-editable="productSummaryTab"
    class="section specifications-1"
  >
    <div class="container specifications-1__wrapper">
      <div class="specifications-1__top-block">
        <div class="specifications-1__text-wrapper">
          <h2 class="specifications-1__title">Product Summary:</h2>
          <h3 v-if="story.content.title" class="specifications-1__desc">
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
        <p v-if="productSummaryTab.id" class="specifications-1__small-text">
          {{ productSummaryTab.id }}
        </p>
      </div>
    </div>
  </section>
  <section
    v-if="productSummaryTab?.product_summary_table"
    class="section section--pb specifications-2"
  >
    <div class="container specifications-2__wrapper">
      <SpecificationsTable
        v-editable="productSummaryTab.product_summary_table[0]"
        :table="productSummaryTab.product_summary_table[0]"
      />
    </div>
  </section>
</template>
