<script lang="ts" setup>
import { useFormattedDate } from '~/composables/computeDate'

interface iProps {
  title: string
  date: string
  img: string
  slug: string
}

const props = defineProps<iProps>()

const formattedDate = useFormattedDate(props.date)
const $el = ref(null)

// let sa
// onMounted(() => {
//   setTimeout(async () => {
//     const { OnScrollAppereance } = await import(
//       '~/assets/scripts/OnScrollAppereance'
//     )
//     sa = new OnScrollAppereance($el.value)
//   }, 1000)
// })
// onBeforeUnmount(() => {
//   sa && sa.destroy()
// })
</script>

<template>
  <div ref="$el" class="grid cards__li">
    <div class="cards__text-block">
      <h3 class="cards__title">{{ title }}</h3>
      <CircleButton
        class="cards__btn"
        tag="a"
        :is-white="true"
        :is-new-window="true"
        :href="`https://www.dextall.com/${slug}`"
      >
        Read more
      </CircleButton>
    </div>
    <div class="cards__line-block">
      <time class="cards__date">{{ formattedDate }}</time>
      <div class="cards__line"></div>
    </div>
    <div
      class="cards__image-block"
      :style="`background-image: url('${img}')`"
    ></div>
  </div>
</template>
