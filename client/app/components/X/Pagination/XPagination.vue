<script setup lang="ts">
// Props definition
const props = defineProps({
  pagination: {
    type: Object,
    default: () => ({
      total: null as number | null,           // Total number of items
      current_page: null as number | null,    // Current active page
      per_page: null as number | null,        // Items per page
      first_page: 1  as number        // First page number, usually 1
    })
  },
  count: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: 'default'
  }
})

const baseClass = 'block w-full text-sm border rounded-lg focus:ring focus:border dark:bg-gray-700 dark:border dark:placeholder-gray-400 dark:text-white focus:right-1 focus:outline-none focus:ring-1';

const colorClass = {
  'default': 'text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500',
  'primary': 'text-white bg-blue-500 border-blue-500 focus:ring-blue-700 focus:border-blue-700',
  'secondary': 'text-white bg-gray-500 border-gray-500 focus:ring-gray-700 focus:border-gray-700',
  'error': 'text-white bg-red-500 border-red-500 focus:ring-red-700 focus:border-red-700',
  'success': 'text-white bg-green-500 border-green-500 focus:ring-green-700 focus:border-green-700'
}[props.color];

// Emitting events for page change and per_page change
const emits = defineEmits(['page', 'per_page'])

// Local state
const inputPage = ref(null as number | null)      // Input for direct page selection
let isShowInput = ref(false as boolean)   // Flag to show/hide the page input

// Computed values for pagination controls
const prevPage = computed(() => parseInt(props.pagination.current_page) === props.pagination.first_page ? null : parseInt(props.pagination.current_page) - 1)
const totalPages = computed(() => props.pagination.total && parseInt(props.pagination.per_page) ? Math.ceil(props.pagination.total / parseInt(props.pagination.per_page)) : 1)
const nextPage = computed(() => parseInt(props.pagination.current_page) < totalPages.value ? parseInt(props.pagination.current_page) + 1 : null)

// Preview pages list
const previewPages = ref<(number | string)[]>([])

// Function to fetch the requested page
function getPage(page: number) {
  if (page === props.pagination.current_page) {
    isShowInput.value = true
    inputPage.value = page
    console.log('page current', page)
  } else {
    console.log('page now current', page)

    emits('page', page)
    isShowInput.value = false
    updatePreviewPages()
  }
}

// Function to generate pages preview
function updatePreviewPages() {
  previewPages.value = []
  const total: number = typeof totalPages.value === 'number' ? totalPages.value : parseInt(totalPages.value)
  const current: number = typeof props.pagination.current_page === 'number' ? props.pagination.current_page : parseInt(props.pagination.current_page)

  if (total <= 5) {
    // Display all pages if total pages are <= 5
    if(props.pagination.first_page) {
      for (let i = props.pagination.first_page; i <= total; i++) {
        previewPages.value.push(i)
      }
    }
  } else {
    // Handle edge cases when total pages are > 5
    if (current == 1) previewPages.value.push(props.pagination.first_page)

    if (current > 2) {
      previewPages.value.push(props.pagination.first_page)
      previewPages.value.push('...')
    }

    if (current > 1 && current < total) {
      previewPages.value.push(current - 1)
      previewPages.value.push(current)
      previewPages.value.push(current + 1)
    }

    if (current == 1) {
      previewPages.value.push(2)
      previewPages.value.push(3)
    }

    if (current == total) {
      previewPages.value.push(total - 2)
      previewPages.value.push(total - 1)
    }

    if (current < total - 1) {
      previewPages.value.push('...')
      previewPages.value.push(total)
    }
  }
}

// Watchers for updating the preview pages based on changes
watch(() => props.pagination.per_page,() => {
  updatePreviewPages()
  emits('per_page', props.pagination.per_page)
})
watch(() => props.pagination.total, updatePreviewPages)

// Initialize preview pages when component is mounted
onMounted(updatePreviewPages)
</script>

<template>
  <div v-if="previewPages.length" class="w-full flex justify-between items-center mt-4">
    <div class="flex">
      <div class="hidden md:flex justify-center items-center mr-2 text-sm bg-light px-4 py-1 text-muted rounded shadow-black shadow-xl">
        <p class="w-full ">Displaying {{ count }} item(s) of {{ pagination.total }}</p>
      </div>

      <div class="hidden w-44 lg:flex flex-row h-12 justify-center items-center space-x-2 mr-2 text-sm bg-light px-4 py-1 text-muted rounded shadow-black shadow-xl">
        <label class="flex w-full text-xs">Per page</label>
        <select v-model="pagination.per_page" class="w-full bg-light rounded-lg text-muted shadow-sm focus:outline-none" :class="[baseClass, colorClass]">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="4">4</option>
          <option :value="8">8</option>
          <option :value="12">12</option>
          <option :value="48">48</option>
          <option :value="96">96</option>
        </select>

      </div>
    </div>

    <div v-if="previewPages.length > 1" class="flex items-center space-x-1 ">
      <x-btn 
        v-if="prevPage"
        icon="material-symbols:arrow-back-ios-rounded"
        color="primary"
        variant="ghost"
        square
        @click="getPage(prevPage)" 
      />

      <div v-for="(page, index) in previewPages" :key="index">
        <div
          class="py-1 px-3 mx-1 rounded cursor-pointer shadow-black shadow-xl hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white"
          :class="{
            'font-bold text-white bg-primary dark:bg-primary-dark cursor-default': page == pagination.current_page,
            'text-basic dark:text-basic-dark': page != pagination.current_page,
            'hidden': !page
          }"
          @click="typeof page === 'number' ? getPage(page) : null"
          v-html="page"
        />
      </div>

      <!-- Input for direct page selection -->
      <input v-if=" totalPages > 5" v-model="inputPage" type="text" class="w-10 text-black border-gray rounded shadow-black shadow-xl" @keydown.enter="getPage(inputPage !== null ? inputPage : 0)" />

      <x-btn 
        v-if="nextPage" 
        icon="material-symbols:arrow-forward-ios-rounded"                
        color="primary"
        variant="ghost"
        square
        @click="getPage(nextPage)"
      />
    </div>
  </div>
</template>
