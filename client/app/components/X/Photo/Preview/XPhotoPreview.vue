<script setup lang="ts">
import type { IMedia } from '~~/types/media';

const props = defineProps({
  isShowPreviewImage: Boolean,
  photos: Array as () => IMedia[],
  preview: Object as () => IMedia
})

// Typed emits
const emits = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'preview', item: IMedia): void
}>()

const viewPhotos = ref<IMedia[]>([])
const prevImage = ref<number>(0)
const nextImage = ref<number>(6)
const numberOfPhotos = ref<number>(6)
const isShowAllImages = ref<boolean>(true)
const isShowPreview = ref<boolean>(true)
const right = ref<boolean>(false)
const isShowDescription = ref<boolean>(true)
const isShowDescriptionAll = ref<boolean>(true)
const isFullScreen = ref<boolean>(false)
const isShowHeader = ref<boolean>(false)

function openPreview(item: IMedia) {
    emits( 'preview', item)
}

function next(index: number) {
    right.value = false
    if(index + 1 < (props.photos?.length ?? 0)) {
        index ++;
    } else {
        index = 0;
    }

    if (props.photos) {
        props.photos.forEach((item, idx) => {
            if(idx === index) {
                openPreview({ ...item, index: idx });
            }
        });
    }
}

function previous(index: number) {
    right.value = true
    if(index > 0) {
        index--;
    } else {
        index = (props.photos?.length ?? 1) - 1;
    }

    if (props.photos) {
        props.photos.forEach((item, idx) => {
            if(idx === index) {
                openPreview({ ...item, index: idx });
            }
        });
    }
}

function close() {
    viewPhotos.value = []
    emits('close', false)
}

function allPhotos() {
    const photos: IMedia[] = [];
    if(props.photos && props.photos.length >= numberOfPhotos.value) {
        console.log('props.photos2: ', props.photos)
        props.photos.forEach((item , index) => {
            if(index >= prevImage.value && index <= nextImage.value) {
                photos.push({ ...item, index });
            }
        })

       viewPhotos.value = photos
    } else {
        viewPhotos.value = (props.photos ?? []).map((item, index) => ({ ...item, index }));
    }
}

function prevImages() {
    if(nextImage.value >= numberOfPhotos.value + 1) {
        prevImage.value--;
        nextImage.value--;

    } else {
        if(prevImage.value === 0) {
            prevImage.value = (props.photos?.length ?? 1) - 1;
        } else if(nextImage.value === 0) {
            prevImage.value--;

            nextImage.value = (props.photos?.length ?? 1) - 1;
        } else {
            prevImage.value --;
        }
        nextImage.value--;
    }
    const prevPhoto = props.photos?.[prevImage.value];
    if (prevPhoto && typeof prevPhoto === 'object') {
        viewPhotos.value.pop();
        viewPhotos.value.unshift({ ...prevPhoto, index: prevImage.value });
    }
}

function nextImages() {
    const photosLength = props.photos?.length ?? 0;
    if (nextImage.value <= photosLength - 2) {
        if(prevImage.value === photosLength - 1) {
            prevImage.value = 0;
        } else {
            prevImage.value++;
        }
        nextImage.value++;
    } else {
        const photosLength = props.photos?.length ?? 0;
        if (nextImage.value === photosLength - 1) {
            nextImage.value = 0;
        } else if (prevImage.value === photosLength - 1) {
            prevImage.value = 1;
            nextImage.value++;
        } else {
            nextImage.value ++;
        }

        prevImage.value++;
    }

    const nextPhoto = props.photos?.[nextImage.value];

    if (nextPhoto && typeof nextPhoto === 'object') {
        viewPhotos.value.shift();
        viewPhotos.value.push({ ...nextPhoto, index: nextImage.value });
    }
}


const showDescription = () => {
    isShowDescriptionAll.value = !isShowDescriptionAll.value

    isShowDescription.value = isShowDescriptionAll.value
}

watch(() => props.isShowPreviewImage, (value) => {
    if(value) allPhotos()
}, { immediate: true })

watch(() => props.preview, (preview) => {
    isShowPreview.value = false
    setTimeout(() => {
        isShowPreview.value = true

        if(isShowDescriptionAll.value) {

            isShowDescription.value = false;
    
            if(preview && 'description' in preview) {
                setTimeout(() => {
                    isShowDescription.value = true;
                }, 300);
            }
        }
    }, 50)
}, { immediate: true })

function onTouchmove(event: TouchEvent) {
    if (props.preview && event.changedTouches?.[0]?.clientX && 150 > event.changedTouches[0].clientX) {
        previous(props.preview.index)
    } else if (props.preview && event.changedTouches?.[0]?.clientX) {
        next(props.preview.index) 
    }
}
</script>

