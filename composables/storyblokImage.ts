interface iOpts {
  filters?: string
  size?: string
  region?: null | 'eu'
}

export const useStoryblokImage = (image: string, options: iOpts = {}) => {
  if (!image) return ''

  const filters = options.filters ?? 'filters:quality(92):format(webp)'
  const size = options.size ?? null

  const imageService =
    options.region === 'eu'
      ? 'https://a.storyblok.com'
      : 'https://a-us.storyblok.com'
  const path = image.replace(imageService, '')

  const customPath = size ? '/m/' + size + '/' + filters : '/m/' + filters

  return imageService + path + customPath
}
