<script setup lang="ts">
import { useTransition } from '~/composables/transition'
useTransition()
</script>

<template>
  <NuxtLayout>
    <div data-page>
      <!-- <Login /> -->
      <!-- <Main />
      <Team />
      <Included />
      <Drawings />
      <Contacts />
      <Benefits1 />
      <Benefits2 />
      <News />
      <ProductSpecifications />
      <AdvantagesList />
      <Pricing />
      <Notes />
      <Numbers />
      <ImagesList /> -->
      <!-- <SimpleSection /> -->
      <Products />
    </div>
  </NuxtLayout>
</template>
