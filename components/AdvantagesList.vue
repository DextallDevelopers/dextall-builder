<script setup lang="ts">
const li = [
  {
    boldText: '80% faster',
    italicText: 'Exterior Installation',
  },
  {
    boldText: '15-20% less',
    italicText: 'Cost Lower than onsite construction',
  },
  {
    boldText: '20 Times Less',
    italicText: 'Reduce Onsite Labor',
  },
]
</script>

<template>
  <section class="section section--pb advantages">
    <div class="container advantages__wrapper">
      <h2 class="advantages__title">A New Norm in The Construction Process</h2>
      <div class="grid advantages__content-wrapper">
        <div class="advantages__left-block">
          <p class="advantages__text">
            Dextall named as first qualified and approved prefab wall panel
            provided in sweeping plan to over-clad existing affordable housing
            projects for the State of New York
          </p>
          <ul class="advantages__list">
            <li v-for="(item, idx) in li" :key="idx" class="advantages__li">
              <div class="advantages__line"></div>
              <div class="grid advantages__text-wrapper">
                <p class="advantages__bold-text">
                  {{ item.boldText }}
                </p>
                <p class="advantages__italic-text">
                  {{ item.italicText }}
                </p>
              </div>
              <div v-if="idx + 1 === li.length" class="advantages__line"></div>
            </li>
          </ul>
        </div>
        <img
          class="advantages__img"
          src="/images/advantages-list/1.jpg"
          alt="Image"
        />
      </div>
    </div>
  </section>
</template>
