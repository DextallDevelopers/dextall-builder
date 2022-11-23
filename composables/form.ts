import { iInputData } from '~~/composables/input'
import { useAppStore } from '~/store/app'
import { ToastColor } from './toasts'

const URL = null
export const useForm = (
  formData,
  $inputs,
  from = 'Dextall Website',
  URLS = []
) => {
  const FINAL_URLS = [URL, ...URLS]
  const appStore = useAppStore()
  const { addToast } = useToasts()

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

  const onSubmit = async () => {
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
        appStore.setLoading(true)

        FINAL_URLS.forEach(async url => {
          await fetch(url, {
            method: 'POST',
            body: formSendData,
            mode: 'no-cors',
          })
        })
        resolve(inputs)
        addToast({
          color: ToastColor.success,
          id: Date.now().toString(),
          text: 'Form was successfully submitted',
        })
        resetForm()
      } catch (error) {
        console.log(error.message)
        formData.hasErrors = true
        reject(error.message)
        addToast({
          color: ToastColor.danger,
          id: Date.now().toString(),
          text: 'An error has occurred:(',
        })
      } finally {
        setTimeout(() => {
          appStore.setLoading(false)
        }, 400)
      }
    })
  }

  return { onInputValue, onSubmit }
}
