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
      default: 'Button',
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
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
    type: {
      type: String,
      default: 'button',
      validator: function(value: string) {
        // The value must match one of these strings
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
    :type="type as 'button' | 'submit' | 'reset'"
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