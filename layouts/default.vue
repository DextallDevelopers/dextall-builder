<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

onMounted(async () => {
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
      <Title>Dextall Builder</Title>
      <Meta
        name="viewport"
        conten="width=device-width, initial-scale=1"
      >
      </Meta>
      <Link
        rel="icon"
        type="image/x-icon"
        href="/favicon.ico"
      >
      </Link>
    </Head>
    <AppGrid />
    <UiLoader />
    <slot />
  </div>
</template>
