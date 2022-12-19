<script setup lang="ts">
const team = ref([
  {
    name: 'Laurynas Skominas',
    career: 'BID manager',
    email: 'laurynas@dextall.com',
    phone: '+370-614-26296',
    text: 'Aurimas Sabulis is a serial entrepreneur in the construction and technology sectors, committed to creating a high-performing, resilient, and sustainable built environment through industrial transformation',
    linkedin: 'https://www.linkedin.com/',
  },
])

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
  <section
    id="contacts"
    class="section section--pb contacts"
  >
    <TheTicker
      text="Thank you for your business!"
      class="contacts__ticker"
    />
    <div class="container contacts__wrapper">
      <div class="contacts__block">
        <p class="contacts__comments">
          We would like to hear from you. Any comments or questions that you
          might have, please feel free to ask at anytime.
        </p>
        <div class="contacts__card-wrapper">
          <h3 class="contacts__card-title">
            Contact your personal sales representative:
          </h3>
          <Card
            v-for="(member, idx) in team"
            :key="idx"
            :name="member.name"
            :career="member.career"
            :email="member.email"
            :phone="member.phone"
            :text="member.text"
            :linkedin="member.linkedin"
            class="contacts__card"
          />
        </div>
      </div>
      <div class="contacts__form-wrapper">
        <form
          class="contacts__form"
          novalidate
          @submit.prevent="onSubmit"
        >
          <legend class="contacts__title">Or send to us a message:</legend>
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
