<script setup>
    defineProps({
        to: {
            type: String,
        },
        name: {
            type: String,
        },
    });
</script>

<template>
    <NuxtLink :to="to"
        class="relative z-50 py-2 rounded hover:bg-basic-300 hover:dark:bg-basic-700 flex justify-center items-center w-full decoration-none text-sm leading-5 focus:outline-none focus:border-focus transition hover:bg-hover-800 hover:text-hover-200 cursor-pointer"
    >
        {{ name }}
    </NuxtLink>
</template>

<style scoped>
    .router-link-active {
        @apply text-active-900 dark:text-active-100 font-extrabold cursor-not-allowed bg-basic-300 dark:bg-basic-700;
    }
</style>