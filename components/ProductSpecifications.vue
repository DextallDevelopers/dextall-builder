<script setup lang="ts"></script>

<template>
  <section class="section specifications-1">
    <div class="container specifications-1__wrapper">
      <div class="specifications-1__top-block">
        <div class="specifications-1__text-wrapper">
          <h2 class="specifications-1__title">Product Summary:</h2>
          <h3 class="specifications-1__desc">
            20-STORY RESIDENTIAL TOWER, NEWARK, NJ
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
        <p class="specifications-1__small-text">DX146 D. 8-19-22</p>
      </div>
    </div>
  </section>
  <section class="section section--pb specifications-2">
    <div class="container specifications-2__wrapper">
      <SpecificationsTable />
    </div>
  </section>
</template>
