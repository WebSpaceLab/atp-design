<script setup>
const props = defineProps({
    file: {
        type: Object,
        default: () => ({
            name: 'Image',
            previewUrl: 'https://via.placeholder.com/150'
        })
    },
    isFieldSelected: {
        type: Boolean,
        default: true
    }
})

const selected = ref(false)
const isShowFieldAction = ref(false)

watch(() => props.selected, (e) => {
    selected.value = e
})

</script>

<template>
    <div
        v-if="file"
        class="w-full h-60 relative bg-black  rounded-xl overflow-hidden flex flex-col"
        @mouseleave="isShowFieldAction = false"
        @mouseover="isShowFieldAction = true"
    >
        <div v-if="isFieldSelected" class="absolute left-0 top-2 w-10 text-center z-10">
           <slot name="selected"/>
        </div>

        <div v-if="isShowFieldAction" class="w-12 absolute top-0 right-0 flex flex-col justify-center items-center space-y-2 z-10 px-1 py-2 bg-black/80">
            <slot name="action"/>
        </div>

        <div class="w-full h-46 relative flex justify-center">
            <img :src="file.previewUrl" :alt="file.name" class="h-full object-cover" >
        </div>

        <div class="relative h-20 w-full bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark">
            <p class="px-2 text-muted-light dark:text-muted-dark w-80 truncate">{{ file.name }}</p>
        </div>
    </div>
</template>