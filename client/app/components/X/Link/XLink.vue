<script setup>
    // const route = useRoute()
    const props = defineProps({
        color: {
            type: String,
            default: 'basic'
        },
        text: String,
        to: String | Object,
        icon: {
            type: Boolean,
            default: false
        },
        rel: String,
        target: String,
        external: {
            type: Boolean,
            default: false
        }
    })


    function setColor(c) {
        return useColor(c)
    }


    // const activeRoute = ref(false)

    // watch(() => route.hash, (hash) => {
    //     if(hash) {
    //         activeRoute.value = true
    //     } else activeRoute.value = false 
    // })

    // onMounted(() => {
    //     if(route.hash) {
    //         activeRoute.value = true
    //     } else activeRoute.value = false 
    // })
</script>

<template>
    <NuxtLink 
        class="relative flex justify-center items-center text-lg cursor-pointer" 
        :class="[
            setColor(color)
        ]"
        :to="to" :rel="rel" :target="target" :external="external"
    >
        <slot :name="icon ? icon : null" />
        <slot>{{ text }}</slot>
    </NuxtLink>
</template>

<style scoped>
    /* @ts- */
    .router-link-active {
        @apply text-active dark:text-active-dark font-extrabold cursor-not-allowed ;
    }
</style>