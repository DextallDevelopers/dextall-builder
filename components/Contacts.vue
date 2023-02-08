<script setup lang="ts">
import { useQoutesStories } from '~/composables/stories/quotes'
import { useTeamStories } from '~/composables/stories/team'
import { ToastColor } from '~/composables/toasts'

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)
listenStory(version)

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

const { onInputValue, emmitError, resetForm } = useForm(
  formData,
  $inputs,
  'Dextall contacts'
)
const { isWaiting } = useAppState()
const { addToast } = useToasts()
const { postDataToTable } = useMonday()
const isFormActive = ref(false)

const onSubmit = async () => {
  const inputs = formData.inputs
  const isError = inputs.find(el => el.error)

  if (isError) {
    emmitError()
    return
  }

  try {
    isWaiting.value = true

    const columnObj = {
      email: `${inputs[0].value} ${inputs[0].value}`,
      long_text: inputs[1].value,
      text: story.value.content.title,
      text8: story.value.name,
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    const userName = userData?.Name || 'unknown user'

    await postDataToTable('3789633557', userName, columnObj)

    addToast({
      color: ToastColor.success,
      id: Date.now().toString(),
      text: 'Form was successfully submitted',
    })

    resetForm()
  } catch (error) {
    addToast({
      color: ToastColor.danger,
      id: Date.now().toString(),
      text: `Some errors was occured, ${error.message}`,
    })
    console.log(error.message)
    formData.hasErrors = true
  } finally {
    setTimeout(() => {
      isWaiting.value = false
    }, 400)
  }
}

const onChecked = isChecked => {
  isFormActive.value = isChecked.value
}
</script>

<template>
  <section v-if="contacts" id="contacts" class="section section--pb contacts">
    <TheTicker text="Thank you for your business!" class="contacts__ticker" />
    <div class="container contacts__wrapper">
      <div class="contacts__block">
        <p class="contacts__comments">
          {{ contacts.contacts_text }}
        </p>
        <div class="contacts__card-wrapper">
          <h3 class="contacts__card-title">Contact us with any questions</h3>
          <ul
            v-if="members.length"
            class="contacts__cards"
            :class="members.length === 1 && 'contacts__cards--only-one'"
          >
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
          <Checkbox class="contacts__checkbox" @check="onChecked">
            <span class="contacts__checkbox-text"
              >I give my consent to the processing of my personal data.
              <a href="#">Privacy Policy</a>
            </span>
          </Checkbox>
          <CircleButton :disabled="!isFormActive" class="contacts__btn">
            Send
          </CircleButton>
        </form>
      </div>
    </div>
  </section>
</template>
