<script setup lang="ts">
import { useTransition } from '~/composables/transition'
useTransition()

const {isAuth} = useAppState()

onMounted(() => {
  const isAuthData = localStorage.getItem('isAuth')

  if (isAuthData === 'true') {
    isAuth.value = true
  }
})
</script>

<template>
  <Login v-if="!isAuth" />
  <div
    v-else
    data-page
  >
    <Main />
    <ImagesList />
    <Projects />
    <News />
    <Contacts />
  </div>
</template>
