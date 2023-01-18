<script setup lang="ts">
import { ToastColor } from '~/composables/toasts'

interface iProps {
  title?: string
  version?: string
  startQuoteDate?: string
  endQuoteDate?: string
}

interface iUser {
  Name?: string
  Email?: string
}

const props = defineProps<iProps>()

const $inputs = ref([])

const { isAuth } = useAppState()
const { addToast } = useToasts()
const isFormActive = ref(false)

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

const { onInputValue, emmitError, resetForm } = useForm(
  formData,
  $inputs,
  'Dextall login'
)
const { isWaiting } = useAppState()

const onLogin = async () => {
  const inputs = formData.inputs
  const isError = inputs.find(el => el.error)

  if (isError) {
    emmitError()
    return
  }

  try {
    isWaiting.value = true
    // const { getDataFromTable, postDataToTable } = useAirtable()

    // const users = (await getDataFromTable('Users')) as iUser[]

    const newUserData = {
      Name: formData.inputs[0].value,
      Email: formData.inputs[1].value,
    }

    const { getDataFromTable, postDataToTable } = useMonday()

    const users = (await getDataFromTable('3789599018')) as iUser[]

    const updatedUsers = users
      .filter(user => user.Email)
      .map(user => user.Email)

    if (updatedUsers.includes(formData.inputs[1].value)) {
      addToast({
        color: ToastColor.success,
        id: Date.now().toString(),
        text: `Welcome back, ${newUserData.Name}`,
      })

      window.localStorage.setItem('isAuth', 'true')
      window.localStorage.setItem('user', JSON.stringify(newUserData))
      window.localStorage.setItem('authTimestamp', Date.now().toString())

      isAuth.value = true
      resetForm()
      return
    } else {
      const columnObj = {
        email: `${newUserData.Email} ${newUserData.Email}`,
        text97: props.title,
        text7: props.version,
      }
      await postDataToTable('3789599018', newUserData.Name, columnObj)

      addToast({
        color: ToastColor.success,
        id: Date.now().toString(),
        text: `You have successfully logged in, ${newUserData.Name}`,
      })

      window.localStorage.setItem('user', JSON.stringify(newUserData))
      window.localStorage.setItem('isAuth', 'true')
      window.localStorage.setItem('authTimestamp', Date.now().toString())
      isAuth.value = true
      resetForm()
    }
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

const { startFormattedDate, timeLeft, endFormattedDate } = useQuoteDate(
  props.startQuoteDate,
  props.endQuoteDate
)

const onChecked = isChecked => {
  isFormActive.value = isChecked.value
}
</script>

<template>
  <section class="section section--nm login">
    <div class="container login__wrapper">
      <div class="login__main-block">
        <h1 class="login__h1">{{ title }}</h1>
        <form class="login__form" novalidate @submit.prevent="onLogin">
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
          <Checkbox class="login__checkbox" @check="onChecked">
            <span class="login__checkbox-text"
              >I give my consent to the processing of my personal data.
              <a href="#">Privacy Policy</a>
            </span>
          </Checkbox>
          <CircleButton :disabled="!isFormActive" class="login__btn">
            Login
          </CircleButton>
        </form>
      </div>
      <div class="login__date-wrapper">
        <div class="login__date">
          <p class="login__date-text">Date of the quote:</p>
          <p class="login__date-number">{{ startFormattedDate }}</p>
        </div>
        <div class="login__date">
          <p class="login__date-text">Expiration of the quote:</p>
          <p class="login__date-number">
            {{ timeLeft }} ({{ endFormattedDate }})
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
