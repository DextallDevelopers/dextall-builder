<script setup lang="ts">
import { useTransition } from '~/composables/transition'
useTransition()
</script>

<template>
  <div data-page>
    <!-- <Login /> -->
    <Main />
    <ImagesList />
    <Projects />
    <News />
    <Contacts />
    <!-- <Team />
    <Included />
    <Drawings />
    
    <Benefits1 />
    <Benefits2 />
    <ProductSpecifications />
    <AdvantagesList />
    <Pricing />
    <Notes />
    <Numbers />
    
    <SimpleSection />
    <Products />
    -->
  </div>
</template>
