export default function useNavbar() {
  const navbar = useState('navbar', () => ({
    isOpen: false,
    isMobile: false,
    isScroll: false
  }))

  const toggleNavbar = () => {
    navbar.value.isOpen = !navbar.value.isOpen
  }

  const closeNavbar = () => {
    navbar.value.isOpen = false
  }

  const toggleMobile = () => {
    navbar.value.isMobile = !navbar.value.isMobile
  }

  const closeMobile = () => {
    navbar.value.isMobile = false
  }

  const toggleScroll = (toggle: boolean) => {
    navbar.value.isScroll = toggle
  }

  const handleScroll = (navId: string) => {
    const nav = document.getElementById(navId)
    if (nav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > nav!.scrollTop) {
          toggleScroll(true)
        } else {
          toggleScroll(false)
        }
      })
    }
  }

  return {
    navbar,
    toggleNavbar,
    closeNavbar,
    toggleMobile,
    closeMobile,
    toggleScroll,
    handleScroll
  }
}
