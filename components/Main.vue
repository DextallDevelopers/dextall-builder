<script setup lang="ts">
  import {iTab} from '~/composables/tab'
import { keysGenerator } from '~/assets/scripts/utils/ea'

  const {open, tabs, addTabs} = useTab()
  const route = useRoute()


  const mainTabs: iTab[] = [
    {
      isOpen: false,
      components: [{_uid: keysGenerator(8), component: 'product_specifications'}]
    },
    {
      isOpen: false,
      components: [{_uid: keysGenerator(8), component: 'included'}]
    },
    {
      isOpen: false,
      components: [{_uid: keysGenerator(8), component: 'drawings'}]
    },
    {
      isOpen: false,
      components: [{_uid: keysGenerator(8), component: 'pricing'}]
    },
    {
    isOpen: false,
    components: [
      { _uid: keysGenerator(8), component: 'notes' },
      { _uid: keysGenerator(8), component: 'benefits1' },
      { _uid: keysGenerator(8), component: 'benefits2' },
      { _uid: keysGenerator(8), component: 'advantages_list' },
    ],
  }
  ]

  onMounted(() => {
    addTabs(mainTabs)
    route.query.tab && open(route.query.tab as string)
  })

</script>

<template>
  <section
    id="main"
    class="section section--pb main"
  >
    <div class="container main__wrapper">
      <div class="main__date-wrapper">
        <div class="main__date">
          <p class="main__date-text">Date of the quote:</p>
          <p class="main__date-number">25.10.22</p>
        </div>
        <div class="main__date">
          <p class="main__date-text">Time left before expiration:</p>
          <p class="main__date-number">30 days, 2 hours</p>
        </div>
      </div>
      <p class="main__text">D WALL — NEW CONSTRUCTION</p>
      <h2 class="main__title">20-STORY RESIDENTIAL TOWER, NEWARK, NJ</h2>
      <p class="main__desc">44 Stelton Rd, Piscataway, NJ 08854, USA</p>
      <div class="main__btns-wrapper">
        <button
          class="main__btn"
          @click="open(tabs[0]._uid)"
        >Product summary</button>
        <button
          class="main__btn"
          @click="open(tabs[1]._uid)"
        >What's Included</button>
        <button
          class="main__btn"
          @click="open(tabs[2]._uid)"
        >Drawings</button>
        <button
          class="main__btn"
          @click="open(tabs[3]._uid)"
        >Pricing</button>
      </div>
      <div class="main__model-wrapper">
        <Model />
      </div>
    </div>
    <Teleport to="[data-page]">
      <TheTab
        v-for="tab in tabs"
        :id="tab._uid"
        :key="tab._uid"
        :is-open="tab.isOpen"
        :components="tab.components"
      />
    </Teleport>
  </section>
</template>
