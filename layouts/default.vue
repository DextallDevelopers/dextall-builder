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

const GOOGLE_TM_ID = 'GTM-KRPG7RF'

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
      hid: 'gtm',
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GOOGLE_TM_ID}');`,
      type: 'text/javascript',
    },
  ],
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Dextall Builder</Title>
      <Meta name="viewport" content="width=device-width, initial-scale=1">
      </Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"> </Link>
      <Meta name="twitter:card" content="summary_large_image"> </Meta>
      <Meta name="twitter:image" content="/twitter.png"> </Meta>
      <Meta property="og:image" content="/twitter.png"> </Meta>
      <Meta name="robots" content="noindex"></Meta>
    </Head>
    <TheHeader />

    <AppGrid />
    <UiLoader />
    <AppToast />
    <slot />
  </div>
</template>
