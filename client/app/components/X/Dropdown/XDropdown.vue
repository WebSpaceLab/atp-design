<script setup lang="ts">
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
        default: () => ['bg-background-light', 'dark:bg-background-dark', 'shadow', 'shadow-xl', 'shadow-black'],
    },
});

const { open, toggleDropdown, closeOnEscape, dropdownWidthClass, alignmentXClasses, alignmentYClasses } = useDropdown(props);

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));
</script>

<template>
    <div class="relative">
        <div @click="toggleDropdown">
            <slot name="trigger" />
        </div>

        <div v-show="open" class="fixed inset-0 w-screen h-screen z-20" @click="toggleDropdown" />

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform translate-y-[-10%] opacity-0 scale-95"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform translate-y-[-10%] opacity-0 scale-95"
        >
            <div
                v-show="open"
                class="absolute z-30 rounded-md"
                :class="[dropdownWidthClass, ...contentClasses, alignmentXClasses, alignmentYClasses]"
                style="display: none;"
            >
                <div class="rounded-md ring-1 ring-black ring-opacity-5 overflow-hidden box-border">
                    <slot name="content" />
                </div>
            </div>
        </transition>
    </div>
</template>
