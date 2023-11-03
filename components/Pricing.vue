<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'

interface IProps {
  withBtn?: boolean
}

withDefaults(defineProps<IProps>(), {
  withBtn: true,
})

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const productSummaryTab = computed(() => {
  if (story.value?.content?.product_summary_tab) {
    return story.value.content.product_summary_tab[0]
  }
  return null
})

const pricingTab = computed(() => {
  if (story.value?.content?.pricing_tab) {
    return story.value.content.pricing_tab[0]
  }
  return null
})

const table = computed(() => {
  if (
    productSummaryTab.value &&
    productSummaryTab.value?.product_summary_table
  ) {
    return productSummaryTab.value.product_summary_table[0]
  }
  return null
})

const { totalPrice, subtotalPriceUSD, taxUSD } = useComputePrice(
  pricingTab.value?.facade_area_sf || table.value?.facade_area_sf[0]?.info,
  pricingTab.value?.price_per_sf || table.value?.subtotal_price[0]?.info,
  pricingTab.value?.tax || table.value?.tax[0]?.info
)

const { tabs, open } = useTab()
</script>

<template>
  <section v-if="pricingTab || table" class="section section--pb pricing">
    <div class="container pricing__wrapper">
      <h2 class="pricing__title">Pricing</h2>
      <ul class="pricing__list">
        <li class="pricing__li">
          <div class="pricing__line"></div>
          <div class="grid pricing__text-wrapper">
            <p class="pricing__text">SUBTOTAL PRICE</p>
            <p v-if="table?.subtotal_price[0]?.info" class="pricing__value">
              {{ pricingTab?.facade_area_sf || table.subtotal_price[0].info }}
            </p>
            <p class="pricing__price">{{ subtotalPriceUSD }}</p>
          </div>
        </li>
        <li class="pricing__li">
          <div class="pricing__line"></div>
          <div class="grid pricing__text-wrapper">
            <p class="pricing__text">Tax</p>
            <p v-if="table?.tax[0]?.info" class="pricing__value">
              {{ pricingTab?.tax || table.tax[0].info }}
            </p>
            <p class="pricing__price">{{ taxUSD }}</p>
          </div>
        </li>
        <li class="pricing__li">
          <div class="pricing__line"></div>
          <div class="grid pricing__text-wrapper">
            <p class="pricing__text">TOTAL PRICE</p>
            <p v-if="totalPrice" class="pricing__price">{{ totalPrice }}</p>
          </div>
          <div class="pricing__line"></div>
        </li>
      </ul>
      <Button
        v-if="withBtn"
        class="pricing__btn"
        @open="open(tabs[1]._uid, false)"
      >
        Whats included
      </Button>
    </div>
  </section>
</template>
