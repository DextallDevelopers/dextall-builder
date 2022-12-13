<script setup lang="ts">
const li = [
  {
    text: 'SUBTOTAL PRICE',
    price: '$64.18/SF',
  },
  {
    text: 'TAX',
    price: '8.875%',
  },
  {
    text: 'TOTAL PRICE (MATERIAL ONLY)',
    price: '$1.489.895,54',
  },
]
</script>

<template>
  <section class="section section--pb pricing">
    <div class="container pricing__wrapper">
      <h2 class="pricing__title">Pricing</h2>
      <ul class="pricing__list">
        <li v-for="(item, idx) in li" :key="idx" class="pricing__li">
          <div class="pricing__line"></div>
          <div class="grid pricing__text-wrapper">
            <p class="pricing__text">
              {{ item.text }}
            </p>
            <p class="pricing__price">
              {{ item.price }}
            </p>
          </div>
          <div v-if="idx + 1 === li.length" class="pricing__line"></div>
        </li>
      </ul>
      <CircleButton class="pricing__btn">Call to action</CircleButton>
    </div>
  </section>
</template>
