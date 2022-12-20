<script setup lang="ts">
const { subtotalPrice, tax, totalPrice } = useComputePrice()
const li = [
  {
    text: 'SUBTOTAL PRICE',
    price: `$${subtotalPrice}/SF`,
  },
  {
    text: 'TAX',
    price: `${tax}%`,
  },
  {
    text: 'TOTAL PRICE (MATERIAL ONLY)',
    price: `$${totalPrice}`,
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
      <CircleButton class="pricing__btn">Contact Us</CircleButton>
    </div>
  </section>
</template>
