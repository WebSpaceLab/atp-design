<script setup>
    defineProps({
        to: {
            type: String,
            default: '/#',
        }
    });
</script>

<template>
    <NuxtLink :to="to"
        class="relative flex justify-center items-center w-full decoration-none py-2 text-sm leading-5 focus:outline-none focus:border-focus transition hover:bg-hover-800 hover:text-hover-200 cursor-pointer"
    >
        <slot />
    </NuxtLink>
</template>

<style scoped>
    .router-link-active {
        @apply text-active dark:text-active-dark font-extrabold cursor-not-allowed ;
    }
</style>