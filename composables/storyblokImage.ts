interface iOpts {
  filters?: string
  size?: string
}

export const useStoryblokImage = (image: string, options: iOpts = {}) => {
  if (!image) return ''

  const filters = options.filters ?? 'filters:quality(92):format(webp)'
  const size = options.size ?? null

  const imageService = 'https://a-us.storyblok.com'
  const path = image.replace(imageService, '')

  const customPath = size ? '/m/' + size + '/' + filters : '/m/' + filters

  return imageService + path + customPath
}
