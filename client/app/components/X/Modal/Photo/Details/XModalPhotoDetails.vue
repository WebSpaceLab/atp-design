<script setup lang="ts">
/**
 * Component for managing media file details in a modal dialog
 * Handles file preview, metadata editing, and file replacement
 */
import type { IMedia } from '~~/types/media';
const { update, updateMediaWithUploader } = useMediaStore()
const { isLoading } = storeToRefs(useMediaStore())
/**
 * Props interface for component configuration
 */
const props = defineProps<{
  show: boolean           // Controls modal visibility
  maxWidth?: string      // Maximum width of the modal
  closeable?: boolean    // Whether modal can be closed
  file?: IMedia          // Media file data
  title?: string         // Modal title
}>()

/**
 * Event emitter for component interactions
 */
const emits = defineEmits<{
  close: [value: boolean]           // Emitted when modal closes
  addedToLibrary: [media?: IMedia]  // Emitted when media is added/updated
}>()

/**
 * Component state management
 */
const errors = ref<Record<string, string[]> | null>(null)    // Form validation errors
const progressImage = ref<number>(0)                         // Upload progress
const uploadedImage = ref<File | null>(null)                 // Currently uploaded file
const isDisabled = ref(true)                                // Update button state

/**
 * Media file details state
 */
const fileDetails = reactive<IMedia>({
  id: 0,
  previewUrl: '',
  description: '',
  name: '',
  mimeType: '',
  size: '',
  author: {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    avatarUrl: ''
  },
  createdAtAgo: '',
  updatedAtAgo: '',
  index: 0,
  movieUrl: '',
  pathUrl: ''
})

/**
 * Upload state tracking
 */
const media = reactive({
  progress: null as number | null,   // Upload progress percentage
  uploaded: false,                   // Upload completion status
  error: null as string | null       // Upload error message
})

/**
 * Handles file selection and initiates upload
 */
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedImage.value = target.files[0]
    handleFileUpload()
  }
}

/**
 * Processes file upload with progress tracking
 */
async function handleFileUpload() {    
  if (!uploadedImage.value) {
    return;
  }

  const form = new FormData();
  form.append('file', uploadedImage.value);

  try {
    const response = await updateMediaWithUploader(
      props.file?.id ? props.file.id.toString() : null,
      form,
      (progress: number) => {
        media.progress = progress;
      }
    ) as any
    
    if (response.media) {
      emits('addedToLibrary', response.media);
      Object.assign(fileDetails, response.media);
    }
  } catch (error) {
    media.error = 'Upload failed';
    console.error(error);
  } finally {
    media.uploaded = true;
  }
}

/**
 * Updates media metadata (name and description)
 */
