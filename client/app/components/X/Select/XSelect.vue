<script lang="ts" setup>
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
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    required: true
  }
})  

const emit = defineEmits([
    'update:modelValue'
])
</script>

<template>
  <div class="flex items-center space-x-2">
    <label :for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ label }}:</label>

    <select
      :id="name"
      :value="modelValue"
      @input="(event: any) => emit('update:modelValue', event.target.value)"
      class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <template v-for="option in options" :key="option.value">
        <option :value="option.value" :selected="option.selected">{{ option.label }}</option>
      </template>
    </select>
  </div>
</template>