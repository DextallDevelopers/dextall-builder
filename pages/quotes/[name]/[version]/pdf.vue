<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'
import { useTeamStories } from '~/composables/stories/team'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

const { stories: team } = await useTeamStories()

const contacts = computed(() => {
  if (story.value.content?.contacts) {
    return story.value.content.contacts[0]
  }
  return null
})

const members = computed(() => {
  if (contacts.value?.team) {
    return team.value.filter(el => contacts.value.team.includes(el.uuid))
  }
  return []
})

listenStory(version)

const date = computed(() => {
  return useQuoteDate(
    story.value.content.start_quote_date,
    story.value.content.end_quote_date
  )?.value
})

const getImgSrc = (img: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size: '1920x1080' })
}
</script>

<template>
  <div class="pdf">
    <div class="pdf__wrapper">
      <section class="section container pdf__section">
        <div class="pdf__date-wrapper">
          <div class="pdf__date">
            <p class="pdf__date-text">Date of the quote:</p>
            <p class="pdf__date-number">{{ date.startFormattedDate }}</p>
          </div>
          <div class="pdf__date">
            <p class="pdf__date-text">Time left before expiration:</p>
            <p class="pdf__date-number">
              {{ date.timeLeft }} ({{ date.endFormattedDate }})
            </p>
          </div>
        </div>
        <div class="pdf__section-content">
          <p class="pdf__text">{{ story.content.scope }}</p>
          <h2 class="pdf__title">{{ story.content.title }}</h2>
          <p class="pdf__desc">{{ story.content.address }}</p>
        </div>
        <div class="pdf__image">
          <img
            v-if="story?.content?.images[0]?.filename"
            class="pdf__image-img"
            :src="getImgSrc(story.content.images[0].filename)"
            alt="Image"
          />
        </div>
      </section>
      <div class="pdf__product-specifications">
        <ProductSpecifications />
      </div>
      <div class="pdf__included">
        <Included />
      </div>
      <div class="pdf__drawings">
        <Drawings />
      </div>
      <div class="pdf__team">
        <section
          v-if="contacts"
          id="contacts"
          class="section section--pb contacts"
        >
          <div class="container contacts__wrapper">
            <div class="contacts__block">
              <p class="contacts__comments">
                {{ contacts.contacts_text }}
              </p>
              <div class="contacts__card-wrapper">
                <h3 class="contacts__card-title">
                  Contact us with any questions
                </h3>
                <ul v-if="members.length" class="contacts__cards">
                  <Card
                    v-for="member in members"
                    :key="member._uid"
                    :avatar="member.content.user_avatar.filename"
                    :name="member.name"
                    :career="member.content.position"
                    :email="member.content.email"
                    :phone="member.content.phone"
                    :text="member.content.description"
                    :linkedin="member.content.linkedin"
                    class="contacts__card pdf__contacts-card"
                  />
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
