<template>
  <div
    ref="$tab"
    class="tab"
    :class="[isOpen && 'tab--open']"
  >
    <div
      class="tab__backdrop"
      @click="close"
    ></div>
    <div
      ref="$content"
      class="tab__content"
    >
      <div
        ref="$grabBtn"
        class="tab__line-wrapper"
      >
        <div class="tab__line"></div>
      </div>
      <div class="tab__window">
        <button
          class="tab__close-btn"
          @click="close"
        >
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
  components: iBlokBody[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['close'])

const $tab = ref(null)
const $content = ref(null)
const $grabBtn = ref(null)
let onMouseDown: () => void
let onMouseMove: (e) => void
let onMouseUp: () => void

const close = () => {
  document.body.classList.remove('e-fixed')
  emit('close')
  setTimeout(() => {
    $content.value.style.height = null
  }, 1000)
}

watch(() => props.isOpen, () => {
    if (props.isOpen) {
      document.body.classList.add('e-fixed')
    }
  }
)

onMounted(() => {
  onMouseMove = e => {
    let y
    if (e.changedTouches) {
      y = e.changedTouches[0]?.clientY
    } else {
      y = e.clientY
    }

    const height = window.innerHeight - y
    $content.value.style.height = height + 'px'
    if ((height / window.innerHeight) * 100 < 50) {
      close()
    }
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
