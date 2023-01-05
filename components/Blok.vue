<script lang="ts" setup>
import { iBlokBody } from '~/types/story'

interface iProps {
  body: iBlokBody[]
}

defineProps<iProps>()

const getBlokName = name => {
  switch (name) {
    case 'images_list':
      return defineAsyncComponent(() => import(`~/components/ImagesList.vue`))

    case 'advantages_list':
      return defineAsyncComponent(
        () => import('~/components/AdvantagesList.vue')
      )

    case 'benefits':
      return defineAsyncComponent(() => import('~/components/Benefits1.vue'))

    case 'benefits2':
      return defineAsyncComponent(() => import('~/components/Benefits2.vue'))

    case 'contacts':
      return defineAsyncComponent(() => import('~/components/Contacts.vue'))

    case 'drawings':
      return defineAsyncComponent(() => import('~/components/Drawings.vue'))

    case 'images_list':
      return defineAsyncComponent(() => import('~/components/ImagesList.vue'))

    case 'included':
      return defineAsyncComponent(() => import('~/components/Included.vue'))

    case 'news':
      return defineAsyncComponent(() => import('~/components/News.vue'))

    case 'notes':
      return defineAsyncComponent(() => import('~/components/Notes.vue'))

    case 'numbers_section':
      return defineAsyncComponent(() => import('~/components/Numbers.vue'))

    case 'pricing':
      return defineAsyncComponent(() => import('~/components/Pricing.vue'))

    case 'product_specifications':
      return defineAsyncComponent(
        () => import('~/components/ProductSpecifications.vue')
      )

    case 'products':
      return defineAsyncComponent(() => import('~/components/Products.vue'))

    case 'projects':
      return defineAsyncComponent(() => import('~/components/Projects.vue'))

    case 'simple_section':
      return defineAsyncComponent(
        () => import('~/components/SimpleSection.vue')
      )

    case 'team':
      return defineAsyncComponent(() => import('~/components/Team.vue'))
  }
}
</script>

<template>
  <div v-for="blok in body" :key="blok._uid">
    <component
      :is="getBlokName(blok.component)"
      v-if="blok.data"
      :body="blok.data"
    />
    <component :is="getBlokName(blok.component)" v-else />
  </div>
</template>
