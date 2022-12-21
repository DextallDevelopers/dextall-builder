import { iInputData } from '~~/composables/input'

import { ToastColor } from './toasts'

const URL = null
export const useForm = (
  formData: { inputs: any[]; hasErrors: boolean },
  $inputs: { value: any[] },
  from = 'Dextall Website',
  URLS = []
) => {
  const FINAL_URLS = [URL, ...URLS]

  const { addToast } = useToasts()

  const { isWaiting } = useAppState()

  const emmitError = () => {
    $inputs.value.forEach(input => input.throwError())
  }

  const resetForm = () => {
    formData.inputs?.forEach(inp => {
      inp.error = true
      inp.value = ''
    })

    $inputs.value.forEach(input => input.reset())
    formData.hasErrors = false
  }

  const onInputValue = (data: iInputData) => {
    const idx = formData.inputs.findIndex(el => el.id === data.id)
    formData.inputs[idx].value = data.value
    formData.inputs[idx].error = data.error
  }

  const onSubmit = async cb => {
    return new Promise(async (resolve, reject) => {
      const inputs = formData.inputs
      const isError = inputs.find(el => el.error)

      if (isError) {
        emmitError()
        return
      }

      const formSendData = new FormData()

      formSendData.append('From:', from)
      inputs.forEach(el => {
        formSendData.append(el.name, el.value)
      })

      try {
        isWaiting.value = true
        cb()
        // FINAL_URLS.forEach(async url => {
        //   await fetch(url, {
        //     method: 'POST',
        //     body: formSendData,
        //     mode: 'no-cors',
        //   })
        // })
        // resolve(inputs)
        // addToast({
        //   color: ToastColor.success,
        //   id: Date.now().toString(),
        //   text: 'Form was successfully submitted',
        // })
        resetForm()
      } catch ({ message }) {
        console.log(message)
        formData.hasErrors = true
        reject(message)
        addToast({
          color: ToastColor.danger,
          id: Date.now().toString(),
          text: 'An error has occurred:(',
        })
      } finally {
        setTimeout(() => {
          isWaiting.value = false
        }, 400)
      }
    })
  }

  return { onInputValue, onSubmit }
}
