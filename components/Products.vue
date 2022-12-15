<script setup lang="ts">
const benefits1 = [
  {
    text: 'DESIGN MATCHING CLIENT EXPECTATIONS',
  },
  {
    text: 'WATERTIGHT',
  },
  {
    text: 'STRUCTURALLY SOUND PANELS',
  },
  {
    text: 'HIGH PERFORMANCE',
  },
  {
    text: 'AIRTIGHT',
  },
  {
    text: 'SOUND-PROOF',
  },
  {
    text: 'FIRE RESISTANT',
  },
]

const benefits2 = [
  {
    text: 'Scalable, Cost-Effective',
  },
  {
    text: 'High-Performance, Net Zero or Passive House ready',
  },
  {
    text: 'Low-to-no Maintenance ',
  },
  {
    text: 'Aesthetic excellence ',
  },
  {
    text: 'Proven precision quality',
  },
  {
    text: 'Scaffold-free installation, and minimal tenant disturbance',
  },
]
</script>

<template>
  <section class="section section--pb products">
    <div class="container products__bg-wrapper">
      <img class="products__bg" src="/images/products/1.jpg" alt="Image" />
      <h2 class="products__big-text">
        <span class="products__span-text">Our</span>
        <span class="products__span-text"> products</span>
      </h2>
    </div>
    <div id="products" class="container products__wrapper">
      <ul class="products__list">
        <li class="products__li">
          <div class="products__line"></div>
          <div class="grid products__all-content">
            <p class="products__number">001</p>
            <h3 class="products__title">D Wall — New Construction</h3>
            <div class="products__content-list">
              <h4 class="products__content-title">D Wall 2000</h4>
              <p class="products__content-desc">
                The Dextall light gauge metal-framed unitized prefab panel
                system features fully-integrated, factory-installed window and
                cladding components, including non-combustible core insulation.
                It is a simple and versatile product that delivers
                high-performance façades that are both water- and airtight
              </p>
              <div class="products__line"></div>
              <div class="products__img-wrapper">
                <!-- <img
                  class="products__img"
                  src="/images/products/2.jpg"
                  alt="Building"
                /> -->
                <YoutubeVideo video-id="dEXSmgLVaTQ" />
              </div>
              <p class="products__img-text">
                The Dextall System adapts to narrow or tight-lot vertical
                projects
              </p>
              <div class="products__line"></div>
              <h4 class="products__upper-title">Benefits</h4>
              <ul class="products__upper-text-list">
                <li
                  v-for="(item, idx) in benefits1"
                  :key="idx"
                  class="products__upper-text-li"
                >
                  <div class="products__line"></div>
                  <p class="products__upper-text">
                    {{ item.text }}
                  </p>
                  <div
                    v-if="idx + 1 === benefits1.length"
                    class="products__line"
                  ></div>
                </li>
              </ul>
              <h4 class="products__content-title products__content-title--1">
                On site simplicity
              </h4>
              <p class="products__content-desc">
                We eliminate the need to work outside the building once the
                panels are in place. Scaffolds or other suspended platforms are
                unnecessary
              </p>
              <div class="products__line"></div>
            </div>
          </div>
        </li>
        <li class="products__li">
          <div class="products__line"></div>
          <div class="grid products__all-content">
            <p class="products__number">002</p>
            <h3 class="products__title">D Wall — Retrofit</h3>
            <div class="products__content-list">
              <h4 class="products__content-title">A NEW PATH TO RETROFIT</h4>
              <p class="products__content-desc">
                Dextall wall systems are delivered complete with windows,
                exterior cladding, and the ability to integrate mechanical
                systems. Result: reduced on-site labor and construction
                timelines.
              </p>
              <div class="products__line"></div>
              <div class="products__img-wrapper">
                <!-- <img
                  class="products__img"
                  src="/images/products/3.jpg"
                  alt="Building"
                /> -->
                <YoutubeVideo video-id="dEXSmgLVaTQ" />
              </div>
              <div class="products__line"></div>
              <h4 class="products__upper-title">Benefits</h4>
              <ul class="products__upper-text-list">
                <li
                  v-for="(item, idx) in benefits2"
                  :key="idx"
                  class="products__upper-text-li"
                >
                  <div class="products__line"></div>
                  <p class="products__upper-text">
                    {{ item.text }}
                  </p>
                  <div
                    v-if="idx + 1 === benefits2.length"
                    class="products__line"
                  ></div>
                </li>
              </ul>
              <p class="products__text">
                Dextall team members have decades of extensive knowledge of
                prefabricated exteriors for new and retrofit applications.
                Beyond our team of engineers, drafters, and support staff,
                Dextall works with other engineering and consulting partners
                specializing in NYC’s rehab work.
              </p>
              <div class="products__line"></div>
              <CircleButton class="products__btn"
                >Pilot Mock Up Program</CircleButton
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
