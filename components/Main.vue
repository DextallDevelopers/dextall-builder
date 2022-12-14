<script setup lang="ts"></script>

<template>
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
        <button class="main__btn">Product summary</button>
        <button class="main__btn">What's Included</button>
        <button class="main__btn">Drawings</button>
        <button class="main__btn">Pricing</button>
      </div>
      <div class="main__model-wrapper">
        <Model />
      </div>
    </div>
  </section>
</template>
