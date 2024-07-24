export function useUseAuthTools() {
  const state = useState('modal_auth', () => ({
    isShowRegister: false,
    isShowLogin: false
  }))

  const closeRegisterModal = () => {
    state.value.isShowRegister = false
  }

  const closeLoginModal = () => { state.value.isShowLogin = false }

  const toggleRegisterModal = (event: boolean) => { state.value.isShowRegister = event }

  const toggleLoginModal = (event: boolean) => { state.value.isShowLogin = event }

  const toggleRegisterToLogin = () => {
    state.value.isShowRegister = !state.value.isShowRegister
    state.value.isShowLogin = !state.value.isShowLogin
  }


  return {
    state,
    toggleRegisterModal,
    toggleRegisterToLogin,
    toggleLoginModal,
    closeRegisterModal,
    closeLoginModal
  }
}
