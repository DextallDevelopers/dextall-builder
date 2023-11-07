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

console.log(productSummaryTab.value)
</script>

<template>
  <section
    v-if="productSummaryTab"
    v-editable="productSummaryTab"
    class="section specifications-1"
  >
    <div class="container specifications-1__wrapper">
      <h2 class="specifications-1__title">Technical details</h2>
      <div class="specifications-1__line"></div>
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
