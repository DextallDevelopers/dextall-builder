<script lang="ts" setup>
interface iItems {
  arrow: 'down' | 'up'
  number: string
  title: string
  subtitle: string
}

interface iProps {
  body: {
    content: {
      items: iItems[]
    }
  }
}

const props = defineProps<iProps>()

const items = computed(() => {
  return props.body.content.items
})

console.log(items.value)

const separateTextAndNumber = (string: string) => {
  let newStr = string.trim().split(/(\d+)/).filter(Boolean)

  newStr = newStr.map(str => {
    if (str.match(/\d/gm)) {
      return `<span data-type='number'>${str}</span>`
    }
    return str + ' '
  })
  return newStr.join('')
}

const $progress = ref(null)
const $el = ref(null)

let fa

onMounted(async () => {
  const { default: ProgressBar } = await import('progressbar.js')

  const circle = new ProgressBar.Circle($progress.value, {
    color: '#304e49',
    duration: 500,
    easing: 'easeOut',
  })

  const { FactsAnimation } = await import('~/assets/scripts/FactsAnimation')

  fa = new FactsAnimation($el.value, circle)
})

onBeforeUnmount(() => {
  fa && fa.destroy()
})
</script>

<template>
  <section ref="$el" class="section section--pb numbers">
    <div class="numbers__wrapper">
      <div class="container numbers__left-block" data-fa-scrolling>
        <div
          v-for="(fact, idx) in items"
          :key="idx"
          class="numbers__left-block-content"
        >
          <p class="numbers__desc">
            {{ fact.subtitle }}
          </p>
          <h2 class="numbers__title">{{ fact.title }}</h2>
        </div>
      </div>
      <div class="container numbers__right-block">
        <div ref="$progress" data-fa-progress class="numbers__ellipse"></div>
        <div
          v-for="(num, idx) in items"
          :key="idx"
          class="numbers__content-wrapper"
          data-fa-number
        >
          <div
            class="numbers__number"
            v-html="separateTextAndNumber(num.number)"
          ></div>
          <IconsGraphArrowUp v-if="num.arrow === 'up'" class="numbers__arrow" />
          <IconsGraphArrowDown v-else class="numbers__arrow" />
        </div>
      </div>
    </div>
  </section>
</template>
