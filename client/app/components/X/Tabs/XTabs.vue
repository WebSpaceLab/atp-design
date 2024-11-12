<script setup>
defineProps({
    tabs: {
        type: Array,
        require: true,
        default: () => []
    },
    uppercase : {
        type: Boolean,
        default: true
    }
})

const active = ref(0)
const buffer = ref(null)

function switchTab(index) {
    if(!active.value) {
        buffer.value = null
    } else {
        buffer.value = active.value
    }

    
    active.value = index
}
</script>

<template>
    <div class="w-full h-full bg-gray-200/20 dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
        <div class="w-full h-auto flex justify-start items-end space-x-3 bg-gray-200/20 dark:bg-gray-800/20 pt-3 px-3 rounded-t-xl">
            <span
                v-for="(tab, index) in tabs " :key="index"
                class="w-full text-center text-sm text-bold cursor-pointer px-3 py-2 border-b-solid rounded-t-xl"
                :class="[
                    active === index ? 'text-active-800 dark:text-active-400 border-active-800 dark:border-active-400 bg-black/10' : 'text-slate-700 dark:text-slate-600 border-slate-700 dark:border-slate-600 dark:hover:text-hover-600',
                    uppercase ? 'uppercase' : ''
                ]"
                @click="switchTab(index)"
            >
                 {{ tab }}
             </span>
        </div>
        <div class="w-full h-full relative overflow-hidden">
            <div v-for="(tab, index) in tabs" :key="index">
                <transition
                    enter-active-class="ease-in duration-500 delay-350"
                    :enter-from-class="`${active > buffer ? 'translate-x-[-100%]' : 'translate-x-[100%]' } blur-200`"
                    enter-to-class="opacity-100 translate-x-0 blur-0"
                    leave-active-class="ease-in duration-300"
                    leave-from-class="translate-x-0 blur-0"
                    :leave-to-class="`${active < buffer ? 'translate-x-[-100%]' : 'translate-x-[100%]' } blur-200`"
                >
                    <div v-if="index === active" class="w-full">
        
                        <slot :name="`tab-${index}`"/>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    
</template>