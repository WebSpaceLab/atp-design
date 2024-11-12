<script setup lang="ts">
const props = defineProps({
    file: {
        type: Object,
        default: () => ({
            name: 'Default',
            mimeType: 'image/jpeg',
            previewUrl: 'https://via.placeholder.com/150',
            pathUrl: null
        })
    },
    isFieldSelected: {
        type: Boolean,
        default: true
    },
    selected: {
        type: Boolean,
        default: false
    }
})

const selected = ref(false)
const isShowFieldAction = ref(false)

watch(() => props.selected, (e) => {
    selected.value = e
})

</script>

<template>
    <div @mouseover="isShowFieldAction = true"  @mouseleave="isShowFieldAction = false" class="w-full relative bg-black  rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl shadow-black">
        <div v-if="isFieldSelected" class="absolute left-0 top-2 w-10 text-center z-10">
           <slot name="selected"></slot>
        </div>

        <x-speed-dial v-if="isShowFieldAction" class="absolute z-30 flex right-2 top-2">
            <slot name="action"></slot>
        </x-speed-dial>

        <div class="w-full h-full relative flex justify-center">
            <nuxt-img v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/webp'" :src="file.previewUrl" :alt="file.name" class="h-full object-cover" />

            <video v-if="file.mimeType === 'video/mp4'" class="w-full aspect-video" controls>
                <source :src="file.previewUrl" :type="file.mimeType" :title="file.name">
            </video>

            <iframe 
                v-if="file.pathUrl" 
                :src="file.pathUrl" 
                class="w-full aspect-video"
                frameborder="0"
                allowfullscreen
            />
        </div>

        <div v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/webp'" class="absolute bottom-0 left-0 h-10 w-full flex justify-center items-center bg-black/60">
            <p class="px-2 text-white w-80 truncate">{{ file.name }}</p>
        </div>
    </div>
</template>