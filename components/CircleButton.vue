<script setup lang="ts">
interface iProps {
  tag?: string
  href?: string
  type?: string
  isWhite?: boolean
}

const props = defineProps<iProps>()

const tag = computed(() => {
  if (props.tag === 'nuxt-link') {
    return resolveComponent('NuxtLink')
  }
  else return props.tag ?? 'button'
})

const to = props.tag === 'nuxt-link' ? props.href : undefined
const href = props.tag === 'a' ? props.href : undefined

</script>

<template>
  <component
    :is="tag"
    class="circle-button"
    :class="[isWhite && 'circle-button--white']"
    :to="to"
    :href="href"
    aria-label="link"
    :target="props.tag === 'a' ? '_blank' : undefined"
    :rel="props.tag === 'a' ? 'noreferer noopener' : undefined"
    :type="props.type"
  >
    <span class="circle-button__content">
      <slot></slot>
    </span>
    <span class="circle-button__bg"></span>
  </component>
</template>
