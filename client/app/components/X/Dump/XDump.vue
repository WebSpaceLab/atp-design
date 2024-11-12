<script setup>
defineProps({
    'value': {type: Object, required: true}
})

const open = ref(true)
</script>

<template>
    <span class="w-full pb-1 m-0 text-blue-200 bg-slate-900 flex flex-col justify-start items-start whitespace-pre-line">
        <span class="w-full flex justify-between items-center p-4 mb-1 bg-slate-950">
            <span class="w-full">
                <Icon name="tabler:viewfinder" class="text-3xl inline-block mr-2" />
    
                Dump
            </span>

            <x-btn
                :tooltip="{text: 'Edit'}"
                color="secondary"
                icon
                rounded
                strip
                @click="open = !open"
            >
                <Icon 
                    name="material-symbols:keyboard-arrow-down-rounded" 
                    class="text-2xl" 
                    :class="[
                        open ? 'transform rotate-180' : '',
                    ]" 
                />
            </x-btn>
        </span>

        <span v-if="open" class="text-sm">
            <span v-if="Array.isArray(value)" class="pl-2 text-red-600">
                [
            </span>
    
            <span v-else>
                <span v-if="typeof value ==='object'" class="pl-2 text-yellow-600">
                    {
                </span>
            </span>
    
            <span v-for="(item, index) in value" :key="index" class="w-full flex justify-start items-center px-6">
                <x-dump-string v-if="(typeof item ==='string')" :value="item" :index="index" />
                <x-dump-boolean v-if="(typeof item ==='boolean')" :value="item" :index="index" />
                <x-dump-number v-if="(typeof item ==='number')" :value="item" :index="index" />
                <x-dump-object v-if="(typeof item ==='object')" :value="item" :index="index"/>
            </span>
    
            <span v-if="Array.isArray(value)" class="pl-2 text-red-600">
                ]
            </span>
    
            <span v-else>
                <span v-if="typeof value ==='object'" class="pl-2 text-yellow-600">
                    }
                </span>
            </span>
        </span>
    </span>
</template>