<template>
    <teleport to="body">
        <transition
           enter-active-class="transition ease-in duration-300"
           enter-from-class="transform scale-0"
           enter-to-class="transform scale-100"
           leave-active-class="transition ease-in duration-300"
           leave-from-class="transform translate-x-0"
           leave-to-class="transform translate-x-[100vw]"
       >
           <div v-if="isShowPreviewImage" class="fixed w-screen h-screen top-0 left-0 bg-black/90 backdrop-blur z-50 flex flex-col justify-start items-center">
                <div v-if="isFullScreen" class="absolute top-0 left-0 h-10 w-screen z-40" @mouseover="isShowHeader = true" @mouseleave="isShowHeader = false"/>
            
                <header class="h-20 w-screen px-8  box-border" :class="isFullScreen ? isShowHeader ? 'absolute top-0 left-0 z-50 bg-black/60' : 'hidden' : 'relative mb-6 bg-black'" @mouseover="isShowHeader = true" @mouseleave="isShowHeader = false">
                    <div class="w-full h-full flex justify-between items-center px-5 box-border">
                        <h2 v-if="viewPhotos?.length > 1 && preview" class="flex text-lg text-blue-300 space-x-4">
                            <span class=" text-gray-600 flex uppercase truncate ">{{ preview.name }}</span>
                            
                            <div class="flex space-x-1">
                                <span class="text-gray-600">[</span>
                                <span class="text-gray-600">{{ preview.index + 1 }}</span> 
                                <span class="text-gray-600"> / </span> 
                                <span class="text-gray-600">{{ viewPhotos?.length }} </span>
                                <span class="text-gray-600">]</span>
                            </div>
                        </h2>
        
                        <div class="w-full flex justify-end space-x-3 px-1 md:px-3 lg:px-6" >
                            <x-tooltip :text="isShowDescription ? 'Ukryj opis. Double-clik wyłacza opisy' : isShowDescriptionAll ? 'Pokaż opis. Double-clik wyłacza opisy' : 'Double-clik wyłącz opisy'" >
                                <x-btn
                                    :icon="isShowDescriptionAll ? 'material-symbols:content-paste' : 'material-symbols:content-paste-off-sharp'"
                                    variant="ghost"
                                    square
                                    @click="isShowDescription = !isShowDescription"
                                    @dblclick="showDescription"
                                    :color="isShowDescription ? 'primary' : 'secondary'"
                                />
                            </x-tooltip>

                            <x-tooltip :text="isShowAllImages ? 'Wyłącz pasek boczny' : 'Pasek boczny'">
                                <x-btn
                                    :icon="isShowAllImages ? 'i-material-symbols-gallery-thumbnail-outline' : 'i-solar-gallery-bold'"
                                    variant="ghost"
                                    square
                                    @click="isShowAllImages = !isShowAllImages"
                                    :color="isShowAllImages ? 'primary' : 'secondary'"
                                />
                            </x-tooltip>

                            <x-tooltip :text="isFullScreen ? 'Wyłącz fullscreen' : 'Fullscreen'">
                                <x-btn
                                    :icon="isFullScreen ? 'ic:outline-fullscreen-exit' : 'ic:baseline-fullscreen'"
                                    variant="ghost"
                                    square
                                    @click="isFullScreen = !isFullScreen"
                                    :color="isFullScreen ? 'primary' : 'secondary'"
                                />
                            </x-tooltip>

                            <x-tooltip text="'Zamknij">
                                <x-btn-close-to-open
                                    :switcher="isShowPreview"
                                    @click="close"
                                />
                            </x-tooltip>
                        </div>
                    </div>
                </header>
    
                <div
                    v-if="preview"
                    class="flex justify-center items-center overflow-hidden md:px-6 box-border duration-300"
                    :class="isFullScreen ? 'absolute top-0 left-0 h-screen w-screen' : 'relative md:container md:mx-auto md:max-w-full h-[80%]'"
                >
                    <!--
                        
                    -->
                    
                    <div class="relative w-screen md:h-full flex justify-center items-center bg-black overflow-hidden">
                        <div
                            v-if="preview.index != 0"
                            class="absolute left-0 top-0 z-20 w-10 h-full flex justify-center items-center cursor-pointer hover:bg-black/30 bg-gray-900/2 group duration-500"
                            @click="previous(preview.index)"
                        >
                            <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl text-gray-600/30 group-hover:text-gray-400 duration-500"/>
                        </div>

                        <transition
                            enter-active-class="transition ease duration-500"
                            :enter-from-class="right ? 'transform translate-x-[100%] blur-lg' : 'transform translate-x-[-100%] blur-lg' "
                            enter-to-class="transform translate-x-0 blur-0"
                            leave-active-class="transition ease duration-500"
                            leave-from-class="transform translate-x-0"
                            :leave-to-class="right ? 'transform translate-x-[-100%] blur-lg' : 'transform translate-x-[100%] blur-lg'"
                        >
                                <div v-if="preview && isShowPreview" class="relative w-full md:w-auto md:h-full flex justify-center items-center">
                                    <img v-if="preview.mimeType === 'image/jpeg' || preview.mimeType === 'image/png'" class="w-full md:w-auto md:h-full" :src="preview.previewUrl" :alt="preview.name"  @touchend="onTouchmove" >
                                    
                                    <video v-if="preview.mimeType === 'video/mp4'" class="w-screen h-full px-20 box-border" controls>
                                        <source :src="preview.previewUrl" :type="preview.mimeType">
                                    </video>
                      
                                    <iframe 
                                        v-if="preview.mimeType === 'video/youTube'"
                                        width="100%" height="100%"
                                        :src="preview.pathUrl"
                                        title="YouTube video player" 
                                        class="w-screen h-full px-20 box-border aspect-video" 
                                        frameborder="0"
                                        allowfullscreen
                                    />

                                    <transition
                                        enter-active-class="transition ease-in duration-300"
                                        enter-from-class="transform scale-0"
                                        enter-to-class="transform scale-100"
                                        leave-active-class="transition ease-in duration-300"
                                        leave-from-class="transform scale-100"
                                        leave-to-class="transform scale-0"
                                    >
                                        <div v-if="preview?.description && isShowDescription"  class="absolute top-10 left-10 right-10 z-10 border-solid border-info-900 bg-info-300/50 rounded-xl h-auto">
                                            <div class="flex justify-end p-1">
                                                <x-btn @click="isShowDescription = false" icon="ion:ios-close-circle-outline" variant="ghost" square />
                                            </div>

                                            <p class="text-info-900 px-6" v-html="preview?.description"/>
                                        </div>
                                    </transition>
                                </div>
                        </transition>

                        <div
                            v-if="preview.index + 1  != viewPhotos?.length"
                            class="absolute right-0 top-0 z-20 w-10 h-full flex justify-center items-center cursor-pointer hover:bg-black/30 bg-gray-900/2 group duration-500"
                            @click="next(preview.index)"
                        >
                            <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-gray-600/30 group-hover:text-gray-400 duration-500"/>
                        </div>
                    </div>

                    
                    <!--
                        
                    -->
                </div>

                <transition
                    enter-active-class="transition ease-in duration-300"
                    enter-from-class="transform translate-y-[100%]"
                    enter-to-class="transform translate-y-0"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform translate-y-0"
                    leave-to-class="transform translate-y-[100%]"
                >
                    <div v-if="isShowAllImages && viewPhotos?.length > 1" class="absolute bottom-0 -translate-y-4 p-6 mx-auto h-40 hidden lg:flex flex-row justify-center items-center space-x-3 bg-black/30 rounded-xl">
                        <div v-if="viewPhotos?.length > 6" @click="prevImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-l-xl">
                            <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl text-white"></Icon>
                        </div>
        
                        <div v-for="(photo, index) in viewPhotos" :key="photo.index = index" class="h-full flex justify-center items-center my-4 rounded-lg duration-300 ">
                            <img
                                v-if="photo.mimeType === 'image/jpeg' || photo.mimeType === 'image/png' && preview"
                                :alt="photo.name"
                                :class="[photo.index === (preview?.index ?? -1) ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                :src="photo.previewUrl"
                                @click="openPreview(photo)"
                                class="h-full w-30 cursor-pointer object-cover rounded-lg"
                            />

                            <video 
                                v-if="photo.mimeType === 'video/mp4' && preview"
                                :class="[photo.index === (preview?.index ?? -1) ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                @click="openPreview(photo)"
                                class="h-full w-30 cursor-pointer object-cover rounded-lg"
                            >
                                <source :src="photo.previewUrl" :type="photo.mimeType">
                            </video>

                            <div  class="relative h-full w-full">
                                <div @click="openPreview(photo)" class="absolute left-0 top-0 w-full h-full z-10 cursor-pointer"></div>

                                <iframe 
                                    v-if="photo.mimeType === 'video/youTube' && preview"
                                    :src="photo.pathUrl" 
                                    :class="[photo.index === (preview?.index ?? -1) ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                    class="h-full w-30 cursor-pointer object-cover rounded-lg aspect-video"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    loading="lazy"
                                    title="YouTube video player"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
        
                        <div v-if="viewPhotos?.length > 6" @click="nextImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-r-xl">
                            <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                        </div>
                    </div>
                </transition>
           </div>
       </transition>
    </teleport>
</template>
