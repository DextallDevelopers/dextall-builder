<script setup lang="ts">
const list1 = ref([
  {
    text: 'Less mistakes means more time to fuel your creativity',
  },
  {
    text: 'Faster design process and real-time exterior skin cost updates',
  },
  {
    text: 'Fully optimized to work with retrofit projects in Revit',
  },
])

const list2 = ref([
  {
    text: 'Less time spend installing and lower overall cost',
  },
  {
    text: 'Less mistakes during installations ',
  },
  {
    text: 'Fully optimized to work with retrofit projects on site',
  },
])
</script>

<template>
  <section class="section section--pb benefits-1">
    <div class="container benefits-1__wrapper">
      <h2 class="benefits-1__title">Results</h2>
      <ul class="benefits-1__list">
        <li class="benefits-1__li">
          <div class="benefits-1__line"></div>
          <div class="grid benefits-1__content-wrapper">
            <div class="benefits-1__text-wrapper">
              <h3 class="benefits-1__content-title">For Architects</h3>
              <p class="benefits-1__content-desc">
                Optimize with flexibility and accuracy
              </p>
            </div>
            <ul class="benefits-1__content-list">
              <li
                v-for="(item, idx) in list1"
                :key="idx"
                class="benefits-1__content-li"
              >
                <div v-if="idx === 0" class="benefits-1__mob-line"></div>
                <p class="benefits-1__content-text">
                  {{ item.text }}
                </p>
                <div class="benefits-1__line"></div>
              </li>
            </ul>
          </div>
        </li>
        <li class="benefits-1__li">
          <div class="benefits-1__line"></div>
          <div class="grid benefits-1__content-wrapper">
            <div class="benefits-1__text-wrapper">
              <h3 class="benefits-1__content-title">
                For GCs and construction managers
              </h3>
              <p class="benefits-1__content-desc">
                Easily obtain installation manuals and 3D high detailed
                renderings
              </p>
            </div>
            <ul class="benefits-1__content-list">
              <li
                v-for="(item, idx) in list2"
                :key="idx"
                class="benefits-1__content-li"
              >
                <div v-if="idx === 0" class="benefits-1__mob-line"></div>
                <p
                  class="benefits-1__content-text"
                  :class="[idx === 0 && 'bim-4__content-text--nm']"
                >
                  {{ item.text }}
                </p>
                <div class="benefits-1__line"></div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
