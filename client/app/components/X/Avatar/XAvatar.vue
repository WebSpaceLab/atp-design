<script lang="ts" setup>
  const props = defineProps({
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'xl'
    },
    to: {
      type: String,
      default: ''
    },
    cursorPointer: {
      type: Boolean,
      default: false
    }
  })

  const sizes =(size: string) => {
    return {
    'xs': 'w-4 h-4',
    'sm': 'w-6 h-6',
    'md': 'w-8 h-8',
    'lg': 'w-12 h-12',
    'xl': 'w-16 h-16',
    '2xl': 'w-20 h-20',
    '3xl': 'w-24 h-24',
    '4xl': 'w-32 h-32',
    '5xl': 'w-40 h-40',
    } [size]
  }

  const go = (to: string) => {
    if (to) {
      navigateTo(to)
    }
  }
</script>

<template>
<div 
  v-if="props.src"
  @click="go(props.to)"
  :class="[
    sizes(props.size),
    props.cursorPointer ? 'cursor-pointer' : 'cursor-default',
  ]" 
  class="inline-block rounded-full ring-2 ring-white overflow-hidden box-border"
>
  <img  :src="props.src" :alt="props.alt"  class="w-full h-full  " >
</div>

</template>