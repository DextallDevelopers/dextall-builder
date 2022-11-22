const fontsMetaList = [
  {
    rel: 'preload',
    type: 'font/woff2',
    href: '/fonts/HelveticaNeueCyr-Light.woff2',
    crossorigin: 'anonymous',
    as: 'font',
  },

  {
    rel: 'preload',
    type: 'font/woff2',
    href: '/fonts/HelveticaNeueCyr-Medium.woff2',
    crossorigin: 'anonymous',
    as: 'font',
  },

  {
    rel: 'preload',
    type: 'font/woff2',
    href: '/fonts/NeueHelvetica55Roman.woff2',
    crossorigin: 'anonymous',
    as: 'font',
  },

  {
    rel: 'preload',
    type: 'font/woff2',
    href: '/fonts/NeueHelvetica56Italic.woff2',
    crossorigin: 'anonymous',
    as: 'font',
  },
]
export const useFonts = () => {
  useHead({
    link: [...fontsMetaList],
  })
}
