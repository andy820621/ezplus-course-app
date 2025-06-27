import { reactive } from 'vue'

interface ToastState {
  visible: boolean
  type: 'success' | 'error'
  title: string
  message?: string
}

const toastState = reactive<ToastState>({
  visible: false,
  type: 'success',
  title: '',
  message: '',
})

export function useToast() {
  function showToast(type: 'success' | 'error', title: string, message?: string) {
    toastState.visible = true
    toastState.type = type
    toastState.title = title
    toastState.message = message

    setTimeout(() => {
      hideToast()
    }, 2400)
  }

  function hideToast() {
    toastState.visible = false
  }

  function showSuccess(title: string, message?: string) {
    showToast('success', title, message)
  }

  function showError(title: string, message?: string) {
    showToast('error', title, message)
  }

  return {
    toastState,
    showToast,
    hideToast,
    showSuccess,
    showError,
  }
}
