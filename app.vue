<script setup lang="ts">
import { useTransition } from '~/composables/transition'
useTransition()
</script>

<template>
  <NuxtLayout>
    <div data-page>
      <!-- <Login /> -->
      <!-- <Team /> -->
      <!-- <Included /> -->
      <Drawings />
    </div>
  </NuxtLayout>
</template>
