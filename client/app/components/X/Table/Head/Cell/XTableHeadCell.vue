<script setup>
defineProps({
    name: {
        type: String,
        default: 'Name'
    },
    uppercase: {
        type: Boolean,
        default: true
    },
    sort: {
        type: Array,
        default: () => []
    },
    justify: {
        type: String,
        default: 'center'
    }
})
</script>

<template>
    <th  class="px-5 py-3 w-10 text-center">
        <div 
            class="w-full flex items-center space-x-4" 
            :class="[
                justify ? `justify-${justify}` : 'justify-start',
            ]"
        >
            <span class="text-sm" :class="uppercase ? 'uppercase' : ''">
                {{ name }}
            </span>

            <span v-if="sort" class="flex flex-col space-y-0">
                <Icon v-if="sort?.upper" name="material-symbols:play-arrow" class="-rotate-90 text-sm text-indigo-600"/>
                <Icon v-if="sort?.lower" name="material-symbols:play-arrow" class="rotate-90  text-sm text-indigo-600"/>
            </span>
       </div> 
    </th>
</template>