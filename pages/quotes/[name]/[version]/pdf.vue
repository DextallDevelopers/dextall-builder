<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'
import { useTeamStories } from '~/composables/stories/team'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

listenStory(version)

const date = computed(() => {
  return useQuoteDate(
    story?.value?.content?.start_quote_date,
    story?.value?.content?.end_quote_date
  )?.value
})

const items = computed(() => {
  return [
    {
      text: 'Total Number of Panels',
      number: story?.value?.content?.total_number_of_panels,
    },
    {
      text: 'Window to Wall Ratio %',
      number: story?.value?.content?.window_to_wall_ratio,
    },
    {
      text: 'Carbon Footprint Reduction %',
      number: story?.value?.content?.carbon_footprint_reduction,
    },
    {
      text: 'FACADE AREA',
      number: story?.value?.content?.facade_area,
    },
  ]
})

const getImgSrc = (img: string, size?: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size })
}
</script>

<template>
  <div class="pdf">
    <div class="pdf__wrapper">
      <section class="section container pdf__section">
        <div class="pdf__date-wrapper">
          <div class="pdf__date">
            <p class="pdf__date-text">Date of the quote:</p>
            <p v-if="date.startFormattedDate" class="pdf__date-number">
              {{ date.startFormattedDate }}
            </p>
          </div>
          <div class="pdf__date">
            <p class="pdf__date-text">The offer is valid till:</p>
            <p v-if="date.endFormattedDate" class="pdf__date-number">
              {{ date.endFormattedDate }}
            </p>
          </div>
          <div class="pdf__date">
            <p v-if="date.endFormattedDate" class="pdf__date-text">
              <span v-if="date.timeLeft !== 'Offer has expired'"
                >Time left before:</span
              >
            </p>
            <p class="pdf__date-number" v-html="`${date.timeLeft}`" />
          </div>
        </div>
        <div class="pdf__section-content">
          <h2 class="pdf__title">{{ story?.content?.title }}</h2>
          <p class="pdf__desc">{{ story?.content?.address }}</p>
        </div>
        <div class="grid model__bottom-block">
          <div
            v-if="story.content?.model[0]?.thumbnail?.filename"
            class="model__3d-wrapper"
          >
            <img
              class="model__img"
              :src="
                getImgSrc(
                  story?.content?.model[0]?.thumbnail?.filename,
                  '1920x1080'
                )
              "
              alt="Image"
            />
          </div>
          <div class="pdf__right-list">
            <div class="pdf__list-wrapper">
              <ul class="pdf__list">
                <li v-for="(item, idx) in items" :key="idx" class="pdf__li">
                  <div class="pdf__line"></div>
                  <div class="pdf__text-wrapper">
                    <p class="pdf__list-text">{{ item?.text }}</p>
                    <p class="pdf__number">{{ item?.number }}</p>
                  </div>
                  <div v-if="idx + 1 === items.length" class="pdf__line"></div>
                </li>
              </ul>
            </div>
            <div
              v-if="story?.content?.reduced_card?.content"
              class="model__card-wrapper"
            >
              <h3 class="model__title">Contact us with any questions</h3>
              <ReducedCard
                :avatar="
                  story?.content?.reduced_card?.content?.user_avatar?.filename
                "
                :name="story?.content?.reduced_card?.name"
                :career="story?.content?.reduced_card?.content?.position"
                :email="story?.content?.reduced_card?.content?.email"
                :phone="story?.content?.reduced_card?.content?.phone"
                :text="story?.content?.reduced_card?.content?.description"
                :linkedin="story?.content?.reduced_card?.content?.linkedin"
                :facebook="story?.content?.reduced_card?.content?.facebook"
                :is-contacts="false"
                class="model__card"
              />
            </div>
          </div>
        </div>
      </section>
      <div class="pdf__price">
        <Pricing :with-btn="false" />
      </div>
      <div class="pdf__product-specifications">
        <ProductSpecifications />
      </div>
      <div class="pdf__included">
        <Included />
      </div>
    </div>
  </div>
</template>
