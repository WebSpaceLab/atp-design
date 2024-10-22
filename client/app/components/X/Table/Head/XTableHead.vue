<script setup>
defineProps({
    head: {
        type: Array,
        default: () => []
    },
    selected: {
        type: Boolean,
        default: true
    },
    justify: {
        type: String,
        default: 'center'
    },
})

const emits = defineEmits([
    'select-all'
])

function toggleSelectAll (e) {
    emits('select-all', e)
}
</script>

<template>
    <tr v-if="head">
        <th v-if="selected" class="w-6 text-center">
            <input
                class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500"
                type="checkbox"
                @change="toggleSelectAll"
            >
        </th>

        <template v-for="(cell, index) in head" :key="index">
            <x-table-head-cell :name="cell" :justify="justify" />
        </template>
    </tr>

    <tr v-else>
        <slot/>
    </tr>
</template>