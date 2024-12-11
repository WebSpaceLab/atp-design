<script lang="ts" setup>
import { computed, ref } from 'vue';

// Propsy komponentu
const props = defineProps({
  name: {
    type: String,
    default: 'select'
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    default: () => [] // Przykład: [{ value: 'en', label: 'English' }]
  } as any,
  modelValue: {
    type: Array, // Zmieniono na tablicę, aby obsługiwać wiele wybranych wartości
    required: true
  },
  color: {
    type: String,
    default: 'default' // Kolory: 'default', 'primary', 'secondary', 'error', 'success'
  },
  size: {
    type: String,
    default: 'default' // Rozmiary: 'default', 'xs', 'sm', 'md', 'lg', 'xl'
  },
  error: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false // Domyślnie na true, bo chcemy obsługiwać wybór wielu opcji
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Select options'
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue']);

// Zarządzanie widocznością opcji
const dropdownOpen = ref(false);

// Klasy CSS dla przycisku
const selectClass = computed(() => {
  const baseClass = 'block w-full text-sm border rounded-lg focus:ring focus:border dark:bg-gray-700 dark:border dark:placeholder-gray-400 dark:text-white focus:right-1 focus:outline-none focus:ring-1';
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

// Obsługa zmiany wyboru wielu opcji
function toggleOption(option: any) {
  const isOptionSelected = props.modelValue.includes(option.value);

  if (!isOptionSelected) {
    if (props.multiple) {
      // Znajdź indeks opcji w oryginalnej tablicy options
      const optionIndex = props.options.findIndex((opt: any) => opt.value === option.value);
      
      // Tworzymy nową tablicę z zachowaniem kolejności
      const newValue = [...props.modelValue];
      newValue.push(option.value);
      
      // Sortujemy według kolejności w oryginalnej tablicy options
      const sortedValue = newValue.sort((a: any, b: any) => {
        const indexA = props.options.findIndex((opt: any) => opt.value === a);
        const indexB = props.options.findIndex((opt: any) => opt.value === b);
        return indexA - indexB;
      });
      
      emits('update:modelValue', sortedValue);
    } else {
      emits('update:modelValue', [option.value]);
    }
  } else {
    const filteredValue = props.modelValue.filter((selected: any) => selected !== option.value);
    emits('update:modelValue', filteredValue);
  }
}

// Sprawdzenie, czy opcja jest zaznaczona
function isSelected(option: any) {
  return props.modelValue.some((selected: any) => selected === option.value);
}

// Wyświetlanie zaznaczonych wartości
const selectedLabels = computed(() => {
  return props.modelValue.map((selected: any) => selected).join(' ') || props.placeholder;
});

// onMounted(() => {
//   // przekazanie wartości do selectedLabels
//   props.modelValue.map((selected: any) => selected.label).join(' ') || props.placeholder;
// })
</script>

<template>
  <div class="relative">
    
    <label class="w-full flex items-center space-x-3 text-sm font-medium text-gray-900 dark:text-white">
      <span v-if="label">{{ label }}:</span>
      <!-- Custom dropdown trigger -->
      <div
      :class="selectClass"
      class="cursor-pointer flex justify-between items-center"
      @click="dropdownOpen = !dropdownOpen"
      >
      <span class="truncate">{{ placeholder }}</span>
      <icon name="heroicons-solid:chevron-down" class="w-5 h-5" :class="[dropdownOpen ? '' : 'rotate-90']" />
    </div>
  </label>
  
  <!-- Dropdown lista opcji -->
  <div v-if="dropdownOpen" class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 shadow-lg rounded-lg z-50">
    
    <ul class="max-h-60 overflow-auto ">
      <li
        v-for="option in options"
        :key="option.value"
        class="relative flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
        @click="toggleOption(option)"
      >
        <!-- Checkbox dla wybranej opcji -->
          <icon
            v-if="isSelected(option)"
            name="clarity:success-line"
            class="absolute left-2 w-5 h-5 text-green-500"
          />
          <span class="pl-6 w-full">{{ option.label }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Wyświetlanie błędów, jeśli występują -->
    <div v-if="error" class="w-full text-center text-error-900 text-[14px] font-semibold bg-error-300 p-2 box-border mt-1 rounded">{{ error }}</div>
    <div v-if="dropdownOpen" @click="dropdownOpen = false" class="fixed index-0 right-0 left-0 top-0 bottom-0 z-40"/>
  </div>
</template>
