<script setup lang="ts">
const included = ref([
  {
    text: 'Breaking ground in late 2023, t',
  },
  {
    text: 'Breaking ground in late 2023, t',
  },
  {
    text: 'Breaking ground in late 2023, t',
  },
])
const notIncluded = ref([
  {
    text: 'Breaking ground in late 2023, t',
  },
  {
    text: 'Breaking ground in late 2023, t',
  },
  {
    text: 'Breaking ground in late 2023, t',
  },
  {
    text: 'Breaking ground in late 2023, t',
  },
])
</script>

<template>
  <section class="section section--pb included">
    <div class="container grid included__wrapper">
      <div class="included__left-block">
        <h2 class="included__title">included:</h2>
        <p class="included__desc">
          Breaking ground in late 2023, this 20-story mixed-use residential
          tower is part of a multi-phased masterplan intended to redevelop &
          revitalize downtown Newark. Spanning over the next decade, this
          transformative redevelopment masterplan will provide 1,200 residential
          units of which 20% will be designated as affordable.
        </p>
        <ul class="included__list">
          <li v-for="(el, idx) in included" :key="idx" class="included__li">
            <div class="include__line"></div>
            <p class="include__text">{{ el.text }}</p>
            <div v-if="idx === included.length - 1" class="include__line"></div>
          </li>
        </ul>
      </div>
      <div class="included__right-block">
        <h2 class="included__title">not included:</h2>
        <p class="included__desc">
          Breaking ground in late 2023, this 20-story mixed-use residential
          tower is part of a multi-phased masterplan intended to redevelop &
          revitalize downtown Newark. Spanning over the next decade, this
          transformative redevelopment masterplan will provide 1,200 residential
          units of which 20% will be designated as affordable.
        </p>
        <ul class="included__list">
          <li v-for="(el, idx) in notIncluded" :key="idx" class="included__li">
            <div class="include__line"></div>
            <p class="include__text">{{ el.text }}</p>
            <div
              v-if="idx === notIncluded.length - 1"
              class="include__line"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
