<template>
  <div
    ref="$tab"
    class="tab"
    :class="[isOpen && 'tab--open']"
    :style="`--th: ${height}px`"
  >
    <div class="tab__backdrop" @click="close(props.id)"></div>
    <div ref="$content" class="tab__content">
      <div ref="$grabBtn" class="tab__line-wrapper">
        <div class="tab__line"></div>
      </div>
      <div class="tab__window">
        <button class="tab__close-btn" @click="close(props.id)">
          <span class="tab__btn-line"></span>
          <span class="tab__btn-line"></span>
        </button>
        <div class="tab__top">
          <Blok :body="components" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { iBlokBody } from '~/types/story'

interface iProps {
  isOpen: boolean
  id: string
  components: iBlokBody[]
}

const props = defineProps<iProps>()

const { close, openedTabs } = useTab()

const $tab = ref(null)
const $content = ref(null)
const $grabBtn = ref(null)
const height = ref(0)
let onMouseDown: () => void
let onMouseMove: (e) => void
let onMouseUp: () => void

watch(openedTabs, () => {
  console.log(openedTabs.value)
})

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      document.body.classList.add('e-fixed')
      return
    }
    document.body.classList.remove('e-fixed')
    setTimeout(() => {
      $content.value.style.height = null
    }, 1000)
  }
)

onMounted(() => {
  if (props.isOpen) {
    document.body.classList.add('e-fixed')
  }

  height.value = $content.value.scrollHeight

  onMouseMove = e => {
    let y
    if (e.changedTouches) {
      y = e.changedTouches[0]?.clientY
    } else {
      y = e.clientY
    }

    const h = window.innerHeight - y
    const percent = (h / window.innerHeight) * 100

    if (percent < 30) {
      close(props.id)
    }
    if (percent >= 93) {
      return
    }

    height.value = h
    $content.value.style.height = h + 'px'
  }

  onMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove)
  }

  onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('touchmove', onMouseMove)
  }

  $grabBtn.value.addEventListener('mousedown', onMouseDown)
  document.body.addEventListener('mouseup', onMouseUp)
  $grabBtn.value.addEventListener('touchstart', onMouseDown)
  document.body.addEventListener('touchend', onMouseUp)
})

onBeforeUnmount(() => {
  $grabBtn.value.removeEventListener('mousedown', onMouseDown)
  document.body.removeEventListener('mouseup', onMouseUp)
  $grabBtn.value.removeEventListener('touchstart', onMouseDown)
  document.body.removeEventListener('touchend', onMouseUp)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('touchmove', onMouseMove)
})
</script>
