<script setup lang="ts">
const list = ref([
  {
    text: 'Software optimization algorithm reduces material waste factor by 30%',
  },
  {
    text: 'Exterior system optimized for architectural Revit models',
  },
  {
    text: 'Realistic and detailed façade design & Renderings',
  },
  {
    text: '3D high LOD wall section renderings and shop drawings',
  },
  {
    text: 'Drawings satisfy specBIM requirements',
  },
  {
    text: 'Dashboard for data driven design and analytics',
  },
])
</script>

<template>
  <section class="section section--pb benefits-2">
    <div class="container benefits-2__wrapper">
      <div class="benefits-2__title-wrapper">
        <h2 class="benefits-2__title">BIM Solution: Dextall Studio</h2>
      </div>
      <ul class="benefits-2__list">
        <li v-for="(item, idx) in list" :key="idx" class="benefits-2__li">
          <div class="benefits-2__line"></div>
          <p class="benefits-2__text">
            {{ item.text }}
          </p>
          <div v-if="idx === list.length - 1" class="benefits-2__line"></div>
        </li>
      </ul>
    </div>
  </section>
</template>
