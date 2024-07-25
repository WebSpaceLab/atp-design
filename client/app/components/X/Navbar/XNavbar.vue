<script setup lang="ts">
  defineProps({
    isShowMenu: {
      type: Boolean,
      default: false,
    },

    container: {
      type: Boolean,
      default: false,
    },
    
    links: {
      type: Array,
      default: () => [],
    },
  })

  const isOpen = ref(false)
  const isMobile = ref(false)
  const isScroll = ref(false)

  const toggleNavbar = () => {
    isOpen.value = !isOpen.value
  }

  const closeNavbar = () => {
    isOpen.value = false
  }

  const toggleMobile = () => {
    isMobile.value = !isMobile.value
  }

  const closeMobile = (event: boolean) => {
    isMobile.value = event
  }

  const toggleScroll = (toggle: boolean) => {
    isScroll.value = toggle
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


  onMounted(() => {
    handleScroll('main-nav')
  });
</script>

<template>
  <nav id="main-nav" class="w-screen backdrop-blur shadow-lg shadow-black box-border" :class="[
    isScroll
      ? 'fixed h-20 top-0 left-0'
      : 'relative h-20 lg:h-30'
  ]">
    <div class="h-full w-full flex items-center justify-center lg:justify-between"
      :class="[container ? 'container mx-auto ' : '']">
      <div class="hidden lg:flex z-20">
        <div class="pl-5 pt-5">
          <slot name="logo" />
        </div>

        <slot name="left" />
      </div>

      <div class="lg:hidden absolute z-10 top-6 left-0 px-3">
        <XTooltip text="Otwórz menu" :popper="{ placement: 'right' }">
          <XBtnCloseToOpen variant="outline" :switcher="isMobile" @click=" toggleMobile()" />
        </XTooltip>
      </div>

      <div class="w-full hidden lg:block">
        <div class="relative w-full flex justify-between items-center" :class="isMobile || isScroll ? 'show-content' : 'hidden-content'
          ">
          <div class="flex w-full mx-auto container h-20 justify-center items-center space-x-10 pr-10">
            <XNavbarMenu :links="links"/>
          </div>

          <div class="w-auto flex justify-end pr-3 space-x-3">
            <div class="flex justify-center items-center space-x-3">
              <XBtnColorMode />
            </div>

            <div class="flex justify-center items-center space-x-3 pr-3 ">
              <slot name="action" />
            </div>

            <div class="flex justify-center items-center space-x-3">
              <slot name="right" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Logo -->
      <div class="lg:hidden absolute top-3">
        <slot name="logo" />
      </div>

      <!-- Mobile left -->
      <div
        class="w-auto absolute top-0 right-0 lg:hidden flex justify-center items-center bg-slate-400/20 rounded-bl-lg box-border">
        <div class="flex justify-center items-center">
          <XBtnColorMode />
        </div>

        <div class="flex justify-center items-center">
          <slot name="action" />
        </div>

        <div class="flex justify-center items-center">
          <slot name="right" />
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition 
      enter-active-class="transition ease-out duration-500" 
      enter-from-class="transform translate-x-[-100%]"
      enter-to-class="transform translate-x-0" 
      leave-active-class="transition ease-in duration-500"
      leave-from-class="transform translate-x-0" 
      leave-to-class="transform translate-x-[-100%]"
    >
      <div v-if="isMobile"
        class="h-screen w-full fixed top-0 left-0 lg:hidden z-60 bg-white dark:bg-slate-900 box-border">
        <div class="w-full h-full relative flex flex-col justify-center items-center">


          <div class="mt-10 w-full h-full flex flex-col justify-center items-between">
            <div class="w-full h-40 flex justify-center items-end">
              <slot name="logo" />
            </div>

            <div class="w-full h-full flex flex-col justify-start items-center space-y-3 pt-20">
              <XNavbarMenu :links="links" @close-mobile="closeMobile" />

              <div>
                <slot name="action" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>