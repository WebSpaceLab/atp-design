<script setup>
defineProps({
    photo: {
        type: Object,
        default: () => ({})
    },
    action: {
        type: Boolean,
        default: false
    },
    isDate: {
        type: Boolean,
        default: false
    },
    isPhotosName: {
        type: Boolean,
        default: false
    },
})

const emits = defineEmits(['preview'])

const hover = ref(false)

const openPreviewImage = (photo) => {
    emits('preview', photo)
}
</script>


<template>
    <figure   
        data-aos="zoom-in"  
        data-aos-duration="500" 
        class="relative w-full m-0 p-0 mb-6 rounded-lg [break-inside:avoid]  cursor-pointer overflow-hidden duration-300 hover:shadow-xl shadow-black transition-all duration-500"
        @mouseover="hover = true"  
        @mouseleave="hover = false" 
    >
        <x-speed-dial v-if="hover && action">
            <slot name="action" />
        </x-speed-dial>

        <nuxt-img
            class="translate-y-1 w-full rounded-lg transition-all duration-500"
            :class="hover ? 'scale-110' : 'scale-100'"
            :src="photo.previewUrl ? photo.previewUrl : '/images/placeholder.png'"
            :alt="photo.name ? photo.name : 'Photo'"
        />

        <div  
            v-if="hover"
            class="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/80  transition-all duration-500"
            :class="hover ? 'opacity-100' : 'opacity-0'"
            @click="openPreviewImage(photo)" 
        >
            <figcaption v-if="isDate" class=" mt-2 text-xs text-white truncate ">{{ photo.createdAtAgo }}</figcaption>
            <p class="text-sm text-gray-500 line-clamp-2">{{ photo.description }}</p>
            <figcaption v-if="isPhotosName" class=" w-full absolute bottom-0 left-0 px-4 py-2 text-white truncate border-box">{{ photo.name }}</figcaption>
        </div>
        
    </figure>
</template>