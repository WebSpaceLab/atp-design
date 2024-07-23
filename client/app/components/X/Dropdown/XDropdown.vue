<script setup>
const props = defineProps({
    alignX: {
        type: String,
        default: 'right',
    },
    alignY: {
        type: String,
        default: 'bottom',
    },
    width: {
        type: String,
        default: '48',
    },
    contentClasses: {
        type: Array,
        default: () => ['bg-background-light dark:bg-background-dark shadow shadow-xl  shadow-black'],
    },
});

const open = ref(false);

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

const widthClass = computed(() => {
    return {
        '36': 'w-36',
        '40': 'w-40',
        '48': 'w-48',
        '64': 'w-64',
        '80': 'w-80'
    }[props.width.toString()];
});

// const heightClass = computed(() => {
//     return {
//         '36': 'w-36',
//         '40': 'w-40',
//         '48': 'w-48',
//         '64': 'w-64',
//         '80': 'w-80'
//     }[props.width.toString()];
// });

const alignmentXClasses = computed(() => {
    if (props.alignX === 'left') {
        return 'origin-top-left left-0';
    }

    if (props.alignX === 'right') {
        return 'origin-top-right right-0';
    }

    return 'origin-top';
});

const alignmentYClasses = computed(() => {
    if (props.alignY === 'top') {
        return 'origin-top-left top-[-50%] translate-y-[-100%]';
    }

    if (props.alignX === 'bottom') {
        return 'origin-top-right mt-2 bottom-0';
    }

    return 'origin-top';
});
</script>

<template>
    <div class="relative">
        <div @click="open = ! open">
            <slot name="trigger" />
        </div>

        <div v-show="open" class="fixed inset-0 w-screen h-screen z-40" @click="open = false" />

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform translate-y-[-10%] opacity-0 scale-5"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform translate-y-[-10%] opacity-0 scale-5"
        >
            <div
                v-show="open"
                class="absolute z-60 rounded-md"
                :class="[widthClass, contentClasses, alignmentXClasses, alignmentYClasses]"
                style="display: none;"
                @click="open = false"
            >
                <div class="rounded-md ring-1 ring-black ring-opacity-5 overflow-hidden box-border" :class="[alignmentXClasses]">
                    <slot name="content" />
                </div>
            </div>
        </transition>
    </div>
</template>