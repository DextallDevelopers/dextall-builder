<script setup lang="ts">
const images = [
  {
    imgSrc: '/images/images-list/1.jpg',
    desc: 'image description',
  },
  {
    imgSrc: '/images/images-list/2.jpg',
    desc: '',
  },
  {
    imgSrc: '/images/images-list/3.jpg',
    desc: 'image description',
  },
  {
    imgSrc: '/images/images-list/4.jpg',
    desc: '',
  },
  {
    imgSrc: '/images/images-list/5.jpg',
    desc: 'image description',
  },
  {
    imgSrc: '/images/images-list/6.jpg',
    desc: 'image description',
  },
]
</script>

<template>
  <section class="section section--pb images-list">
    <div class="container images-list__wrapper">
      <ul class="images-list__list">
        <li v-for="(img, idx) in images" :key="idx" class="images-list__li">
          <img class="images-list__img" :src="img.imgSrc" alt="Image" />
          <p class="images-list__desc">{{ img.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
