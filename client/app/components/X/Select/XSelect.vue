<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'select'
  },
  label: {
    type: String,
    default: 'Label' 
  },
  options: {
    type: Array,
    default: () => [] // Możliwe wartości: [{ value: 'en', label: 'English', selected: false }]
  },
  modelValue: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'default' // Możliwe wartości: 'default', 'primary', 'secondary', 'error', 'success'
  },
  size: {
    type: String,
    default: 'default' // Możliwe wartości:'default', 'xs', 'sm', 'md', 'lg', 'xl'
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const selectClass = computed(() => {
  const baseClass = 'block w-full text-sm border rounded-lg focus:ring focus:border dark:bg-gray-700 dark:border dark:placeholder-gray-400 dark:text-white';
  const colorClass = {
    'default': 'text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500',
    'primary': 'text-white bg-blue-500 border-blue-500 focus:ring-blue-700 focus:border-blue-700',
    'secondary': 'text-white bg-gray-500 border-gray-500 focus:ring-gray-700 focus:border-gray-700',
    'error': 'text-white bg-red-500 border-red-500 focus:ring-red-700 focus:border-red-700',
    'success': 'text-white bg-green-500 border-green-500 focus:ring-green-700 focus:border-green-700'
  }[props.color];

  const sizeClass = {
    'default': 'p-2 text-base',
    'xs': 'p-1 text-xs',
    'sm': 'p-1.5 text-sm',
    'md': 'p-2 text-md',
    'lg': 'p-2.5 text-lg',
    'xl': 'p-3 text-xl'
  }[props.size];

  return `${baseClass} ${colorClass} ${sizeClass}`;
});
</script>

<template>
  <div class="block">
    <label class="w-full flex items-center space-x-3 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}:
      <select
        :value="modelValue"
        @change="(event: any) => emit('update:modelValue', event.target.value)"
        :class="selectClass"
      >
        <option v-if="options" v-for="option in options as any" :key="option.value" :value="option.value" :selected="option.selected">
          {{ option.label }}
        </option>
      </select>
    </label>

    <div v-if="error" class="w-full text-center text-error-900 text-[14px] font-semibolds bg-error-300 p-2 box-border mt-1 rounded">{{ error }}</div>
  </div>
</template>
