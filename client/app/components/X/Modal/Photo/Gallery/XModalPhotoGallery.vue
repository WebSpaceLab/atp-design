<script setup>
const emits = defineEmits(['close', 'addedToLibrary'])

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '7xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: 'Add new assets'
    },
    minimization: {
        type: Boolean,
        default: false
    },
    multiple: Boolean,
    currentImages: {
        type: Array,
        default: () => []
    }
});

const close = (event) => {
    emits('close', event);
};

const addedToLibraryGallery = (event) => {
    if(event) {
        emits('addedToLibrary', event);
    }
}

const addedToLibraryDropzone = (event) => {
    if(event) {
        emits('addedToLibrary', [event.id]);
    }
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        :title="title"
        :minimization="minimization"
        @close="close"
    >
        <x-tabs :tabs="['library', 'add from assets']">
            
            <template #tab-0>
               <x-section-gallery
                  :current-images="currentImages"
                  :multiple="multiple"
                  :show="show"
                  @added-to-library="addedToLibraryGallery"
                  @close="close"
                />
            </template>
            
            <template #tab-1>
                <div class="w-150 py-6">
                    <x-photo-dropzone
                      :multiple="multiple"
                      :show="show"
                      @added-to-library="addedToLibraryDropzone"
                    />
                </div>
            </template>
        </x-tabs>
    </x-modal-dialog>
</template>