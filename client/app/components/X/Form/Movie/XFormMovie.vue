<script setup lang="ts">

const $media = useMediaStore()
const emits = defineEmits(['addedToLibrary', 'close'])
let activeType = ref()

const form = useForm({
    name: '',
    mediaUrl: '',
    type: 'video/youTube'
})

const types =  computed(() => {
    return [
        // { value: 'application/pdf', icon: 'i-mdi-file-pdf', label: 'Pdf Url' },
        { value: 'video/youTube', icon: 'i-material-symbols-youtube-activity', label: 'YouTube Video Id'},
    ]
})

const uploadMovieFile = async (form: any) => {
    const res: any = await $media.uploadMovieFile(form)
    console.log('Response from Movie', res)
    emits('addedToLibrary', res.media)
    emits('close', false)
}

const addType = (type: { value: string }) => {
    form.body.type = type.value
    activeType.value = type
}

onMounted(() => {
    if (types.value[0]) {
        addType(types.value[0])
    }
})
</script>

<template>
    <div class="w-full">
        <form class="w-full flex flex-col space-y-6 p-6 box-border" @submit.prevent="uploadMovieFile(form)">
            <div class="w-full flex space-x-4 px-4 box-border">
                <div v-for="(type, index) in types" :key="index">
                    <x-tooltip :text="type.label">
                    <span class="cursor-pointer">
                        <Icon 
                            @click="addType(type)" 
                            :name="type.icon" 
                            class="text-5xl rounded-xl" 
                            :class="[
                                form.body.type === type.value ? 'text-active-600' : 'text-gray-200 hover:text-hover-600',
                            ]" 
                        />
                    </span>
                </x-tooltip>
                </div>
            </div>

            <div class="w-full">
                <x-input
                    v-model="form.body.name"
                    label="Name"
                    type="text"
                    icon="material-symbols:drive-file-rename-outline"
                    name="movie_name"
                    :error="form.errors && form.errors?.name ? form.errors.name[0] : ''"
                    autofocus
                />
            </div>

            <div class="w-full">
                <x-input
                    v-model="form.body.mediaUrl"
                    :label="activeType ? activeType.label : 'Media Url'"
                    type="text"
                    :icon="activeType ? activeType.icon : 'material-symbols:docs'"
                    name="movie_movieUrl"
                    :error="form.errors && form.errors?.mediaUrl ? form.errors.mediaUrl[0] : ''"
                    autofocus
                />
            </div>

            <div class="w-full flex justify-end">
                <x-btn type="submit" color="secondary" :loading="form.loading">Upload</x-btn>
            </div>
        </form>
    </div>
</template>