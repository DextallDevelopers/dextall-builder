<script setup lang="ts">
const $inputs = ref([])

const { isAuth } = useAppState()

const formData = reactive({
  hasErrors: true,
  inputs: [
    {
      required: true,
      id: 'name',
      name: 'Name',
      label: 'YOUR NAME',
      type: 'text',
      validation: 'required',
      validationText: 'field cannot be empty',
      error: true,
      value: '',
    },
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
  ],
})

const { onInputValue, onSubmit } = useForm(formData, $inputs, 'Dextall login')

const onLogin = () => {
  window.localStorage.setItem('isAuth', 'true')
  isAuth.value = true
}
</script>

<template>
  <section class="section section--nm login">
    <div class="container login__wrapper">
      <div class="login__main-block">
        <h1 class="login__h1">20-STORY RESIDENTIAL TOWER, NEWARK, NJ</h1>
        <form
          class="login__form"
          novalidate
          @submit.prevent="onSubmit(onLogin)"
        >
          <legend class="login__title">
            Enter your email address below to access the proposal:
          </legend>
          <div class="login__input-wrapper">
            <TheInput
              v-for="input in formData.inputs"
              :id="input.id"
              :key="input.id"
              ref="$inputs"
              class="login__input"
              :type="input.type"
              :placeholder="input.label"
              :required="input.required"
              :validation-text="input.validationText && input.validationText"
              :validation="input.validationText && input.validation"
              @input-value="onInputValue"
            />
          </div>
          <CircleButton class="login__btn">Login</CircleButton>
        </form>
      </div>
      <div class="login__date-wrapper">
        <div class="login__date">
          <p class="login__date-text">Date of the quote:</p>
          <p class="login__date-number">25.10.22</p>
        </div>
        <div class="login__date">
          <p class="login__date-text">Expiration of the quote:</p>
          <p class="login__date-number">25.10.22</p>
        </div>
      </div>
    </div>
  </section>
</template>
