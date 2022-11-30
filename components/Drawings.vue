<script setup lang="ts">
const imgList = ref([
  {
    image: '/images/drawings/1.jpg',
    description: 'image description',
  },
  {
    image: '/images/drawings/1.jpg',
    description: '',
  },
  {
    image: '/images/drawings/1.jpg',
    description: 'image description',
  },
  {
    image: '/images/drawings/1.jpg',
    description: '',
  },
  {
    image: '/images/drawings/1.jpg',
    description: 'image description',
  },
])

const elevationList = ref([
  {
    text: 'North elevation',
    image: '/images/drawings/elevation/1.jpg',
  },
  {
    text: 'West elevation',
    image: '/images/drawings/elevation/2.jpg',
  },
  {
    text: 'South elevation',
    image: '/images/drawings/elevation/2.jpg',
  },
  {
    text: 'East elevation',
    image: '/images/drawings/elevation/2.jpg',
  },
])

const colorList = ref([
  {
    text: 'Legend',
    stroke: '',
    background: '#CBDEF4',
  },
  {
    text: 'Legend',
    stroke: '3px solid #29F73E',
    background: 'transparent',
  },
])
</script>

<template>
  <section class="section section--pb drawings">
    <div class="container drawings__wrapper">
      <div class="drawings__img-block">
        <h2 class="drawings__title">Title of image section</h2>
        <p class="drawings__desc">
          Breaking ground in late 2023, this 20-story mixed-use residential
          tower is part of a multi-phased masterplan intended to redevelop &
          revitalize downtown Newark. Spanning over the next decade, this
          transformative redevelopment masterplan will provide 1,200 residential
          units of which 20% will be designated as affordable.
        </p>
        <ul class="grid drawings__img-list">
          <li
            v-for="(elem, idx) in imgList"
            :key="idx"
            class="drawings__img-li"
          >
            <img class="drawings__img" :src="elem.image" alt="Image" />
            <p class="drawings__img-desc">{{ elem.description }}</p>
          </li>
        </ul>
      </div>
      <div class="drawings__elevation">
        <div
          v-if="elevationList.length >= 3 && elevationList.length < 5"
          class="drawings__lines-wrapper"
        >
          <div class="drawings__line"></div>
          <div class="drawings__line"></div>
        </div>
        <ul class="grid drawings__elevation-list">
          <li
            v-for="(elem, idx) in elevationList"
            :key="idx"
            class="drawings__elevation-li"
          >
            <h3 class="drawings__elevation-title">{{ elem.text }}</h3>
            <img
              class="drawings__img"
              src="/images/drawings/elevation/1.jpg"
              alt="Image"
            />
          </li>
        </ul>
      </div>
      <ul class="drawings__colors-list">
        <Color
          v-for="(color, idx) in colorList"
          :key="idx"
          :text="color.text"
          :stroke="color.stroke"
          :background="color.background"
        />
      </ul>
    </div>
  </section>
</template>
