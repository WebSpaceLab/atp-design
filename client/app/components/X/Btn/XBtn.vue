<script lang="ts" setup>
  import type { PropType } from 'vue';

  defineProps({
    color: {
      type: String as PropType<'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'red' | 'blue' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'orange' | 'green' | 'teal' | 'cyan' | 'black' | 'gray' | 'dark'>,
      default: 'default',
      validator: function(value: string) {
        return ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'red' , 'blue', 'yellow', 'indigo', 'purple', 'pink', 'orange', 'green', 'teal', 'cyan', 'black', 'gray', 'dark'].indexOf(value) !== -1;
      }
    },
    size: {
      type: String as PropType<'default' | 'sm' | 'md' | 'lg'>,
      default: 'default',
      validator: function(value: string) {
        return ['default', 'sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },
    variant: {
      type: String as PropType<'default' | 'solid' | 'outline' | 'ghost' | 'link'>,
      default: 'default',
      validator: function(value: string) {
        return ['default', 'solid', 'outline', 'ghost', 'link'].indexOf(value) !== -1;
      }
    },
    rounded: {
      type: String as PropType<'default' | 'none' | 'sm' | 'md' | 'lg' | 'full'>,
      default: 'default',
      validator: function(value: string) {
        return ['default', 'none', 'sm', 'md', 'lg', 'full'].indexOf(value) !== -1;
      }
    },
    label: {
      type: String as PropType<string>,
      default: 'Button',
    },
    icon: {
      type: String as PropType<string>,
      default: '',
    },
    iconPosition: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
      validator: function(value: string) {
        return ['left', 'right'].indexOf(value) !== -1;
      },
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    square: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    shadow: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    block: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
      validator: function(value: string) {
        return ['button', 'submit', 'reset'].indexOf(value) !== -1;
      },
    },
  });

  const { ripple, rippleClick, setColorForRipple, setVariant, setSize, setRounded, setIconPosition, useSizeIcon } = useBtnStyles();
</script>

<template>
  <button
    class="flex justify-center items-center relative transition duration-150 ease-out tracking-wider focus:ring-focus overflow-hidden"
    :class="[
      setVariant(variant, color, disabled),
      setSize(size, square, block, variant),
      { 'shadow shadow-slate-600': shadow },
      setRounded(rounded),
      setIconPosition(iconPosition),
    ]" 
    :type="type"
    :disabled="disabled"
    @click="rippleClick"
  >
    <span v-if="ripple" class="btn-ripple" :class="setColorForRipple(color)" />
    <!-- @vue-ignore -->
    <Icon 
      v-if="!loading || icon !== ''" 
      :name="icon" 
      :class="[
        useSizeIcon(size),
        { 'mr-2': iconPosition === 'left' && !square },
        { 'ml-2': iconPosition === 'right' && !square },
      ]" 
    />
    
    <!-- @vue-ignore -->
    <Icon 
      v-if="loading" 
      name="eos-icons:bubble-loading" 
      :class="[
        useSizeIcon(size),
        { 'mr-2': iconPosition === 'left' && !square },
        { 'ml-2': iconPosition === 'right' && !square },
      ]"
     />

     <slot v-if="!square">{{ label }}</slot>
     <slot v-else name="img"></slot>
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