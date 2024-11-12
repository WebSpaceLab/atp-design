<script setup lang="ts">
import type { IMedia } from '~~/types/media';


const { mediaUploader, mediaCropperUploader } = useMediaStore()

const emits = defineEmits(['addedToLibrary'])

defineProps({
    multiple: {
        type: Boolean,
        default: true
    }
})

interface MediaItem {
    id?: string
    file: any
    progress: number
    error: null | string
    uploaded: boolean
    previewUrl: string
    mimeType?: string
}

const dragging = ref<boolean>(false)
const media = ref<MediaItem[]>([])
const files = ref<HTMLInputElement | null>(null)
const fileEdit = ref<IMedia | null>(null)
const isShowModalPhotoDetails = ref<boolean>(false)
const isCheckboxAddWithCropper = ref<boolean>(false)
const isShowModalPhotoCropper = ref<boolean>(false)
const uploadedImage = ref<any | null>(null)
const uploadedImageUrl = ref<string | null>(null)

function uploadFiles(files: File[]) {
    files.forEach((file: File) => {
        media.value.unshift({
            id: '',
            file,
            progress: 0,
            error: null,
            uploaded: false,
            previewUrl: '',
            mimeType: ''
        })
    })
    

    media.value
        .filter((media: MediaItem) => !media.uploaded)
        .forEach(async media => {
            const form = new FormData();

            if (media.file instanceof File) {
                form.append('file', media.file);
            } else if (typeof media.file === 'string') {
                form.append('file', media.file);
            } else {
                throw new Error('Invalid file type');
            }

            const onProgress = (event: number) => {
                media.progress = event;
            }
            await mediaUploader(form, onProgress)
            .then((res: any) => {
                emitAddedToLibrary(res.data.media);

                media.uploaded = true;
                media.id = res.data.media.id;
                media.previewUrl = res.data.media.previewUrl;
                media.mimeType = res.data.media.mimeType;
                media.file = res.data.media
            })
            .catch(error => {
                media.error = 'Uploaded Fail. Please try again later;';
                if (error?.response.status === 422) {
                    media.error = error.response.data.errors.file[0];
                }
            })
        })
}

function onSelectedFiles($event: Event) {
    if(isCheckboxAddWithCropper.value) {
        const target = $event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            if (file) {
                uploadedImage.value = file;
                uploadedImageUrl.value = URL.createObjectURL(file);
            }
        }

        isShowModalPhotoCropper.value = true
    } else {
        const target = $event.target as HTMLInputElement;
        if (target.files) {
            const files2 = [...target.files];
            uploadFiles(files2);
        }
        
        files.value = null;
    }
}

function onDroppedFiles($event: DragEvent) {
    dragging.value = false;

    if ($event.dataTransfer?.items) {
        const files = [...$event.dataTransfer.items]
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile())
            .filter((file): file is File => file !== null);

        uploadFiles(files);
    }
}
function openEditFile(file: IMedia) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

function closeModalEdit(event: boolean) {
    isShowModalPhotoDetails.value = event
    fileEdit.value = null
}

function emitAddedToLibrary (event: IMedia | undefined) {
    emits('addedToLibrary', event);
}

const checkboxAddWithCropper = (event: Event) => {
    console.log(event)
}

function uploadCropImage(data: FormData) {
    media.value.unshift({
        id: '',
        file: uploadedImage.value,
        progress: 0,
        error: null,
        uploaded: false,
        previewUrl: '',
    })

    media.value
        .filter(media => !media.uploaded)
        .forEach(async media => {   
            data.append('image', uploadedImage.value || '')
            const onProgress = (event: number) => {
                media.progress = event
            }
            
            await mediaCropperUploader(data , onProgress)
            .then((res: any) => {
                emitAddedToLibrary(res.data.media);

                media.uploaded = true;
                media.id = res.data.media.id;
                media.previewUrl = res.data.media.previewUrl;
                media.file = res.data.media
            })
            .catch(error => {
                media.error = 'Uploaded Fail. Please try again later;';

                if (error?.response.status === 422) {
                    media.error = error.response.data.errors.file[0];
                }
            })
        })
}
</script>

