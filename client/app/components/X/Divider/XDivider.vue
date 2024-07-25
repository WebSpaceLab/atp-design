<script setup>
    const props = defineProps({
        yt: {
            type: String,
            default: '8'
        },

        yb: {
            type: String,
            default: '8'
        },
        // color: {
        //     type: String,
        //     default: 'green'
        // },
        label: {
            type: String,
            default: ''
        },
        // horizontal: {
        //     type: Boolean,
        //     default: false
        // }
    });

    const ytClass = computed(() => {
        return {
            '0': 'pt-0',
            '2': 'pt-2',
            '4': 'pt-4',
            '8': 'pt-8',
        }[props.yt.toString()];
    });

    const ybClass = computed(() => {
        return {
            '0': 'pb-0',
            '2': 'pb-2',
            '4': 'pb-4',
            '8': 'pb-8',
        }[props.yb.toString()];
    });
</script>

<template>
    <div class="relative w-full">
        <div :class="[ybClass, ytClass]" class="relative flex flex-col">
            <div class="border border-1 border-slate-400 dark:border-slate-600" />
            <span 
                v-if="label !== ''"
                class="absolute text-slate-400 dark:text-slate-600 left-[50%] translate-x-[-50%] bottom-[50%] translate-y-[50%] bg-background-light dark:bg-background-dark px-3"
            >
                {{ label }}
            </span>
        </div>
    </div>
</template>
