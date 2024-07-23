<script setup>
    const props = defineProps({
        color: {
            type: String,
            default: 'basic'
        },
        text: String,
        to: String | Object,
        href: String,
        icon: {
            type: Boolean,
            default: false
        },
        rel: String,
        target: String
    })
</script>

<template>
    <NuxtLink class="relative flex justify-center items-center text-lg cursor-pointer" :class="[
        useColor(color)
    ]" :to="to" :href="href" :rel="rel" :target="target"
        active-class="text-active-400 hover:text-active-400 font-medium cursor-default">
        <slot :name="icon ? icon : null" />
        <slot>{{ text }}</slot>
    </NuxtLink>
</template>