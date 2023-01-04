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

const { stories: team } = await useTeamStories()

const contacts = computed(() => {
  return story.value.content.contacts[0]
})

const members = computed(() => {
  return team.value.filter(el => contacts.value.team.includes(el.uuid))
})

const $inputs = ref([])
const formData = reactive({
  hasErrors: true,
  inputs: [
    {
      required: true,
      id: 'email',
      name: 'Email',
      label: 'YOUR EMAIL',
      type: 'email',
      validation: 'email',
      validationText: 'incorrect email',
      error: true,
      value: '',
    },
    {
      required: true,
      id: 'help',
      name: 'Help',
      label: 'HOW WE CAN HELP YOU?',
      type: 'text',
      validation: 'required',
      validationText: 'field cannot be empty',
      error: true,
      value: '',
    },
  ],
})

const { onInputValue, onSubmit } = useForm(
  formData,
  $inputs,
  'Dextall contacts'
)
</script>

<template>
  <section id="contacts" class="section section--pb contacts">
    <TheTicker text="Thank you for your business!" class="contacts__ticker" />
    <div class="container contacts__wrapper">
      <div class="contacts__block">
        <p class="contacts__comments">
          We would like to hear from you. Any comments or questions that you
          might have, please feel free to ask at anytime.
        </p>
        <div class="contacts__card-wrapper">
          <h3 class="contacts__card-title">Contact us with any questions</h3>
          <ul class="contacts__cards">
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
              class="contacts__card"
            />
          </ul>
        </div>
      </div>
      <div class="contacts__form-wrapper">
        <form class="contacts__form" novalidate @submit.prevent="onSubmit">
          <legend class="contacts__title">Send us a message</legend>
          <div class="contacts__input-wrapper">
            <TheInput
              v-for="input in formData.inputs"
              :id="input.id"
              :key="input.id"
              ref="$inputs"
              class="contacts__input"
              :type="input.type"
              :placeholder="input.label"
              :required="input.required"
              :validation-text="input.validationText && input.validationText"
              :validation="input.validationText && input.validation"
              @input-value="onInputValue"
            />
          </div>
          <CircleButton class="contacts__btn">Send</CircleButton>
        </form>
      </div>
    </div>
  </section>
</template>
