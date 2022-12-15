<script setup lang="ts">
const images = [
  {
    number: '01',
    imgSrc: '/images/projects/1.jpg',
    desc: '25-STORY RESIDENTIAL TOWER, NEWARK, NJ',
  },
  {
    number: '02',
    imgSrc: '/images/projects/2.jpg',
    desc: 'QUEENS BOULEVARD, ELMHURST, NY',
  },
  {
    number: '03',
    imgSrc: '/images/projects/3.jpg',
    desc: '30TH STREET, LONG ISLAND CITY, NY',
  },
  {
    number: '04',
    imgSrc: '/images/projects/4.jpg',
    desc: '116TH STREET, QUEENS, NY',
  },
  {
    number: '05',
    imgSrc: '/images/projects/5.jpg',
    desc: 'THE HERITAGE',
  },
]
</script>

<template>
  <section class="section section--pb projects">
    <div class="container projects__wrapper">
      <h2 class="projects__title">Latest projects</h2>
      <ul class="projects__list">
        <li v-for="(img, idx) in images" :key="idx" class="projects__li">
          <a
            href="https://www.dextall.com/projects/"
            class="projects__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p class="projects__number">{{ img.number }}</p>
            <img class="projects__img" :src="img.imgSrc" alt="Image" />
            <p class="projects__desc">{{ img.desc }}</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
