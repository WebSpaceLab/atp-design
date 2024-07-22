<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      default: 'Click'
    },
    link: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'relative',
    },
    target: String,
    ring: {
      type: Boolean,
      default: false
    },
    rel: String,
    tooltip: Object,
    strip: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    basic: {
      type: Boolean,
      default: false
    },
    dashed: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: ''
    },
  })

  const ripple = ref(false);
  const isTooltip = ref(false);

  function rippleClick() {
    ripple.value = !ripple.value;

    setTimeout(() => {
      ripple.value = !ripple.value;
    }, 300);
  }

  watch(() => isTooltip.value, () => {
    setTimeout(() => {
      isTooltip.value = false
    }, 3000);
  })
</script>

<template>
  <button
    class="relative transition duration-150 ease-out font-bold cursor-pointer tracking-wider focus:ring-focus box-border"
    :class="[
      color !== '' && !strip ? disabled ? 'btn-disabled' : `btn-${color}` : '',
      basic ? 'hover:bg-hover-800 hover:text-hover-400 hover:border-hover-800' : '',
      shadow ? 'shadow-lg' : '',
      dashed ? 'border-dashed' : '',
      ring ? 'rounded-full' : '',
      strip ?
        color !== '' ? `border-none bg-transparent btn-${color}-text` : 'border-none bg-transparent hover:text-hover-400'
        : '',
      icon ? `btn-size-${size}` : 'px-4 py-2',
      rounded ? `rounded-lg` : '',
      position ? position : '',
      ripple ? 'overflow-hidden' : '',
    ]" :type="type" :disabled="disabled" @click="rippleClick" @mouseover="isTooltip = true"
    @mouseleave="isTooltip = false">
    <ClientOnly>
      <NuxtLink v-if="link" class="no-underline bg-transparent text-inherit flex justify-center items-center" :to="to"
        :rel="rel" :target="target">
        <span :class="ripple ? color !== '' ? `btn-ripple btn-ripple-${color}` : 'btn-ripple bg-white/70' : ''" />

        <span v-if="icon">
          <slot :name="icon ? 'icon' : false" />
        </span>

        <span v-else class="flex justify-center items-center space-x-2">
          <span v-if="iconLeft">
            <slot name="icon-left" />
          </span>

          <span>
            <slot>{{ text }}</slot>
          </span>

          <Icon v-if="loading" name="eos-icons:bubble-loading" />

          <span v-if="iconRight">
            <slot name="icon-right" />
          </span>
        </span>
      </NuxtLink>

      <div v-else>
        <span :class="ripple ? color !== '' ? `btn-ripple btn-ripple-${color}` : 'btn-ripple bg-white/70' : ''" />

        <span v-if="icon && ring">
          <slot :name="icon ? 'icon' : false" />
        </span>

        <span v-else class="flex justify-center items-center space-x-2">
          <span v-if="iconLeft">
            <slot name="icon-left" />
          </span>

          <span>
            <slot>{{ text }}</slot>
          </span>

          <Icon v-if="loading" name="eos-icons:bubble-loading" />

          <span v-if="iconRight">
            <slot name="icon-right" />
          </span>
        </span>
      </div>

      <x-tooltip v-if="tooltip && isTooltip" :position="tooltip.position" :text="tooltip.text"
        class="text-xs text-slate-300 w-max" />
    </ClientOnly>
  </button>
</template>

<style scoped>
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