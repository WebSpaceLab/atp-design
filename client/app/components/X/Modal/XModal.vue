<script setup>
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: '2xl',
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    overflowHidden: {
      type: Boolean,
      default: true
    },
    minimization: {
      type: Boolean,
      default: false,
    }
  });

  const emit = defineEmits(['close']);


  watch(() => props.show, () => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = null;
    }
  });

  // watch(() => props.minimization, () => {
  //     console.log(props.minimization)
  //     // if (minimization) {
  //     //     props.show = false
  //     // } 
  // })

  const close = () => {
    if (props.closeable) {
      emit('close', false);
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
      close();
    }
  };

  onMounted(() => document.addEventListener('keydown', closeOnEscape));

  onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
  });

  const maxWidthClass = computed(() => {
    return {
      'sm': ' sm:w-full sm:max-w-sm',
      'md': ' sm:w-full sm:max-w-md',
      'lg': ' sm:w-full sm:max-w-lg',
      'xl': ' sm:w-full sm:max-w-xl',
      '2xl': ' sm:w-full sm:max-w-2xl',
      '3xl': ' sm:w-full sm:max-w-3xl',
      '4xl': ' sm:w-full sm:max-w-4xl',
      '5xl': ' sm:w-full sm:max-w-5xl',
      '6xl': ' sm:w-full sm:max-w-6xl',
      '7xl': ' sm:w-full sm:max-w-7xl',
      'max': 'inset-0'
    }[props.maxWidth];
  });

</script>

<template>
  <teleport to="body">
    <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-600" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-show="show" class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center    z-40"
        scroll-region>
        <transition enter-active-class="ease-out duration-600" enter-from-class="opacity-0" enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-show="show" class="fixed w-screen h-screen inset-0 transform transition-all z-40 bg-black/50"
            @click="close">
            <div class="absolute inset-0  " />
          </div>
        </transition>

        <transition enter-active-class="transition ease-in duration-500" enter-from-class="transform -translate-x-100"
          enter-to-class="transform translate-x-0" leave-active-class="transition ease-in duration-100"
          leave-from-class="transform translate-x-0" leave-to-class="transform translate-x-100">
          <div v-show="show"
            class=" bg-background-light dark:bg-background-dark m-4 shadow-xl shadow-black transform transition-all sm:mx-auto z-50 border-solid border-1 border-gray-300 dark:border-gray-700 rounded-lg"
            :class="[
              maxWidthClass,
              overflowHidden ? 'overflow-hidden' : ''
            ]">
            <slot />
          </div>
        </transition>
      </div>

    </transition>
  </teleport>
</template>