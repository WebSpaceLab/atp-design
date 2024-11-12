<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>    
    <div class="group"  @mouseover="isOpen = true" @mouseleave="isOpen = false">
        <div
            id="speed-dial-menu-horizontal"
            class="flex items-center  me-4 space-x-3 rtl:space-x-reverse rounded-xl px-2" 
            :class="[
                isOpen ? 'opacity-100 bg-black/70' : 'opacity-0',
                isOpen ? 'translate-x-0' : 'translate-x-4',
                'transition-all duration-300 ease-in-out transform',
            ]"
        >
            <slot></slot>
        </div>

        <button type="button"  class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
</template>