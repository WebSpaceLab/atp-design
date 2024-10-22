<script setup>
const { sidebar } = useSidebar()
const { navbar } = useNavbar()
const route = useRoute()
const links = ref([])

onMounted(() => {
  sidebar.value.links.forEach((link) => {
    if (link.name === route.name) {
      links.value = link.tree
    }
  })
})
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="transform -translate-y-12"
        enter-to-class="transform  translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-12"
    >
        <header
            v-if="sidebar.isShowHelperBar"
            :class="[
                // $navbar.isScroll ? 'fixed top-20' : 'relative w-full',
                sidebar.isShow ?
                    sidebar.isRail ?
                        'md:w-[calc(100%-110px)] fixed top-20' : 'md:w-[calc(100%-280px)] fixed top-20'
                        : '',
                sidebar.isRightSide ? 'left-0' : 'right-0',
            ]"
            class="z-20 fixed top-20 w-full flex flex-col md:flex-row pl-4 pr-6 space-y-2 justify-between items-end box-border rounded-xl transition-all duration-500"
        >
            <div class="h-full hidden md:block  -translate-x-2 translate-y-3">
              <XBreadcrumb :links="links" icon />
                <slot name="left"/>
            </div>

            <div class="h-full flex justify-center items-center p-2 transition-all duration-500 rounded-lg  space-x-3 box-border" :class="navbar.isScroll ? 'bg-second-light/70 dark:bg-second-dark/90' : ''">
                <slot name="right"/>
            </div>
        </header>
    </transition>
</template>
