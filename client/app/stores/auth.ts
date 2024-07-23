import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', () => {
  const modal = reactive({
    isShowRegister: false,
    isShowLogin: false
  })

  const closeRegisterModal = () => {
    modal.isShowRegister = false
  }

  const closeLoginModal = () => { modal.isShowLogin = false }

  const toggleRegisterModal = (event: boolean) => { modal.isShowRegister = event }

  const toggleLoginModal = (event: boolean) => { modal.isShowLogin = event }

  const toggleRegisterToLogin = () => {
    modal.isShowRegister = !modal.isShowRegister
    modal.isShowLogin = !modal.isShowLogin
  }


  return {
    modal,
    toggleRegisterModal,
    toggleRegisterToLogin,
    toggleLoginModal,
    closeRegisterModal,
    closeLoginModal
  }
})
