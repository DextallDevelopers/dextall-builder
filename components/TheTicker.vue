<template>
  <div class="ticker">
    <div
      ref="$ticker"
      class="ticker__items"
    >
      <div
        v-for="index in repeatNumber"
        :key="index"
        class="ticker__item"
      >
        <IconsTickerIcon />&nbsp;{{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface iProps {
  text: string
  duration?: number
  multiplier?: number
  direction?: 1 | -1
}

const props = defineProps<iProps>()

const text = props.text || ''
const multiplier = props.multiplier || 80
const duration = props.duration || 60
const direction = props.direction || 1

let ticker
const $ticker = ref(null)

const repeatNumber = computed(() => {
  let number = Math.max(Math.ceil((multiplier / text.length) * 4), 2)
  number = number % 2 === 0 ? number : number + 1
  return number
})


const initTicker = async () => {
  const { Ticker } = await import('~/assets/scripts/Ticker')
  ticker = new Ticker({
    $el: $ticker.value,
    duration,
    direction,
  })

  ticker.init()
}

onMounted(async () => {
  initTicker()
})

onBeforeUnmount(() => {
  ticker && ticker.destroy()
})
</script>
