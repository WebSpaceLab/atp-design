<script setup lang="ts">
  const { sidebar } = useSidebar()

  defineProps({
    container: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  });

  const isShowSettingsSidebar = ref(false)

  function openSettingsSidebar () {
    isShowSettingsSidebar.value = true
  }

  function closeSettingsSidebar () {
    isShowSettingsSidebar.value = false
  }
</script>

<template>
  <section
    class="relative w-full h-full transition-all duration-500 box-border"
    :class="[
      sidebar.isShow ?
        sidebar.isRail ? 'lg:w-[calc(100%-110px)]' : 'lg:w-[calc(100%-280px)]'
        : '',
      container ? 'container mx-auto max-w-7xl' : ''
    ]"
  >
    <!-- Header -->
    <XDashboardPageHeader>
      <template #left>
        <slot name="header-left" />
      </template>

      <template #right>
        <div class="flex items-center">
          <div class="flex justify-end  space-x-3">
            <slot name="header-right"/>

            <XTooltip text="Settings">
              <XBtn
                color="primary"
                variant="ghost"
                square
                @click="openSettingsSidebar()"
                icon="i-line-md-cog-filled-loop"
              />
            </XTooltip>
          </div>
        </div>
      </template>
    </XDashboardPageHeader>

    <div class="w-full px-4  lg:px-6 box-border transition-all duration-500" :class="sidebar.isShowHelperBar ? 'mt-36' : 'mt-20'">
      
      <transition
        enter-active-class="transition ease-out duration-600"
        enter-from-class="transform  opacity-0 "
        enter-to-class="transform opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform  opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-if="!loading">
          <slot name="main" />
        </div>

        <XLoadingPage v-else :loading="loading" />
      </transition>
    </div>

    <div
      v-if="isShowSettingsSidebar"
      class="w-screen h-screen fixed top-0 right-0 z-40 bg-slate-800/40 cursor-pointer"
      @click="closeSettingsSidebar()"
    />

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform  translate-x-96"
      enter-to-class="transform  translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="transform  translate-x-0"
      leave-to-class="transform  translate-x-96"
    >
      <div v-if="isShowSettingsSidebar"  class="fixed top-0 right-0 w-2/3 lg:w-200 h-screen shadow-lg shadow-black bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 backdrop-blur z-50 border-solid border-green-500">
        <slot name="sidebar" />
      </div>
    </transition>

  
  </section>
</template>
