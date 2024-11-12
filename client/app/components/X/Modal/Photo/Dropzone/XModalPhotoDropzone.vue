<script setup lang="ts">
const emits = defineEmits(['close', 'addedToLibrary']);

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
    multiple: Boolean
});

const close = () => {
    emits('close');
};

const addedToLibrary = (event: any) => {
    if(event) {
        emits('addedToLibrary', event);
    }
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="3xl"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
        :footer="false"
    >
        <x-tabs :tabs="['Add media', 'Add media from url']">
            <template #tab-0>
                <div class="w-full py-6">
                    <x-photo-dropzone @addedToLibrary="addedToLibrary" :multiple="multiple" />
                </div>
            </template>

            <template #tab-1>
                <div>
                    <x-form-movie @addedToLibrary="addedToLibrary" @close="close" />
                </div>
            </template>
        </x-tabs>
    </x-modal-dialog>
</template>