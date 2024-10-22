<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: 'Search'
  },
  icon: {
    type: Boolean,
    default: false
  },
  rightIcon: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String,
    default: 'left'
  },
  modelValue: {
    type: String,
    required: true
  },
  filter: {
    type: Boolean,
    default: true
  },

  query: {
    type: Object,
    default: () => ({})
  },
  size: {
    type: String,
    default: 'md'
  },
  months: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
});

let isShowFilters = ref(false);

const emits = defineEmits([
  'update:modelValue',
  'apply-filters'
]);

const baseClass = 'block w-full text-sm border rounded-lg focus:ring focus:border dark:bg-gray-700 dark:border dark:placeholder-gray-400 dark:text-white focus:right-1 focus:outline-none focus:ring-1';

const colorClass = {
  'default': 'text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500',
  'primary': 'text-white bg-blue-500 border-blue-500 focus:ring-blue-700 focus:border-blue-700',
  'secondary': 'text-white bg-gray-500 border-gray-500 focus:ring-gray-700 focus:border-gray-700',
  'error': 'text-white bg-red-500 border-red-500 focus:ring-red-700 focus:border-red-700',
  'success': 'text-white bg-green-500 border-green-500 focus:ring-green-700 focus:border-green-700'
}[props.color];

const iconClass = {
  'default': 'text-gray-500',
  'primary': 'text-blue-500',
  'secondary': 'text-gray-500',
  'error': 'text-red-500',
  'success': 'text-green-500'
}[props.color];

const sizeClass = {
  'xs': 'p-1 text-xs',
  'sm': 'p-1.5 text-sm',
  'md': 'p-2 text-md',
  'lg': 'p-2.5 text-lg',
  'xl': 'p-3 text-xl'
}[props.size];

const selectedFilters = ref(['id']);

function applyFilters() {
  emits('apply-filters', selectedFilters.value);
}

const allColumns: any = computed(() => {
  return [
    ...props.columns.map(column => ({ value: column, label: column }))
  ];
});

const allMonths: any = computed(() => {
  return [
    { value: null, label: 'Any date' },
    ...props.months
  ];
});

const updateModelValue = (event: any) => {
  emits('update:modelValue', event?.target?.value);
};

watch(() => props.query.term, () => {
  setTimeout(async () => {
    props.query.page = 1;
    applyFilters();
  }, 300);
});

watch(() => props.query.month, () => {
  setTimeout(async () => {
    props.query.page = 1;
    applyFilters();
  }, 300);
});

watch(() => props.query.orderBy, async () => {
  props.query.page = 1;
  applyFilters();
});

watch(() => props.query.orderDir, async () => {
  props.query.page = 1;
  applyFilters();
});

watch(() => props.query.page, async () => {
  applyFilters();
});

watch(() => props.query.per_page, async () => {
  applyFilters();
});

watch(() => props.query.column, async () => {
  applyFilters();
});
</script>

<template>
  <div class="w-full">
    <div class="flex space-x-3">
      <!-- Input wyszukiwania -->
      <div class="flex w-full">
        <div class="w-full relative">
          <div
            v-if="icon"
            :class="[iconClass, iconPosition === 'left' ? 'left-0' : 'right-0']"
            class="absolute inset-y-0 flex items-center p-3 rounded-l-lg"
          >
            <Icon name="i-material-symbols:search-rounded" class="text-xl"/>
          </div>

          <input
            :value="modelValue"
            :class="[baseClass, colorClass, sizeClass, icon && iconPosition === 'left' ? 'pl-10' : 'pl-3']"
            :placeholder="placeholder"
            class="block w-full rounded-lg border-1 appearance-none"
            type="search"
            autofocus
            @input="updateModelValue"
          >

          <div class="absolute inset-y-0 flex items-center right-0 rounded-l-lg">
            <select v-model="query.column" aria-label="Media date" id="date" class="lg:text-xs" :class="[colorClass, baseClass]">
            <template v-for="month in allColumns" :key="month.value">
              <option :value="month.value">{{ month.label }}</option>
            </template>
          </select>
            <XTooltip text="Search filters" position="bottom-right">
              <XBtn
                v-if="filter"
                @click="isShowFilters = !isShowFilters"
                color="primary"
                variant="ghost"
                square
                icon="i-line-md-filter"
              />
            </XTooltip>
          </div>
        </div>

        <!-- Select filtrów -->
        <Transition
          enter-active-class="transition ease-in duration-300"
          enter-from-class="transform opacity-0 "
          enter-to-class="transform  opacity-100"
          leave-active-class="transition ease-in duration-500"
          leave-from-class="transform opacity-100"
          leave-to-class="transform opacity-0"
        >
          <div v-if="isShowFilters" class="absolute top-0 left-0 translate-y-12 w-full p-2 border-1 border-primary dark:border-primary-dark bg-background dark:bg-background-dark rounded-md z-50">
            <div class="absolute top-0 right-0">
              <!-- Button "x" close filters -->
              <XBtn
                @click="isShowFilters = false"
                color="primary"
                variant="ghost"
                square
                icon="i-line-md-close"
                size="xs"
              />
            </div>

            <div v-if="filter" class="w-full h-auto flex justify-center items-center box-border transition-all duration-300">
              <div class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 xl:px-6">
                <select v-model="query.orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                  <option value="createdAt">Uploading</option>
                  <option value="username">Alphabetically</option>
                  <option value="updatedAt">Updates</option>
                </select>

                <select v-model="query.orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                  <option value="desc">Sort by descending</option>
                  <option value="asc">Sort by ascending</option>
                </select>

                <select v-model="query.month" aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                  <template v-for="month in allMonths" :key="month.value">
                    <option :value="month.value">{{ month.label }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="isShowFilters" @click="isShowFilters = false" class="fixed inset-0 bg-black/30 z-40"/>
      </div>
    </div>
  </div>
</template>
