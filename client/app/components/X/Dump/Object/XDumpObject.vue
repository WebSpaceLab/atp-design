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
    <span class="flex justify-start items-start py-2">
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
            <span class="w-full pl-1.5 py-0.5 flex flex-col  items-start" v-if="open">                    
                <span v-if="Array.isArray(value)" class="text-red-600">
                    [
                </span>

                <span v-else>
                    <span v-if="typeof value ==='object'" class="text-yellow-600">
                        {
                    </span>
                </span>

                <span v-for="(item, index) in value" :key="index" class="w-full flex justify-start items-center px-6">
                    <x-dump-string v-if="(typeof item ==='string')" :value="item" :index="index" />
                    <x-dump-boolean v-if="(typeof item ==='boolean')" :value="item" :index="index" />
                    <x-dump-number v-if="(typeof item ==='number')" :value="item" :index="index" />
                    <x-dump-object v-if="(typeof item ==='object')" :value="item" :index="index"/>
                </span>

                <span v-if="Array.isArray(value)" class="text-red-600">
                    ]
                </span>

                <span v-else>
                    <span v-if="typeof value ==='object'" class="text-yellow-600">
                        }
                    </span>
                </span>
            </span>
        </transition>
    </span>
</template>