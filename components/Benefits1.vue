<script setup lang="ts">
interface iItems {
  text: string
}

interface iListItems {
  list_title: string
  list_subtitle: string
  list_items: iItems[]
}

interface iProps {
  body: {
    content: {
      title: string
      items: iListItems[]
    }
  }
}

const props = defineProps<iProps>()

const items = computed(() => {
  return props.body.content.items
})
</script>

<template>
  <section class="section section--pb benefits-1">
    <div class="container benefits-1__wrapper">
      <h2 class="benefits-1__title">{{ body.content.title }}</h2>
      <ul class="benefits-1__list">
        <li v-for="(item, idx) in items" :key="idx" class="benefits-1__li">
          <div class="benefits-1__line"></div>
          <div class="grid benefits-1__content-wrapper">
            <div class="benefits-1__text-wrapper">
              <h3 class="benefits-1__content-title">{{ item.list_title }}</h3>
              <p class="benefits-1__content-desc">
                {{ item.list_subtitle }}
              </p>
            </div>
            <ul class="benefits-1__content-list">
              <li
                v-for="(list_item, id) in item.list_items"
                :key="id"
                class="benefits-1__content-li"
              >
                <div v-if="id === 0" class="benefits-1__mob-line"></div>
                <p class="benefits-1__content-text">
                  {{ list_item.text }}
                </p>
                <div class="benefits-1__line"></div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
