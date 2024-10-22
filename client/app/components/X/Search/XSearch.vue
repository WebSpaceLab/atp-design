<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'gray'
    },
    placeholder: {
        type: String,
        default: 'Search'
    },
    icon: {
        type: Boolean,
        default: true
    },
    rightIcon: {
        type: Boolean,
        default: false
    },
    iconPosition: {
        type: String,
        default: 'left'
    },
    iconColor: {
        type: String,
        default: 'gray'
    },
    modelValue: {
        type: String,
        required: true
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    filter: {
        type: Boolean,
        default: true,
    },
    answer: {
        type: Boolean,
        default: true,
    },
    topics: {
        type: Array,
        default: () => [] // Tematyki np. ['Technology', 'Science', 'Business']
    },
    selectedFilters: {
        type: Object,
        default: () => ({}) 
    },
});

const emits = defineEmits([
    'update:modelValue',
    'apply-filters',
    'apply-topics'
]);

const isShowFieldAction = ref(false);
const selectedTopics = ref([]);
const selectedFilter = ref('All');

const inputColor = computed(() => {
    return {
        'blue': 'text-blue-500 focus:text-blue-600 border-blue-500 focus:border-blue-600 placeholder-blue-600 bg-transparent',
        'red': 'text-red-500 focus:text-red-600 border-red-500 focus:border-red-600 placeholder-red-600 bg-transparent',
        'green': 'text-green-500 focus:text-green-600 border-green-500 focus:border-green-600 placeholder-green-600 bg-transparent',
        'gray': 'text-gray-500 focus:text-gray-600 border-gray-500 focus:border-gray-600 placeholder-gray-600 bg-transparent',
    }[props.color];
});

const iconColor = computed(() => {
    return {
        'blue': 'text-blue-600',
        'red': 'text-red-600',
        'green': 'text-green-600',
        'gray': 'text-gray-600',
    }[props.iconColor || props.color];
});

// Aplikowanie wybranych filtrów
function applyFilters() {
    emits('apply-filters', selectedFilter.value);
    isShowFieldAction.value = false;
}

// Aplikowanie wybranych tematyk
function applyTopics() {
    emits('apply-topics', selectedTopics.value);
    isShowFieldAction.value = false;
}
</script>

<template>
    <div class="relative w-full">
        <div class="flex space-x-3">
            <XTooltip text="Search" position="bottom">
                <XBtn @click="isShowFieldAction = true" color="primary" variant="ghost" square icon="i-line-md-search" />
            </XTooltip>
        </div>

        <!-- Modal z filtrami i tematyką -->
        <x-modal
            :show="isShowFieldAction"
            max-width="3xl"
            :closeable="closeable"
            @close="event => isShowFieldAction = event"
        >
            <div class="w-full bg-prime-light dark:bg-prime-dark max-h-[calc(100vh-40px)] flex flex-col">
                <!-- Sekcja wyszukiwania -->
                <div class="relative w-full h-15 rounded-t-md">
                    <div
                        v-if="icon"
                        :class="[inputColor, iconPosition === 'left' ? 'left-0' : 'right-0']"
                        class="absolute inset-y-0 flex items-center p-3 rounded-l-lg"
                    >
                        <Icon name="i-material-symbols:search-rounded" class="text-xl"/>
                    </div>

                    <input
                        :value="modelValue"
                        :class="[inputColor, icon && iconPosition === 'left' ? 'pl-10' : 'pl-3']"
                        :placeholder="placeholder"
                        class="block w-full px-3 h-15 text-xl border-1 rounded-t-md bg-background dark:bg-background-dark focus:right-1 focus:outline-none focus:ring-1"
                        type="search"
                        autofocus
                        @input="event => emits('update:modelValue', event.target.value)"
                    >

                    <div
                        :class="[iconColor]"
                        class="absolute top-2.5 right-3 h-7 box-border bg-gray-600 inset-y-0 flex items-center p-3 cursor-pointer"
                        rounded
                        @click="isShowFieldAction = false"
                    >
                        <Icon name="mdi:keyboard-esc" class="text-xl text-gray-400"/>
                    </div>
                </div>

                <div v-if="false">
                    <!-- Sekcja filtrów -->
                    <div class="p-3 flex flex-wrap gap-2">
                        <span v-for="filter in selectedFilters" :key="filter" class="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300" @click="selectedFilter = filter">
                            {{ filter }}
                        </span>
                    </div>

                    <!-- Sekcja tematyk -->
                    <div class="p-3">
                        <div class="flex flex-wrap gap-2">
                            <label v-for="topic in topics" :key="topic" class="cursor-pointer">
                                {{ topic }}
                            </label>
                        </div>
                    </div>
                </div>

                <div v-if="query">
                    
                </div>

                <div v-else class="w-full flex justify-center items-center p-2">
                    <p>Nothing found</p>
                </div>
            </div>
        </x-modal>
    </div>
</template>