async function handleUpdateMedia() {
  if (!props.file?.id) return;
  
  isLoading.value = true;
  try {
    await update(props.file.id.toString(), {
      name: fileDetails.name,
      description: fileDetails.description,
    });
    emits('addedToLibrary');
    resetForm();
    emits('close', false);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

/**
 * Resets form to initial state
 */
const resetForm = () => {
  Object.assign(fileDetails, {
    id: '',
    previewUrl: '',
    description: '',
    name: '',
    mimeType: '',
    size: '',
    author: {
      username: ''
    },
    createdAtAgo: '',
    updatedAtAgo: ''
  });
}

/**
 * Watchers for form field changes
 * Updates disabled state based on changes
 */
watch(() => props.file, (file) => {
  if(file) {
    Object.assign(fileDetails, {
      id: file.id || '',
      createdAtAgo: file.createdAtAgo || '',
      updatedAtAgo: file.updatedAtAgo || '',
      size: file.size || '',
      mimeType: file.mimeType || '',
      name: file.name || '',
      author: file.author || { username: '' },
      description: file.description || '',
      previewUrl: file.previewUrl || ''
    });
  }
})

watch(() => fileDetails.name, () => {
  isDisabled.value = !fileDetails.name || fileDetails.name === props.file?.name;
})

watch(() => fileDetails.description, () => {
  isDisabled.value = !fileDetails.description || fileDetails.description === props.file?.description;
})
</script>

<template>
  <x-modal-dialog
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="$emit('close', false)"
    :title="title"
  >
    <div class="w-full h-full grid grid-cols-1 gap-4  md:flex md:flex-row md:justify-center md:items-start md:space-x-6">
      <div >
        <x-card-media class=" w-48" :file="fileDetails" :isFieldSelected="false" >
          <template #action>
            <label class="px-2 h-9 inline-flex items-center rounded-xl border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <Icon name="material-symbols:cameraswitch-sharp"  class="text-2xl"/>

              <input ref="SwitchFile" @input="handleFileSelect" type="file" name="SwitchFile"  class="sr-only">
            </label>
          </template>
        </x-card-media>
        
        <template >
          <div v-if="!media.uploaded && !media.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">

            <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${media.progress}%`"></div>

            <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ media.progress }}%</div>
          </div>

          <div v-if="media.error" class="relative text-xs lg:text-md text-red-600">{{ media.error }}</div>
        </template>
      </div>

      <div class="w-full h-full flex flex-col justify-center space-y-6 py-6 box-border">
        <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
          <span v-if="fileDetails.mimeType !== 'video/youTube'" class="text-muted-light dark:text-muted-dark">
            <p class="uppercase  m-0  text-basic dark:text-basic-dark text-bold">Size</p>  
            <p class="text-basic-800 dark:text-basic-300 text-sm">
              {{ fileDetails.size }} KB
            </p>
          </span>

          <span v-if="fileDetails.author" class="text-muted-light dark:text-muted-dark">
            <p class="uppercase m-0  text-basic dark:text-basic-dark text-bold ">Add file</p>
            <p class="text-basic-800 dark:text-basic-300 text-sm">
              {{ fileDetails.author.username }}
            </p> 
          </span>

          <span class="text-muted-light dark:text-muted-dark">
            <p class="uppercase m-0  text-basic dark:text-basic-dark text-bold">Created date</p>  
            <p class="text-basic-800 dark:text-basic-300">
              {{ fileDetails.createdAtAgo  }}
            </p>
          </span>

          <span class="text-muted-light dark:text-muted-dark">
            <p class="uppercase m-0  text-basic dark:text-basic-dark text-bold">Updated date</p>  
            <p class="text-basic-800 dark:text-basic-300">
              {{ fileDetails.updatedAtAgo ? fileDetails.updatedAtAgo : 'Not updated' }}
            </p>
          </span>

          <span class="text-muted-light dark:text-muted-dark">
            <p class="uppercase m-0 text-basic dark:text-basic-dark text-bold">Mime-Type</p> 
            <p class="text-basic-800 dark:text-basic-300">
              {{ fileDetails.mimeType }}
            </p>
          </span>

          
          <span class="text-basic dark:text-basic-dark">
            <p class="uppercase m-0  text-white drk:text-black text-bold">Asset ID</p>  
            <p class="text-basic-800 dark:text-basic-300">
              {{ fileDetails.id }}
            </p>
          </span>
        </div>

        <div class="flex flex-col space-y-6">
          <div>
            <x-input v-model="fileDetails.name" label="Name" :error="errors && errors.name ? errors.name[0] : ''" />
          </div>

          <div>
            <x-textarea v-model="fileDetails.description" label="Description" :rows="5" :cols="20" :error="errors && errors.description ? errors.description[0] : ''" />
          </div>
        </div>
      </div>
    </div> 
<!--
TODO: Jeśli utworzony zostanie 'cropper' w Symfony to należało by włączyć ten komponent
    <x-modal-photo-cropper
        :show="isShowModalPhotoCropper"
        :file="uploadedImageUrl"
        :media="media"
        @close="event => isShowModalPhotoCropper = event"
        @uploadCropImage="uploadCropImage"
        title="Photo cropper"
    />
-->
        
        <template #footer>
          <div class="flex space-x-3">
            <x-btn @click="handleUpdateMedia" @keydown.enter="handleUpdateMedia" type="submit" color="primary" :loading="isLoading" :disabled="isDisabled">Update</x-btn>
          </div>
        </template>
    </x-modal-dialog>
</template>