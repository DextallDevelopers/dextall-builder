<script setup lang="ts">
const news = ref([
  {
    name: 'DEXTALL’S LATEST FORBES MAGAZINE FEATURE',
    img: '/images/news/1.jpg',
    date: +Date.now(),
  },
  {
    name: 'DEXTALL’S LATEST FORBES MAGAZINE FEATURE2',
    img: '/images/news/2.jpg',
    date: +Date.now(),
  },
  {
    name: 'DEXTALL’S LATEST FORBES MAGAZINE FEATURE3',
    img: '/images/news/3.jpg',
    date: +Date.now(),
  },
])
</script>

<template>
  <section class="section news">
    <div class="container news__wrapper">
      <div class="news__title-wrapper">
        <h3 class="news__title">Latest news</h3>
      </div>
      <div class="cards-wrapper">
        <ul class="cards">
          <NewsCard
            v-for="(item, idx) in news"
            :key="idx"
            :title="item.name"
            :date="item.date"
            :img="item.img"
            class="news__cards"
          />
        </ul>
      </div>
    </div>
  </section>
</template>
