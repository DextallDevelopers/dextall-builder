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
      <!-- <Drawings /> -->
      <Contacts />
    </div>
  </NuxtLayout>
</template>
