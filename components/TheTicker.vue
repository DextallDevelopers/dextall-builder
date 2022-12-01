<template>
  <div class="ticker">
    <div ref="$ticker" class="ticker__items">
      <div v-for="index in repeatNumber" :key="index" class="ticker__item">
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
const multiplier = props.multiplier || 21

const $ticker = ref(null)

const repeatNumber = computed(() => {
  let number = Math.max(Math.ceil((multiplier / text.length) * 4), 2)
  number = number % 2 === 0 ? number : number + 1
  return number
})
</script>
