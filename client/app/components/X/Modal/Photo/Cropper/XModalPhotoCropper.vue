<script setup lang="ts">
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
const emits = defineEmits(['close', 'uploadCropImage']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '3xl',
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
    fileUrl: String,
});

const cropper = ref<typeof Cropper | null>(null);
const loading = ref(false);

const close = () => {
    emits('close');
};

const uploadedCropImage = () => {
    if (!cropper.value) return;
    
    const { coordinates } = cropper.value.getResult();
    let data = new FormData();

    data.append('height', coordinates?.height?.toString() || '');
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')  

    emits('uploadCropImage', data)
    close()
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="7xl"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
    >
        <div class="w-full h-[430px]">
            <Cropper
                class="h-[430px]"
                ref="cropper"
                :src="fileUrl"
            />
        </div>

        <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="uploadedCropImage" @keydown.enter="uploadedCropImage" type="submit" color="primary" :loading="loading">Apply</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>