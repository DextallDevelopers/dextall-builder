<script setup lang="ts">
interface iItems {
  list_text: string
}

interface iListItems {
  title: string
  subtitle: string
  text: string
  image: {
    filename: string
  }
  video_id: string
  caption: string
  list_items: iItems[]
  additional_title: string
  additional_text: string
  button_text: string
  button_link: string
}

interface iProps {
  body: {
    content: {
      image: {
        filename: string
      }
      title: string
      items: iListItems[]
    }
  }
}

const props = defineProps<iProps>()

const items = computed(() => {
  return props.body.content.items
})

console.log(items.value)

const spliTitle = str => {
  const strArray = str.split(' ')

  const newStr = strArray.map(el => {
    return `
    <span class="products__span-text">${el}</span>`
  })

  return newStr.join(' ')
}
</script>

<template>
  <section class="section section--pb products">
    <div class="container products__bg-wrapper">
      <img
        class="products__bg"
        :src="body.content.image.filename"
        alt="Image"
      />
      <h2 class="products__big-text" v-html="spliTitle(body.content.title)" />
    </div>
    <div id="products" class="container products__wrapper">
      <ul class="products__list">
        <li v-for="(item, idx) in items" :key="idx" class="products__li">
          <div class="products__line"></div>
          <div class="grid products__all-content">
            <p class="products__number">00{{ idx + 1 }}</p>
            <h3 class="products__title">{{ item.title }}</h3>
            <div class="products__content-list">
              <h4 class="products__content-title">{{ item.subtitle }}</h4>
              <p class="products__content-desc">
                {{ item.text }}
              </p>
              <div class="products__line"></div>
              <div class="products__img-wrapper">
                <YoutubeVideo v-if="item.video_id" :video-id="item.video_id" />
                <img
                  v-else
                  class="products__img"
                  :src="item.image.filename"
                  alt="Building"
                />
              </div>
              <p class="products__img-text">
                {{ item.caption }}
              </p>
              <div class="products__line"></div>
              <h4 class="products__upper-title">Benefits</h4>
              <ul class="products__upper-text-list">
                <li
                  v-for="(list_item, id) in item.list_items"
                  :key="id"
                  class="products__upper-text-li"
                >
                  <div class="products__line"></div>
                  <p class="products__upper-text">
                    {{ list_item.list_text }}
                  </p>
                  <div
                    v-if="id + 1 === item.list_items.length"
                    class="products__line"
                  ></div>
                </li>
              </ul>
              <h4
                v-if="item.additional_title"
                class="products__content-title products__content-title--1"
              >
                {{ item.additional_title }}
              </h4>
              <p v-if="item.additional_text" class="products__content-desc">
                {{ item.additional_text }}
              </p>
              <div
                v-if="item.additional_title || item.additional_text"
                class="products__line"
              ></div>
              <CircleButton
                v-if="item.button_text"
                :href="item.button_link"
                :is-new-window="true"
                tag="a"
                class="products__btn"
                >{{ item.button_text }}</CircleButton
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
