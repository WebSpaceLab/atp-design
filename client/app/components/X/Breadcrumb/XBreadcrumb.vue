<script setup lang="ts">
defineProps<{
    links: {
        icon: string
        to: string
        label: string
    }[]
}>()
</script>

<template>
    <nav class="w-full bg-secondary dark:bg-secondary-dark py-2 px-4 rounded-r-full backdrop-blur">
        <ol class="w-full flex space-x-2">
            <li v-for="(link, index) in links" :key="index" class="flex space-x-2">
                <x-link :to="link.to">
                    <Icon class="text-2xl" :name="link.icon"/>
               
                    <span  class="ml-2 transition-all duration-500">
                        {{ link.label }}
                    </span>
                </x-link>
    
                <span v-if="index < links.length - 1" class="text-primary-600">/</span>
            </li>
        </ol>
    </nav>
</template>