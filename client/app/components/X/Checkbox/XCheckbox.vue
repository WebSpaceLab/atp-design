<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'default', // Możliwe wartości: 'default', 'primary', 'secondary', 'error', 'success'
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const toggleCheck = (event) => {
  if (!props.disabled) {
    emit('update:modelValue', event.target.checked);
  }
};

const checkboxClasses = computed(() => {
  return [
    'form-checkbox h-5 w-5 transition duration-150 ease-in-out',
    {
      'text-primary-600 border-gray-300 focus:ring-primary-500': props.color === 'default',
      'text-primary-600 border-gray-300 focus:ring-primary-500': props.color === 'primary',
      'text-success-600 border-gray-300 focus:ring-success-500': props.color === 'success',
      'text-error-600 border-gray-300 focus:ring-error-500': props.color === 'error',
      'text-secondary-600 border-gray-300 focus:ring-secondary-500': props.color === 'secondary',
    },
    props.disabled ? 'cursor-not-allowed opacity-50' : '',
  ];
});

const labelClasses = computed(() => {
  return [
    'flex items-center cursor-pointer text-sm font-medium text-basic-900 dark:text-basic-100',
    props.disabled ? 'cursor-not-allowed opacity-50' : ''
  ];
});
</script>

<template>
  <div class="flex items-center">
    <label :class="labelClasses">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="toggleCheck"
        :disabled="disabled"
        :class="checkboxClasses"
        class="form-checkbox h-5 w-5 transition duration-150 ease-in-out rounded-2xl"
      />
      <span class="ml-2">{{ label }}</span>
    </label>
  </div>
</template>
