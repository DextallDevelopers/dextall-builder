<script setup lang="ts">
import { useTransition } from '~/composables/transition'
useTransition()

const {isAuth, isLoaded} = useAppState()

onMounted(() => {
  const isAuthData = localStorage.getItem('isAuth')

  if (isAuthData === 'true') {
    isAuth.value = true
  }
  isLoaded.value = true
})
</script>

<template>
  <Loader v-if="!isLoaded" />
  <div
    v-else-if="isAuth && isLoaded"
    data-page
  >
    <Main />
    <ImagesList />
    <Projects />
    <News />
    <Contacts />
  </div>
  <Login v-else />
</template>
