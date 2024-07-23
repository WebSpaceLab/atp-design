<script lang="ts" setup>
  defineProps({
    color: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    variant: {
      type: String,
      default: 'default',
    },
    rounded: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    type: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    tooltip: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  });

  const ripple = ref(false);

  function setSize(s: string, sq: boolean, b: boolean) {
    if (b) {
      return {
        'default': 'text-md font-semibold  w-full py-2',
        'xs': 'text-xs font-semibold  w-full py-2',
        'sm': 'text-sm font-semibold  w-full py-2',
        'md': 'text-md font-semibold  w-full py-3',
        'lg': 'text-lg font-semibold  w-full py-4',
        'xl': 'text-xl font-semibold  w-full py-4',

      }[s];
    }

    if (sq) {
      return {
        'default': 'text-base font-semibold w-9 h-9',
        'xs': 'text-xs font-semibold w-7 h-7',
        'sm': 'text-sm font-semibold w-8 h-8',
        'md': 'text-md font-semibold w-9 h-9',
        'lg': 'text-lg font-semibold w-11 h-11',
        'xl': 'text-xl font-semibold w-12 h-12',
      }[s];
    }

    return {
      'default': 'text-base font-semibold py-2 px-4',
      'xs': 'text-xs font-semibold py-1 px-2',
      'sm': 'text-sm font-semibold py-1 px-2',
      'md': 'text-md font-semibold py-1 px-3',
      'lg': 'text-lg font-semibold py-2 px-4',
      'xl': 'text-xl font-semibold py-2 px-4',
    }[s];
  }

  function useSizeIcon(s: string) {
    return {
      'default': 'text-xl',
      'xs': 'text-lg',
      'sm': 'text-lg',
      'md': 'text-xl',
      'lg': 'text-2xl',
      'xl': 'text-2xl',
    }[s];
  }

  function setVariant(v: string, c: string, d: boolean) {
    if (d) {
      return 'cursor-not-allowed bg-slate-200 text-slate-400';
    }

    return {
      'default': useColor(c),
      'solid': useColor(c),
      'outline': useColor(c + '-outline'),
      'link': useColor(c + '-link'),
      'ghost': useColor(c + '-ghost'),
      'light': useColor(c + '-light'),
    }[v];
  }

  function setRounded(r: string) {
    return {
      'default': 'rounded-md',
      'none': 'rounded-none',
      'sm': 'rounded-ms',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      'full': 'rounded-full',
    }[r];
  }

  function setIconPosition(params: type) {
    return {
      'default': 'flex-row',
      'left': 'flex-row',
      'right': 'flex-row-reverse',
    }[params];
  }

  function setColorForRipple(c: string) {
    return useColor(c + '-ripple');
  }

  function rippleClick() {
    ripple.value = !ripple.value;

    setTimeout(() => {
      ripple.value = !ripple.value;
    }, 300);
  }
</script>

<template>
  <button
    class="flex justify-center items-center relative transition duration-150 ease-out tracking-wider focus:ring-focus overflow-hidden"
    :class="[
      setVariant(variant, color, disabled),
      setSize(size, square, block),
      { 'shadow shadow-slate-600': shadow },
      setRounded(rounded),
      setIconPosition(iconPosition),
    ]" :type="type" @click="rippleClick">
    <span v-if="ripple" class="btn-ripple" :class="setColorForRipple(color)" />

    <Icon v-if="!loading" :name="icon" :class="[
      useSizeIcon(size),
      { 'mr-2': iconPosition === 'left' && !square },
      { 'ml-2': iconPosition === 'right' && !square },
    ]" />

    <Icon v-else name="eos-icons:bubble-loading" :class="[
      useSizeIcon(size),
      { 'mr-2': iconPosition === 'left' && !square },
      { 'ml-2': iconPosition === 'right' && !square },
    ]" />


    <slot v-if="!square">{{ label }}</slot>
  </button>
</template>

<style scoped>
  .btn-ripple {
    position: absolute;
    width: 3px;
    height: 3px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    animation: ripple-btn 0.3s linear infinite;
    z-index: 7;
    top: 50%;
    left: 50%;
  }

  @keyframes ripple-btn {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }

    25% {
      width: 50%;
      height: 100%;
      opacity: 0.8;
    }

    50% {
      width: 100%;
      height: 200%;
      opacity: 0.6;
    }

    75% {
      width: 150%;
      height: 300%;
      opacity: 0.4;
    }

    100% {
      width: 200%;
      height: 400%;
      opacity: 0.2;
    }
  }
</style>