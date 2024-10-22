<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: 'Tooltip'
    },
    position: {
      type: String,
      default: 'bottom'
    },
  })

  const isTooltip = ref(false)

  watch(() => isTooltip.value, () => {
    setTimeout(() => {
      isTooltip.value = false
    }, 3000);
  })

  const classPosition = computed(() => {
    return {
      'bottom': 'translate-y-4 -translate-x-1/2 left-1/2',
      'top': '-translate-y-[220%] -translate-x-1/2 left-1/2',
      'left': '-translate-x-[120%] top-1/2 -translate-y-1/2',
      'right': 'translate-x-[80%] top-1/2 -translate-y-1/2',
      'bottom-left': 'translate-y-4 left-0',
      'bottom-right': 'translate-y-4 right-0',
      'top-left': '-translate-y-[220%] left-0',
      'top-right': '-translate-y-[220%] right-0',
    }[props.position]
  })
</script>

<template>
  <div class="relative cursor-pointer" @mouseover="isTooltip = true" @mouseleave="isTooltip = false">
    <slot></slot>

    <span v-if="isTooltip"
      class="absolute flex justify-center items-center z-30 py-2 px-3 font-medium  bg-black/70  border border-slate-400  rounded-lg shadow-lg shadow-slate-600"
      :class="classPosition">
      <p class="text-white">{{ text }}</p>
    </span>
  </div>
</template>