<script setup lang="ts">
import { useFonts } from '~/composables/fonts'
import emitter from 'tiny-emitter/instance.js'

useFonts()

const { isInEditor } = useAppState()

onMounted(async () => {
  const { hello } = await import('~/assets/scripts/utils/hello')
  hello()

  const { winSizes } = await import('~/assets/scripts/utils/winSizes')
  const { resize } = await import('@emotionagency/utils')
  resize.on(winSizes)

  setTimeout(() => {
    const sbBridge = new window.StoryblokBridge()

    sbBridge.on(['input', 'published', 'change'], event => {
      emitter.emit('storyChange', event.story)
    })

    sbBridge.pingEditor(() => {
      if (sbBridge.isInEditor()) {
        isInEditor.value = true
      }
    })
  }, 200)
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css',
    },
  ],
  script: [
    {
      src: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.2/pdfmake.min.js',
    },
  ],
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Dextall Builder</Title>
      <Meta name="viewport" conten="width=device-width, initial-scale=1">
      </Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"> </Link>
    </Head>
    <TheHeader />

    <AppGrid />
    <UiLoader />
    <AppToast />
    <slot />
  </div>
</template>
