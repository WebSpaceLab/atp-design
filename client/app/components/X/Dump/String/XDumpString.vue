<script setup>
defineProps({
    value: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    },
})

const open = ref(true)
</script>

<template>
    <span class="w-full flex justify-start items-center transition-all duration-300">
        <span
            class=" h-6 flex justify-start items-center space-x-1 text-blue-400 cursor-pointer"
            @click="open = !open"
        >
            <p>{{ index }}</p> <span>:</span>
        </span>

        <transition             
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform translate-y-[-10%] opacity-0 scale-5"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform translate-y-[-10%] opacity-0 scale-5"
        >        
            <span v-if="open" class="w-full pl-2 flex justify-start items-center">                    
                <p class="text-orange-600 m-0">"{{ value }}"</p>
            </span>
        </transition>
    </span>
</template>