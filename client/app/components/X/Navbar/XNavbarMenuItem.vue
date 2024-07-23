<script lang="ts" setup>
  defineProps({
    link: {
      type: Object,
      required: true,
    },

  })

  const { closeMobile } = useNavbar()

  const open = ref(false)
</script>

<template>
  <div>
    <XLink v-if="!link.children" :to="link.to" @click="closeMobile">
      {{ link.label }}
    </XLink>

    <div v-else class="relative duration-300" @mouseenter="open = true" @mouseleave="open = false">
      <div class="flex items-center space-x-2">
        <XLink :to="link.to" active-class="text-primary" @click="closeMobile">
          {{ link.label }}
        </XLink>

        <Icon v-if="link.children" :class="open ? 'rotate-90 ' : 'rotate-0'"
          class="text-gray-500 dark:text-gray-400 transform duration-300" name="heroicons-solid:chevron-right"
          @click="open = !open" />
      </div>

      <transition enter-active-class="transition ease-out duration-300"
        enter-from-class="transform translate-x-[-100%] opacity-0" enter-to-class="transform  translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-300 " leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-[-100%] opacity-0">
        <div v-if="open" class="relative lg:absolute pt-4 lg:-translate-x-4 duration-300">
          <div
            class="backdrop-blur shadow-lg shadow-black box-border bg-white/80 dark:bg-slate-900/80 py-2 px-4 rounded">
            <!--
              TODO: Fix this Navbar links children in vertical navigation
              <UVerticalNavigation :links="link.children" />
            -->
          </div>
        </div>
      </transition>

    </div>

  </div>
</template>