<template>
    <div class="relative flex flex-col justify-start items-center w-full min-h-[200px]">
        <div class="w-full flex-1">
            <div
                :class="[
                    dragging ? 'border-indigo-500' : 'border-basic-light dark:border-basic-dark',
                    'flex flex-col items-center py-6 px-6 rounded-xl border-2 border-dashed min-h-[200px]'
                ]"
                @drop.prevent="onDroppedFiles"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
            >
                <svg
                    class="w-12 h-12 text-gray-500"
                    aria-hidden="true" fill="none" stroke="currentColor"
                    viewBox="0 0 48 48"
                >

                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    />
                </svg>

                <p class="text-xl text-gray-700">Drop image to upload</p>

                <p class="mb-2 text-gray-700">or</p>

                <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 cursor-pointer hover:shadow-xl shadow-black shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    Select files

                    <input
                        v-if="isCheckboxAddWithCropper"
                        ref="files"
                        class="sr-only"
                        name="files"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        @input="onSelectedFiles"
                    >

                    <input
                        v-else
                        ref="files"
                        :multiple="multiple"
                        class="sr-only"
                        name="files"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, video/mp4"
                        @input="onSelectedFiles"
                    >
                </label>

                <p class="text-xs text-gray-600 mt-4">Maximum upload image size: 512MB.</p>
            </div>
        </div>

        <div class="w-full flex justify-center items-center space-x-3 mt-4">
            <x-checkbox
                v-model="isCheckboxAddWithCropper"
                @change="checkboxAddWithCropper"
                label="Add with cropper"
            />
        </div>

        <ul v-if="media?.length" class="relative w-full max-h-[300px] overflow-y-auto mt-4">
            <li
                v-for="(item, index) in media" :key="index"
                class="p-3 bg-prime-light dark:bg-prime-dark text-muted-light dark:text-muted-dark flex items-center space-x-2 my-2 rounded-lg"
            >

                <div v-if="item.previewUrl" class="w-20 h-20 bg-gray-300 flex-shrink-0 rounded-lg">
                    <img 
                        v-if="item.mimeType === 'image/jpeg' || item.mimeType === 'image/png'" 
                        :src="item.previewUrl" 
                        :alt="typeof item.file === 'object' ? item.file.name : ''" 
                        class="h-full w-full rounded-lg"
                    >
                    
                    <video v-if="item.mimeType === 'video/mp4'" class="w-full h-full object-cover aspect-video">
                        <source :src="item.previewUrl" :type="item.mimeType" :title="typeof item.file === 'object' ? item.file.name : ''">
                    </video>
                </div>

                <div class="text-xs text-gray-400 flex-1 truncate">
                    {{ typeof item.file === 'object' ? item.file.name : '' }}
                </div>

                <div v-if="!item.uploaded && !item.error" class="w-40 bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">

                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${item.progress}%`"/>

                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ item.progress }}%</div>

                </div>

                <div v-if="item.error" class="relative text-xs lg:text-md text-red-600">{{ item.error }}</div>

                <div v-if="item.uploaded" class="flex justify-center items-center space-x-3">
                    <x-tooltip text="Edit" position="left">
                        <x-btn color="primary" icon="material-symbols:edit-square" variant="ghost" square @click="openEditFile(item.file)"/>
                    </x-tooltip>
                </div>
            </li>
        </ul>

        <x-modal-photo-details
            v-if="fileEdit"
            :show="isShowModalPhotoDetails"
            :file="fileEdit"
            title="Add new assets" 
            @added-to-library="emitAddedToLibrary($event)"
            @close="closeModalEdit"
        />

        <x-modal-photo-cropper
            v-if="uploadedImageUrl"
            :show="isShowModalPhotoCropper"
            :file-url="uploadedImageUrl"
            title="Photo cropper"
            @close="isShowModalPhotoCropper = $event"
            @upload-crop-image="uploadCropImage"
        />
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>