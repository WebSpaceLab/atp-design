<script lang="ts" setup>
const { navbar, handleScroll } = useNavbar()
const { sidebar, toggleShowMenuBar } = useSidebar()

onMounted(() => {
  handleScroll('main-nav-dashboard')
});
</script>

<template>
  <div
    id="main-nav-dashboard"
    :class="[
      navbar.isScroll ? 'fixed top-0 left-0' : 'fixed top-0 left-0',
    ]"
    class="w-screen z-40 box-border h-20 transition-all duration-500 bg-background dark:bg-background-dark shadow-black shadow-lg"
  >
    <div class="h-full flex items-center justify-center lg:justify-between">
      <div class="relative  hidden lg:flex">
        <slot name="bar" />
      </div>

      <div  class="lg:hidden absolute top-6 left-0">
        <slot name="bar" />
      </div>

      <div class="w-full hidden lg:block ">
        <div class="relative w-full flex justify-around items-center">
          <div class="flex w-full justify-center items-center space-x-10 ">
            <slot name="content" />
          </div>

          <div class="w-70 flex justify-end items-center pr-6 space-x-3 box-border">
            <div class="flex justify-center items-center space-x-3">
              <XTooltip :text="sidebar.isShowMenuBar ? 'Close side bar helper' : 'Open side bar helper'" position="bottom">
                <x-btn  @click="toggleShowMenuBar()" color="primary" variant="ghost" square :icon="sidebar.isShowMenuBar ? 'i-material-symbols-right-panel-close-sharp' : 'i-material-symbols-light-left-panel-open-rounded' "/>
              </XTooltip>

              <XBtnColorMode />
            </div>

            <div class="flex justify-center items-center space-x-3 pr-3 ">
              <slot name="action" />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-5 right-5 lg:hidden flex justify-center items-center mr-4">
        <div class="flex justify-center items-center space-x-3">
          <XTooltip :text="sidebar.isShowMenuBar ? 'Close side bar' : 'Open side bar'" :position="sidebar.isRightSide ? 'right' : 'left'">
            <x-btn  @click="toggleShowMenuBar()" color="primary" variant="ghost" square :icon="sidebar.isShowMenuBar ? 'i-material-symbols-right-panel-close-sharp' : 'i-material-symbols-light-left-panel-open-rounded' "/>
          </XTooltip>

          <XBtnColorMode />
        </div>

        <div class="flex justify-center items-center space-x-3 pr-3 ">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>
