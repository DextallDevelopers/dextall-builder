<script setup lang="ts">
  const isSpecOpen = ref(false)
  const isIncludedOpen = ref(false)
  const isScopeOpen = ref(false)
  const isPricingOpen = ref(false)
</script>

<template>
  <TheHeader />
  <section class="section section--pb main">
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
          @click="isSpecOpen = true"
        >Product summary</button>
        <button
          class="main__btn"
          @click="isIncludedOpen = true"
        >What's Included</button>
        <button
          class="main__btn"
          @click="isScopeOpen = true"
        >Drawings</button>
        <button
          class="main__btn"
          @click="isPricingOpen = true"
        >Pricing</button>
      </div>
      <div class="main__model-wrapper">
        <Model />
      </div>
    </div>
    <TheTab
      :is-open="isSpecOpen"
      :components="[{_uid: Date.now().toString(), component: 'product_specifications'}]"
      @close="isSpecOpen = false"
    >
      <ProductSpecifications />
    </TheTab>
    <TheTab
      :is-open="isIncludedOpen"
      :components="[{_uid: Date.now().toString(), component: 'included'}]"
      @close="isIncludedOpen = false"
    />

    <TheTab
      :is-open="isScopeOpen"
      :components="[{_uid: Date.now().toString(), component: 'drawings'}]"
      @close="isScopeOpen = false"
    />

    <TheTab
      :is-open="isPricingOpen"
      :components="[{_uid: Date.now().toString(), component: 'pricing'}]"
      @close="isPricingOpen = false"
    />
  </section>
</template>
