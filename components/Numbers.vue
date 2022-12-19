<script lang="ts" setup>
const items = [
  {
    title: 'TRILLIONS WILL BE SPEND TO DECARBONIZE THE REAL ESTATE',
    description:
      'Trillion will be spent to decarbonize real estate in the next 20 years',
    number: '$18-36T',
  },
  {
    title: 'MAJOR CITIES ARE THE MAJOR CONTRIBUTORS TO CARBON EMISSIONS',
    description:
      'IN CITIES (LIKE NYC) BUILDINGS CONTRIBUTE NEARLY 70% OF CARBON EMISSIONS',
    number: '70%',
  },
  {
    title: 'BUILDINGS ARE 40% OF THE WORLDS CARBON EMISSIONS',
    description: '40% OF CARBON EMISSIONS ARE CONTRIBUTED TO BUILDINGS',
    number: '40%',
  },
]

// interface iItem {
//   _uid: string
//   title: string
//   description: string
//   number: string
// }

// interface iProps {
//   items: iItem[]
// }

// defineProps<iProps>()

const separateTextAndNumber = (string: string) => {
  let newStr = string.trim().split(/(\d+)/).filter(Boolean)

  newStr = newStr.map(str => {
    if (str.match(/\d/gm)) {
      return `<span data-type='number'>${str}</span>`
    }
    return str
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
          <h2 class="numbers__title">{{ fact.title }}</h2>
          <p class="numbers__desc">
            {{ fact.description }}
          </p>
        </div>
      </div>
      <div class="container numbers__right-block">
        <div ref="$progress" data-fa-progress class="numbers__ellipse"></div>
        <div
          v-for="(num, idx) in items"
          :key="idx"
          data-fa-number
          class="numbers__number"
          v-html="separateTextAndNumber(num.number)"
        ></div>
      </div>
    </div>
  </section>
</template>
