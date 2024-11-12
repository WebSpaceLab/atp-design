export const useModalHelper = () => {
  const isShowLoginModal = useState('show-login-modal', () => false)
  const isShowRegisterModal = useState('show-register-modal', () => false)
  const isShowForgotPasswordModal = useState('show-forget-modal', () => false)

  const toggleLoginModal = () => {
    isShowLoginModal.value = !isShowLoginModal.value
    isShowRegisterModal.value = false
    isShowForgotPasswordModal.value = false
  }

  const toggleRegisterModal = () => {
    isShowRegisterModal.value = !isShowRegisterModal.value
    isShowLoginModal.value = false
    isShowForgotPasswordModal.value = false
  }

  const toggleForgotPasswordModal = () => {
    isShowForgotPasswordModal.value = !isShowForgotPasswordModal.value
    isShowLoginModal.value = false
    isShowRegisterModal.value = false
  }

  const showLoginModal = () => {
    isShowLoginModal.value = true
    isShowRegisterModal.value = false
    isShowForgotPasswordModal.value = false
  }

  return {
    isShowLoginModal,
    isShowRegisterModal,
    isShowForgotPasswordModal,
    toggleLoginModal,
    toggleRegisterModal,
    toggleForgotPasswordModal,
    showLoginModal,
  }
}
