<script setup lang="ts">
import { useAppStore } from '~/store/app'
import { useFonts } from '~/composables/fonts'

useFonts()

const appStore = useAppStore()
onMounted(async () => {
  const { default: supportsWebP } = await import('supports-webp')

  if (await supportsWebP) {
    appStore.setIsWebp(true)
  } else {
    appStore.setIsWebp(false)
  }
  const { hello } = await import('~/assets/scripts/utils/hello')
  hello()

  const { winSizes } = await import('~/assets/scripts/utils/winSizes')
  const { resize } = await import('@emotionagency/utils')
  resize.on(winSizes)
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Emotion</Title>
      <Meta name="viewport" conten="width=device-width, initial-scale=1"></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
    </Head>
    <AppGrid />
    <UiLoader />
    <SmoothScroll>
      <slot />
    </SmoothScroll>
  </div>
</template>
